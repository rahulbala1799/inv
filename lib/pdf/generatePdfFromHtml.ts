import puppeteer from 'puppeteer'
import { renderToString } from 'react-dom/server'
import InvoiceHTMLTemplate from './InvoiceHtmlTemplate'

/**
 * Generates a PDF from HTML using Puppeteer
 * 
 * @param invoice - Invoice data object
 * @param items - Array of invoice items
 * @param branding - Organization branding data
 * @param template - Template configuration object
 * @returns PDF buffer
 */
export async function generatePdfFromHtml(
  invoice: any,
  items: any[],
  branding: any,
  template: any
): Promise<Buffer> {
  // Render React component to HTML string
  const htmlString = renderToString(
    InvoiceHTMLTemplate({ invoice, items, branding, template })
  )
  
  // Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu'
    ]
  })
  
  try {
    const page = await browser.newPage()
    
    // Set HTML content
    await page.setContent(htmlString, {
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
export async function generatePdfFromHtmlCached(
  invoice: any,
  items: any[],
  branding: any,
  template: any
): Promise<Buffer> {
  // Initialize browser if not already done
  if (!browserInstance) {
    browserInstance = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    })
  }
  
  try {
    const page = await browserInstance.newPage()
    
    // Render React component to HTML string
    const htmlString = renderToString(
      InvoiceHTMLTemplate({ invoice, items, branding, template })
    )
    
    // Set HTML content
    await page.setContent(htmlString, {
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
