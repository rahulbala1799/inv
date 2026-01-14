# PDF Invoice Templates System

## Overview

The invoice system uses a template-based approach to generate PDFs. After you edit an invoice in the WYSIWYG editor, the data is sent to the PDF generation system which applies a selected template to create a professional PDF invoice.

## Quick Start: How to Provide a Template

**The easiest way to provide a template:**

1. **Describe your desired design** - Tell me what you want the invoice to look like
2. **Share a visual reference** - Provide a screenshot, mockup, or example invoice design
3. **Specify colors** - Tell me your brand colors (hex codes if you have them)
4. **Describe layout preferences** - Where should the logo go? How should sections be arranged?

**Example:**
> "I want a modern, clean invoice with my logo at the top center. Use blue (#2563EB) as the primary color. The invoice number and dates should be on the right side. Make the totals section stand out with a light gray background."

Once you provide this information, I'll:
- Create the template configuration
- Update the PDF component to use your template
- Add it to the database
- Test it with sample data

**That's it!** You don't need to write any code - just describe what you want.

## Architecture Flow

```
Invoice Editor (WYSIWYGInvoiceEditor.tsx)
    ↓
    [User edits invoice data]
    ↓
PDF Generation API (/api/org/[orgId]/invoices/[invoiceId]/pdf)
    ↓
    [Fetches: invoice, items, branding, template]
    ↓
PDF Template Component (lib/pdf/InvoicePdf.tsx)
    ↓
    [Applies template styling & layout]
    ↓
Generated PDF (using @react-pdf/renderer)
```

## Data Available from Editor

When generating a PDF, the following data is available from the invoice editor:

### Invoice Data (`invoice` object)
- `id` - Invoice UUID
- `invoice_number` - Invoice number (string)
- `status` - Status: 'DRAFT' | 'SENT' | 'PAID' | 'VOID'
- `issue_date` - Issue date (ISO date string)
- `due_date` - Due date (ISO date string, nullable)
- `customer_id` - Customer UUID
- `currency` - Currency code (e.g., 'EUR', 'USD', 'GBP')
- `subtotal` - Subtotal amount (number)
- `tax_total` - Total tax amount (number)
- `total` - Grand total (number)
- `notes` - Additional notes (string, nullable)
- `template_id` - Selected template UUID (nullable)

### Invoice Items (`items` array)
Each item contains:
- `id` - Item UUID (optional)
- `description` - Item description (string)
- `quantity` - Quantity (number)
- `unit_price` - Unit price (number)
- `tax_rate` - Tax rate percentage (number, e.g., 20 for 20%)
- `line_total` - Line total including tax (number)
- `sort_order` - Display order (number)

### Customer Data (`invoice.customers` object)
- `name` - Customer name (string)
- `email` - Customer email (string, nullable)
- `phone` - Customer phone (string, nullable)
- `address_line1` - Address line 1 (string, nullable)
- `address_line2` - Address line 2 (string, nullable)
- `city` - City (string, nullable)
- `postcode` - Postal code (string, nullable)
- `country` - Country (string, nullable)
- `vat_number` - VAT number (string, nullable)

### Organization Branding (`branding` object)
- `business_name` - Your business name (string, nullable)
- `vat_number` - Your VAT number (string, nullable)
- `address_line1` - Your address line 1 (string, nullable)
- `address_line2` - Your address line 2 (string, nullable)
- `city` - Your city (string, nullable)
- `county` - Your county/state (string, nullable)
- `postcode` - Your postal code (string, nullable)
- `country` - Your country (string, nullable)
- `logo_storage_path` - Path to logo in Supabase Storage (string, nullable)
  - **Note**: Logo URL can be generated from `logo_storage_path` using Supabase Storage public URL
- `default_currency` - Default currency (string, default 'EUR')
- `bank_name` - Bank name (string, nullable)
- `bank_account_number` - Account number (string, nullable)
- `bank_sort_code` - Sort code (string, nullable)
- `bank_iban` - IBAN (string, nullable)
- `bank_bic` - BIC/SWIFT (string, nullable)

### Template Configuration (`template.config_json` object)
- `layout` - Layout style: 'classic' | 'modern' | 'minimal' | 'custom'
- `logoPosition` - Logo position: 'top-left' | 'top-center' | 'top-right' | 'header-center'
- `primaryColor` - Primary color (hex code, e.g., '#4F46E5')
- `secondaryColor` - Secondary color (hex code, e.g., '#6B7280')
- `showTaxBreakdown` - Show detailed tax breakdown (boolean)
- `showPaymentTerms` - Show payment terms section (boolean)
- Additional custom properties as needed

