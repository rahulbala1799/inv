# PDF Invoice Data Loading, Page Size, and Page Break Handling

This document explains how invoice data is loaded into PDF templates, how page size is generated, and how page breaks are handled.

---

## 1. Invoice Data Loading into Templates

### API Route: `/app/api/org/[orgId]/invoices/[invoiceId]/pdf/route.ts`

The PDF generation process starts in the API route which fetches all necessary data and passes it to the template.

#### Data Fetching Process

```typescript
// 1. Fetch invoice with customer relationship
const { data: invoice, error: invoiceError } = await supabase
  .from('invoices')
  .select(`
    *,
    customers (*)
  `)
  .eq('id', invoiceId)
  .eq('org_id', orgId)
  .single()

// 2. Fetch invoice items (ordered by sort_order)
const { data: items } = await supabase
  .from('invoice_items')
  .select('*')
  .eq('invoice_id', invoiceId)
  .eq('org_id', orgId)
  .order('sort_order')

// 3. Fetch organization branding
const { data: branding } = await supabase
  .from('org_branding')
  .select('*')
  .eq('org_id', orgId)
  .single()

// 4. Fetch template (from query param, invoice.template_id, or default)
const { searchParams } = new URL(request.url)
const templateIdFromQuery = searchParams.get('template')
const templateId = templateIdFromQuery || invoice.template_id

let template = null
if (templateId) {
  const { data: templateData } = await supabase
    .from('invoice_templates')
    .select('*')
    .eq('id', templateId)
    .single()
  template = templateData
} else {
  // Try org-specific default, then global default
  let { data: defaultTemplate } = await supabase
    .from('invoice_templates')
    .select('*')
    .eq('org_id', orgId)
    .eq('is_default', true)
    .maybeSingle()

  if (!defaultTemplate) {
    const { data: globalTemplate } = await supabase
      .from('invoice_templates')
      .select('*')
      .is('org_id', null)
      .eq('is_default', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    defaultTemplate = globalTemplate
  }
  template = defaultTemplate
}

// 5. Get logo URL from storage
let logoUrl: string | null = null
if (branding?.logo_storage_path) {
  const { data: { publicUrl } } = supabase.storage
    .from('logos')
    .getPublicUrl(branding.logo_storage_path)
  logoUrl = publicUrl
}
```

#### Data Passed to Template

```typescript
// Ensure items is an array
const invoiceItems = items && Array.isArray(items) ? items : []

// Dynamically import React and rendering utilities
const React = (await import('react')).default
const { renderToStaticMarkup } = await import('react-dom/server')
const InvoiceHTMLTemplate = (await import('@/lib/pdf/InvoiceHtmlTemplate')).default

// Render React component to HTML string
const htmlString = '<!DOCTYPE html>' + renderToStaticMarkup(
  React.createElement(InvoiceHTMLTemplate, {
    invoice,              // Invoice data with customer relationship
    items: invoiceItems,  // Array of invoice items
    branding: branding ? { ...branding, logoUrl } : null,  // Branding with logo URL
    template: template || null,  // Template configuration
  })
)
```

#### Data Structure Passed to Template

```typescript
interface InvoiceTemplateProps {
  invoice: {
    id: string
    invoice_number: string
    issue_date: string
    due_date: string | null
    currency: string
    subtotal: number
    tax_total: number
    total: number
    notes: string | null
    customers?: {
      name: string
      email?: string | null
      address_line1?: string | null
      address_line2?: string | null
      city?: string | null
      postcode?: string | null
      country?: string | null
      vat_number?: string | null
    } | null
  }
  items: Array<{
    id?: string
    description: string
    quantity: number
    unit_price: number
    tax_rate: number
    line_total: number
  }>
  branding: {
    business_name?: string | null
    address_line1?: string | null
    address_line2?: string | null
    city?: string | null
    postcode?: string | null
    country?: string | null
    vat_number?: string | null
    email?: string | null
    phone?: string | null
    website?: string | null
    logoUrl?: string | null
    bank_name?: string | null
    bank_account_number?: string | null
    bank_sort_code?: string | null
    bank_iban?: string | null
    bank_bic?: string | null
  } | null
  template: {
    id: string
    name: string
    config_json: any  // Template configuration (layout, colors, etc.)
  } | null
}
```

---

## 2. Page Size Generation

### File: `/lib/pdf/generatePdfFromHtml.ts`

Page size is configured in the Puppeteer PDF generation function using the `page.pdf()` method.

#### Page Size Configuration

```typescript
// Generate PDF with proper A4 sizing, full page usage, and repeating headers/footers
const pdfBuffer = await page.pdf({
  format: 'A4',                    // Page format: A4 (210mm × 297mm)
  printBackground: true,            // Include background colors/images
  margin: {
    top: '15mm',                    // Top margin: 15mm
    right: '15mm',                  // Right margin: 15mm
    bottom: '15mm',                 // Bottom margin: 15mm
    left: '15mm'                    // Left margin: 15mm
  },
  displayHeaderFooter: true,        // Enable header/footer on each page
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
```

#### CSS Page Size Configuration

In addition to Puppeteer's page size, the HTML template also defines page size in CSS:

