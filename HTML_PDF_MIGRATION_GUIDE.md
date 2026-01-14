# HTML-to-PDF Migration Guide

## 🎉 Great News: We Have Figma Templates!

**We found 10 professional invoice templates from Figma** in `Create Invoice Templates.zip`! These templates are already in React/HTML format with Tailwind CSS, making the migration **much easier**. See `FIGMA_TEMPLATES_ANALYSIS.md` for full details.

## Difficulty Assessment: ⭐⭐ **Medium** (3-5 days)

**With Figma templates**: ⭐ **Easy-Medium** (2-3 days) - Templates are already done!

### Why It's Medium Difficulty (Not Hard)

✅ **Good News:**
- Only **2 main files** need significant changes
- The API route structure stays the same
- Preview modal works without changes
- Template system can stay the same
- Standard HTML/CSS is easier than React PDF API

⚠️ **Challenges:**
- Need to rewrite the PDF component (but with standard HTML/CSS)
- Need to set up Puppeteer
- Need to test all templates
- Performance considerations (caching, optimization)

## Files That Need Changes

### 🔴 Major Changes (2 files)

1. **`lib/pdf/InvoicePdf.tsx`** (827 lines)
   - **Change**: Complete rewrite to HTML template
   - **Difficulty**: Medium (but easier than React PDF)
   - **Time**: 2-3 days
   - **Why easier**: Can use standard HTML/CSS instead of React PDF's limited API

2. **`app/api/org/[orgId]/invoices/[invoiceId]/pdf/route.ts`** (156 lines)
   - **Change**: Replace React PDF rendering with Puppeteer
   - **Difficulty**: Easy
   - **Time**: 2-3 hours
   - **Why easy**: Just swap the rendering function call

### 🟡 Minor Changes (2 files)

3. **`package.json`**
   - **Change**: Remove `@react-pdf/renderer`, add `puppeteer`
   - **Difficulty**: Trivial
   - **Time**: 5 minutes

4. **New file: `lib/pdf/generatePdfFromHtml.ts`**
   - **Change**: Create new Puppeteer service
   - **Difficulty**: Easy
   - **Time**: 1-2 hours

### ✅ No Changes Needed

- `components/invoices/PDFPreviewModal.tsx` - Works as-is (just displays PDF)
- `components/invoices/TemplateSelectionModal.tsx` - No changes
- `components/invoices/WYSIWYGInvoiceEditor.tsx` - No changes
- Database migrations - No changes
- Template configurations - Can stay the same (just different rendering)

## Step-by-Step Migration Plan

### Phase 1: Setup (30 minutes)

#### Step 1.1: Install Dependencies

```bash
npm install puppeteer
npm uninstall @react-pdf/renderer
```

**Note**: For serverless environments (Vercel), you might need:
```bash
npm install puppeteer-core chrome-aws-lambda
```

#### Step 1.2: Create PDF Generation Service

Create `lib/pdf/generatePdfFromHtml.ts`:

```typescript
import puppeteer from 'puppeteer'
import { renderToString } from 'react-dom/server'
import InvoiceHTMLTemplate from './InvoiceHtmlTemplate'

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
```

### Phase 2: Use Figma Templates (1-2 days) ⭐ **EASIER NOW!**

#### Step 2.1: Copy Figma Templates to Project

```bash
# Copy templates from extracted zip
cp -r temp_templates/src/invoices lib/pdf/templates/
```

#### Step 2.2: Convert Templates to Accept Props

Each template needs to accept dynamic data. See `FIGMA_TEMPLATES_ANALYSIS.md` for details.

**Example conversion** (ClassicBlue.tsx):

```tsx
// BEFORE (hardcoded):
export const ClassicBlue = () => {
  return (
    <div>
      <h1>CREATIVE STUDIO</h1>
      <p>INV-2024-001</p>
      {/* hardcoded data */}
    </div>
  )
}

// AFTER (dynamic):
interface InvoiceTemplateProps {
  invoice: any
  items: any[]
  branding: any
  template: any
}

export const ClassicBlue = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
  const formatCurrency = (amount: number, currency: string = 'EUR') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount)
  }

  return (
    <div>
      <h1>{branding?.business_name || 'CREATIVE STUDIO'}</h1>
      <p>#{invoice.invoice_number}</p>
      {/* dynamic data from props */}
    </div>
  )
}
```

#### Step 2.3: Create Template Adapter

