# Template 4: SaaS Professional

## Overview

Template 4 is a modern, professional invoice template designed specifically for SaaS (Software as a Service) companies. It features a clean, contemporary design with a distinctive header bar, professional typography, and a layout optimized for digital-first businesses.

## Design Philosophy

This template is inspired by invoices from leading SaaS companies like Stripe, Salesforce, and other modern technology businesses. It emphasizes:

- **Clean, modern aesthetics** - Minimal design with purposeful use of color
- **Professional credibility** - Conveys trust and reliability
- **Digital-first approach** - Optimized for both screen viewing and printing
- **Clear information hierarchy** - Easy to scan and understand

## Visual Design

### Color Scheme

- **Primary Color**: Indigo (#4F46E5) - Used for header bar and accent elements
- **Secondary Color**: Indigo Light (#6366F1) - Gradient accent in header
- **Text Color**: Dark Gray (#111827) - Primary text
- **Secondary Text**: Medium Gray (#6B7280) - Labels and secondary information
- **Background**: White (#FFFFFF) - Clean, professional base
- **Table Header**: Light Gray (#F9FAFB) - Subtle table header background
- **Borders**: Light Gray (#E5E7EB) - Subtle borders and dividers

### Typography

- **Font Family**: Inter, Helvetica Neue, Helvetica, Arial (sans-serif stack)
- **Invoice Title**: 28pt, Semi-bold (600)
- **Company Name**: 16pt, Semi-bold (600)
- **Body Text**: 10pt, Regular
- **Labels**: 8-9pt, Semi-bold (600), Uppercase with letter spacing
- **Totals**: 16pt, Semi-bold (600) for grand total

### Layout Structure

1. **Header Bar** (Top Section)
   - Full-width gradient bar with indigo background
   - Logo on the left (white/inverted if colored logo)
   - Invoice title and metadata on the right
   - White text for contrast

2. **Content Section** (Main Body)
   - Two-column layout for "Bill From" and "Bill To"
   - Clean spacing and typography
   - Professional company information display

3. **Items Table**
   - Clean table with subtle borders
   - Light gray header background
   - Alternating row colors on hover (for digital viewing)
   - Right-aligned numbers for easy scanning

4. **Totals Section**
   - Right-aligned container
   - Light gray background box
   - Clear hierarchy with grand total emphasized
   - Indigo accent color for total amount

5. **Footer Section**
   - Two-column grid for payment terms and banking info
   - Subtle top border separator
   - Compact, organized information display

## Key Features

### Professional Header Bar
- Distinctive indigo gradient header that immediately identifies the invoice
- Logo display with automatic white/inverted filter for colored logos
- Clean invoice metadata presentation
- Professional first impression

### Clean Information Architecture
- Clear separation between sections
- Consistent spacing and alignment
- Easy-to-scan layout
- Professional typography hierarchy

### Modern Table Design
- Subtle borders and rounded corners
- Light header background for visual separation
- Clean, readable data presentation
- Right-aligned numbers for easy comparison

### Prominent Totals
- Dedicated totals container with background
- Clear visual hierarchy
- Indigo accent for total amount
- Easy-to-find payment information

### Comprehensive Footer
- Payment terms and notes
- Banking information
- Two-column layout for efficient space use
- Professional, organized presentation

## Use Cases

This template is ideal for:

- **SaaS Companies** - Software subscription businesses
- **Technology Services** - IT consulting, cloud services
- **Digital Agencies** - Web development, digital marketing
- **Professional Services** - Consulting, advisory services
- **B2B Companies** - Business-to-business transactions
- **Modern Startups** - Tech-forward companies

## Technical Specifications

### Page Setup
- **Page Size**: A4 (210mm × 297mm)
- **Margins**: 8mm top, 10mm sides, 20mm bottom
- **Print Margins**: Optimized for standard printers

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
  "layout": "saas-professional",
  "logoPosition": "top-left",
  "primaryColor": "#4F46E5",
  "secondaryColor": "#6366F1",
  "backgroundColor": "#FFFFFF",
  "textColor": "#111827",
  "fontFamily": "Inter, Helvetica Neue, Helvetica, Arial",
  "showTaxBreakdown": true,
  "showPaymentTerms": true,
  "showBankDetails": true
}
```

## Integration

### Template Registration

To use this template, it must be registered in the `TemplateAdapter.tsx`:

```typescript
import { SaaSProfessional } from './SaaSProfessional'

const templateMap: Record<string, TemplateComponent> = {
  'saas-professional': SaaSProfessional,
  // ... other templates
}
```

### Database Configuration

The template should be added to the database with the following configuration:

```sql
INSERT INTO invoice_templates (org_id, name, config_json, is_default) VALUES
(
  NULL,
  'SaaS Professional',
  '{
    "layout": "saas-professional",
    "logoPosition": "top-left",
    "primaryColor": "#4F46E5",
    "secondaryColor": "#6366F1",
    "accentColor": "#6366F1",
    "backgroundColor": "#FFFFFF",
    "textColor": "#111827",
    "fontFamily": "Inter, Helvetica Neue, Helvetica, Arial",
    "fontSize": 10,
    "pagePadding": 0,
    "showTaxBreakdown": true,
    "showPaymentTerms": true,
    "showBankDetails": true,
    "headerBackground": "#4F46E5",
    "tableHeaderBackground": "#F9FAFB",
    "tableColumns": ["DESCRIPTION", "QTY", "UNIT PRICE", "TAX %", "TOTAL"]
  }'::jsonb,
  false
);
```

## File Location

- **Template Component**: `lib/pdf/templates/SaaSProfessional.tsx`
- **Template Adapter**: `lib/pdf/templates/TemplateAdapter.tsx` (needs update)
- **Types**: `lib/pdf/templates/types.ts`

## Best Practices

1. **Logo Usage**: Use a logo with transparent background for best results. The template automatically inverts colored logos to white in the header.

2. **Company Information**: Ensure all company details are complete for a professional appearance.

3. **Item Descriptions**: Keep item descriptions concise but descriptive for optimal table display.

4. **Payment Terms**: Use the notes field for clear payment terms and instructions.

5. **Banking Information**: Include complete banking details for international clients.

## Comparison with Other Templates

| Feature | SaaS Professional | Classic Blue | Modern Minimal |
|---------|-------------------|--------------|----------------|
| Header Style | Gradient bar | Simple border | Minimal line |
| Color Scheme | Indigo/Blue | Blue | Black/Gray |
| Typography | Modern sans-serif | Serif | Sans-serif |
| Table Style | Subtle borders | Bold borders | Minimal borders |
| Totals Display | Boxed container | Gradient box | Right-aligned |
| Best For | SaaS/Tech | Traditional | Creative |

## Future Enhancements

Potential improvements for future versions:

- [ ] Support for subscription billing display
- [ ] Recurring invoice indicators
- [ ] Payment link QR code
- [ ] Multi-currency display
- [ ] Custom branding color override
- [ ] Dark mode variant
- [ ] Additional footer sections

## Support

For questions or issues with this template:

1. Check the main `PDF_TEMPLATES_README.md` for general template information
2. Review the template code in `SaaSProfessional.tsx`
3. Verify template registration in `TemplateAdapter.tsx`
4. Check database configuration matches the expected format

## Version History

- **v1.0** (Initial Release)
  - Professional SAAS design
  - Indigo gradient header
  - Clean table layout
  - Comprehensive footer section