## How to Provide Templates

### Method 1: Provide Template Design Specifications

You can provide templates in one of these formats:

#### Option A: Visual Design Reference
Provide:
- **Screenshot or mockup** of the desired invoice layout
- **Description** of the layout structure
- **Color scheme** (primary, secondary, accent colors)
- **Typography preferences** (font families, sizes, weights)
- **Spacing requirements** (margins, padding, gaps)
- **Special elements** (borders, dividers, backgrounds)

#### Option B: JSON Template Configuration
Provide a JSON object with template configuration:

```json
{
  "name": "Your Template Name",
  "layout": "classic|modern|minimal|custom",
  "logoPosition": "top-left|top-center|top-right|header-center",
  "primaryColor": "#4F46E5",
  "secondaryColor": "#6B7280",
  "accentColor": "#10B981",
  "backgroundColor": "#FFFFFF",
  "textColor": "#1F2937",
  "fontFamily": "Helvetica|Times|Courier",
  "headerStyle": {
    "backgroundColor": "#F3F4F6",
    "padding": 20,
    "borderBottom": "2px solid #E5E7EB"
  },
  "showTaxBreakdown": true,
  "showPaymentTerms": true,
  "showBankDetails": true,
  "tableStyle": {
    "headerBackground": "#F9FAFB",
    "borderColor": "#E5E7EB",
    "rowAlternating": true
  },
  "totalsStyle": {
    "backgroundColor": "#F9FAFB",
    "borderTop": "2px solid #1F2937",
    "padding": 15
  },
  "customSections": []
}
```

#### Option C: HTML/CSS Reference
Provide:
- **HTML structure** showing the desired layout
- **CSS styles** showing colors, fonts, spacing
- **Layout description** (flexbox, grid, positioning)

### Method 2: Provide Complete Template Code

If you want to provide a complete React PDF component, you can share:

1. **React PDF Component Code** - A complete `InvoicePDF` component using `@react-pdf/renderer`
2. **Style Definitions** - StyleSheet definitions for the template
3. **Layout Structure** - How elements should be arranged

## Template Structure Requirements

### Required Sections

Every template should include these sections (order and styling can vary):

1. **Header Section**
   - Company logo (if available)
   - Company name and address
   - Invoice title ("INVOICE")
   - Invoice number
   - Issue date
   - Due date

2. **Bill To Section**
   - Customer name
   - Customer address
   - Customer email (optional)
   - Customer VAT number (if applicable)

3. **Items Table**
   - Description column
   - Quantity column
   - Unit Price column
   - Tax % column
   - Total column

4. **Totals Section**
   - Subtotal
   - Tax total
   - Grand total

5. **Footer Section** (optional)
   - Notes
   - Payment terms
   - Bank details

### Template Configuration Properties

When providing a template, specify these properties:

| Property | Type | Description | Example Values |
|----------|------|-------------|----------------|
| `layout` | string | Overall layout style | `"classic"`, `"modern"`, `"minimal"`, `"custom"` |
| `logoPosition` | string | Where to place the logo | `"top-left"`, `"top-center"`, `"top-right"`, `"header-center"` |
| `primaryColor` | string | Primary brand color | `"#4F46E5"` (hex code) |
| `secondaryColor` | string | Secondary color | `"#6B7280"` (hex code) |
| `accentColor` | string | Accent color for highlights | `"#10B981"` (hex code) |
| `backgroundColor` | string | Page background color | `"#FFFFFF"` (hex code) |
| `textColor` | string | Main text color | `"#1F2937"` (hex code) |
| `fontFamily` | string | Font family | `"Helvetica"`, `"Times"`, `"Courier"` |
| `showTaxBreakdown` | boolean | Show detailed tax breakdown | `true`, `false` |
| `showPaymentTerms` | boolean | Show payment terms section | `true`, `false` |
| `showBankDetails` | boolean | Show bank details if available | `true`, `false` |
| `headerStyle` | object | Header styling options | See example above |
| `tableStyle` | object | Table styling options | See example above |
| `totalsStyle` | object | Totals section styling | See example above |

## Example Template Configurations

### Classic Template
```json
{
  "layout": "classic",
  "logoPosition": "top-left",
  "primaryColor": "#4F46E5",
  "secondaryColor": "#6B7280",
  "showTaxBreakdown": true,
  "showPaymentTerms": true,
  "showBankDetails": true,
  "headerStyle": {
    "backgroundColor": "#F3F4F6",
    "padding": 20,
    "borderBottom": "2px solid #E5E7EB"
  },
  "tableStyle": {
    "headerBackground": "#F9FAFB",
    "borderColor": "#E5E7EB"
  }
}
```

