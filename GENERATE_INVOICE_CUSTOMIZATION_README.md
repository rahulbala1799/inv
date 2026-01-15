# Generate Invoice Dashboard - Customization Features Implementation Guide

This document explains how to connect and implement the Template Customization features (Font Style, Font Size, Color Palette) and fix the Invoice Details display in the Generate Invoice dashboard.

## Current Issues

### 1. Template Customization Not Connected
- **Font Style** (Normal, Classic, Round): State is managed but not passed to PDF generation
- **Font Size** (Small, Normal, Medium): State is managed but not passed to PDF generation  
- **Color Palette**: Displayed but not interactive/functional

### 2. Invoice Details Display Issues
- **Date**: Using incorrect field name (`invoice.invoice_date` instead of `invoice.issue_date`)
- **Items Count**: Working correctly
- **Total**: Working correctly

## Implementation Plan

### Phase 1: Fix Invoice Details Display (✅ COMPLETED)
- **Date Field**: Fixed to use `invoice.issue_date` instead of `invoice.invoice_date` with proper null checking
- **Total Field**: Fixed to use `invoice.total` (with fallback to `total_amount` for compatibility)

### Phase 2: Connect Font Style & Font Size

#### Step 1: Update PDF API Route to Accept Customization Parameters

**File**: `app/api/org/[orgId]/invoices/[invoiceId]/pdf/route.ts`

Add query parameter parsing for font customization:

```typescript
// After line 58, add:
const fontStyle = searchParams.get('fontStyle') || 'normal'
const fontSize = searchParams.get('fontSize') || 'normal'

// Pass to template (line 143-149):
const htmlString = '<!DOCTYPE html>' + renderToStaticMarkup(
  React.createElement(InvoiceHTMLTemplate, {
    invoice,
    items: invoiceItems,
    branding: branding ? { ...branding, logoUrl } : null,
    template: template || null,
    customization: {
      fontStyle,
      fontSize,
    },
  })
)
```

#### Step 2: Update InvoiceHTMLTemplate to Accept Customization

**File**: `lib/pdf/InvoiceHtmlTemplate.tsx`

Update the component to accept and apply customization:

```typescript
interface InvoiceHTMLTemplateProps extends InvoiceTemplateProps {
  customization?: {
    fontStyle?: 'normal' | 'classic' | 'round'
    fontSize?: 'small' | 'normal' | 'medium'
  }
}

export default function InvoiceHTMLTemplate(props: InvoiceHTMLTemplateProps) {
  const { template, customization } = props
  const config = template?.config_json || {}
  
  // Map font styles to actual font families
  const fontFamilyMap = {
    normal: 'Helvetica, Arial, sans-serif',
    classic: 'Times New Roman, serif',
    round: 'Verdana, Geneva, sans-serif',
  }
  
  // Map font sizes to actual sizes
  const fontSizeMap = {
    small: '9pt',
    normal: '11pt',
    medium: '13pt',
  }
  
  const selectedFontFamily = customization?.fontStyle 
    ? fontFamilyMap[customization.fontStyle] 
    : config.fontFamily || 'Helvetica, Arial, sans-serif'
  
  const selectedFontSize = customization?.fontSize
    ? fontSizeMap[customization.fontSize]
    : config.fontSize || '11pt'
  
  // Update the style tag (around line 47):
  font-family: ${selectedFontFamily};
  font-size: ${selectedFontSize};
```

#### Step 3: Update GenerateInvoicePage to Pass Customization

**File**: `components/invoices/GenerateInvoicePage.tsx`

Update the PDF URL to include customization parameters:

```typescript
// Replace line 127:
const pdfUrl = `/api/org/${orgId}/invoices/${invoiceId}/pdf${selectedTemplateId ? `?template=${selectedTemplateId}` : ''}${fontStyle !== 'normal' ? `&fontStyle=${fontStyle}` : ''}${fontSize !== 'normal' ? `&fontSize=${fontSize}` : ''}`

// Also update handleDownload (line 87-90):
const handleDownload = () => {
  const params = new URLSearchParams()
  if (selectedTemplateId) params.set('template', selectedTemplateId)
  if (fontStyle !== 'normal') params.set('fontStyle', fontStyle)
  if (fontSize !== 'normal') params.set('fontSize', fontSize)
  params.set('download', 'true')
  const pdfUrl = `/api/org/${orgId}/invoices/${invoiceId}/pdf?${params.toString()}`
  window.open(pdfUrl, '_blank')
}
```