Create `lib/pdf/templates/TemplateAdapter.tsx`:

```tsx
import { ClassicBlue } from './ClassicBlue'
import { ModernMinimal } from './ModernMinimal'
import { CorporateElegant } from './CorporateElegant'
import { CreativeBold } from './CreativeBold'
import { SimpleBlackWhite } from './SimpleBlackWhite'
import { GradientModern } from './GradientModern'
import { ProfessionalGray } from './ProfessionalGray'
import { VibrantPurple } from './VibrantPurple'
import { CleanGreen } from './CleanGreen'
import { LuxuryGold } from './LuxuryGold'

export function getTemplateComponent(layout: string) {
  const templateMap: Record<string, React.ComponentType<any>> = {
    'classic-blue': ClassicBlue,
    'modern-minimal': ModernMinimal,
    'corporate-elegant': CorporateElegant,
    'creative-bold': CreativeBold,
    'simple-bw': SimpleBlackWhite,
    'gradient-modern': GradientModern,
    'professional-gray': ProfessionalGray,
    'vibrant-purple': VibrantPurple,
    'clean-green': CleanGreen,
    'luxury-gold': LuxuryGold,
  }
  
  return templateMap[layout] || ClassicBlue
}
```

#### Step 2.4: Create Main HTML Template Wrapper

Create `lib/pdf/InvoiceHtmlTemplate.tsx`:

