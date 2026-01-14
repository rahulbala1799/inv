# PDF Section Breaks and Page Layout Fix

## Issues Fixed

### 1. Full A4 Height and Width Usage
**Problem**: Invoice wasn't using full A4 dimensions (210mm × 297mm)

**Solution**:
- Reduced top margin from 32mm to 20mm
- Reduced bottom margin from 25mm to 15mm
- Kept side margins at 0mm
- **Result**: Content area now uses 262mm height (88% of page) and 210mm width (100%)

### 2. Sections Getting Cut Across Pages
**Problem**: Totals, bank details, and other sections were being split across pages

**Solution**: Added CSS rules to prevent critical sections from breaking:

```css
/* CRITICAL: Prevent sections from being cut across pages */
.totals,
.bank-details,
.signature-section,
.notes-section,
div[class*="total"],
div[class*="bank"],
div[class*="payment"],
div[class*="signature"],
div[class*="note"] {
  break-inside: avoid !important;
  page-break-inside: avoid !important;
}

/* Target common template patterns */
.flex.justify-end > div,
.grid > div:last-child,
div[class*="bg-"][class*="p-"],
div[class*="border-l-"] {
  break-inside: avoid !important;
  page-break-inside: avoid !important;
}
```

**Behavior**: If a section doesn't fit on the current page, it moves entirely to the next page instead of being cut in half.

### 3. Page Borders
**Problem**: Templates with borders had them broken across multiple pages

**Current State**: CSS foundation added for page-level borders

**Note**: Individual templates may need updates to implement page-level borders properly. The `.pdf-page` wrapper and `@page` rules create the foundation.

## Files Modified

### 1. `lib/pdf/generatePdfFromHtml.ts`
- Reduced top margin: 32mm → 20mm
- Reduced bottom margin: 25mm → 15mm
- Both `generatePdfFromHtml()` and `generatePdfFromHtmlCached()` functions updated

### 2. `lib/pdf/InvoiceHtmlTemplate.tsx`
- Added extensive CSS rules to prevent section breaks
- Target multiple class patterns used by templates
- Added page-level border foundation

## New Dimensions

### Content Area
```
A4 Height: 297mm
- Top Margin (header): 20mm
- Bottom Margin (footer): 15mm
- Available Height: 262mm (88% of page)

A4 Width: 210mm
- Left Margin: 0mm
- Right Margin: 0mm
- Available Width: 210mm (100% of page)
```

## CSS Selectors for Protected Sections

The following CSS class patterns will prevent page breaks:

1. **Explicit Classes**:
   - `.totals`
   - `.bank-details`
   - `.signature-section`
   - `.notes-section`
   - `.avoid-break`

2. **Pattern Matching**:
   - `div[class*="total"]` - any div with "total" in class name
   - `div[class*="bank"]` - any div with "bank" in class name
   - `div[class*="payment"]` - any div with "payment" in class name
   - `div[class*="signature"]` - any div with "signature" in class name
   - `div[class*="note"]` - any div with "note" in class name

3. **Structural Patterns**:
   - `.flex.justify-end > div` - common totals layout pattern
   - `.grid > div:last-child` - last grid item (often totals)
   - `div[class*="bg-"][class*="p-"]` - colored/padded sections
   - `div[class*="border-l-"]` - sections with left border

## Template Guidelines

To ensure sections don't break across pages, templates should use one of these approaches:

### Option 1: Use Explicit Classes (Recommended)
```jsx
<div className="totals">
  {/* Totals content */}
</div>

<div className="bank-details">
  {/* Bank info */}
</div>
```

### Option 2: Use Pattern-Matching Classes
```jsx
<div className="bg-blue-50 p-6 rounded">
  {/* This will be protected due to bg- and p- classes */}
</div>
```

### Option 3: Use Structural Patterns
```jsx
<div className="flex justify-end">
  <div>
    {/* Totals - protected due to flex justify-end > div pattern */}
  </div>
</div>
```

## Testing Checklist

When testing multi-page invoices:

- [ ] Totals section stays together (not split across pages)
- [ ] Bank details stay together
- [ ] Signature section stays together
- [ ] Notes section stays together
- [ ] Header appears on all pages after page 1
- [ ] Footer appears on all pages
- [ ] Content uses full width (210mm)
- [ ] Content uses maximum height (262mm available)
- [ ] If template has borders, they appear on each page (may need template updates)

## Known Limitations

1. **First Page Header**: Cannot remove header from first page only with current Puppeteer config
2. **Page Borders**: Templates with document-level borders need individual updates to work page-by-page
3. **Very Large Sections**: If a section is taller than available page height, it will break (CSS can't fix this)

## Future Improvements

1. Implement per-page border system for templates that need it
2. Consider using `@page :first` to handle first page differently (may need CSS Paged Media support)
3. Add template-specific overrides for special cases
