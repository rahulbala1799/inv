# Invoice Flow Issues and Fixes

## Executive Summary

This document traces the complete invoice flow from creation to PDF download and identifies critical issues preventing correct PDF generation. The system has **7 templates configured** but several bugs prevent them from rendering correctly.

---

## Complete Invoice Flow

```
1. Invoice Creation
   ↓
2. WYSIWYG Editor (Data Entry)
   ↓
3. Template Selection Modal
   ↓
4. PDF Preview Modal
   ↓
5. PDF Generation API
   ↓
6. InvoicePDF Component (React PDF)
   ↓
7. Downloaded/Previewed PDF
```

---

## Issue #1: Logo Display Logic Error ⚠️ CRITICAL

**Location**: `lib/pdf/InvoicePdf.tsx` (line 437)

**Problem**: 
```typescript
const hasLogo = logoUrl && branding?.logoUrl  // ❌ WRONG
```

The code checks BOTH `logoUrl` (local variable) AND `branding?.logoUrl` (which doesn't exist on the branding object passed from the API). This means logos will NEVER display.

**Root Cause**: 
- API route sets: `branding: branding ? { ...branding, logoUrl } : null`
- But PDF component extracts: `const logoUrl = branding?.logoUrl || null`
- Then checks: `const hasLogo = logoUrl && branding?.logoUrl`

This double-check means even when logoUrl is correctly extracted, the condition `branding?.logoUrl` will be undefined (since we already extracted it), causing hasLogo to always be false.

**Fix**:
```typescript
// Line 352 - Keep as is
const logoUrl = branding?.logoUrl || null

// Line 437 - Change to:
const hasLogo = logoUrl !== null  // ✅ CORRECT
```

**Files to Update**:
- `lib/pdf/InvoicePdf.tsx` (line 437)

---

## Issue #2: Template Column Configuration Mismatch

**Location**: `lib/pdf/InvoicePdf.tsx` (lines 296-318)

**Problem**: Template configurations use uppercase labels like `'DESCRIPTION'`, `'QTY'`, `'PRICE'`, `'TAX %'`, but the mapping might not handle all variations correctly.

**Current Mapping**:
```typescript
const columnMap: any = {
  'DESCRIPTION': 'description',
  'QTY': 'quantity',
  'QUANTITY': 'quantity',
  'PRICE': 'unit_price',
  'UNIT PRICE': 'unit_price',
  'RATE': 'unit_price',
  'HOURS': 'quantity',
  'TAX %': 'tax_rate',
  'TAX': 'tax_rate',
  'TOTAL': 'line_total',
  'AMOUNT': 'line_total',
}
```

**Issue**: Some templates (from migration 014) use columns like `["DESCRIPTION", "QTY", "PRICE", "TOTAL"]` without TAX column, but the rendering logic might not handle this gracefully.

**Fix**: Add validation to ensure column rendering handles missing columns:

```typescript
function getTableColumns(config: any) {
  const columns = config.tableColumns || ['DESCRIPTION', 'QTY', 'PRICE', 'TAX %', 'TOTAL']
  
  const columnMap: any = {
    'DESCRIPTION': 'description',
    'QTY': 'quantity',
    'QUANTITY': 'quantity',
    'PRICE': 'unit_price',
    'UNIT PRICE': 'unit_price',
    'RATE': 'unit_price',
    'HOURS': 'quantity',
    'TAX %': 'tax_rate',
    'TAX': 'tax_rate',
    'TOTAL': 'line_total',
    'AMOUNT': 'line_total',
  }
  
  return columns.map((col: string) => ({
    label: col,
    field: columnMap[col.toUpperCase()] || col.toLowerCase(),
  })).filter((col: any) => col.field) // Filter out invalid columns
}
```

**Files to Update**:
- `lib/pdf/InvoicePdf.tsx` (lines 296-318)

---

## Issue #3: Template Not Defaulting Properly

**Location**: `app/api/org/[orgId]/invoices/[invoiceId]/pdf/route.ts` (lines 54-84)

**Problem**: The template selection logic has fallback to default template, but it queries with:
```typescript
.or(`org_id.is.null,org_id.eq.${orgId}`)
.eq('is_default', true)
```

This might return multiple templates if both global and org-specific defaults exist.

**Fix**: Prioritize org-specific templates:
```typescript
// First try org-specific default
let { data: template } = await supabase
  .from('invoice_templates')
  .select('*')
  .eq('org_id', orgId)
  .eq('is_default', true)
  .single()

// If no org-specific default, use global default
if (!template) {
  const { data: globalTemplate } = await supabase
    .from('invoice_templates')
    .select('*')
    .is('org_id', null)
    .eq('is_default', true)
    .single()
  template = globalTemplate
}
```

**Files to Update**:
- `app/api/org/[orgId]/invoices/[invoiceId]/pdf/route.ts` (lines 75-84)

---

## Issue #4: Template Migration Not Applied

**Location**: `supabase/migrations/014_add_seven_invoice_templates.sql`

**Problem**: The migration file exists but might not have been applied to the database.

**How to Verify**:
```sql
-- Check if templates exist
SELECT id, name, config_json->>'layout' as layout 
FROM invoice_templates 
WHERE org_id IS NULL;
```

Expected result: 10 templates (3 from migration 004 + 7 from migration 014)
- Classic (from 004, is_default=true)
- Modern (from 004)
- Minimal (from 004)
- Classic with Orange Accent (from 014, is_default=true)
- Minimalist Architect (from 014)
- Elegant Signature (from 014)
- Modern Green (from 014)
- Bold Blue (from 014)
- Clean Minimal (from 014)
- Professional Classic (from 014)

**Issue**: Migration 014 sets `is_default=true` on "Classic with Orange Accent", but migration 004 also set `is_default=true` on "Classic". This creates conflicting defaults.

**Fix**: Update migration 014 to first unset other defaults:
```sql
-- Unset existing defaults before adding new templates
UPDATE invoice_templates 
SET is_default = false 
WHERE org_id IS NULL AND is_default = true;

-- Then add the new templates...
```

**Files to Update**:
- `supabase/migrations/014_add_seven_invoice_templates.sql`

---

## Issue #5: Missing Template Selection Persistence

**Location**: `app/api/org/[orgId]/invoices/[invoiceId]/route.ts`

**Problem**: When updating an invoice, the template_id gets saved (line 38), but the return data doesn't include the updated invoice for the frontend to confirm.

**Current Code** (line 76):
```typescript
return NextResponse.json({ success: true })
```

**Fix**: Return the updated invoice:
```typescript
// Fetch updated invoice to return
const { data: updatedInvoice } = await supabase
  .from('invoices')
  .select('*')
  .eq('id', invoiceId)
  .eq('org_id', orgId)
  .single()

return NextResponse.json({ 
  success: true, 
  invoice: updatedInvoice 
})
```

**Files to Update**:
- `app/api/org/[orgId]/invoices/[invoiceId]/route.ts` (lines 75-76)

---

## Issue #6: PDF Preview vs Download Detection

**Location**: `app/api/org/[orgId]/invoices/[invoiceId]/pdf/route.ts` (lines 113-122)

**Problem**: The detection of preview vs download is based on referer header:
```typescript
const isPreview = referer.includes('/app/org/') || request.headers.get('sec-fetch-dest') === 'iframe'
```

This might not work reliably across all browsers or when opening in new tab.

**Better Fix**: Use explicit query parameter:
```typescript
const { searchParams } = new URL(request.url)
const isDownload = searchParams.get('download') === 'true'

return new NextResponse(pdfBuffer, {
  headers: {
    'Content-Type': 'application/pdf',
    'Content-Disposition': isDownload 
      ? `attachment; filename="invoice-${invoice.invoice_number}.pdf"`
      : `inline; filename="invoice-${invoice.invoice_number}.pdf"`,
    'X-Content-Type-Options': 'nosniff',
  },
})
```

**Update Download Button**:
```typescript
// In PDFPreviewModal.tsx line 65
const handleDownload = () => {
  const pdfUrl = `/api/org/${orgId}/invoices/${invoiceId}/pdf?download=true${currentTemplateId ? `&template=${currentTemplateId}` : ''}`
  window.open(pdfUrl, '_blank')
}
```

**Files to Update**:
- `app/api/org/[orgId]/invoices/[invoiceId]/pdf/route.ts` (lines 113-122)
- `components/invoices/PDFPreviewModal.tsx` (line 65)

---

## Issue #7: Template Styles Not Applied Correctly

**Location**: `lib/pdf/InvoicePdf.tsx` (lines 18-293)

**Problem**: The `getTemplateStyles` function returns objects with React PDF style properties, but some templates use properties that might not be supported or are incorrectly formatted.

**Issues Found**:

1. **Border syntax**: Lines use strings like `'1pt solid #e5e7eb'` but React PDF requires:
   ```typescript
   border: '1pt solid #e5e7eb'  // ❌ Not fully supported
   borderWidth: 1,
   borderColor: '#e5e7eb',
   borderStyle: 'solid'  // ✅ Correct format
   ```

2. **fontWeight**: Using `'thin'`, `'normal'`, `'bold'` (lines 52, 58, 64) but React PDF might not support all weights.

3. **letterSpacing**: Used in minimal template (lines 54, 60) but might not work in all React PDF versions.

**Fix**: Ensure all styles use React PDF-compatible format:

```typescript
// Instead of:
borderBottom: '1pt solid #e5e7eb'

// Use:
borderBottomWidth: 1,
borderBottomColor: '#e5e7eb',
borderBottomStyle: 'solid'
```

**Files to Update**:
- `lib/pdf/InvoicePdf.tsx` (throughout the template styles)

---

## Issue #8: Logo URL Generation

**Location**: Multiple files

**Problem**: Logo URLs are generated from storage path, but the flow is inconsistent:
- In `WYSIWYGInvoiceEditor.tsx` (lines 176-186): Generates logoUrl for preview
- In `app/api/org/[orgId]/invoices/[invoiceId]/pdf/route.ts` (lines 86-93): Generates logoUrl for PDF
- Both use the same method but one is client-side, one is server-side

**Potential Issue**: Storage policies might not allow public access to logos, or CORS issues.

**Verify Storage Policy**:
```sql
-- Check logos bucket policy
SELECT * FROM storage.policies WHERE bucket_id = 'logos';
```

**Expected Policies**:
- Public read access for authenticated users
- Insert/update for organization members only

**Fix**: Ensure storage bucket is properly configured (migration 011 and 012 should handle this).

**Files to Review**:
- `supabase/migrations/011_logos_storage_policies.sql`
- `supabase/migrations/012_fix_logos_storage_policies.sql`

---

## Issue #9: Bank Details Not Showing Conditionally

**Location**: `lib/pdf/InvoicePdf.tsx` (lines 644-682)

**Problem**: Bank details section has two different layouts (two-column and single-column) controlled by `config.footerLayout`, but the condition checking might not work properly.

**Current Logic**:
```typescript
{config.footerLayout === 'two-column' && branding && ( ... )}
{config.footerLayout !== 'two-column' && config.showBankDetails !== false && branding && ( ... )}
```

**Issue**: The second condition checks `config.showBankDetails !== false`, which means if `showBankDetails` is undefined, it will show. This is probably intentional, but might cause unexpected behavior.

**Fix**: Be explicit:
```typescript
{config.footerLayout !== 'two-column' && 
 config.showBankDetails === true && 
 branding && 
 (branding.bank_name || branding.bank_account_number || branding.bank_iban) && ( ... )}
```

**Files to Update**:
- `lib/pdf/InvoicePdf.tsx` (line 669)

---

## Issue #10: Missing Error Handling in Template Selection

**Location**: `components/invoices/WYSIWYGInvoiceEditor.tsx` (lines 505-533)

**Problem**: When template selection fails, there's no user feedback:
```typescript
} catch (error) {
  console.error('Error updating template:', error)
}
```

**Fix**: Add error state and user notification:
```typescript
const [templateError, setTemplateError] = useState<string | null>(null)

// In handleTemplateSelected:
try {
  setTemplateError(null)
  const response = await fetch(...)
  if (!response.ok) {
    throw new Error('Failed to save template selection')
  }
  // ... success logic
} catch (error) {
  console.error('Error updating template:', error)
  setTemplateError('Failed to update template. Please try again.')
}

// Add error display in UI
{templateError && (
  <div className="text-red-600 text-sm">{templateError}</div>
)}
```

**Files to Update**:
- `components/invoices/WYSIWYGInvoiceEditor.tsx` (lines 505-533)

---

## Priority Fixes (Do These First!)

### 🔴 CRITICAL - Must Fix

1. **Issue #1: Logo Display Logic** - Logos won't show at all
2. **Issue #4: Template Migration** - Ensures templates are in database
3. **Issue #7: Template Styles** - PDF won't render correctly

### 🟡 HIGH PRIORITY - Should Fix Soon

4. **Issue #3: Template Default Selection** - Might select wrong template
5. **Issue #5: Template Persistence** - Frontend won't reflect changes
6. **Issue #6: PDF Download Detection** - Download might not work

### 🟢 MEDIUM PRIORITY - Fix When Possible

7. **Issue #2: Column Configuration** - Some templates might have layout issues
8. **Issue #8: Logo URL Generation** - Might have CORS/policy issues
9. **Issue #9: Bank Details Display** - Conditional logic might be unclear
10. **Issue #10: Error Handling** - No user feedback on errors

---

## How to Apply All Fixes

### Step 1: Database Migrations

```bash
# Check which migrations have been applied
cd supabase
npx supabase db pull

# If migration 014 hasn't been applied, apply it
# But first, fix the duplicate default issue
```

Update `supabase/migrations/014_add_seven_invoice_templates.sql`:
```sql
-- Add at the top, before the first INSERT
UPDATE invoice_templates 
SET is_default = false 
WHERE org_id IS NULL AND is_default = true;
```

Then run:
```bash
npx supabase db push
```

### Step 2: Fix Logo Display (CRITICAL)

Edit `lib/pdf/InvoicePdf.tsx`:

**Line 437** - Change from:
```typescript
const hasLogo = logoUrl && branding?.logoUrl
```

To:
```typescript
const hasLogo = logoUrl !== null
```

### Step 3: Fix Template Styles (CRITICAL)

Edit `lib/pdf/InvoicePdf.tsx` - Replace all border style strings:

Find and replace patterns:
```typescript
// Find: borderBottom: '1pt solid #...'
// Replace with:
borderBottomWidth: 1,
borderBottomColor: '#...',
borderBottomStyle: 'solid'

// Find: borderTop: '2pt solid #...'
// Replace with:
borderTopWidth: 2,
borderTopColor: '#...',
borderTopStyle: 'solid'
```

Apply this to all template style objects (lines 18-293).

### Step 4: Fix Template Default Selection

Edit `app/api/org/[orgId]/invoices/[invoiceId]/pdf/route.ts`:

**Lines 75-84** - Replace with:
```typescript
// First try org-specific default
let { data: template } = await supabase
  .from('invoice_templates')
  .select('*')
  .eq('org_id', orgId)
  .eq('is_default', true)
  .maybeSingle()

// If no org-specific default, use global default
if (!template) {
  const { data: globalTemplate } = await supabase
    .from('invoice_templates')
    .select('*')
    .is('org_id', null)
    .eq('is_default', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()
  template = globalTemplate
}
```

### Step 5: Fix Response Data

Edit `app/api/org/[orgId]/invoices/[invoiceId]/route.ts`:

**Lines 75-76** - Replace with:
```typescript
// Fetch updated invoice to return
const { data: updatedInvoice } = await supabase
  .from('invoices')
  .select('*')
  .eq('id', invoiceId)
  .eq('org_id', orgId)
  .single()

return NextResponse.json({ 
  success: true, 
  invoice: updatedInvoice 
})
```

### Step 6: Fix PDF Download Detection

Edit `app/api/org/[orgId]/invoices/[invoiceId]/pdf/route.ts`:

**Lines 113-122** - Replace with:
```typescript
const { searchParams } = new URL(request.url)
const isDownload = searchParams.get('download') === 'true'

return new NextResponse(pdfBuffer, {
  headers: {
    'Content-Type': 'application/pdf',
    'Content-Disposition': isDownload 
      ? `attachment; filename="invoice-${invoice.invoice_number}.pdf"`
      : `inline; filename="invoice-${invoice.invoice_number}.pdf"`,
    'X-Content-Type-Options': 'nosniff',
  },
})
```

Edit `components/invoices/PDFPreviewModal.tsx`:

**Line 65** - Replace with:
```typescript
const handleDownload = () => {
  const pdfUrl = `/api/org/${orgId}/invoices/${invoiceId}/pdf?download=true${currentTemplateId ? `&template=${currentTemplateId}` : ''}`
  window.open(pdfUrl, '_blank')
}
```

### Step 7: Add Error Handling

Edit `components/invoices/WYSIWYGInvoiceEditor.tsx`:

Add state at top of component (around line 136):
```typescript
const [templateError, setTemplateError] = useState<string | null>(null)
```

Update `handleTemplateSelected` function (lines 505-533):
```typescript
const handleTemplateSelected = async (templateId: string) => {
  const invoiceId = invoice?.id || initialInvoice.id;
  
  if (!invoiceId) {
    console.error('No invoice ID available');
    setTemplateError('Cannot save template: No invoice ID');
    return;
  }

  try {
    setTemplateError(null);
    const response = await fetch(`/api/org/${orgId}/invoices/${invoiceId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        invoice: { ...invoice, id: invoiceId, template_id: templateId },
        items 
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save template selection');
    }

    const data = await response.json();
    setInvoice(data.invoice);
  } catch (error) {
    console.error('Error updating template:', error);
    setTemplateError('Failed to update template. Please try again.');
  }
};
```

Add error display in UI (around line 570):
```typescript
{templateError && (
  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
    {templateError}
  </div>
)}
```

---

## Testing Checklist

After applying fixes, test the following:

### ✅ Invoice Creation
- [ ] Create new invoice
- [ ] Invoice number is allocated correctly
- [ ] Invoice saves as draft

### ✅ Invoice Editing
- [ ] Edit invoice details
- [ ] Add/remove items
- [ ] Change customer
- [ ] Auto-save works

### ✅ Template Selection
- [ ] Template modal opens
- [ ] All 10 templates are visible
- [ ] Can select a template
- [ ] Selection is saved

### ✅ PDF Preview
- [ ] Preview modal opens after selecting template
- [ ] PDF renders in iframe
- [ ] Can switch between templates in preview
- [ ] Template changes are applied immediately

### ✅ PDF Generation
- [ ] Logo appears (if uploaded)
- [ ] Company information displays correctly
- [ ] Customer information displays correctly
- [ ] Invoice items table renders
- [ ] Totals calculate correctly
- [ ] Template styles are applied (colors, fonts, layout)
- [ ] Bank details appear (if configured)
- [ ] Notes appear (if added)

### ✅ PDF Download
- [ ] Download button works
- [ ] PDF downloads with correct filename
- [ ] Downloaded PDF matches preview
- [ ] All data is present in downloaded PDF

---

## Database Verification Queries

Run these queries to verify your database is correctly configured:

### Check Templates
```sql
SELECT 
  id, 
  name, 
  is_default,
  org_id,
  config_json->>'layout' as layout,
  config_json->>'primaryColor' as primary_color
