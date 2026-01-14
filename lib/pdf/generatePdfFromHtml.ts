import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'

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
    // Use Chromium for serverless
    return await chromium.executablePath()
  }
  // For local development, use system Chrome or let Puppeteer find it
  return undefined
}

/**
 * Gets Chrome launch arguments based on environment
 */
function getChromeArgs(): string[] {
  if (isServerless()) {
    // Use Chromium args for serverless
    return chromium.args
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
    args: getChromeArgs(),
    headless: isServerless() ? chromium.headless : true,
  }
  
  // Only set executablePath in serverless environments
  if (isServerless()) {
    launchOptions.executablePath = await getChromeExecutablePath()
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
    
    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '30mm',
        right: '30mm',
        bottom: '30mm',
        left: '30mm'
      }
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
      args: getChromeArgs(),
      headless: isServerless() ? chromium.headless : true,
    }
    
    // Only set executablePath in serverless environments
    if (isServerless()) {
      launchOptions.executablePath = await getChromeExecutablePath()
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
    
    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '30mm',
        right: '30mm',
        bottom: '30mm',
        left: '30mm'
      }
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
