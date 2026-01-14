# New Templates Conversion Plan

## Overview
Converting 10 new templates from `more templates.zip` (invoices-pro folder) to use dynamic `InvoiceTemplateProps` with tech-themed names.

## Template Mapping

1. ✅ **TechMinimal** (Template01) - Clean, professional blue theme - **COMPLETED**
2. **TechDark** (Template02) - Dark slate theme with gradient header
3. **TechPro** (Template03) - Sidebar layout with indigo theme
4. **TechGrid** (Template04) - Emerald/green theme with decorative header
5. **TechModern** (Template05) - Orange theme with rounded elements
6. **TechNeon** (Template06) - Bold black/white with double borders
7. **TechFuturistic** (Template07) - Teal/cyan with angled design
8. **TechCyber** (Template08) - Rose/pink gradient theme
9. **TechMatrix** (Template09) - Violet/purple theme
10. **TechDigital** (Template10) - Cyan/blue with top/bottom bars

## Conversion Pattern

All templates need to:
1. Import `InvoiceTemplateProps, formatCurrency, formatDate` from `./types`
2. Replace hardcoded data with props:
   - `invoice.invoice_number`, `invoice.issue_date`, `invoice.due_date`
   - `invoice.subtotal`, `invoice.tax_total`, `invoice.total`
   - `invoice.currency`
   - `invoice.customers.*` for customer data
   - `branding.*` for company/branding data
   - `items` array for line items
3. Use helper functions: `formatCurrency()`, `formatDate()`
4. Handle optional/nullable fields with conditional rendering
5. Add `getInitials()` helper for logo fallback

## Status

- [x] TechMinimal
- [ ] TechDark
- [ ] TechPro
- [ ] TechGrid
- [ ] TechModern
- [ ] TechNeon
- [ ] TechFuturistic
- [ ] TechCyber
- [ ] TechMatrix
- [ ] TechDigital

## Next Steps

1. Create all 9 remaining template files
2. Add them to `TemplateAdapter.tsx`
3. Create Supabase migration to add templates to database
4. Test PDF generation with each template
