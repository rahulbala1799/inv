# Template 5: Editorial Magazine

## Overview

Template 5 is a bold, editorial-style invoice template inspired by high-end magazine layouts and contemporary editorial design. It features an asymmetric layout, large typography, creative use of whitespace, and a distinctive color palette that sets it apart from traditional corporate invoice designs.

## Design Philosophy

This template draws inspiration from:
- **Editorial Magazine Layouts** - Asymmetric, bold typography
- **Contemporary Design** - Creative use of space and color
- **Artistic Expression** - Visual interest without sacrificing professionalism
- **Modern Publishing** - Magazine-style column layouts and typography hierarchy

## Visual Design

### Color Scheme

- **Primary Accent**: Coral Orange (#F97316) - Used for highlights and accents
- **Secondary Accent**: Teal Cyan (#14B8A6) - Complementary accent color
- **Text Color**: Slate Dark (#0F172A) - Primary text
- **Secondary Text**: Slate Medium (#475569) - Supporting text
- **Muted Text**: Slate Light (#64748B) - Labels and metadata
- **Background**: White (#FFFFFF) - Clean base
- **Totals Background**: Warm Yellow Gradient (#FEF3C7 to #FDE68A) - Highlighted totals section
- **Borders**: Light Gray (#E2E8F0) - Subtle separators

### Typography

- **Primary Font**: Playfair Display, Georgia, Times New Roman (serif) - For headings and body
- **Secondary Font**: Helvetica Neue, Arial (sans-serif) - For tables and data
- **Invoice Number**: 24pt, Bold (700)
- **Company Name**: 32pt, Bold (700) or 20pt in content
- **Section Titles**: 11pt, Bold (700), Uppercase with letter spacing
- **Body Text**: 10pt, Regular
- **Labels**: 7-9pt, Bold (700), Uppercase with extended letter spacing
- **Grand Total**: 20pt, Bold (700)

### Layout Structure

1. **Vertical Accent Bar** (Left Edge)
   - Full-height gradient bar (orange to teal)
   - 8px width
   - Creates visual anchor and editorial feel

2. **Header Section** (Top)
   - Asymmetric layout with logo/company name on left
   - Large invoice number on right with coral accent
   - Date information below invoice number
   - Bold bottom border in coral

3. **Content Section** (Main Body)
   - Offset padding (30px left, 50px right) for asymmetric feel
   - Two-column grid for "Bill From" and "Bill To"
   - Vertical accent lines before section labels
   - Generous whitespace

4. **Items Table**
   - Clean, minimal table design
   - No heavy borders or backgrounds
   - Serif font for descriptions, sans-serif for numbers
   - Subtle hover effects

5. **Totals Section**
   - Right-aligned container
   - Warm yellow gradient background
   - Coral left border accent
   - Large, bold typography for grand total

6. **Footer Section**
   - Two-column grid layout
   - Teal accent lines before section titles
   - Organized payment and banking information

## Key Features

### Editorial Typography
- Large, bold serif fonts for headings
- Extended letter spacing on labels
- Mixed serif/sans-serif for visual interest
- Magazine-style hierarchy

### Asymmetric Layout
- Offset content from left edge
- Vertical accent bar creates visual interest
- Uneven column widths
- Creative use of whitespace

### Color Accents
- Coral orange for primary highlights
- Teal cyan for secondary accents
- Gradient elements (vertical bar, totals background)
- Warm yellow for totals section

### Visual Elements
- Vertical gradient accent bar
- Horizontal gradient accent lines
- Colored accent lines before labels
- Coral border accents

## Use Cases

This template is ideal for:

- **Creative Agencies** - Design studios, advertising agencies
- **Publishing Companies** - Magazines, editorial services
- **Artists & Designers** - Freelance creatives, illustrators
- **Lifestyle Brands** - Fashion, beauty, wellness businesses
- **Photography Studios** - Professional photographers
- **Event Planners** - Creative event coordination
- **Content Creators** - Bloggers, influencers, media creators

## Technical Specifications

### Page Setup
- **Page Size**: A4 (210mm × 297mm)
- **Margins**: 6mm top, 8mm sides, 20mm bottom
- **Content Offset**: 30-50px from left edge for asymmetric layout

### Typography Stack
- **Primary**: Playfair Display (serif) - Editorial feel
- **Secondary**: Helvetica Neue (sans-serif) - Clean data display
- **Fallback**: Georgia, Times New Roman, Arial

### Responsive Elements
- Logo automatically hides if not available
- Graceful handling of missing customer data
- Conditional display of optional sections
- Print-optimized page breaks

### Data Display
- Currency formatting with proper symbols
- Date formatting in readable format
- VAT number display when available
- Bank details in organized format

## Customization Options

The template supports the following customization through the `config_json`:

```json
{
  "layout": "editorial-magazine",
  "logoPosition": "top-left",
  "primaryColor": "#F97316",
  "secondaryColor": "#14B8A6",
  "accentColor": "#14B8A6",
  "backgroundColor": "#FFFFFF",
  "textColor": "#0F172A",
  "fontFamily": "Playfair Display, Georgia, Times New Roman",
  "showTaxBreakdown": true,
  "showPaymentTerms": true,
  "showBankDetails": true
}
```

## Integration

### Template Registration

To use this template, it must be registered in the `TemplateAdapter.tsx`:

```typescript
import { EditorialMagazine } from './EditorialMagazine'

const templateMap: Record<string, TemplateComponent> = {
  'editorial-magazine': EditorialMagazine,
  'template-5': EditorialMagazine, // Alias for Template 5
  // ... other templates
}
```

### Database Configuration

The template should be added to the database with the following configuration:

```sql
INSERT INTO invoice_templates (org_id, name, config_json, is_default) VALUES
(
  NULL,
  'Editorial Magazine',
  '{
    "layout": "editorial-magazine",
    "logoPosition": "top-left",
    "primaryColor": "#F97316",
    "secondaryColor": "#14B8A6",
    "accentColor": "#14B8A6",
    "backgroundColor": "#FFFFFF",
    "textColor": "#0F172A",
    "fontFamily": "Playfair Display, Georgia, Times New Roman",
    "fontSize": 10,
    "pagePadding": 0,
    "showTaxBreakdown": true,
    "showPaymentTerms": true,
    "showBankDetails": true,
    "headerBackground": "transparent",
    "tableHeaderBackground": "transparent",
    "tableColumns": ["DESCRIPTION", "QTY", "UNIT PRICE", "TAX %", "TOTAL"]
  }'::jsonb,
  false
);
```

## File Location

- **Template Component**: `lib/pdf/templates/EditorialMagazine.tsx`
- **Template Adapter**: `lib/pdf/templates/TemplateAdapter.tsx` (needs update)
- **Types**: `lib/pdf/templates/types.ts`

## Design Differences from Other Templates

### vs. SaaS Professional (Template 4)
- **Layout**: Asymmetric vs. symmetric grid
- **Typography**: Serif editorial vs. sans-serif modern
- **Colors**: Coral/teal vs. indigo
- **Style**: Artistic/editorial vs. corporate/professional
- **Accents**: Vertical bar + gradients vs. horizontal header bar

### vs. Classic Templates
- **Layout**: Asymmetric with offset vs. centered/symmetric
- **Typography**: Large serif headlines vs. standard sizes
- **Colors**: Warm coral/teal vs. blue/gray
- **Style**: Editorial/magazine vs. traditional corporate

### vs. Minimal Templates
- **Layout**: Bold, asymmetric vs. clean, centered
- **Typography**: Large, expressive vs. small, subtle
- **Colors**: Vibrant accents vs. monochrome
- **Style**: Artistic vs. minimal

## Best Practices

1. **Logo Usage**: Works best with text-based logos or simple graphics. Complex logos may compete with the bold typography.

2. **Company Name**: If no logo, the large company name creates a strong visual impact.

3. **Item Descriptions**: Keep descriptions concise but descriptive. The serif font works well for readable text.

4. **Payment Terms**: Use the notes field for clear, well-written payment terms that match the editorial style.

5. **Color Coordination**: The coral/teal palette works well for creative businesses. Consider your brand colors when choosing this template.

## Comparison with Other Templates

| Feature | Editorial Magazine | SaaS Professional | Classic Blue |
|---------|-------------------|-------------------|--------------|
| Layout Style | Asymmetric | Symmetric grid | Traditional |
| Typography | Serif editorial | Sans-serif modern | Serif classic |
| Color Scheme | Coral/Teal | Indigo | Blue |
| Accent Elements | Vertical bar | Header bar | Borders |
| Best For | Creative/Artistic | Tech/SaaS | Corporate |
| Visual Impact | High | Medium | Medium |

## Future Enhancements

Potential improvements for future versions:

- [ ] Customizable accent colors
- [ ] Alternative typography options
- [ ] Additional accent patterns
- [ ] Watermark support
- [ ] QR code placement
- [ ] Custom footer designs
- [ ] Multi-column item descriptions

## Support

For questions or issues with this template:

1. Check the main `PDF_TEMPLATES_README.md` for general template information
2. Review the template code in `EditorialMagazine.tsx`
3. Verify template registration in `TemplateAdapter.tsx`
4. Check database configuration matches the expected format

## Version History

- **v1.0** (Initial Release)
  - Editorial magazine design
  - Asymmetric layout with vertical accent
  - Coral/teal color palette
  - Large serif typography
  - Warm gradient totals section
