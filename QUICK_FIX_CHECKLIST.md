# Quick Fix Checklist - Invoice PDF Issues

**Last Updated**: January 14, 2026  
**Priority**: URGENT - PDF generation not working correctly

---

## 🚨 Critical Fixes (Do These First!)

### ✅ Fix #1: Logo Not Displaying

**File**: `lib/pdf/InvoicePdf.tsx`  
**Line**: 437

**Change**:
```typescript
// FROM:
const hasLogo = logoUrl && branding?.logoUrl

// TO:
const hasLogo = logoUrl !== null
```

**Why**: The double-check prevents logos from ever displaying.

---

### ✅ Fix #2: Update Template Migration to Remove Duplicate Defaults

**File**: `supabase/migrations/014_add_seven_invoice_templates.sql`  
**Location**: Add at the very top (before line 1)

**Add**:
```sql
-- Unset existing defaults before adding new templates
UPDATE invoice_templates 
SET is_default = false 
WHERE org_id IS NULL AND is_default = true;

```

**Why**: Multiple templates marked as default causes confusion.

**Then run**:
```bash
cd supabase
npx supabase db reset  # This will rerun all migrations
```

---

### ✅ Fix #3: Fix Border Styles in Templates

**File**: `lib/pdf/InvoicePdf.tsx`  
**Lines**: Multiple locations throughout template styles (lines 18-433)

**Find and Replace**:

1. Find: `borderBottom: '1pt solid #e5e7eb'`  
   Replace with:
   ```typescript
   borderBottomWidth: 1,
   borderBottomColor: '#e5e7eb',
   borderBottomStyle: 'solid'
   ```

2. Find: `borderBottom: '2pt solid #e5e7eb'`  
   Replace with:
   ```typescript
   borderBottomWidth: 2,
   borderBottomColor: '#e5e7eb',
   borderBottomStyle: 'solid'
   ```

3. Find: `borderBottom: '1pt solid #D1FAE5'`  
   Replace with:
   ```typescript
   borderBottomWidth: 1,
   borderBottomColor: '#D1FAE5',
   borderBottomStyle: 'solid'
   ```

4. Find: `borderTop: '2pt solid #000'`  
   Replace with:
   ```typescript
   borderTopWidth: 2,
   borderTopColor: '#000',
   borderTopStyle: 'solid'
   ```

5. Find: `border: '2pt solid ${primaryColor}'` (around line 219)  
   Replace with:
   ```typescript
   borderWidth: 2,
   borderColor: primaryColor,
   borderStyle: 'solid'
   ```

6. Find: `borderTop: '1pt solid #000'` (line 634)  
   Replace with:
   ```typescript
   borderTopWidth: 1,
   borderTopColor: '#000',
   borderTopStyle: 'solid'
   ```

**Why**: React PDF requires explicit style properties, not shorthand strings.

---

## 🟡 High Priority Fixes

### ✅ Fix #4: Template Selection Priority

**File**: `app/api/org/[orgId]/invoices/[invoiceId]/pdf/route.ts`  
**Lines**: 75-84

**Replace**:
```typescript
  } else {
    // If no template specified, use default template
    const { data: defaultTemplate } = await supabase
      .from('invoice_templates')
      .select('*')
      .or(`org_id.is.null,org_id.eq.${orgId}`)
      .eq('is_default', true)
      .single()
    template = defaultTemplate
  }
```

**With**:
```typescript
  } else {
    // If no template specified, use default template
    // First try org-specific default
    let { data: defaultTemplate } = await supabase
      .from('invoice_templates')
      .select('*')
      .eq('org_id', orgId)
      .eq('is_default', true)
      .maybeSingle()

    // If no org-specific default, use global default
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
```

---

### ✅ Fix #5: Return Updated Invoice Data

**File**: `app/api/org/[orgId]/invoices/[invoiceId]/route.ts`  
**Lines**: 75-76

**Replace**:
```typescript
  return NextResponse.json({ success: true })
}
```

