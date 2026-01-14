# PDF Page Size and Margins Configuration

This document explains how the invoice PDF page size and margins are configured, and how to adjust them.

---

## Page Size Configuration

### A4 Format
The PDF is generated using **A4 format** (210mm × 297mm), which is the standard international paper size.

**File**: `lib/pdf/generatePdfFromHtml.ts`

```typescript
const pdfBuffer = await page.pdf({
  format: 'A4',                    // 210mm × 297mm
  printBackground: true,
  margin: {
    top: '32mm',      // Space for header
    right: '10mm',    // Right margin (reduced to use more width)
    bottom: '25mm',   // Space for footer
    left: '10mm'      // Left margin (reduced to use more width)
  },
  displayHeaderFooter: true,
  // ... header/footer templates
})
```

### A4 Dimensions
- **Width**: 210mm (8.27 inches)
- **Height**: 297mm (11.69 inches)

---

## Margin System

The PDF uses a **two-layer margin system**:

### 1. Puppeteer Margins (Page Level)
These are set in the `page.pdf()` call and define the printable area:

```typescript
margin: {
  top: '32mm',      // Reserved for header (prevents overlap)
  right: '10mm',    // Right page margin (reduced to use more width)
  bottom: '25mm',   // Reserved for footer (prevents overlap)
  left: '10mm'      // Left page margin (reduced to use more width)
}
```

**Purpose**: 
- Top/bottom margins reserve space for header/footer templates
- Left/right margins provide page edge spacing

### 2. CSS Padding (Content Level)
Additional padding is applied to the content wrapper:

**File**: `lib/pdf/InvoiceHtmlTemplate.tsx`

```css
.pdf-page {
  padding: 20px 10mm !important;  /* 20px top/bottom, 10mm left/right */
}
```

**Purpose**: Provides internal spacing between content and page edges

---

## Total Content Area Calculation

### Effective Content Width
```
A4 Width: 210mm
- Left Puppeteer Margin: 10mm
- Left CSS Padding: 10mm
- Right CSS Padding: 10mm
- Right Puppeteer Margin: 10mm
─────────────────────────────
Available Content Width: 170mm (81% of page width)
```

### Effective Content Height
```
A4 Height: 297mm
- Top Puppeteer Margin: 32mm (includes header space)
- Top CSS Padding: ~7.5mm (20px ≈ 7.5mm)
- Bottom CSS Padding: ~7.5mm
- Bottom Puppeteer Margin: 25mm (includes footer space)
─────────────────────────────
Available Content Height: ~225mm (76% of page height)
```

---

## Header and Footer Templates

The header and footer are rendered **outside the content area** in the margin boxes:

### Header Template
```typescript
headerTemplate: `
  <div style="font-size: 10px; width: 100%; padding: 8px 15mm; ...">
    <span>Invoice #123</span>
    <span>Company Name</span>
  </div>
`
```

**Location**: Rendered in the top margin (32mm) area

### Footer Template
```typescript
footerTemplate: `
  <div style="font-size: 10px; width: 100%; padding: 8px 15mm; ...">
    <span>Page X of Y</span>
    <span>Thank you for your business</span>
  </div>
`
```

**Location**: Rendered in the bottom margin (25mm) area

---

## Adjusting Margins

### To Use More Page Width

**Option 1: Reduce CSS Padding** (Recommended)
```css
.pdf-page {
  padding: 20px 5mm !important;  /* Reduce from 10mm to 5mm */
}
```

**Option 2: Reduce Puppeteer Side Margins**
```typescript
margin: {
  top: '32mm',
  right: '10mm',    // Reduced from 15mm
  bottom: '25mm',
  left: '10mm'      // Reduced from 15mm
}
```

**Option 3: Both** (Maximum width usage)
```typescript
// Puppeteer margins
margin: {
  top: '32mm',
  right: '10mm',
  bottom: '25mm',
  left: '10mm'
}

// CSS padding
.pdf-page {
  padding: 20px 5mm !important;
}
```

**Result**: Content width increases to ~175mm (83% of page width)

### To Use More Page Height

**Reduce Top/Bottom CSS Padding**:
```css
.pdf-page {
  padding: 10px 10mm !important;  /* Reduced from 20px to 10px */
}
```

**Note**: Be careful not to reduce top/bottom Puppeteer margins below 30mm/20mm as this may cause header/footer overlap.

---

## Current Configuration Summary

| Setting | Value | Purpose |
|---------|-------|---------|
| Page Format | A4 (210mm × 297mm) | Standard international size |
| Top Margin | 32mm | Header space (prevents overlap) |
| Bottom Margin | 25mm | Footer space (prevents overlap) |
| Left Margin | 10mm | Page edge spacing (reduced for more width) |
| Right Margin | 10mm | Page edge spacing (reduced for more width) |
| CSS Padding (top/bottom) | 20px (~7.5mm) | Content spacing |
| CSS Padding (left/right) | 10mm | Content spacing |
| **Effective Content Width** | **~170mm** | **81% of page** |
| **Effective Content Height** | **~225mm** | **76% of page** |

---

## Files to Modify

### To Change Puppeteer Margins
**File**: `lib/pdf/generatePdfFromHtml.ts`
- Line ~199: `margin` object in `page.pdf()` call
- Also update in `generatePdfFromHtmlCached()` function (line ~322)

### To Change CSS Padding
**File**: `lib/pdf/InvoiceHtmlTemplate.tsx`
- Line ~59: `.pdf-page` padding value

### To Change Page Size
**File**: `lib/pdf/generatePdfFromHtml.ts`
- Line ~197: `format: 'A4'` (can be 'Letter', 'Legal', or custom dimensions)

---

## Best Practices

1. **Keep top/bottom margins ≥ 30mm/20mm** when using `displayHeaderFooter: true` to prevent overlap
2. **Minimum side margins**: 5-10mm for readability and printing safety
3. **Test with long invoices** to ensure content doesn't get cut off
4. **Consider print margins**: Most printers need at least 3-5mm margin on all sides

---

## Example: Maximum Width Configuration

If you want to maximize content width while maintaining safety margins:

```typescript
// Puppeteer margins
margin: {
  top: '32mm',      // Keep for header
  right: '8mm',     // Minimal right margin
  bottom: '25mm',   // Keep for footer
  left: '8mm'       // Minimal left margin
}
```

```css
/* CSS padding */
.pdf-page {
  padding: 20px 5mm !important;  // Minimal internal padding
}
```

**Result**: Content width ~184mm (88% of page width)

---

## Troubleshooting

### Issue: Content is too narrow
**Solution**: Reduce CSS padding or Puppeteer side margins (see "Adjusting Margins" above)

### Issue: Header/footer overlaps content
**Solution**: Increase top/bottom Puppeteer margins (minimum 30mm/20mm)

### Issue: Content gets cut off when printing
**Solution**: Increase all margins by 2-3mm to account for printer margins

### Issue: Content looks cramped
**Solution**: Increase CSS padding (try 15mm instead of 10mm)
