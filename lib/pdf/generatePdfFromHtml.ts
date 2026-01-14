import puppeteer from 'puppeteer-core'

// Dynamically import chromium to avoid build-time issues
let chromiumModule: any = null
async function getChromium() {
  if (!chromiumModule && isServerless()) {
    const imported = await import('@sparticuz/chromium-min')
    // The default export is the chromium object
    chromiumModule = imported.default || imported
  }
  return chromiumModule
}

/**
 * Detects if we're in a serverless environment (Vercel, AWS Lambda, etc.)
 */
function isServerless(): boolean {
  return !!(
    process.env.VERCEL ||
    process.env.AWS_LAMBDA_FUNCTION_NAME ||
    process.env.AWS_EXECUTION_ENV ||
    process.env.FUNCTION_TARGET
  )
}

/**
 * Gets the Chrome executable path based on environment
 */
async function getChromeExecutablePath(): Promise<string | undefined> {
  if (isServerless()) {
    try {
      const chromium = await getChromium()
      if (!chromium) {
        throw new Error('Could not load @sparticuz/chromium-min module')
      }
      
      // Check if executablePath is a function
      if (typeof chromium.executablePath !== 'function') {
        console.error('chromium.executablePath is not a function. Module:', chromium)
        throw new Error('Invalid chromium module: executablePath is not a function')
      }
      
      // Option 1: Use remote Chromium binary if configured (recommended for Vercel)
      if (process.env.CHROMIUM_REMOTE_EXEC_PATH) {
        console.log('Using remote Chromium binary from:', process.env.CHROMIUM_REMOTE_EXEC_PATH)
        const execPath = await chromium.executablePath(process.env.CHROMIUM_REMOTE_EXEC_PATH)
        console.log('Chromium executable path:', execPath)
        return execPath
      }
      
      // Option 2: Try to get executable path without remote URL
      // Note: This may fail in Vercel if Chromium can't be extracted
      // For Vercel, it's strongly recommended to use CHROMIUM_REMOTE_EXEC_PATH
      console.log('No CHROMIUM_REMOTE_EXEC_PATH set, trying default extraction...')
      const executablePath = await chromium.executablePath()
      
      if (!executablePath) {
        throw new Error('Chromium executable path is null or undefined')
      }
      
      console.log('Chromium executable path (default):', executablePath)
      return executablePath
    } catch (error) {
      console.error('Failed to get Chromium executable path:', error)
      
      // Provide helpful error message with solutions
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      throw new Error(
        `Could not locate Chromium executable in serverless environment: ${errorMessage}. ` +
        `SOLUTION: Set CHROMIUM_REMOTE_EXEC_PATH environment variable in Vercel to: ` +
        `https://github.com/Sparticuz/chromium/releases/download/v133.0.0/chromium-v133.0.0-pack.tar`
      )
    }
  }
  // For local development, use system Chrome or let Puppeteer find it
  return undefined
}

/**
 * Gets Chrome launch arguments based on environment
 */
async function getChromeArgs(): Promise<string[]> {
  if (isServerless()) {
    // Use Chromium args for serverless
    const chromiumModule = await getChromium()
    return chromiumModule?.args || [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu',
      '--single-process'
    ]
  }
  // Local development args
  return [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--no-first-run',
    '--no-zygote',
    '--disable-gpu'
  ]
}

/**
 * Generates a PDF from HTML using Puppeteer
 * 
 * @param htmlString - Pre-rendered HTML string
 * @returns PDF buffer
 */