#### Step 4: Add Real-time Preview Updates

Update the iframe to refresh when customization changes:

```typescript
// Add useEffect to refresh preview when customization changes:
useEffect(() => {
  // Force iframe refresh by changing key
}, [fontStyle, fontSize, selectedTemplateId])
```

### Phase 3: Connect Color Palette

#### Step 1: Add Color State Management

**File**: `components/invoices/GenerateInvoicePage.tsx`

Add color state:

```typescript
const [colors, setColors] = useState({
  primary: '#1E293B',
  secondary: '#FCD34D',
  background: '#FFFFFF',
  neutral: '#94A3B8',
  heading: '#4C1D95',
  body: '#475569',
})
```

#### Step 2: Make Color Palette Interactive

Replace the static color display (lines 385-410) with interactive color pickers:

```typescript
{/* Color Palette */}
<div>
  <label className="text-xs font-medium text-gray-700 mb-3 block">
    Color Palette
  </label>
  <div className="grid grid-cols-3 gap-3">
    {[
      { key: 'primary', label: 'Primary', color: colors.primary },
      { key: 'secondary', label: 'Secondary', color: colors.secondary },
      { key: 'background', label: 'Background', color: colors.background },
      { key: 'neutral', label: 'Neutral', color: colors.neutral },
      { key: 'heading', label: 'Heading', color: colors.heading },
      { key: 'body', label: 'Body', color: colors.body },
    ].map(({ key, label, color }) => (
      <div key={key} className="text-center">
        <input
          type="color"
          value={color}
          onChange={(e) => setColors({ ...colors, [key]: e.target.value })}
          className="w-full h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
        />
        <span className="text-[10px] text-gray-600 mt-1.5 block">{label}</span>
      </div>
    ))}
  </div>
</div>
```

#### Step 3: Pass Colors to PDF Generation

Update the PDF URL to include color parameters:

```typescript
// In pdfUrl construction, add color params:
const colorParams = Object.entries(colors)
  .map(([key, value]) => `color_${key}=${encodeURIComponent(value)}`)
  .join('&')

const pdfUrl = `/api/org/${orgId}/invoices/${invoiceId}/pdf?${selectedTemplateId ? `template=${selectedTemplateId}&` : ''}${fontStyle !== 'normal' ? `fontStyle=${fontStyle}&` : ''}${fontSize !== 'normal' ? `fontSize=${fontSize}&` : ''}${colorParams}`
```

#### Step 4: Apply Colors in Template

**File**: `lib/pdf/InvoiceHtmlTemplate.tsx`

Parse and apply color customization:

```typescript
// In the component, extract colors from props or query
// Apply colors via CSS variables or inline styles in the template
```

### Phase 4: Professional Font Recommendations

#### Recommended Professional Invoice Fonts

1. **Helvetica / Arial** (Normal - Current Default)
   - Clean, modern, highly readable
   - Best for: Professional services, tech companies
   - CSS: `font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;`

2. **Times New Roman** (Classic)
   - Traditional, formal, professional
   - Best for: Legal, accounting, traditional businesses
   - CSS: `font-family: 'Times New Roman', Times, serif;`

3. **Verdana** (Round)
   - Friendly, approachable, easy to read
   - Best for: Creative agencies, consulting
   - CSS: `font-family: Verdana, Geneva, sans-serif;`

4. **Additional Professional Options** (To Add Later):
   - **Roboto**: Modern, geometric (Google Fonts)
   - **Open Sans**: Clean, versatile (Google Fonts)
   - **Lato**: Professional, friendly (Google Fonts)
   - **Montserrat**: Modern, bold (Google Fonts)
   - **Merriweather**: Elegant serif (Google Fonts)
   - **Source Sans Pro**: Clean, professional (Google Fonts)