```css
@page {
  size: A4;
  margin: 0;
}
```

This ensures the HTML content is sized correctly before PDF conversion.

#### Available Page Formats

Puppeteer supports the following page formats:
- `'A4'` - 210mm × 297mm (default)
- `'Letter'` - 8.5in × 11in
- `'Legal'` - 8.5in × 14in
- `'Tabloid'` - 11in × 17in
- `'Ledger'` - 17in × 11in
- `'A0'` through `'A10'`
- Custom dimensions: `{ width: '10in', height: '12in' }`

#### Page Content Area Calculation

With A4 format and 15mm margins:
- **Page width**: 210mm
- **Page height**: 297mm
- **Content width**: 210mm - (15mm × 2) = **180mm**
- **Content height**: 297mm - (15mm × 2) = **267mm** (minus header/footer space)

---

## 3. Page Break Handling

### File: `/lib/pdf/InvoiceHtmlTemplate.tsx`

Page breaks are handled through CSS rules defined in the template's `<style>` tag. These rules control how content flows across multiple pages.

#### CSS Page Break Rules

```css
/* Page break rules - ensure content uses full pages */
table {
  page-break-inside: avoid;    /* Try to keep tables on one page */
  width: 100%;
  border-collapse: collapse;
}

thead {
  display: table-header-group;  /* Repeat header on each page */
}

tfoot {
  display: table-footer-group;  /* Repeat footer on each page */
}

/* Prevent breaking table rows across pages */
tr {
  page-break-inside: avoid;    /* Keep rows together */
  page-break-after: auto;      /* Allow page break after row if needed */
}

/* Prevent breaking cells across pages */
td, th {
  page-break-inside: avoid;    /* Keep cells intact */
}

/* Allow table to break if it's too long, but keep rows together */
tbody {
  page-break-inside: auto;     /* Allow table body to break across pages */
}

/* Keep header row with first data row */
thead + tbody tr:first-child {
  page-break-before: avoid;    /* Don't break between header and first row */
}

/* Prevent breaking sections awkwardly */
div {
  orphans: 3;                  /* Minimum 3 lines at bottom of page */
  widows: 3;                    /* Minimum 3 lines at top of page */
}

/* Prevent breaking paragraphs in the middle */
p {
  page-break-inside: avoid;    /* Keep paragraphs together */
  orphans: 2;                   /* Minimum 2 lines at bottom */
  widows: 2;                    /* Minimum 2 lines at top */
}

/* Force page breaks for major sections if needed */
.page-break-before {
  page-break-before: always;   /* Always start on new page */
}

.page-break-after {
  page-break-after: always;    /* Always end with page break */
}

.no-page-break {
  page-break-inside: avoid;    /* Never break this element */
}
```

#### Page Break Properties Explained

| Property | Value | Effect |
|----------|-------|--------|
| `page-break-inside: avoid` | Prevents breaking inside element | Keeps element on one page if possible |
| `page-break-before: avoid` | Prevents break before element | Keeps element with previous content |
| `page-break-after: avoid` | Prevents break after element | Keeps element with next content |
| `page-break-before: always` | Forces break before element | Always starts on new page |
| `page-break-after: always` | Forces break after element | Always ends with page break |
| `orphans: N` | Minimum lines at bottom | Prevents orphaned lines at page bottom |
| `widows: N` | Minimum lines at top | Prevents widowed lines at page top |

#### Layout Considerations

```css
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

/* Remove max-width constraints and shadows for PDF */
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
```

#### Word Breaking Rules

```css
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
```

---

## Complete Flow Summary

1. **Data Loading** (`route.ts`):
   - Fetches invoice, items, branding, and template from database
   - Gets logo URL from storage
   - Passes all data to `InvoiceHTMLTemplate` component

2. **Template Rendering** (`InvoiceHtmlTemplate.tsx`):
   - Wraps template with HTML structure
   - Applies CSS for page size (`@page { size: A4 }`)
   - Applies CSS for page break rules
   - Renders template component with data

3. **PDF Generation** (`generatePdfFromHtml.ts`):
   - Converts HTML to PDF using Puppeteer
   - Sets page format to A4 with 15mm margins
   - Adds header/footer to each page
   - Returns PDF buffer

4. **Page Break Handling**:
   - CSS rules control how content breaks across pages
   - Tables try to stay together but can break if too long
   - Rows and cells stay together
   - Headers repeat on each page
   - Orphans and widows are prevented

---

## Key Files

- **Data Loading**: `/app/api/org/[orgId]/invoices/[invoiceId]/pdf/route.ts`
- **Page Size**: `/lib/pdf/generatePdfFromHtml.ts` (lines 195-217)
- **Page Breaks**: `/lib/pdf/InvoiceHtmlTemplate.tsx` (lines 33-176)
- **Template Component**: `/lib/pdf/templates/TemplateAdapter.tsx`

---

## Notes

- Page size is fixed at A4 (210mm × 297mm) with 15mm margins
- Headers and footers are automatically repeated on each page
- Page breaks are handled automatically by CSS, but can be controlled with utility classes
- Long tables will break across pages, but rows stay together
- The system uses HTML-to-PDF conversion via Puppeteer, not React PDF renderer