```tsx
import React from 'react'

interface InvoiceHTMLProps {
  invoice: any
  items: any[]
  branding: any
  template: any
}

export default function InvoiceHTMLTemplate({ 
  invoice, 
  items, 
  branding, 
  template 
}: InvoiceHTMLProps) {
  const config = template?.config_json || {}
  
  const formatCurrency = (amount: number, currency: string = 'EUR') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount)
  }

  // Get template component based on layout
  const layout = config.layout || 'classic-blue'
  const TemplateComponent = getTemplateComponent(layout)
  
  // Include Tailwind CSS (CDN for Puppeteer)
  const tailwindCss = `
    @import url('https://cdn.jsdelivr.net/npm/tailwindcss@3.4.19/dist/tailwind.min.css');
  `
  
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        {/* Include Tailwind CSS via CDN for Puppeteer */}
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.4.19/dist/tailwind.min.css" rel="stylesheet" />
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
          }
        `}</style>
      </head>
      <body>
        <TemplateComponent 
          invoice={invoice}
          items={items}
          branding={branding}
          template={template}
        />
      </body>
    </html>
  )
}
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
            color: ${textColor};
            font-size: ${config.fontSize || '12px'};
            background-color: ${backgroundColor};
            padding: ${config.pagePadding || '30mm'};
            line-height: 1.5;
          }
          
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: ${config.layout === 'minimal' ? '1px' : '2px'} solid ${primaryColor};
            background-color: ${headerBg};
            ${headerBg !== 'transparent' ? `padding: 20px;` : ''}
          }
          
          .header-left {
            display: flex;
            align-items: flex-start;
            gap: 15px;
          }
          
          .logo {
            width: 70px;
            height: 70px;
            object-fit: contain;
          }
          
          .header-right {
            text-align: right;
          }
          
          .invoice-title {
            font-size: ${config.layout === 'modern' ? '32px' : '24px'};
            font-weight: bold;
            color: ${headerBg === '#000000' || headerBg === primaryColor ? '#FFFFFF' : primaryColor};
            margin-bottom: 5px;
          }
          
          .invoice-number {
            font-size: 10px;
            color: ${headerBg === '#000000' || headerBg === primaryColor ? '#FFFFFF' : textColor};
          }
          
          .company-info {
            font-size: 10px;
            text-align: right;
            margin-top: 10px;
          }
          
          .company-name {
            font-weight: bold;
            margin-bottom: 2px;
          }
          
          .info-section {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            margin-bottom: 20px;
          }
          
          .bill-to {
            flex: 1;
            margin-right: 30px;
          }
          
          .bill-to-label {
            font-weight: bold;
            font-size: 11px;
            margin-bottom: 5px;
          }
          
          .customer-name {
            font-weight: bold;
            font-size: 10px;
            margin-bottom: 2px;
          }
          
          .customer-detail {
            font-size: 10px;
            margin-bottom: 1px;
            line-height: 1.4;
          }
          
          .dates {
            width: 140px;
            text-align: right;
          }
          
          .date-row {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 3px;
            font-size: 10px;
          }
          
          .date-label {
            font-weight: bold;
            margin-right: 5px;
          }
          
          .table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          
          .table thead th {
            background-color: ${tableHeaderBg};
            padding: 10px 5px;
            text-align: ${(idx: number) => idx === 0 ? 'left' : 'right'};
            font-weight: bold;
            font-size: 11px;
            border-bottom: ${config.layout === 'minimal' ? '1px' : '2px'} solid ${primaryColor};
            color: ${config.tableHeaderTextColor || textColor};
          }
          
          .table tbody td {
            padding: 8px 5px;
            border-bottom: 1px solid #e5e7eb;
            font-size: 11px;
          }
          
          .table tbody td:first-child {
            text-align: left;
          }
          
          .table tbody td:not(:first-child) {
            text-align: right;
          }
          
          .totals-section {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
          }
          
          .bank-details {
            flex: 1;
            margin-right: 25px;
            font-size: 10px;
          }
          
          .bank-label {
            font-weight: bold;
            margin-bottom: 5px;
          }
          
          .bank-detail {
            margin-bottom: 2px;
            line-height: 1.4;
          }
          
          .totals {
            width: 180px;
            text-align: right;
          }
          
          .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 3px;
            font-size: 11px;
          }
          
          .total-label {
            font-weight: bold;
          }
          
          .total-final {
            border-top: 2px solid ${primaryColor};
            padding-top: 5px;
            margin-top: 5px;
            font-size: 13px;
            font-weight: bold;
          }
          
          .notes {
            margin-top: 20px;
            padding-top: 15px;
            border-top: 1px solid #e5e7eb;
            font-size: 11px;
          }
          
          .notes-label {
            font-weight: bold;
            margin-bottom: 8px;
          }
        `}</style>
      </head>
      <body>
        {/* Header */}
        <div className="header">
          <div className="header-left">
            {branding?.logoUrl && (
              <img src={branding.logoUrl} className="logo" alt="Logo" />
            )}
          </div>
          <div className="header-right">
            <div className="invoice-title">INVOICE</div>
            <div className="invoice-number">#{invoice.invoice_number}</div>
            {branding && (
              <div className="company-info">
                {branding.business_name && (
                  <div className="company-name">{branding.business_name}</div>
                )}
                {branding.address_line1 && (
                  <div>{branding.address_line1}</div>
                )}
                {branding.address_line2 && (
                  <div>{branding.address_line2}</div>
                )}
                {(branding.city || branding.postcode) && (
                  <div>{[branding.city, branding.postcode].filter(Boolean).join(' ')}</div>
                )}
                {branding.country && (
                  <div>{branding.country}</div>
                )}
                {branding.vat_number && (
                  <div style={{ marginTop: '5px' }}>VAT: {branding.vat_number}</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Customer Info and Dates */}
        <div className="info-section">
          <div className="bill-to">
            <div className="bill-to-label">BILL TO:</div>
            {invoice.customers ? (
              <>
                <div className="customer-name">{invoice.customers.name || 'No customer name'}</div>
                {invoice.customers.email && (
                  <div className="customer-detail">{invoice.customers.email}</div>
                )}
                {invoice.customers.address_line1 && (
                  <div className="customer-detail">{invoice.customers.address_line1}</div>
                )}
                {invoice.customers.address_line2 && (
                  <div className="customer-detail">{invoice.customers.address_line2}</div>
                )}
                {(invoice.customers.city || invoice.customers.postcode) && (
                  <div className="customer-detail">
                    {[invoice.customers.city, invoice.customers.postcode].filter(Boolean).join(' ')}
                  </div>
                )}
                {invoice.customers.country && (
                  <div className="customer-detail">{invoice.customers.country}</div>
                )}
                {invoice.customers.vat_number && (
                  <div className="customer-detail" style={{ marginTop: '3px' }}>
                    VAT: {invoice.customers.vat_number}
                  </div>
                )}
              </>
            ) : (
              <div className="customer-detail" style={{ fontStyle: 'italic', color: '#666' }}>
                No customer selected
              </div>
            )}
          </div>
          
          <div className="dates">
            <div className="date-row">
              <span className="date-label">Issue:</span>
              <span>{formatDate(invoice.issue_date)}</span>
            </div>
            {invoice.due_date && (
              <div className="date-row">
                <span className="date-label">Due:</span>
                <span>{formatDate(invoice.due_date)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Items Table */}
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Tax %</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((item: any, index: number) => (
                <tr key={index}>
                  <td>{item.description || ''}</td>
                  <td>{item.quantity || '0'}</td>
                  <td>{formatCurrency(Number(item.unit_price || 0), invoice.currency)}</td>
                  <td>{item.tax_rate || 0}%</td>
                  <td>{formatCurrency(Number(item.line_total || 0), invoice.currency)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ fontStyle: 'italic', color: '#666' }}>
                  No items
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Totals and Bank Details */}
        <div className="totals-section">
          <div className="bank-details">
            {branding && (branding.bank_name || branding.bank_account_number || branding.bank_iban) && (
              <>
                <div className="bank-label">PAYMENT DETAILS:</div>
                {branding.bank_name && (
                  <div className="bank-detail">Bank: {branding.bank_name}</div>
                )}
                {branding.bank_account_number && (
                  <div className="bank-detail">Account: {branding.bank_account_number}</div>
                )}
                {branding.bank_sort_code && (
                  <div className="bank-detail">Sort: {branding.bank_sort_code}</div>
                )}
                {branding.bank_iban && (
                  <div className="bank-detail">IBAN: {branding.bank_iban}</div>
                )}
                {branding.bank_bic && (
                  <div className="bank-detail">BIC: {branding.bank_bic}</div>
                )}
              </>
            )}
          </div>
          
          <div className="totals">
            <div className="total-row">
              <span className="total-label">Subtotal:</span>
              <span>{formatCurrency(Number(invoice.subtotal), invoice.currency)}</span>
            </div>
            {config.showTaxBreakdown !== false && (
              <div className="total-row">
                <span className="total-label">Tax:</span>
                <span>{formatCurrency(Number(invoice.tax_total), invoice.currency)}</span>
              </div>
            )}
            <div className="total-row total-final">
              <span className="total-label">Total:</span>
              <span>{formatCurrency(Number(invoice.total), invoice.currency)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div className="notes">
            <div className="notes-label">Notes:</div>
            <div>{invoice.notes}</div>
          </div>
        )}
      </body>
    </html>
  )
}
```

