# Invoice Template System

## Overview
A complete invoice generation system with multiple professional PDF templates built with React and @react-pdf/renderer.

## Features

### ✅ 4 Professional Templates

1. **Classic Professional** (Blue)
   - Traditional design with clean lines
   - Blue and white color scheme
   - Left-aligned logo
   - Perfect for corporate use

2. **Modern Minimal** (Black/Cyan)
   - Contemporary clean design
   - Right-aligned logo
   - Subtle accents
   - Great for creative agencies

3. **Bold & Creative** (Green)
   - Eye-catching vibrant design
   - Center-aligned logo
   - Green accents
   - Ideal for startups

4. **Elegant Corporate** (Purple)
   - Sophisticated premium look
   - Purple theme
   - Times Roman font
   - Best for luxury services

### 📋 Complete Invoice Editor

- **Organization Details**: Business name, VAT, address
- **Invoice Information**: Number, dates, currency, status
- **Customer Details**: Full contact information
- **Line Items**: Dynamic item management with automatic calculations
- **Notes**: Custom payment terms and notes
- **Bank Details**: Optional payment information
- **Auto-calculations**: Subtotals, tax, and totals

### 🎨 Template Features

Each template includes:
- Customizable colors (primary, secondary, accent)
- Typography settings (font family, sizes)
- Spacing configuration (margins, padding, gaps)
- Layout options (classic, modern, minimal, bold)
- Logo positioning (top-left, top-center, top-right)
- Styling options:
  - Table header backgrounds
  - Row alternating colors
  - Border colors
  - Totals section styling

### 💾 PDF Generation

- Download high-quality PDFs
- A4 page size
- Professional formatting
- Currency support (EUR, USD, GBP)
- Tax calculations
- Multi-item invoices

## File Structure

```
/src
  /lib
    /templates
      templateConfigs.ts     # Template definitions
      InvoicePDF.tsx         # PDF component with template rendering
  /app
    /components
      InvoiceEditor.tsx      # WYSIWYG invoice editor
      TemplateSelector.tsx   # Template selection UI
    App.tsx                  # Main application
```

## How to Use

1. **Edit Invoice**: Fill in your business and customer details
2. **Add Items**: Add line items with quantities, prices, and tax rates
3. **Choose Template**: Select from 4 professional templates
4. **Download PDF**: Generate and download your invoice

## Template Configuration

Each template is fully configurable with:

```typescript
interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  layout: 'classic' | 'modern' | 'minimal' | 'bold';
  logoPosition: 'top-left' | 'top-center' | 'top-right';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    fontFamily: 'Helvetica' | 'Times-Roman' | 'Courier';
    headerSize: number;
    bodySize: number;
  };
  spacing: {
    margin: number;
    padding: number;
    gap: number;
  };
  features: {
    showTaxBreakdown: boolean;
    showPaymentTerms: boolean;
    showBankDetails: boolean;
    showNotes: boolean;
  };
  styling: {
    headerBackground?: string;
    tableHeaderBackground?: string;
    rowAlternating: boolean;
    borderColor: string;
    totalsBackground?: string;
  };
}
```

## Adding New Templates

To add a new template:

1. Open `/src/lib/templates/templateConfigs.ts`
2. Add a new template configuration to `invoiceTemplates` object
3. Customize colors, typography, spacing, and features
4. Template will automatically appear in the selector

## Example Invoice Data

The system comes pre-loaded with sample data:
- Company: Your Creative Studio
- Customer: Acme Corporation Ltd
- Items: Website design, logo design, content writing
- Currency: EUR
- Tax: 20% VAT

## Supported Features

✅ Multiple invoice items
✅ Automatic tax calculations
✅ Multiple currencies (EUR, USD, GBP)
✅ Customer VAT numbers
✅ Bank payment details
✅ Invoice notes and terms
✅ Different invoice statuses (Draft, Sent, Paid, Void)
✅ Fully editable content
✅ Real-time preview
✅ Professional PDF output

## Technologies Used

- **React** - UI framework
- **@react-pdf/renderer** - PDF generation
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

## Color Schemes

### Classic Professional
- Primary: #2563EB (Blue)
- Secondary: #64748B (Slate)
- Accent: #3B82F6 (Light Blue)

### Modern Minimal
- Primary: #0F172A (Dark Slate)
- Secondary: #64748B (Slate)
- Accent: #06B6D4 (Cyan)

### Bold & Creative
- Primary: #059669 (Green)
- Secondary: #374151 (Gray)
- Accent: #10B981 (Emerald)

### Elegant Corporate
- Primary: #7C3AED (Purple)
- Secondary: #6B7280 (Gray)
- Accent: #8B5CF6 (Violet)

## Future Enhancements

Potential additions:
- Logo upload support
- Multi-page invoices
- QR code for payments
- Multiple languages
- Custom fields
- Invoice history
- Client portal
- Email integration
- Payment gateway integration

## License

This is a demonstration project showcasing PDF invoice template generation.