FROM invoice_templates 
WHERE org_id IS NULL
ORDER BY is_default DESC, name;
```

Expected: 10 templates, 1 with `is_default = true`

### Check Invoices Have Templates
```sql
SELECT 
  i.id,
  i.invoice_number,
  i.template_id,
  t.name as template_name
FROM invoices i
LEFT JOIN invoice_templates t ON i.template_id = t.id
LIMIT 10;
```

### Check Org Branding
```sql
SELECT 
  o.name as org_name,
  ob.business_name,
  ob.logo_storage_path,
  ob.bank_name,
  ob.bank_iban
FROM organizations o
LEFT JOIN org_branding ob ON o.id = ob.org_id
LIMIT 5;
```

### Check Storage Policies
```sql
SELECT 
  bucket_id,
  name,
  definition
FROM storage.policies 
WHERE bucket_id = 'logos';
```

Expected: Policies for SELECT, INSERT, UPDATE

---

## Common Issues and Solutions

### PDF Shows "Failed to generate PDF"
**Cause**: Template styles have invalid React PDF properties
**Solution**: Apply Issue #7 fixes, ensure all border/style properties use correct format

### Logo Doesn't Appear
**Cause**: Issue #1 - Logo display logic error
**Solution**: Fix line 437 in InvoicePdf.tsx

### Wrong Template Applied
**Cause**: Issue #4 - Multiple default templates or migration not applied
**Solution**: Fix migration 014, ensure only one default template

### Download Opens Preview Instead
**Cause**: Issue #6 - Download detection not working
**Solution**: Use explicit `?download=true` query parameter

### Template Not Saving
**Cause**: Issue #5 - API not returning updated invoice
**Solution**: Update PUT endpoint to return updated invoice data

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Invoice Creation Flow                     │
└─────────────────────────────────────────────────────────────┘

[User] → /app/org/[orgId]/invoices/new
          │
          ├─→ createDraftInvoice()
          │   ├─→ Allocate invoice number (RPC)
          │   ├─→ Insert into invoices table
          │   └─→ Return invoice ID
          │
          └─→ Redirect to /app/org/[orgId]/invoices/[invoiceId]


┌─────────────────────────────────────────────────────────────┐
│                    Invoice Editing Flow                      │
└─────────────────────────────────────────────────────────────┘

[User] → WYSIWYGInvoiceEditor
          │
          ├─→ Edit invoice fields
          │   └─→ Auto-save (PUT /api/org/[orgId]/invoices/[invoiceId])
          │
          ├─→ Edit items
          │   └─→ Auto-save (PUT /api/org/[orgId]/invoices/[invoiceId])
          │
          └─→ Click "Generate PDF"
              └─→ Open TemplateSelectionModal


┌─────────────────────────────────────────────────────────────┐
│                   PDF Generation Flow                        │
└─────────────────────────────────────────────────────────────┘

[User] → TemplateSelectionModal
          │
          ├─→ Select template
          │   └─→ handleTemplateSelected()
          │       └─→ PUT /api/.../invoices/[invoiceId]
          │           └─→ Save template_id to invoice
          │
          └─→ Click "Generate PDF"
              └─→ Open PDFPreviewModal
                  │
                  ├─→ iframe loads: GET /api/.../invoices/[invoiceId]/pdf?template=[id]
                  │   │
                  │   ├─→ Fetch invoice + items + customer
                  │   ├─→ Fetch org_branding (with logo_storage_path)
                  │   ├─→ Fetch template (or use default)
                  │   ├─→ Generate logo URL from storage path
                  │   │
                  │   └─→ renderToStream(<InvoicePDF {...data} />)
                  │       │
                  │       ├─→ getTemplateStyles(template)
                  │       ├─→ Apply layout based on template.config_json.layout
                  │       ├─→ Render header with logo
                  │       ├─→ Render company info
                  │       ├─→ Render customer info
                  │       ├─→ Render items table
                  │       ├─→ Render totals
                  │       └─→ Render bank details & notes
                  │
                  └─→ User clicks "Download"
                      └─→ GET /api/.../pdf?download=true&template=[id]
                          └─→ Returns PDF with Content-Disposition: attachment


┌─────────────────────────────────────────────────────────────┐
│                     Database Schema                          │
└─────────────────────────────────────────────────────────────┘

organizations
  ├─→ org_branding (1:1)
  │   ├─→ business_name, vat_number
  │   ├─→ address fields
  │   ├─→ logo_storage_path → storage.buckets.logos
  │   └─→ bank details (bank_name, bank_iban, etc.)
  │
  ├─→ invoice_templates (1:many)
  │   ├─→ name
  │   ├─→ config_json (layout, colors, styling)
  │   └─→ is_default
  │
  ├─→ customers (1:many)
  │   ├─→ name, email, phone
  │   ├─→ address fields
  │   └─→ vat_number
  │
  └─→ invoices (1:many)
      ├─→ invoice_number (unique per org)
      ├─→ customer_id → customers
      ├─→ template_id → invoice_templates
      ├─→ issue_date, due_date
      ├─→ subtotal, tax_total, total
      ├─→ notes
      └─→ invoice_items (1:many)
          ├─→ description
          ├─→ quantity, unit_price
          ├─→ tax_rate, line_total
          └─→ sort_order
```

---

## Next Steps

1. ✅ Apply all CRITICAL fixes (Issues #1, #4, #7)
2. ✅ Test invoice creation and editing
3. ✅ Test template selection
4. ✅ Test PDF preview
5. ✅ Test PDF download
6. ✅ Apply HIGH PRIORITY fixes (Issues #3, #5, #6)
7. ✅ Re-test all functionality
8. ✅ Apply MEDIUM PRIORITY fixes (Issues #2, #8, #9, #10)
9. ✅ Final full system test
10. ✅ Document any remaining issues

---

## Support

If you encounter issues after applying these fixes:

1. Check the browser console for JavaScript errors
2. Check the server logs for API errors
3. Verify database queries are working (use the verification queries above)
4. Test with a fresh invoice (create new invoice from scratch)
5. Clear browser cache and reload

---

**Last Updated**: January 14, 2026
**Version**: 1.0
**Status**: Ready for Implementation
