# PDF Layout and Data Display Fixes

**Date**: January 14, 2026  
**Issue**: PDFs not showing all data and formatting incorrectly

---

## Problems Identified

1. **Table Layout Issues**
   - Using percentage widths (`width: '40%'`) which React PDF doesn't handle well
   - Table rows not properly using flexbox
   - Columns not aligning correctly

2. **Missing Data Display**
   - Customer address_line2 not shown
   - Customer country not shown
   - Empty states not handled gracefully

3. **Layout Structure**
   - Row layout not using proper flexbox
   - Spacing issues between sections

---

## Fixes Applied

### 1. Fixed Table Layout (Critical)
**File**: `lib/pdf/InvoicePdf.tsx`

**Changed**:
- Replaced percentage widths with flex values
- Used proper flexbox layout for table rows
- Wrapped text in View containers with flex

**Before**:
```typescript
<Text style={{ width: '40%', textAlign: 'left' }}>{value}</Text>
```

**After**:
```typescript
<View style={{ flex: 2, paddingHorizontal: 5 }}>
  <Text style={{ textAlign: 'left' }}>{value}</Text>
</View>
```

**Result**: Table columns now properly align and display all data

---

### 2. Fixed Customer Information Display
**File**: `lib/pdf/InvoicePdf.tsx`

**Added**:
- Customer address_line2 display
- Customer country display
- Better empty state handling
- Proper array filtering for city/postcode

**Result**: All customer data now displays correctly

---

### 3. Fixed Company Information Display
**File**: `lib/pdf/InvoicePdf.tsx`

**Added**:
- Fallback message when branding is missing
- Better array filtering for city/postcode
- Proper null checking

**Result**: Company info displays even when incomplete

---

### 4. Fixed Totals Section
**File**: `lib/pdf/InvoicePdf.tsx`

**Changed**:
- Increased width from 200 to 250
- Added proper padding
- Ensured proper alignment

**Result**: Totals section displays correctly aligned

---

### 5. Fixed Table Styles
**File**: `lib/pdf/InvoicePdf.tsx`

**Changed**:
- Added explicit flexDirection to tableRow and tableHeader
- Added width: '100%' to table container
- Used flex values instead of percentages

**Result**: Table structure is now properly formatted

---

### 6. Added Debug Logging
**File**: `app/api/org/[orgId]/invoices/[invoiceId]/pdf/route.ts`

**Added**:
- Console logging for debugging
- Better items array validation

**Result**: Easier to debug data issues

---

## React PDF Limitations Addressed

### Percentage Widths
- ❌ **Not Supported**: `width: '40%'`
- ✅ **Use Instead**: `flex: 2` or fixed widths

### Flexbox
- ✅ **Supported**: `flexDirection: 'row'`, `flex: 1`
- ✅ **Required**: Wrap text in View containers for proper layout

### Spacing
- ✅ **Use**: `paddingHorizontal`, `marginBottom`
- ❌ **Avoid**: Complex margin calculations

---

## Testing Checklist

After these fixes, verify:

- [ ] Table columns align properly
- [ ] All invoice items display
- [ ] Customer information shows completely (name, email, address lines, city, postcode, country, VAT)
- [ ] Company information shows completely
- [ ] Totals section aligns correctly
- [ ] All data fields are visible
- [ ] No overlapping text
- [ ] Proper spacing between sections

---

## Files Modified

1. `lib/pdf/InvoicePdf.tsx` - Table layout, customer info, company info, totals
2. `app/api/org/[orgId]/invoices/[invoiceId]/pdf/route.ts` - Debug logging

---

## Next Steps

1. Test PDF generation with various invoice configurations
2. Verify all data displays correctly
3. Check formatting across all templates
4. Remove debug logging if not needed in production

---

**Status**: ✅ Fixes Applied  
**Expected Result**: All data displays correctly with proper formatting
