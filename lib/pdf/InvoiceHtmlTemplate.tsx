import React from 'react'
import { renderTemplate } from './templates/TemplateAdapter'
import { InvoiceTemplateProps } from './templates/types'

/**
 * Main HTML template wrapper for PDF generation
 * This component wraps the selected template with HTML structure and Tailwind CSS
 */
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
        {/* Include Tailwind CSS via CDN for Puppeteer */}
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@3.4.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
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
          
          body {
            font-family: ${config.fontFamily || 'Helvetica, Arial, sans-serif'};
            background-color: white;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
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
          }
        `}</style>
      </head>
      <body>
        {templateComponent}
      </body>
    </html>
  )
}
