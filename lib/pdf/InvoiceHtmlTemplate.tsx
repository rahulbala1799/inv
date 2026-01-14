import React from 'react'
import { renderTemplate } from './templates/TemplateAdapter'
import { InvoiceTemplateProps } from './templates/types'

/**
 * Main HTML template wrapper for PDF generation
 * This component wraps the selected template with HTML structure and Tailwind CSS
 * Note: This file uses raw HTML/script tags for Puppeteer PDF generation (server-side only)
 */
/* eslint-disable @next/next/no-head-element, @next/next/no-sync-scripts */
export default function InvoiceHTMLTemplate(props: InvoiceTemplateProps) {
  const { template } = props
  const config = template?.config_json || {}
  const layout = config.layout || 'classic-blue'
  
  // Get the template component
  const templateComponent = renderTemplate(layout, props)
  
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Invoice #{props.invoice.invoice_number}</title>
        {/* Include Tailwind CSS via CDN for Puppeteer - using Play CDN for better compatibility */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          tailwind.config = {
            theme: {
              extend: {}
            }
          }
        `}} />
        <style>{`
          @page {
            size: A4;
            margin: 0;
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          html, body {
            width: 100%;
            min-height: 100vh;
            font-family: ${config.fontFamily || 'Helvetica, Arial, sans-serif'};
            background-color: white;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          /* Remove max-width constraints and shadows for PDF */
          body > div[data-invoice-number] {
            max-width: none !important;
            width: 100% !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0 !important;
            min-height: 100vh !important;
            display: flex;
            flex-direction: column;
          }
          
          /* Ensure template content fills pages properly */
          body > div[data-invoice-number] > div {
            flex: 1;
            width: 100% !important;
            max-width: none !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 20px 15mm !important;
            min-height: calc(100vh - 30mm) !important;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          
          /* If content is short, expand footer to push to bottom */
          body > div[data-invoice-number] > div > div:last-child {
            margin-top: auto;
          }
          
          /* Page break rules - ensure content uses full pages */
          table {
            page-break-inside: avoid;
            width: 100%;
          }
          
          thead {
            display: table-header-group;
          }
          
          tfoot {
            display: table-footer-group;
          }
          
          tr {
            page-break-inside: avoid;
          }
          
          /* Ensure table rows don't break awkwardly - but allow breaking if needed for full pages */
          tbody tr {
            page-break-inside: avoid;
          }
          
          /* If a row would cause a page break with little content, allow it to break */
          tbody tr:last-child {
            page-break-after: auto;
          }
          
          /* Force page breaks for major sections if needed */
          .page-break-before {
            page-break-before: always;
          }
          
          .page-break-after {
            page-break-after: always;
          }
          
          .no-page-break {
            page-break-inside: avoid;
          }
          
          /* Ensure content expands to fill available space on single page */
          body > div[data-invoice-number] > div {
            display: flex;
            flex-direction: column;
          }
          
          /* Push footer to bottom on single page invoices */
          body > div[data-invoice-number] > div > div:last-child {
            margin-top: auto;
            padding-top: 2rem;
          }
          
          /* Ensure images load properly */
          img {
            max-width: 100%;
            height: auto;
          }
          
          /* Print optimizations */
          @media print {
            .no-print {
              display: none !important;
            }
            
            /* Remove shadows in print */
            * {
              box-shadow: none !important;
            }
          }
        `}</style>
      </head>
      <body>
        <div data-invoice-number={`#${props.invoice.invoice_number}`} data-business-name={props.branding?.business_name || ''}>
          {templateComponent}
        </div>
      </body>
    </html>
  )
}