### Modern Template
```json
{
  "layout": "modern",
  "logoPosition": "top-center",
  "primaryColor": "#059669",
  "secondaryColor": "#374151",
  "accentColor": "#10B981",
  "showTaxBreakdown": true,
  "showPaymentTerms": true,
  "headerStyle": {
    "backgroundColor": "#ECFDF5",
    "padding": 30,
    "borderBottom": "3px solid #059669"
  },
  "tableStyle": {
    "headerBackground": "#F0FDF4",
    "borderColor": "#D1FAE5",
    "rowAlternating": true
  }
}
```

### Minimal Template
```json
{
  "layout": "minimal",
  "logoPosition": "top-right",
  "primaryColor": "#1F2937",
  "secondaryColor": "#9CA3AF",
  "showTaxBreakdown": false,
  "showPaymentTerms": false,
  "headerStyle": {
    "padding": 15,
    "borderBottom": "1px solid #E5E7EB"
  },
  "tableStyle": {
    "headerBackground": "transparent",
    "borderColor": "#E5E7EB"
  }
}
```

## How to Submit Templates

### Step 1: Choose Your Format
Select one of the methods above (Visual Design, JSON Config, or Complete Code).

### Step 2: Provide Template Details
Include:
- **Template name** (e.g., "Professional Blue", "Elegant Minimal")
- **Template description** (what makes it unique)
- **Target use case** (e.g., "B2B invoices", "Service invoices", "Product invoices")

### Step 3: Specify Layout Preferences
- **Logo placement** - Where should the logo appear?
- **Color scheme** - What colors should be used?
- **Typography** - Any specific font preferences?
- **Spacing** - How much whitespace/padding?
- **Special features** - Any unique elements (watermarks, borders, etc.)?

### Step 4: Share Your Template
You can provide templates by:
1. **Creating a new file** in the project with your template specification
2. **Sharing a JSON file** with the template configuration
3. **Providing a design mockup** (screenshot/image) with annotations
4. **Describing it in detail** in a conversation

## Implementation Process

Once you provide a template:

1. **Template Analysis** - I'll review your template specification
2. **Configuration Creation** - Create the JSON configuration
3. **PDF Component Update** - Update `InvoicePdf.tsx` to support the template
4. **Database Integration** - Add the template to the database (if it's a new template)
5. **Testing** - Test the template with sample invoice data
6. **Documentation** - Document any new template properties

## Current Template Support

**Note**: The template system is currently in development. The PDF component receives template data but needs to be enhanced to fully apply template configurations.

### Currently Implemented:
- ✅ Basic PDF generation with all invoice data
- ✅ Invoice items table
- ✅ Totals calculation
- ✅ Company and customer information display
- ✅ Notes section
- ✅ Template data fetching from database

### To Be Implemented (Based on Your Templates):
- 🔄 Template-based styling (colors, fonts, layouts)
- 🔄 Logo display in PDF
- 🔄 Dynamic layout variations (classic, modern, minimal)
- 🔄 Template-specific styling options
- 🔄 Bank details display in PDF
- 🔄 Payment terms section
- 🔄 Customizable table styles per template

**This is why we need your templates!** Once you provide template specifications, I'll implement the template system to apply your designs to the PDF generation.

## Future Template Features

Planned enhancements:
- 🔄 Multi-page support for long invoices
- 🔄 Custom header/footer sections
- 🔄 Watermark support
- 🔄 QR code for payment links
- 🔄 Barcode support
- 🔄 Multi-language support
- 🔄 Custom field sections
- 🔄 Conditional sections (show/hide based on data)

## Technical Details

### PDF Generation Library
- **Library**: `@react-pdf/renderer`
- **Version**: Latest stable
- **Page Size**: A4 (210mm × 297mm)
- **Default Margins**: 40pt (configurable per template)

### Supported React PDF Components
- `<Document>` - PDF document wrapper
- `<Page>` - Individual page
- `<View>` - Container/view component
- `<Text>` - Text component
- `<Image>` - Image component (for logos)
- `<StyleSheet>` - Style definitions

### Style Limitations
Note: `@react-pdf/renderer` has some limitations compared to web CSS:
- No CSS Grid (use Flexbox instead)
- Limited font support (Helvetica, Times, Courier by default)
- No CSS animations
- Limited border-radius support
- No box-shadow (use borders instead)

## Questions?

If you need help providing a template:
1. Start with a visual mockup or description
2. Specify your color preferences
3. Describe the layout you want
4. Mention any special requirements

I'll help you convert it into a working PDF template!
