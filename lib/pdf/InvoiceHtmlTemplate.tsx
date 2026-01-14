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
            /* Removed margin: 0 to let Puppeteer control margins */
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          html, body {
            width: 100%;
            font-family: ${config.fontFamily || 'Helvetica, Arial, sans-serif'};
            background-color: white;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          /* PDF page wrapper - avoids flex pagination weirdness */
          .pdf-page {
            max-width: none !important;
            width: 100% !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 20px 0 !important;  /* Zero side padding - use full A4 width (210mm) */
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
          
          /* Table description cells - better word breaking for long content */
          td.description {
            word-break: normal;
            overflow-wrap: anywhere;
          }
          
          /* Safer modern break rules - allow tables to break across pages */
          table {
            break-inside: auto;
            page-break-inside: auto;
            width: 100%;
            border-collapse: collapse;
          }
          
          thead {
            display: table-header-group;
          }
          
          tfoot {
            display: table-footer-group;
          }
          
          /* Keep table rows together, but allow table to break */
          tr {
            break-inside: avoid;
            page-break-inside: avoid;
            break-after: auto;
            page-break-after: auto;
          }
          
          /* Allow table body to break if it's too long */
          tbody {
            break-inside: auto;
            page-break-inside: auto;
          }
          
          /* Keep header row with first data row */
          thead + tbody tr:first-child {
            break-before: avoid;
            page-break-before: avoid;
          }
          
          /* CRITICAL: Prevent sections from being cut across pages */
          /* Force these sections to stay together - if they don't fit, move to next page */
          .avoid-break {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
          
          /* Apply avoid-break to totals, bank details, signature blocks, notes */
          .totals,
          .bank-details,
          .signature-section,
          .notes-section,
          /* Also target common div patterns that contain these sections */
          div[class*="total"],
          div[class*="bank"],
          div[class*="payment"],
          div[class*="signature"],
          div[class*="note"] {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
          
          /* Target sections that typically contain totals/bank details */
          /* These selectors catch common template patterns */
          .flex.justify-end > div,
          .grid > div:last-child,
          div[class*="bg-"][class*="p-"],
          div[class*="border-l-"] {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
          
          /* Page-level borders - each page gets its own border */
          @page {
            margin: 0;  /* Let Puppeteer control margins */
          }
          
          /* Create border on each page using page-level styling */
          html {
            box-sizing: border-box;
          }
          
          /* Each page should have its own border if template uses borders */
          body > * {
            page-break-after: auto;
          }
          
          /* Force page breaks for major sections if needed */
          .page-break-before {
            break-before: always;
            page-break-before: always;
          }
          
          .page-break-after {
            break-after: always;
            page-break-after: always;
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
            
            /* Avoid flex pagination weirdness in print */
            .pdf-page {
              display: block !important;
              min-height: auto !important;
            }
            
            /* Remove flex tricks that cause pagination issues */
            body > div:first-of-type:not([data-invoice-number]) {
              display: block !important;
              min-height: auto !important;
            }
          }
        `}</style>
      </head>
      <body>
        {/* Hidden data attributes for header/footer extraction - not visible in PDF */}
        <div data-invoice-number={`#${props.invoice.invoice_number}`} data-business-name={props.branding?.business_name || ''} style={{ display: 'none', visibility: 'hidden', height: 0, width: 0, overflow: 'hidden', position: 'absolute' }}>
        </div>
        {/* Actual invoice content - wrapped in pdf-page class to avoid flex pagination issues */}
        <div className="pdf-page">
          {templateComponent}
        </div>
      </body>
    </html>
  )
}
