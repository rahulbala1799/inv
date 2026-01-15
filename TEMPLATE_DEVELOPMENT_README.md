# Invoice Template Development Guide

## Overview

This document outlines the requirements for developing **3 new invoice templates** that are print-ready on A4 paper format. These templates must handle multi-page invoices intelligently while maintaining professional appearance and optimal use of space.

---

## Core Requirements

### 1. A4 Print-Ready Format

- **Page Size**: A4 (210mm × 297mm / 8.27" × 11.69")
- **Margins**: Minimum 10mm (0.39") on all sides for safe printing
- **Bleed Area**: Consider 3mm bleed if needed for edge-to-edge designs
- **Resolution**: Design for 300 DPI for high-quality printing
- **Color Mode**: Support both color and grayscale printing

### 2. Multi-Page Section Management

Templates must intelligently handle content overflow by dividing sections across pages:

#### Section Division Rules:
- **Header Section** (Company info, logo, invoice details): Always on first page
- **Bill To / From Section**: Should remain compact; if it must move, keep it minimal
- **Line Items Table**: Primary section that may span multiple pages
- **Totals Section**: Always appears on the last page with line items
- **Payment Details / Notes**: Appears after totals on the last page

#### Page Break Strategy:
- If a section doesn't fit on the current page, move the **entire section** to the next page
- Never split a section in the middle (e.g., don't split "Bill To" section)
- Maintain visual consistency across pages with consistent headers/footers

### 3. Line Items Table Requirements

#### Header Persistence:
- **CRITICAL**: If line items continue to page 2 or beyond, the table headers (Description, Qty, Unit Price, Tax %, Total) **MUST** be repeated on every page
- Headers should match the styling of page 1 for consistency

#### Capacity Planning:
- **Page 1**: Optimize to fit at least 8-10 line items comfortably
- **Subsequent Pages**: Should accommodate 12-15 line items per page (more space available without header section)
- **Total Capacity**: Templates should handle 30+ line items across multiple pages gracefully

#### Table Layout:
- Use efficient column widths to maximize space
- Consider reducing padding on multi-page tables
- Ensure text remains readable (minimum 10pt font size)

### 4. Top Section Optimization

The header area (top of page 1) must be **space-efficient** while maintaining professionalism:

#### Logo Placement:
- Logo should fit nicely without dominating the page
- Recommended logo size: 80-120px height (or equivalent in mm)
- Position options:
  - Top-left corner (most common)
  - Top-right corner (if company info is left-aligned)
  - Centered above company info
- Ensure logo doesn't interfere with invoice number or dates

#### Company Information Layout:
- Use compact, single-column or two-column layouts
- Consider placing company info and invoice details side-by-side
- Minimize vertical spacing between elements
- Use appropriate font sizes (company name: 14-16pt, address: 9-11pt)

#### Invoice Details (Invoice #, Dates):
- Position efficiently (top-right is common)
- Use compact date formats
- Group related information together
- Consider using a subtle background or border to define the area

#### Bill To / From Section:
- Keep "Bill To" section compact
- Use minimal vertical spacing
- Consider inline or side-by-side layouts if space allows
- Ensure customer information is clearly readable

### 5. Section Arrangement Strategy

#### Page 1 Layout (Optimal):
```
┌─────────────────────────────────────┐
│ Logo | Company Info | Invoice Details│  ← Compact header (max 80-100mm)
├─────────────────────────────────────┤
│ Bill To: [Customer Info]            │  ← Compact (max 40-50mm)
├─────────────────────────────────────┤
│ Line Items Table                    │  ← Maximize this area
│ [Headers]                           │
│ [Item 1]                            │
│ [Item 2]                            │
│ ...                                 │
│ [Item 8-10]                         │
├─────────────────────────────────────┤
│ Subtotal: $XXX                      │  ← If space allows
│ Tax: $XXX                           │
│ Total: $XXX                         │
└─────────────────────────────────────┘
```

#### Page 2+ Layout:
```
┌─────────────────────────────────────┐
│ [Optional: Page number / continuation]│
├─────────────────────────────────────┤
│ Line Items Table                    │
│ [Headers - REPEATED]                │  ← MUST repeat headers
│ [Item 11]                           │
│ [Item 12]                           │
│ ...                                 │
│ [Item 22-25]                        │
├─────────────────────────────────────┤
│ Subtotal: $XXX                      │  ← Only on last page
│ Tax: $XXX                           │
│ Total: $XXX                         │
├─────────────────────────────────────┤
│ Payment Details / Notes              │
└─────────────────────────────────────┘
```

### 6. Design Considerations

#### Typography:
- Use clear, readable fonts (sans-serif recommended for tables)
- Maintain consistent font hierarchy
- Ensure minimum 10pt font for body text
- Use bold/weight variations to create visual hierarchy

#### Spacing:
- Balance between compactness and readability
- Use consistent padding/margins throughout
- White space is important - don't overcrowd

#### Colors:
- Ensure templates work in both color and grayscale
- Use sufficient contrast for text readability
- Consider print costs (avoid heavy color usage)

#### Borders & Lines:
- Use subtle borders to separate sections
- Table borders should be minimal but clear
- Consider alternating row colors for long tables (optional)

---

## Technical Implementation Notes

### Page Break Handling:
- Use CSS `page-break-inside: avoid` for sections that shouldn't split
- Use `page-break-after: auto` for sections that can move to next page
- Table rows should use `page-break-inside: avoid` to keep items together

### Responsive Considerations:
- Templates should work with varying content lengths
- Test with minimum content (3 items) and maximum content (30+ items)
- Ensure totals section always appears correctly

### Data Fields to Include:

#### Header Section:
- Company logo (optional)
- Company name
- Company address (multi-line)
- Company VAT/Tax ID
- Invoice number
- Invoice date
- Due date
- Status (optional)

#### Bill To Section:
- Customer name
- Customer address (multi-line)
- Customer email
- Customer VAT/Tax ID (if applicable)

#### Line Items Table:
- Description
- Quantity
- Unit Price
- Tax Rate (%)
- Line Total

#### Totals Section:
- Subtotal
- Tax Total
- Grand Total
- Currency

#### Footer Section:
- Payment details (bank info, IBAN, etc.)
- Notes/Terms
- Page numbers (for multi-page)

---

## Template Variations

The 3 templates should offer distinct design approaches while meeting all requirements:

1. **Template 1**: Modern/Minimal - Clean lines, ample white space, contemporary feel
2. **Template 2**: Professional/Classic - Traditional business layout, formal appearance
3. **Template 3**: Bold/Contemporary - Strong visual elements, modern color usage

Each template must:
- Meet all technical requirements above
- Be visually distinct from others
- Maintain professional appearance
- Optimize space usage efficiently

---

## Testing Checklist

Before finalizing templates, test with:

- [ ] Minimum content (3 line items, minimal company info)
- [ ] Standard content (8-10 line items)
- [ ] Maximum content (25-30+ line items across multiple pages)
- [ ] Long descriptions in line items
- [ ] Long company/customer addresses
- [ ] Missing optional fields (logo, VAT numbers, etc.)
- [ ] Print preview at 100% scale
- [ ] PDF export quality
- [ ] Grayscale printing compatibility

---

## Delivery Requirements

Each template should include:
1. Template component file (React/TypeScript)
2. Configuration JSON for template settings
3. Screenshot/preview of template
4. Notes on any special considerations or features

---

## Code Implementation Examples

Below are complete code examples for all 3 templates with proper A4 print-ready styling, page break handling, and multi-page support.

### Template 1: Modern Minimal

```tsx
import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const ModernMinimal = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
  return (
    <>
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }
          .page-break {
            page-break-before: always;
          }
          .no-break {
            page-break-inside: avoid;
          }
          .table-header {
            display: table-header-group;
          }
          .table-row {
            page-break-inside: avoid;
          }
        }
        .invoice-container {
          width: 100%;
          max-width: 210mm;
          margin: 0 auto;
          padding: 10mm;
          font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
          font-size: 10pt;
          color: #1a1a1a;
        }
        .header-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #e5e5e5;
        }
        .logo-container {
          flex-shrink: 0;
        }
        .logo-container img {
          height: 80px;
          max-width: 200px;
          width: auto;
          object-fit: contain;
          display: block;
        }
        .logo-container img[src=""],
        .logo-container img:not([src]) {
          display: none;
        }
        .company-info {
          flex: 1;
          margin-left: 20px;
        }
        .company-name {
          font-size: 18pt;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 4px;
        }
        .company-details {
          font-size: 9pt;
          color: #666;
          line-height: 1.4;
        }
        .invoice-details {
          text-align: right;
          flex-shrink: 0;
        }
        .invoice-title {
          font-size: 32pt;
          font-weight: 300;
          color: #1a1a1a;
          margin-bottom: 12px;
          letter-spacing: 2px;
        }
        .invoice-meta {
          font-size: 9pt;
          color: #666;
          line-height: 1.6;
        }
        .invoice-meta strong {
          color: #1a1a1a;
          font-weight: 600;
        }
        .bill-to-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-bottom: 25px;
          padding: 15px 0;
        }
        .bill-to-title {
          font-size: 8pt;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #999;
          margin-bottom: 8px;
        }
        .bill-to-content {
          font-size: 10pt;
          line-height: 1.5;
        }
        .bill-to-content strong {
          font-weight: 600;
          color: #1a1a1a;
        }
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        .items-table thead {
          background-color: #f8f8f8;
          border-bottom: 2px solid #e5e5e5;
        }
        .items-table th {
          text-align: left;
          padding: 10px 8px;
          font-size: 9pt;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #666;
        }
        .items-table th:last-child,
        .items-table td:last-child {
          text-align: right;
        }
        .items-table td {
          padding: 10px 8px;
          font-size: 10pt;
          border-bottom: 1px solid #f0f0f0;
        }
        .items-table td:first-child {
          word-wrap: break-word;
          word-break: break-word;
          max-width: 300px;
          overflow-wrap: break-word;
        }
        .items-table tbody tr:hover {
          background-color: #fafafa;
        }
        .totals-section {
          margin-top: 20px;
          margin-bottom: 30px;
        }
        .totals-container {
          width: 280px;
          margin-left: auto;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 10pt;
        }
        .total-row.grand-total {
          border-top: 2px solid #1a1a1a;
          margin-top: 8px;
          padding-top: 12px;
          font-size: 14pt;
          font-weight: 600;
        }
        .footer-section {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e5e5;
          font-size: 9pt;
          color: #666;
          line-height: 1.6;
        }
      `}</style>

      <div className="invoice-container">
        {/* Header Section - Always on first page */}
        <div className="header-section no-break">
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            {branding?.logoUrl && (
              <div className="logo-container">
                <img src={branding.logoUrl} alt="Logo" />
              </div>
            )}
            <div className="company-info">
              <div className="company-name">
                {branding?.business_name || 'Company Name'}
              </div>
              <div className="company-details">
                {branding?.address_line1 && <div>{branding.address_line1}</div>}
                {branding?.address_line2 && <div>{branding.address_line2}</div>}
                {(branding?.city || branding?.postcode) && (
                  <div>
                    {[branding.city, branding.postcode].filter(Boolean).join(', ')}
                    {branding?.country && `, ${branding.country}`}
                  </div>
                )}
                {branding?.vat_number && (
                  <div style={{ marginTop: '4px' }}>VAT: {branding.vat_number}</div>
                )}
              </div>
            </div>
          </div>
          <div className="invoice-details">
            <div className="invoice-title">INVOICE</div>
            <div className="invoice-meta">
              <div><strong>Invoice #:</strong> {invoice.invoice_number}</div>
              <div><strong>Date:</strong> {formatDate(invoice.issue_date)}</div>
              {invoice.due_date && (
                <div><strong>Due Date:</strong> {formatDate(invoice.due_date)}</div>
              )}
            </div>
          </div>
        </div>

        {/* Bill To Section - Compact */}
        <div className="bill-to-section no-break">
          <div>
            <div className="bill-to-title">Bill To</div>
            <div className="bill-to-content">
              {invoice.customers?.name ? (
                <>
                  <div><strong>{invoice.customers.name}</strong></div>
                  {invoice.customers.email && <div>{invoice.customers.email}</div>}
                  {invoice.customers.address_line1 && <div>{invoice.customers.address_line1}</div>}
                  {invoice.customers.address_line2 && <div>{invoice.customers.address_line2}</div>}
                  {(invoice.customers.city || invoice.customers.postcode) && (
                    <div>
                      {[invoice.customers.city, invoice.customers.postcode]
                        .filter(Boolean)
                        .join(', ')}
                      {invoice.customers.country && `, ${invoice.customers.country}`}
                    </div>
                  )}
                  {invoice.customers.vat_number && (
                    <div style={{ marginTop: '4px' }}>VAT: {invoice.customers.vat_number}</div>
                  )}
                </>
              ) : (
                <div style={{ color: '#999', fontStyle: 'italic' }}>
                  {invoice.customers ? 'Customer information incomplete' : 'No customer selected'}
                </div>
              )}
            </div>
          </div>
          <div></div>
        </div>

        {/* Line Items Table - Can span multiple pages */}
        <table className="items-table">
          <thead className="table-header">
            <tr>
              <th>Description</th>
              <th style={{ textAlign: 'right', width: '60px' }}>Qty</th>
              <th style={{ textAlign: 'right', width: '90px' }}>Unit Price</th>
              <th style={{ textAlign: 'right', width: '70px' }}>Tax %</th>
              <th style={{ textAlign: 'right', width: '100px' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <tr key={item.id || index} className="table-row">
                  <td>{item.description || ''}</td>
                  <td style={{ textAlign: 'right' }}>{item.quantity || 0}</td>
                  <td style={{ textAlign: 'right' }}>
                    {formatCurrency(Number(item.unit_price || 0), invoice.currency)}
                  </td>
                  <td style={{ textAlign: 'right' }}>{item.tax_rate || 0}%</td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>
                    {formatCurrency(Number(item.line_total || 0), invoice.currency)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                  No items
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Totals Section - Only on last page */}
        <div className="totals-section no-break">
          <div className="totals-container">
            <div className="total-row">
              <span>Subtotal</span>
              <span>{formatCurrency(Number(invoice.subtotal), invoice.currency)}</span>
            </div>
            {invoice.tax_total > 0 && (
              <div className="total-row">
                <span>Tax</span>
                <span>{formatCurrency(Number(invoice.tax_total), invoice.currency)}</span>
              </div>
            )}
            <div className="total-row grand-total">
              <span>Total</span>
              <span>{formatCurrency(Number(invoice.total), invoice.currency)}</span>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        {(invoice.notes || branding?.bank_name || branding?.bank_iban) && (
          <div className="footer-section no-break">
            {invoice.notes && (
              <div style={{ marginBottom: '12px' }}>
                <strong>Notes:</strong> {invoice.notes}
              </div>
            )}
            {(branding?.bank_name || branding?.bank_account_number || branding?.bank_iban) && (
              <div>
                <strong>Payment Details:</strong>
                {branding.bank_name && <div>Bank: {branding.bank_name}</div>}
                {branding.bank_account_number && (
                  <div>Account: {branding.bank_account_number}</div>
                )}
                {branding.bank_sort_code && <div>Sort Code: {branding.bank_sort_code}</div>}
                {branding.bank_iban && <div>IBAN: {branding.bank_iban}</div>}
                {branding.bank_bic && <div>BIC: {branding.bank_bic}</div>}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
```

### Template 2: Professional Classic

```tsx
import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const ProfessionalClassic = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
  return (
    <>
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 10mm;
            @bottom-right {
              content: "Page " counter(page) " of " counter(pages);
              font-size: 9pt;
              color: #666;
            }
          }
          .page-break {
            page-break-before: always;
            break-before: page;
          }
          .no-break {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .table-header {
            display: table-header-group;
          }
          .table-row {
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }
        .invoice-container {
          width: 100%;
          max-width: 210mm;
          margin: 0 auto;
          padding: 10mm;
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 10pt;
          color: #2c2c2c;
        }
        .header-section {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 20px;
          align-items: start;
          margin-bottom: 25px;
          padding-bottom: 20px;
          border-bottom: 3px solid #2c2c2c;
        }
        .logo-container img {
          height: 100px;
          max-width: 200px;
          width: auto;
          object-fit: contain;
          display: block;
        }
        .logo-container img[src=""],
        .logo-container img:not([src]) {
          display: none;
        }
        .company-info {
          padding-left: 15px;
        }
        .company-name {
          font-size: 20pt;
          font-weight: 700;
          color: #2c2c2c;
          margin-bottom: 6px;
          letter-spacing: 0.5px;
        }
        .company-details {
          font-size: 9.5pt;
          color: #555;
          line-height: 1.5;
        }
        .invoice-details-box {
          background-color: #f5f5f5;
          padding: 15px 20px;
          border: 2px solid #2c2c2c;
          text-align: right;
        }
        .invoice-title {
          font-size: 28pt;
          font-weight: 700;
          color: #2c2c2c;
          margin-bottom: 10px;
        }
        .invoice-meta {
          font-size: 10pt;
          line-height: 1.8;
        }
        .invoice-meta strong {
          font-weight: 700;
        }
        .bill-to-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 30px;
          padding: 20px;
          background-color: #fafafa;
          border-left: 4px solid #2c2c2c;
        }
        .section-title {
          font-size: 11pt;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 10px;
          color: #2c2c2c;
        }
        .section-content {
          font-size: 10pt;
          line-height: 1.6;
        }
        .section-content strong {
          font-weight: 700;
          font-size: 11pt;
        }
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 25px;
          border: 1px solid #2c2c2c;
        }
        .items-table thead {
          background-color: #2c2c2c;
          color: #fff;
        }
        .items-table th {
          text-align: left;
          padding: 12px 10px;
          font-size: 10pt;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .items-table th:last-child,
        .items-table td:last-child {
          text-align: right;
        }
        .items-table td {
          padding: 12px 10px;
          font-size: 10pt;
          border-bottom: 1px solid #ddd;
        }
        .items-table td:first-child {
          word-wrap: break-word;
          word-break: break-word;
          max-width: 350px;
          overflow-wrap: break-word;
        }
        .items-table tbody tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .totals-section {
          margin-top: 25px;
          margin-bottom: 30px;
        }
        .totals-container {
          width: 300px;
          margin-left: auto;
          border: 2px solid #2c2c2c;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 15px;
          font-size: 10.5pt;
          border-bottom: 1px solid #ddd;
        }
        .total-row:last-child {
          border-bottom: none;
        }
        .total-row.grand-total {
          background-color: #2c2c2c;
          color: #fff;
          font-size: 14pt;
          font-weight: 700;
        }
        .footer-section {
          margin-top: 30px;
          padding: 20px;
          background-color: #f5f5f5;
          border-top: 2px solid #2c2c2c;
          font-size: 9.5pt;
          line-height: 1.7;
        }
      `}</style>

      <div className="invoice-container">
        {/* Header Section */}
        <div className="header-section no-break">
          {branding?.logoUrl && (
            <div className="logo-container">
              <img 
                src={branding.logoUrl} 
                alt={branding?.business_name || 'Company Logo'}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
          <div className="company-info">
            <div className="company-name">
              {branding?.business_name || 'Company Name'}
            </div>
            <div className="company-details">
              {branding?.address_line1 && <div>{branding.address_line1}</div>}
              {branding?.address_line2 && <div>{branding.address_line2}</div>}
              {(branding?.city || branding?.postcode) && (
                <div>
                  {[branding.city, branding.postcode].filter(Boolean).join(', ')}
                  {branding?.country && `, ${branding.country}`}
                </div>
              )}
              {branding?.vat_number && (
                <div style={{ marginTop: '6px', fontWeight: 600 }}>
                  VAT Number: {branding.vat_number}
                </div>
              )}
            </div>
          </div>
          <div className="invoice-details-box">
            <div className="invoice-title">INVOICE</div>
            <div className="invoice-meta">
              <div><strong>Invoice #:</strong> {invoice.invoice_number}</div>
              <div><strong>Date:</strong> {formatDate(invoice.issue_date)}</div>
              {invoice.due_date && (
                <div><strong>Due Date:</strong> {formatDate(invoice.due_date)}</div>
              )}
            </div>
          </div>
        </div>

        {/* Bill To Section */}
        <div className="bill-to-section no-break">
          <div>
            <div className="section-title">Bill To</div>
            <div className="section-content">
              {invoice.customers?.name ? (
                <>
                  <div><strong>{invoice.customers.name}</strong></div>
                  {invoice.customers.email && <div>{invoice.customers.email}</div>}
                  {invoice.customers.address_line1 && <div>{invoice.customers.address_line1}</div>}
                  {invoice.customers.address_line2 && <div>{invoice.customers.address_line2}</div>}
                  {(invoice.customers.city || invoice.customers.postcode) && (
                    <div>
                      {[invoice.customers.city, invoice.customers.postcode]
                        .filter(Boolean)
                        .join(', ')}
                      {invoice.customers.country && `, ${invoice.customers.country}`}
                    </div>
                  )}
                  {invoice.customers.vat_number && (
                    <div style={{ marginTop: '6px' }}>
                      <strong>VAT:</strong> {invoice.customers.vat_number}
                    </div>
                  )}
                </>
              ) : (
                <div style={{ color: '#999', fontStyle: 'italic' }}>
                  {invoice.customers ? 'Customer information incomplete' : 'No customer selected'}
                </div>
              )}
            </div>
          </div>
          <div></div>
        </div>

        {/* Line Items Table */}
        <table className="items-table">
          <thead className="table-header">
            <tr>
              <th>Description</th>
              <th style={{ textAlign: 'right', width: '60px' }}>Qty</th>
              <th style={{ textAlign: 'right', width: '90px' }}>Unit Price</th>
              <th style={{ textAlign: 'right', width: '70px' }}>Tax %</th>
              <th style={{ textAlign: 'right', width: '100px' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <tr key={item.id || index} className="table-row">
                  <td>{item.description || ''}</td>
                  <td style={{ textAlign: 'right' }}>{item.quantity || 0}</td>
                  <td style={{ textAlign: 'right' }}>
                    {formatCurrency(Number(item.unit_price || 0), invoice.currency)}
                  </td>
                  <td style={{ textAlign: 'right' }}>{item.tax_rate || 0}%</td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>
                    {formatCurrency(Number(item.line_total || 0), invoice.currency)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                  No items
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Totals Section */}
        <div className="totals-section no-break">
          <div className="totals-container">
            <div className="total-row">
              <span>Subtotal</span>
              <span>{formatCurrency(Number(invoice.subtotal), invoice.currency)}</span>
            </div>
            {invoice.tax_total > 0 && (
              <div className="total-row">
                <span>Tax</span>
                <span>{formatCurrency(Number(invoice.tax_total), invoice.currency)}</span>
              </div>
            )}
            <div className="total-row grand-total">
              <span>TOTAL DUE</span>
              <span>{formatCurrency(Number(invoice.total), invoice.currency)}</span>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        {(invoice.notes || branding?.bank_name || branding?.bank_iban) && (
          <div className="footer-section no-break">
            {invoice.notes && (
              <div style={{ marginBottom: '15px' }}>
                <strong>Payment Terms & Notes:</strong>
                <div style={{ marginTop: '5px' }}>{invoice.notes}</div>
              </div>
            )}
            {(branding?.bank_name || branding?.bank_account_number || branding?.bank_iban) && (
              <div>
                <strong>Banking Information:</strong>
                <div style={{ marginTop: '5px' }}>
                  {branding.bank_name && <div>Bank: {branding.bank_name}</div>}
                  {branding.bank_account_number && (
                    <div>Account Number: {branding.bank_account_number}</div>
                  )}
                  {branding.bank_sort_code && <div>Sort Code: {branding.bank_sort_code}</div>}
                  {branding.bank_iban && <div>IBAN: {branding.bank_iban}</div>}
                  {branding.bank_bic && <div>BIC/SWIFT: {branding.bank_bic}</div>}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
```

### Template 3: Bold Contemporary

```tsx
import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const BoldContemporary = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
  return (
    <>
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 10mm;
            @bottom-right {
              content: "Page " counter(page) " of " counter(pages);
              font-size: 9pt;
              color: #666;
            }
          }
          .page-break {
            page-break-before: always;
            break-before: page;
          }
          .no-break {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .table-header {
            display: table-header-group;
          }
          .table-row {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .header-banner {
            background: #667eea !important;
            print-color-adjust: economy;
            -webkit-print-color-adjust: economy;
          }
        }
        .invoice-container {
          width: 100%;
          max-width: 210mm;
          margin: 0 auto;
          padding: 10mm;
          font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
          font-size: 10pt;
          color: #1a1a1a;
        }
        .header-banner {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          padding: 20px 25px;
          margin: -10mm -10mm 25px -10mm;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .logo-container img {
          height: 70px;
          max-width: 180px;
          width: auto;
          object-fit: contain;
          background: #fff;
          padding: 8px;
          border-radius: 4px;
          display: block;
        }
        .logo-container img[src=""],
        .logo-container img:not([src]) {
          display: none;
        }
        .company-info-header {
          color: #fff;
        }
        .company-name-header {
          font-size: 22pt;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .company-details-header {
          font-size: 9pt;
          opacity: 0.95;
          line-height: 1.4;
        }
        .invoice-title-header {
          text-align: right;
        }
        .invoice-title-text {
          font-size: 36pt;
          font-weight: 900;
          letter-spacing: 3px;
          margin-bottom: 8px;
        }
        .invoice-number-header {
          font-size: 14pt;
          font-weight: 600;
          opacity: 0.95;
        }
        .header-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-bottom: 25px;
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 8px;
        }
        .detail-group {
          font-size: 10pt;
        }
        .detail-label {
          font-size: 8pt;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #666;
          margin-bottom: 4px;
          font-weight: 600;
        }
        .detail-value {
          font-size: 11pt;
          font-weight: 600;
          color: #1a1a1a;
        }
        .bill-to-compact {
          margin-bottom: 25px;
          padding: 15px 20px;
          background-color: #fff;
          border-left: 5px solid #667eea;
          border-radius: 4px;
        }
        .bill-to-title {
          font-size: 9pt;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #667eea;
          margin-bottom: 10px;
        }
        .bill-to-content {
          font-size: 10pt;
          line-height: 1.6;
        }
        .bill-to-content strong {
          font-size: 12pt;
          font-weight: 700;
          color: #1a1a1a;
        }
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 25px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .items-table thead {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
        }
        .items-table th {
          text-align: left;
          padding: 14px 12px;
          font-size: 9.5pt;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .items-table th:last-child,
        .items-table td:last-child {
          text-align: right;
        }
        .items-table td {
          padding: 12px;
          font-size: 10pt;
          border-bottom: 1px solid #e9ecef;
        }
        .items-table td:first-child {
          word-wrap: break-word;
          word-break: break-word;
          max-width: 320px;
          overflow-wrap: break-word;
        }
        .items-table tbody tr {
          transition: background-color 0.2s;
        }
        .items-table tbody tr:hover {
          background-color: #f8f9fa;
        }
        .items-table tbody tr:nth-child(even) {
          background-color: #fafbfc;
        }
        .totals-section {
          margin-top: 25px;
          margin-bottom: 30px;
        }
        .totals-container {
          width: 320px;
          margin-left: auto;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 8px;
          padding: 20px;
          color: #fff;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 10.5pt;
          border-bottom: 1px solid rgba(255,255,255,0.2);
        }
        .total-row:last-child {
          border-bottom: none;
        }
        .total-row.grand-total {
          margin-top: 10px;
          padding-top: 15px;
          border-top: 2px solid rgba(255,255,255,0.3);
          font-size: 18pt;
          font-weight: 700;
        }
        .footer-section {
          margin-top: 30px;
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 8px;
          font-size: 9.5pt;
          line-height: 1.7;
          color: #555;
        }
        .footer-section strong {
          color: #667eea;
          font-weight: 700;
        }
      `}</style>

      <div className="invoice-container">
        {/* Header Banner */}
        <div className="header-banner no-break">
          <div className="header-left">
            {branding?.logoUrl && (
              <div className="logo-container">
                <img src={branding.logoUrl} alt="Logo" />
              </div>
            )}
            <div className="company-info-header">
              <div className="company-name-header">
                {branding?.business_name || 'Company Name'}
              </div>
              <div className="company-details-header">
                {branding?.address_line1 && <div>{branding.address_line1}</div>}
                {(branding?.city || branding?.postcode) && (
                  <div>
                    {[branding.city, branding.postcode].filter(Boolean).join(', ')}
                    {branding?.country && `, ${branding.country}`}
                  </div>
                )}
                {branding?.vat_number && <div>VAT: {branding.vat_number}</div>}
              </div>
            </div>
          </div>
          <div className="invoice-title-header">
            <div className="invoice-title-text">INVOICE</div>
            <div className="invoice-number-header">#{invoice.invoice_number}</div>
          </div>
        </div>

        {/* Invoice Details Grid */}
        <div className="header-details no-break">
          <div className="detail-group">
            <div className="detail-label">Issue Date</div>
            <div className="detail-value">{formatDate(invoice.issue_date)}</div>
          </div>
          {invoice.due_date && (
            <div className="detail-group">
              <div className="detail-label">Due Date</div>
              <div className="detail-value">{formatDate(invoice.due_date)}</div>
            </div>
          )}
        </div>

        {/* Bill To Section - Compact */}
        <div className="bill-to-compact no-break">
          <div className="bill-to-title">Bill To</div>
          <div className="bill-to-content">
            {invoice.customers?.name ? (
              <>
                <div><strong>{invoice.customers.name}</strong></div>
                {invoice.customers.email && <div>{invoice.customers.email}</div>}
                {invoice.customers.address_line1 && <div>{invoice.customers.address_line1}</div>}
                {invoice.customers.address_line2 && <div>{invoice.customers.address_line2}</div>}
                {(invoice.customers.city || invoice.customers.postcode) && (
                  <div>
                    {[invoice.customers.city, invoice.customers.postcode]
                      .filter(Boolean)
                      .join(', ')}
                    {invoice.customers.country && `, ${invoice.customers.country}`}
                  </div>
                )}
                {invoice.customers.vat_number && (
                  <div style={{ marginTop: '6px' }}>VAT: {invoice.customers.vat_number}</div>
                )}
              </>
            ) : (
              <div style={{ color: '#999', fontStyle: 'italic' }}>
                {invoice.customers ? 'Customer information incomplete' : 'No customer selected'}
              </div>
            )}
          </div>
        </div>

        {/* Line Items Table */}
        <table className="items-table">
          <thead className="table-header">
            <tr>
              <th>Description</th>
              <th style={{ textAlign: 'right', width: '60px' }}>Qty</th>
              <th style={{ textAlign: 'right', width: '90px' }}>Unit Price</th>
              <th style={{ textAlign: 'right', width: '70px' }}>Tax %</th>
              <th style={{ textAlign: 'right', width: '100px' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <tr key={item.id || index} className="table-row">
                  <td>{item.description || ''}</td>
                  <td style={{ textAlign: 'right' }}>{item.quantity || 0}</td>
                  <td style={{ textAlign: 'right' }}>
                    {formatCurrency(Number(item.unit_price || 0), invoice.currency)}
                  </td>
                  <td style={{ textAlign: 'right' }}>{item.tax_rate || 0}%</td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>
                    {formatCurrency(Number(item.line_total || 0), invoice.currency)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                  No items
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Totals Section */}
        <div className="totals-section no-break">
          <div className="totals-container">
            <div className="total-row">
              <span>Subtotal</span>
              <span>{formatCurrency(Number(invoice.subtotal), invoice.currency)}</span>
            </div>
            {invoice.tax_total > 0 && (
              <div className="total-row">
                <span>Tax</span>
                <span>{formatCurrency(Number(invoice.tax_total), invoice.currency)}</span>
              </div>
            )}
            <div className="total-row grand-total">
              <span>TOTAL DUE</span>
              <span>{formatCurrency(Number(invoice.total), invoice.currency)}</span>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        {(invoice.notes || branding?.bank_name || branding?.bank_iban) && (
          <div className="footer-section no-break">
            {invoice.notes && (
              <div style={{ marginBottom: '15px' }}>
                <strong>Notes:</strong>
                <div style={{ marginTop: '5px' }}>{invoice.notes}</div>
              </div>
            )}
            {(branding?.bank_name || branding?.bank_account_number || branding?.bank_iban) && (
              <div>
                <strong>Payment Information:</strong>
                <div style={{ marginTop: '5px' }}>
                  {branding.bank_name && <div>Bank: {branding.bank_name}</div>}
                  {branding.bank_account_number && (
                    <div>Account: {branding.bank_account_number}</div>
                  )}
                  {branding.bank_sort_code && <div>Sort Code: {branding.bank_sort_code}</div>}
                  {branding.bank_iban && <div>IBAN: {branding.bank_iban}</div>}
                  {branding.bank_bic && <div>BIC: {branding.bank_bic}</div>}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
```

### Key Implementation Notes

1. **Page Break CSS**: All templates use `@page { size: A4; margin: 10mm; }` for proper A4 formatting
2. **Repeating Headers**: The `table-header` class with `display: table-header-group` ensures headers repeat on every page
3. **Section Protection**: `no-break` class with `page-break-inside: avoid` prevents sections from splitting
4. **Row Protection**: `table-row` class with `page-break-inside: avoid` keeps line items together
5. **Space Efficiency**: Compact header designs maximize space for line items
6. **Logo Sizing**: Logos are constrained to 70-100px height to not dominate the page

### Template Registration

After creating the templates, register them in `TemplateAdapter.tsx`:

```tsx
import { ModernMinimal } from './ModernMinimal'
import { ProfessionalClassic } from './ProfessionalClassic'
import { BoldContemporary } from './BoldContemporary'

const templateMap: Record<string, TemplateComponent> = {
  // ... existing templates
  'modern-minimal': ModernMinimal,
  'professional-classic': ProfessionalClassic,
  'bold-contemporary': BoldContemporary,
}
```

---

## Critical Improvements Implemented

All templates include the following improvements based on best practices:

### 1. Modern CSS Page Break Support
```css
.table-row {
  page-break-inside: avoid;  /* Legacy support */
  break-inside: avoid;        /* Modern CSS */
}
```
- Ensures compatibility across all browsers
- Prevents line items from splitting across pages

### 2. Page Numbering
```css
@page {
  @bottom-right {
    content: "Page " counter(page) " of " counter(pages);
  }
}
```
- Automatically adds page numbers to multi-page invoices
- Essential for document navigation

### 3. Logo Handling Improvements
- **Max-width constraints**: Prevents logos from dominating the page
- **Aspect ratio protection**: `object-fit: contain` maintains proportions
- **Error handling**: `onError` handler hides broken images gracefully
- **Empty state handling**: CSS hides images with empty or missing src

### 4. Long Description Handling
```css
.items-table td:first-child {
  word-wrap: break-word;
  word-break: break-word;
  max-width: 300-350px; /* Template-specific */
  overflow-wrap: break-word;
}
```
- Prevents table layout breaking with long descriptions
- Ensures text wraps properly within column constraints

### 5. Print Color Optimization
```css
@media print {
  .header-banner {
    background: #667eea !important;
    print-color-adjust: economy;
    -webkit-print-color-adjust: economy;
  }
}
```
- Reduces ink usage for gradient backgrounds
- Falls back to solid color for better print economy

### 6. Enhanced Empty State Handling
- Checks for `invoice.customers?.name` instead of just `invoice.customers`
- Provides specific messages:
  - "No customer selected" - when customer is null
  - "Customer information incomplete" - when customer exists but name is missing
- Prevents rendering errors with incomplete data

### 7. Additional Best Practices
- All images include proper `alt` attributes for accessibility
- Consistent error handling across all templates
- Print-optimized color schemes
- Responsive font sizing (9-18pt range)
- Proper semantic HTML structure

---

## Questions or Clarifications

If any requirements are unclear, please seek clarification before implementation to ensure consistency across all 3 templates.
