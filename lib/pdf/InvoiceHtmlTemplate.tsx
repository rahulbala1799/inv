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
          
          /* Remove max-width constraints and shadows for PDF - target the actual template content */
          body > div:first-of-type:not([data-invoice-number]) {
            max-width: none !important;
            width: 100% !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 20px 15mm !important;
            min-height: calc(100vh - 30mm) !important;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          
          /* If content is short, expand footer to push to bottom */
          body > div:first-of-type:not([data-invoice-number]) > div:last-child {
            margin-top: auto;
          }
          
          /* Prevent word breaking in the middle */
          * {
            word-wrap: break-word;
            word-break: break-word;
            overflow-wrap: break-word;
          }
          
          /* Prevent breaking words, but allow breaking long URLs/strings */
          p, span, div, td, th {
            word-break: break-word;
            hyphens: auto;
          }
          
          /* Page break rules - ensure content uses full pages */
          table {
            page-break-inside: avoid;
            width: 100%;
            border-collapse: collapse;
          }
          
          thead {
            display: table-header-group;
          }
          
          tfoot {
            display: table-footer-group;
          }
          
          /* Prevent breaking table rows across pages */
          tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }
          
          /* Prevent breaking cells across pages */
          td, th {
            page-break-inside: avoid;
          }
          
          /* Allow table to break if it's too long, but keep rows together */
          tbody {
            page-break-inside: auto;
          }
          
          /* Keep header row with first data row */
          thead + tbody tr:first-child {
            page-break-before: avoid;
          }
          
          /* Prevent breaking sections awkwardly */
          div {
            orphans: 3;
            widows: 3;
          }
          
          /* Prevent breaking paragraphs in the middle */
          p {
            page-break-inside: avoid;
            orphans: 2;
            widows: 2;
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
        {/* Hidden data attributes for header/footer extraction - not visible in PDF */}
        <div data-invoice-number={`#${props.invoice.invoice_number}`} data-business-name={props.branding?.business_name || ''} style={{ display: 'none', visibility: 'hidden', height: 0, width: 0, overflow: 'hidden', position: 'absolute' }}>
        </div>
        {/* Actual invoice content */}
        {templateComponent}
      </body>
    </html>
  )
}