#### Font Size Guidelines

- **Small (9pt)**: Compact invoices, many line items
- **Normal (11pt)**: Standard invoices (recommended default)
- **Medium (13pt)**: Emphasis on readability, fewer items

## Implementation Checklist

### Immediate Fixes (Completed)
- [x] Fix date field to use `issue_date` instead of `invoice_date`
- [x] Add null check for date display

### Font Customization
- [ ] Update PDF API route to accept `fontStyle` and `fontSize` query params
- [ ] Update `InvoiceHTMLTemplate` to apply font customization
- [ ] Update `GenerateInvoicePage` to pass font params in PDF URL
- [ ] Add preview refresh when font changes
- [ ] Test all three font styles (Normal, Classic, Round)
- [ ] Test all three font sizes (Small, Normal, Medium)

### Color Customization
- [ ] Add color state management in `GenerateInvoicePage`
- [ ] Replace static color display with color pickers
- [ ] Update PDF API route to accept color query params
- [ ] Update template to apply custom colors
- [ ] Test color changes in preview
- [ ] Add color reset/default functionality

### Professional Fonts
- [ ] Implement font family mapping
- [ ] Add Google Fonts support (if using web fonts)
- [ ] Test font rendering in PDF
- [ ] Document font choices in UI

## Technical Considerations

### PDF Font Limitations
- PDFs generated via Puppeteer can use system fonts or web fonts
- For web fonts, ensure they're loaded before PDF generation
- Consider font subsetting for smaller PDF files

### Color Application
- Colors should override template defaults
- Maintain contrast ratios for accessibility
- Consider dark mode compatibility

### Performance
- Preview updates should be debounced to avoid excessive API calls
- Consider caching customization preferences per invoice
- Store customization in invoice metadata for persistence

## Database Schema Considerations

### Option 1: Store in Invoice Metadata
Add a `customization_json` field to the `invoices` table:

```sql
ALTER TABLE invoices 
ADD COLUMN customization_json JSONB DEFAULT '{}';
```

### Option 2: Store in Template Config
Extend `template.config_json` to include default customization:

```json
{
  "layout": "classic",
  "fontFamily": "Helvetica",
  "fontSize": "11pt",
  "colors": {
    "primary": "#1E293B",
    "secondary": "#FCD34D"
  }
}
```

### Option 3: Query Parameters Only (Current Approach)
Keep customization as URL parameters - simpler but not persistent.

## Testing Checklist

1. **Font Style Testing**
   - [ ] Normal font renders correctly
   - [ ] Classic font renders correctly
   - [ ] Round font renders correctly
   - [ ] Font changes reflect in preview immediately

2. **Font Size Testing**
   - [ ] Small size is readable
   - [ ] Normal size is default
   - [ ] Medium size is appropriate
   - [ ] Size changes reflect in preview

3. **Color Testing**
   - [ ] All color pickers work
   - [ ] Colors apply to correct elements
   - [ ] Color changes reflect in preview
   - [ ] Contrast is maintained

4. **Invoice Details Testing**
   - [ ] Date displays correctly
   - [ ] Items count is accurate
   - [ ] Total amount is correct
   - [ ] All fields update when invoice changes

## Next Steps

1. **Immediate**: Fix date field (✅ Done)
2. **Short-term**: Implement font style and size customization
3. **Medium-term**: Add color palette functionality
4. **Long-term**: Add more professional fonts, font persistence, and advanced customization options

## Related Files

- `components/invoices/GenerateInvoicePage.tsx` - Main dashboard component
- `app/api/org/[orgId]/invoices/[invoiceId]/pdf/route.ts` - PDF generation API
- `lib/pdf/InvoiceHtmlTemplate.tsx` - HTML template wrapper
- `lib/pdf/templates/*.tsx` - Individual template components
- `lib/pdf/templates/types.ts` - Type definitions

## Notes

- The current implementation uses HTML-to-PDF via Puppeteer
- Fonts must be available on the server or loaded via CDN
- Color customization requires template-level support
- Consider adding a "Reset to Default" button for customization