**With**:
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
}
```

---

### ✅ Fix #6: PDF Download Detection

**File 1**: `app/api/org/[orgId]/invoices/[invoiceId]/pdf/route.ts`  
**Lines**: 113-122

**Replace**:
```typescript
    // Check if this is a preview request (from iframe) or download request
    const referer = request.headers.get('referer') || ''
    const isPreview = referer.includes('/app/org/') || request.headers.get('sec-fetch-dest') === 'iframe'

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': isPreview 
          ? `inline; filename="invoice-${invoice.invoice_number}.pdf"`
          : `attachment; filename="invoice-${invoice.invoice_number}.pdf"`,
        'X-Content-Type-Options': 'nosniff',
      },
    })
```

**With**:
```typescript
    // Check if download is explicitly requested
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

**File 2**: `components/invoices/PDFPreviewModal.tsx`  
**Line**: 65

**Replace**:
```typescript
  const handleDownload = () => {
    const pdfUrl = `/api/org/${orgId}/invoices/${invoiceId}/pdf${currentTemplateId ? `?template=${currentTemplateId}` : ''}`
    window.open(pdfUrl, '_blank')
  }
```

**With**:
```typescript
  const handleDownload = () => {
    const pdfUrl = `/api/org/${orgId}/invoices/${invoiceId}/pdf?download=true${currentTemplateId ? `&template=${currentTemplateId}` : ''}`
    window.open(pdfUrl, '_blank')
  }
```

---

## 🟢 Medium Priority Fixes

### ✅ Fix #7: Add Error Handling to Template Selection

**File**: `components/invoices/WYSIWYGInvoiceEditor.tsx`

**Step 1**: Add state (around line 137, after other useState declarations):
```typescript
const [templateError, setTemplateError] = useState<string | null>(null)
```

**Step 2**: Update `handleTemplateSelected` function (lines 505-533):

**Replace**:
```typescript
  const handleTemplateSelected = async (templateId: string) => {
    // Use initialInvoice.id as it's guaranteed to exist from server
    const invoiceId = invoice?.id || initialInvoice.id;
    
    if (!invoiceId) {
      console.error('No invoice ID available');
      return;
    }

    try {
      // Update invoice with template
      const response = await fetch(`/api/org/${orgId}/invoices/${invoiceId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          invoice: { ...invoice, id: invoiceId, template_id: templateId },
          items 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setInvoice(data.invoice);
      }
    } catch (error) {
      console.error('Error updating template:', error);
    }
  };
```

**With**:
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

**Step 3**: Add error display in UI (around line 570, after the "Back" button div):
```typescript
            {templateError && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
                {templateError}
              </div>
            )}
```

---

## 📝 Testing After Fixes

Run through this checklist after applying all fixes:

### 1. Database Check
```bash
# Connect to your Supabase project
cd supabase
npx supabase db reset  # Rerun all migrations
```

Verify templates exist:
```sql
SELECT name, is_default, config_json->>'layout' as layout 
FROM invoice_templates 
WHERE org_id IS NULL;
```

Expected: 10 templates, only 1 with `is_default = true`

### 2. Create Test Invoice
- [ ] Create new invoice
- [ ] Add company info in settings (if not already added)
- [ ] Upload logo (if not already uploaded)
- [ ] Add customer details
- [ ] Add at least 2 invoice items
- [ ] Save invoice

### 3. Test Template Selection
- [ ] Click "Generate PDF" button
- [ ] Template modal opens
- [ ] See all 10 templates displayed
- [ ] Select "Classic with Orange Accent"
- [ ] Click "Generate PDF"

### 4. Test PDF Preview
- [ ] Preview modal opens
- [ ] PDF renders in iframe
- [ ] Logo appears (if uploaded)
- [ ] Company info displays correctly
- [ ] Customer info displays correctly
- [ ] Invoice items show in table
- [ ] Totals calculate correctly
- [ ] Template styling is applied (black header, orange accent)

### 5. Test Template Switching
- [ ] Use dropdown to select "Modern Green"
- [ ] PDF re-renders with new template
- [ ] Green colors appear
- [ ] Layout changes to modern style
- [ ] Select "Minimal Architect"
- [ ] Black and white minimal style applied

### 6. Test PDF Download
- [ ] Click "Download PDF" button
- [ ] File downloads (not just opens in new tab)
- [ ] Filename is `invoice-XXX.pdf` (where XXX is invoice number)
- [ ] Downloaded PDF matches preview
- [ ] Open downloaded PDF - all data is present

### 7. Test Error Scenarios
- [ ] Try to generate PDF with incomplete invoice (no customer)
- [ ] Error message displays (if implemented)
- [ ] System doesn't crash

---

## 🐛 If Issues Persist

### Logo Still Not Showing?

**Check**:
1. Is logo uploaded? Go to Settings → Upload Logo
2. Is logo_storage_path saved in database?
   ```sql
   SELECT logo_storage_path FROM org_branding WHERE org_id = 'YOUR_ORG_ID';
   ```
3. Can you access logo URL directly?
   - Get URL from: `https://YOUR_PROJECT.supabase.co/storage/v1/object/public/logos/YOUR_ORG_ID/logo.png`