**Note**: This is a basic template. You'll need to:
- Add template-specific styling based on `config.layout`
- Handle all 7 template variations
- Match the original PDF designs
- Add responsive styling for different layouts

### Phase 3: Update API Route (2-3 hours)

#### Step 3.1: Update PDF Route

Update `app/api/org/[orgId]/invoices/[invoiceId]/pdf/route.ts`:

```typescript
// Remove this import:
// import { renderToStream } from '@react-pdf/renderer'
// import InvoicePDF from '@/lib/pdf/InvoicePdf'

// Add this import:
import { generatePdfFromHtml } from '@/lib/pdf/generatePdfFromHtml'

// Replace the PDF generation section (lines 123-137):
// OLD:
// const pdfStream = await renderToStream(
//   InvoicePDF({
//     invoice,
//     items: invoiceItems,
//     branding: branding ? { ...branding, logoUrl } : null,
//     template: template || null,
//   })
// )
// const chunks: Buffer[] = []
// for await (const chunk of pdfStream) {
//   chunks.push(Buffer.from(chunk))
// }
// const pdfBuffer = Buffer.concat(chunks)

// NEW:
const pdfBuffer = await generatePdfFromHtml(
  invoice,
  invoiceItems,
  branding ? { ...branding, logoUrl } : null,
  template || null
)
```

That's it! The rest of the route stays the same.

### Phase 4: Template Styling (1-2 days)

#### Step 4.1: Add Template-Specific Styles

You'll need to add conditional styling based on `config.layout`:

```tsx
// In InvoiceHtmlTemplate.tsx, update the <style> tag:
const getTemplateStyles = (layout: string, config: any) => {
  const baseStyles = { /* base styles */ }
  
  switch (layout) {
    case 'minimal':
      return {
        ...baseStyles,
        header: { borderBottom: '1px solid #e5e7eb', /* minimal styles */ },
        // ... more minimal-specific styles
      }
    case 'modern':
      return {
        ...baseStyles,
        header: { backgroundColor: '#ECFDF5', borderBottom: '3px solid #059669' },
        // ... more modern-specific styles
      }
    // ... other templates
  }
}
```

#### Step 4.2: Match Original PDF Designs