export async function generatePdfFromHtml(htmlString: string): Promise<Buffer> {
  // Launch Puppeteer with environment-appropriate settings
  const launchOptions: any = {
    args: await getChromeArgs(),
    headless: true,
  }
  
  // Only set executablePath in serverless environments
  if (isServerless()) {
    const chromiumModule = await getChromium()
    launchOptions.executablePath = await getChromeExecutablePath()
    launchOptions.headless = chromiumModule?.headless ?? true
  }
  
  const browser = await puppeteer.launch(launchOptions)
  
  try {
    const page = await browser.newPage()
    
    // Set HTML content (ensure it starts with DOCTYPE if not already)
    const fullHtml = htmlString.trim().startsWith('<!DOCTYPE') 
      ? htmlString 
      : '<!DOCTYPE html>' + htmlString
    
    await page.setContent(fullHtml, {
      waitUntil: 'networkidle0'
    })
    
    // Wait for Tailwind CSS to be fully loaded and applied
    try {
      await page.evaluate(() => {
        return new Promise<void>((resolve) => {
          // Check if Tailwind is loaded by checking for computed styles
          const checkTailwind = () => {
            const testEl = document.createElement('div')
            testEl.className = 'flex'
            testEl.style.display = 'none'
            document.body.appendChild(testEl)
            const styles = window.getComputedStyle(testEl)
            const isLoaded = styles.display === 'flex' || document.querySelector('script[src*="tailwindcss"]')
            document.body.removeChild(testEl)
            
            if (isLoaded) {
              resolve()
            } else {
              setTimeout(checkTailwind, 100)
            }
          }
          // Start checking after a brief delay
          setTimeout(checkTailwind, 200)
        })
      })
    } catch (error) {
      console.warn('Tailwind check failed, proceeding anyway:', error)
    }
    
    // Additional wait to ensure all styles are applied
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Extract header/footer data from the page using data attributes (NOT textContent to avoid duplicates)
    const headerFooterData = await page.evaluate(() => {
      // Get invoice number from data attribute value, not textContent
      const invoiceNumberEl = document.querySelector('[data-invoice-number]')
      const invoiceNumber = invoiceNumberEl?.getAttribute('data-invoice-number') || 
                           document.querySelector('h2')?.textContent?.match(/#[\w-]+/)?.[0] || 
                           'Invoice'
      
      // Get business name from data attribute value, not textContent
      const businessNameEl = document.querySelector('[data-business-name]')
      const businessName = businessNameEl?.getAttribute('data-business-name') || 
                          document.querySelector('h1')?.textContent?.substring(0, 40) || 
                          ''
      
      return { 
        invoiceNumber: invoiceNumber.substring(0, 30),
        businessName: businessName.substring(0, 40)
      }
    })
    
    // Generate PDF with proper A4 sizing, full page usage, and repeating headers/footers
    // Minimal margins - only what's needed for header/footer to avoid overlap
    // Zero side margins to use full A4 width (210mm)
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',      // Minimal top margin for header (reduced from 32mm for more height)
        right: '0mm',     // Zero margin - use full width
        bottom: '15mm',   // Minimal bottom margin for footer (reduced from 25mm for more height)
        left: '0mm'       // Zero margin - use full width
      },
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 10px; width: 100%; padding: 8px 15mm; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e5e7eb; background: white;">
          <span style="color: #6b7280; font-weight: 500;">${(headerFooterData.invoiceNumber || 'Invoice').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>
          <span style="color: #6b7280; font-weight: 500;">${(headerFooterData.businessName || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 10px; width: 100%; padding: 8px 15mm; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e5e7eb; color: #6b7280; background: white;">
          <span style="font-weight: 500;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
          <span style="font-weight: 500;">Thank you for your business</span>
        </div>
      `
    })
    
    return Buffer.from(pdfBuffer)
  } finally {
    await browser.close()
  }
}

/**
 * Browser instance cache for performance optimization
 * Reuses browser instance across multiple PDF generations
 */
let browserInstance: any = null

/**
 * Generates PDF with cached browser instance (better performance)
 * 
 * @param invoice - Invoice data object
 * @param items - Array of invoice items
 * @param branding - Organization branding data
 * @param template - Template configuration object
 * @returns PDF buffer
 */
export async function generatePdfFromHtmlCached(htmlString: string): Promise<Buffer> {
  // Initialize browser if not already done
  if (!browserInstance) {
    const launchOptions: any = {
      args: await getChromeArgs(),
      headless: true,
    }
    
    // Only set executablePath in serverless environments
    if (isServerless()) {
      const chromiumModule = await getChromium()
      launchOptions.executablePath = await getChromeExecutablePath()
      launchOptions.headless = chromiumModule?.headless ?? true
    }
    
    browserInstance = await puppeteer.launch(launchOptions)
  }
  
  try {
    const page = await browserInstance.newPage()
    
    // Set HTML content (ensure it starts with DOCTYPE if not already)
    const fullHtml = htmlString.trim().startsWith('<!DOCTYPE') 
      ? htmlString 
      : '<!DOCTYPE html>' + htmlString
    
    await page.setContent(fullHtml, {
      waitUntil: 'networkidle0'
    })
    
    // Wait for Tailwind CSS to be fully loaded and applied
    try {
      await page.evaluate(() => {
        return new Promise<void>((resolve) => {
          // Check if Tailwind is loaded by checking for computed styles
          const checkTailwind = () => {
            const testEl = document.createElement('div')
            testEl.className = 'flex'
            testEl.style.display = 'none'
            document.body.appendChild(testEl)
            const styles = window.getComputedStyle(testEl)
            const isLoaded = styles.display === 'flex' || document.querySelector('script[src*="tailwindcss"]')
            document.body.removeChild(testEl)
            
            if (isLoaded) {
              resolve()
            } else {
              setTimeout(checkTailwind, 100)
            }
          }
          // Start checking after a brief delay
          setTimeout(checkTailwind, 200)
        })
      })
    } catch (error) {
      console.warn('Tailwind check failed, proceeding anyway:', error)
    }
    
    // Additional wait to ensure all styles are applied
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Extract header/footer data from the page DOM using data attributes
    const headerFooterData = await page.evaluate(() => {
      // Get invoice number from data attribute (set in InvoiceHtmlTemplate)
      const invoiceNumberEl = document.querySelector('[data-invoice-number]')
      const invoiceNumber = invoiceNumberEl?.getAttribute('data-invoice-number') || 
                           invoiceNumberEl?.textContent?.match(/#[\w-]+/)?.[0] || 
                           'Invoice'
      
      // Get business name from data attribute
      const businessNameEl = document.querySelector('[data-business-name]')
      const businessName = businessNameEl?.getAttribute('data-business-name') || 
                          businessNameEl?.textContent?.substring(0, 40) || 
                          ''
      
      return { 
        invoiceNumber: invoiceNumber.substring(0, 30),
        businessName: businessName.substring(0, 40)
      }
    })
    
    // Generate PDF with proper A4 sizing, full page usage, and repeating headers/footers
    // Minimal margins - only what's needed for header/footer to avoid overlap
    // Zero side margins to use full A4 width (210mm)
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',      // Minimal top margin for header (reduced from 32mm for more height)
        right: '0mm',     // Zero margin - use full width
        bottom: '15mm',   // Minimal bottom margin for footer (reduced from 25mm for more height)
        left: '0mm'       // Zero margin - use full width
      },
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 10px; width: 100%; padding: 8px 15mm; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e5e7eb; background: white;">
          <span style="color: #6b7280; font-weight: 500;">${(headerFooterData.invoiceNumber || 'Invoice').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>
          <span style="color: #6b7280; font-weight: 500;">${(headerFooterData.businessName || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 10px; width: 100%; padding: 8px 15mm; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e5e7eb; color: #6b7280; background: white;">
          <span style="font-weight: 500;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
          <span style="font-weight: 500;">Thank you for your business</span>
        </div>
      `
    })
    
    // Close page but keep browser instance
    await page.close()
    
    return Buffer.from(pdfBuffer)
  } catch (error) {
    // If error occurs, close browser and reset instance
    if (browserInstance) {
      await browserInstance.close()
      browserInstance = null
    }
    throw error
  }
}

/**
 * Closes the cached browser instance
 * Call this when shutting down the application
 */
export async function closeBrowserInstance(): Promise<void> {
  if (browserInstance) {
    await browserInstance.close()
    browserInstance = null
  }
}