4. Check storage bucket exists:
   - Go to Supabase Dashboard → Storage
   - Check if 'logos' bucket exists and is PUBLIC

**Create bucket if missing**:
```sql
-- Run in Supabase SQL Editor
INSERT INTO storage.buckets (id, name, public)
VALUES ('logos', 'logos', true)
ON CONFLICT DO NOTHING;
```

### Template Not Applying?

**Check**:
1. Browser console for errors
2. Network tab - is PDF endpoint returning 200?
3. Check if template_id is saved:
   ```sql
   SELECT invoice_number, template_id FROM invoices WHERE id = 'YOUR_INVOICE_ID';
   ```

### PDF Showing Blank/Error?

**Check**:
1. Server logs for errors
2. Check all required data exists:
   ```sql
   SELECT 
     i.*,
     c.name as customer_name,
     ob.business_name
   FROM invoices i
   LEFT JOIN customers c ON i.customer_id = c.id
   LEFT JOIN org_branding ob ON i.org_id = ob.org_id
   WHERE i.id = 'YOUR_INVOICE_ID';
   ```
3. Check invoice has items:
   ```sql
   SELECT * FROM invoice_items WHERE invoice_id = 'YOUR_INVOICE_ID';
   ```

### Download Not Working?

**Check**:
1. Open browser developer tools → Network tab
2. Click "Download PDF"
3. Check the request URL - should have `?download=true`
4. Check response headers - should have `Content-Disposition: attachment`

---

## 📚 Related Documentation

- **Full Issue Analysis**: `INVOICE_FLOW_ISSUES_AND_FIXES.md`
- **Template System**: `PDF_TEMPLATES_README.md`
- **Database Schema**: `README.md`
- **Setup Guide**: `SETUP.md`

---

## 🎯 Summary of Changes

| File | Lines Changed | Priority | Description |
|------|--------------|----------|-------------|
| `lib/pdf/InvoicePdf.tsx` | 437 | 🔴 CRITICAL | Fix logo display logic |
| `lib/pdf/InvoicePdf.tsx` | Multiple | 🔴 CRITICAL | Fix border style properties |
| `supabase/migrations/014_...sql` | 1 (add) | 🔴 CRITICAL | Remove duplicate defaults |
| `app/api/.../pdf/route.ts` | 75-84 | 🟡 HIGH | Fix template selection |
| `app/api/.../route.ts` | 75-76 | 🟡 HIGH | Return updated invoice |
| `app/api/.../pdf/route.ts` | 113-122 | 🟡 HIGH | Fix download detection |
| `components/.../PDFPreviewModal.tsx` | 65 | 🟡 HIGH | Add download parameter |
| `components/.../WYSIWYGInvoiceEditor.tsx` | Multiple | 🟢 MEDIUM | Add error handling |

**Total Files**: 6  
**Total Fixes**: 8  
**Estimated Time**: 30-45 minutes

---

**Status**: ⏳ Ready to implement  
**Next Action**: Start with Critical Fixes (#1, #2, #3)