For each template:
1. Open `invtemplates.pdf`
2. Take screenshot of the template
3. Extract colors, fonts, spacing
4. Recreate in HTML/CSS
5. Test PDF output

### Phase 5: Testing & Optimization (1 day)

#### Step 5.1: Test All Templates

- [ ] Test each of the 7 templates
- [ ] Verify all data displays correctly
- [ ] Check logo rendering
- [ ] Test with/without customer data
- [ ] Test with/without bank details
- [ ] Verify totals calculations

#### Step 5.2: Performance Optimization

Add caching for browser instances:

```typescript
// lib/pdf/generatePdfFromHtml.ts
let browserInstance: any = null

export async function generatePdfFromHtml(...) {
  // Reuse browser instance if available
  if (!browserInstance) {
    browserInstance = await puppeteer.launch({ /* ... */ })
  }
  
  // Use browserInstance instead of launching new browser
  const page = await browserInstance.newPage()
  // ... rest of code
}
```

#### Step 5.3: Error Handling

Add proper error handling:

```typescript
try {
  const pdfBuffer = await generatePdfFromHtml(...)
  return new NextResponse(pdfBuffer, { /* ... */ })
} catch (error) {
  console.error('PDF generation error:', error)
  return NextResponse.json(
    { error: 'Failed to generate PDF', details: error.message },
    { status: 500 }
  )
}
```

## Estimated Timeline

| Phase | Task | Time | Difficulty |
|-------|------|------|------------|
| 1 | Setup & Dependencies | 30 min | ⭐ Easy |
| 2 | Use Figma Templates | 1-2 days | ⭐ Easy-Medium |
| 3 | Update API Route | 2-3 hours | ⭐ Easy |
| 4 | Template Adaptation | 1 day | ⭐ Easy |
| 5 | Testing & Optimization | 1 day | ⭐⭐ Medium |
| **Total** | | **3-4 days** | **⭐ Easy-Medium** |

**Note**: With Figma templates, this is **much easier** than creating templates from scratch!

## Potential Issues & Solutions

### Issue 1: Puppeteer in Serverless (Vercel)

**Problem**: Puppeteer is large and may not work in serverless environments.

**Solution**: Use `puppeteer-core` with `chrome-aws-lambda`:

```typescript
import puppeteer from 'puppeteer-core'
import chromium from 'chrome-aws-lambda'

const browser = await puppeteer.launch({
  args: chromium.args,
  defaultViewport: chromium.defaultViewport,
  executablePath: await chromium.executablePath,
  headless: chromium.headless,
})
```

### Issue 2: Performance

**Problem**: PDF generation is slower (500-1000ms vs 100-200ms).

**Solution**:
- Cache browser instances
- Add request queuing
- Consider background job processing for heavy usage

### Issue 3: Memory Usage

**Problem**: Puppeteer uses more memory (~200-300MB).

**Solution**:
- Close pages after use
- Reuse browser instances
- Monitor memory usage
- Consider separate PDF service if needed

### Issue 4: Font Loading

**Problem**: Custom fonts may not load in Puppeteer.

**Solution**:
- Use web-safe fonts or
- Embed fonts as base64 in CSS
- Use `@font-face` with local paths

## Rollback Plan

If you need to rollback:

1. **Keep old code**: Don't delete `InvoicePdf.tsx` immediately
2. **Feature flag**: Add a flag to switch between implementations
3. **Git branch**: Do migration in a separate branch
4. **Test thoroughly**: Test before merging

## Success Criteria

✅ **Migration is successful when:**
- [ ] All 7 templates render correctly
- [ ] PDFs match original designs (or are close)
- [ ] All invoice data displays correctly
- [ ] Logo displays correctly
- [ ] Performance is acceptable (< 2 seconds)
- [ ] No errors in production
- [ ] Preview modal works
- [ ] Download works

## Next Steps

1. **Start with Phase 1** - Install dependencies and create service
2. **Create one template** - Test with one template first
3. **Iterate** - Add more templates one by one
4. **Test thoroughly** - Test each template before moving on
5. **Deploy** - Deploy to staging first, then production

---

**Difficulty**: ⭐⭐ **Medium** (4-6 days)  
**Risk**: 🟡 **Low-Medium** (can rollback easily)  
**Benefit**: ✅ **High** (much better design matching)

**Recommendation**: Proceed with migration. The benefits (better design matching, easier development) outweigh the moderate effort required.
