# Generate Invoice Page - Feature Documentation

## Overview

The Generate Invoice page is a dedicated full-page interface for previewing, customizing, and generating invoice PDFs. This page replaces the previous modal-based PDF preview and provides a more immersive experience for template selection and invoice customization.

## Route Structure

**Path**: `/app/org/[orgId]/invoices/[invoiceId]/generate`

This page is accessed by clicking the **"Generate Invoice"** button (previously labeled "Generate PDF") on the invoice editor page.

## Page Layout

### Main Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    Main Navigation Bar                       │
│  [Back to Invoice] [Invoice Details] [Actions]              │
└─────────────────────────────────────────────────────────────┘
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                                                     │    │
│  │         Invoice Preview (Center Frame)             │    │
│  │         - A4 Page Display                          │    │
│  │         - Template Applied                         │    │
│  │         - Scrollable for Multi-Page Invoices       │    │
│  │                                                     │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌──────────────────┐  ┌─────────────────────────────────┐ │
│  │  Quick Actions   │  │  Template Customization         │ │
│  │                  │  │                                 │ │
│  │  [Edit]          │  │  Font Style: [Normal|Classic|..]│ │
│  │  [Template]      │  │  Font Size: [normal|small|..]  │ │
│  │  [Download]      │  │  Color Palette: [swatches]     │ │
│  │  [Duplicate]     │  │                                 │ │
│  │  [Delete]        │  │                                 │ │
│  └──────────────────┘  └─────────────────────────────────┘ │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Key Features

### 1. Navigation Bar

The top navigation bar includes:

- **Back to Invoice Button**: Returns to the invoice editor page (`/app/org/[orgId]/invoices/[invoiceId]`)
- **Main Navigation**: Standard app navigation (sidebar or top nav, depending on app structure)
- **Invoice Context**: Displays invoice number and status for reference

### 2. Center Preview Frame

The main content area displays the invoice preview:

- **A4 Page Format**: Each page is rendered as an A4-sized frame (210mm × 297mm)
- **Template Applied**: The currently selected template is applied to the preview
- **Multi-Page Support**: For long invoices, multiple A4 pages are displayed vertically
- **Scrollable**: Users can scroll through all pages of the invoice
- **Real-time Updates**: Preview updates when template or customization options change

**Technical Implementation**:
- Uses an iframe or embedded PDF viewer to display the invoice
- Source: `/api/org/[orgId]/invoices/[invoiceId]/pdf?template=[templateId]`
- Responsive sizing maintains A4 aspect ratio

### 3. Quick Actions Sidebar

Located on the right side of the page, provides quick access to common actions:

#### Actions Available:

1. **Edit / Modify Details**
   - Icon: Pencil
   - Action: Navigate back to invoice editor page
   - Route: `/app/org/[orgId]/invoices/[invoiceId]`

2. **Template / Change Style** (Highlighted/Primary Action)
   - Icon: Layered document/style sheet
   - Action: Opens template selection gallery (see Templates Folder section)
   - Visual: Yellow-highlighted button to indicate active/primary action

3. **Download / Save as PDF**
   - Icon: Downward arrow
   - Action: Downloads the current invoice as PDF
   - Endpoint: `/api/org/[orgId]/invoices/[invoiceId]/pdf?download=true&template=[templateId]`

4. **Duplicate / Make a Copy**
   - Icon: Duplicate/copy icon
   - Action: Creates a copy of the current invoice
   - Opens duplicate invoice in editor

5. **Delete Invoice** (Destructive Action)
   - Icon: Trash can
   - Action: Deletes the invoice (with confirmation dialog)
   - Visual: Red-highlighted button to indicate destructive action

### 4. Template Customization Panel

Located below Quick Actions, provides real-time customization options:

#### Font Style Options
- **Normal** (default, currently selected)
- **Classic**
- **Round**
- **Presentation**: Segmented controls or radio buttons
- **Behavior**: Updates preview in real-time

#### Font Size Options
- **normal** (default, currently selected)
- **small**
- **Medium**
- **Presentation**: Segmented controls or radio buttons
- **Behavior**: Updates preview in real-time

#### Color Palette
Displays color swatches for the current template:

- **Primary**: Dark blue/purple (main accent color)
- **Secondary**: Yellow (highlight color)
- **Background**: White
- **Neutral**: Grey
- **Heading**: Dark purple
- **Body**: Dark grey
- **Accent**: Yellow

**Behavior**: 
- Shows current template colors
- Clicking a swatch may open color picker (future enhancement)
- Changes reflect in preview immediately

### 5. Templates Folder / Gallery

When the **"Template"** button is clicked, a template gallery opens:

#### Gallery Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Template Gallery                                            │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐              │
│  │ Template│ │ Template│ │ Template│ │ Template│            │
│  │  Thumb  │ │  Thumb  │ │  Thumb  │ │  Thumb  │            │
│  │  [Name] │ │  [Name] │ │  [Name] │ │  [Name] │            │
│  └────────┘ └────────┘ └────────┘ └────────┘              │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐              │
│  │ Template│ │ Template│ │ Template│ │ Template│            │
│  │  Thumb  │ │  Thumb  │ │  Thumb  │ │  Thumb  │            │
│  │  [Name] │ │  [Name] │ │  [Name] │ │  [Name] │            │
│  └────────┘ └────────┘ └────────┘ └────────┘              │
└─────────────────────────────────────────────────────────────┘
```

#### Gallery Features

- **Thumbnail Grid**: Displays all available invoice templates as thumbnails
- **Template Names**: Each thumbnail shows the template name
- **Selection**: Clicking or touching a template thumbnail:
  1. Closes the gallery
  2. Loads the selected template in the center preview frame
  3. Updates the preview to show the invoice with the new template
  4. Applies the template's default customization settings
- **Current Selection**: The currently selected template is highlighted or marked
- **Responsive**: Grid adapts to screen size (mobile-friendly)

#### Template Thumbnail Generation

- Thumbnails can be:
  - Pre-generated static images stored in the database/storage
  - Dynamically generated from template previews
  - Screenshots of template examples
- Size: Recommended 200x280px (maintains A4 aspect ratio)

## User Flow

### Flow 1: Opening Generate Invoice Page

```
1. User is on Invoice Editor page
   └─> Clicks "Generate Invoice" button
       └─> Navigates to /app/org/[orgId]/invoices/[invoiceId]/generate
           └─> Page loads with:
               - Current invoice data
               - Default or previously selected template
               - Preview frame showing invoice with template applied
```

### Flow 2: Selecting a Template

```
1. User clicks "Template" button in Quick Actions
   └─> Template gallery opens (overlay or sidebar)
       └─> User browses thumbnails
           └─> User clicks/touches a template thumbnail
               └─> Gallery closes
                   └─> Preview frame updates with new template
                       └─> Customization panel updates to show template's settings
```

### Flow 3: Customizing Template

```
1. User adjusts Font Style, Font Size, or Color Palette
   └─> Preview frame updates in real-time
       └─> Changes are applied to the displayed invoice
           └─> User can continue adjusting or download
```

### Flow 4: Downloading Invoice

```
1. User clicks "Download" button
   └─> PDF is generated with current template and settings
       └─> Browser downloads the PDF file
           └─> Filename: invoice-[invoice_number].pdf
```

## Technical Implementation Details

### Page Component Structure

**File**: `app/app/org/[orgId]/invoices/[invoiceId]/generate/page.tsx`

```typescript
// Server Component
export default async function GenerateInvoicePage({
  params,
}: {
  params: Promise<{ orgId: string; invoiceId: string }>
}) {
  // Fetch invoice data
  // Fetch templates
  // Fetch branding
  // Return client component with data
}
```

**Client Component**: `components/invoices/GenerateInvoicePage.tsx`

```typescript
'use client'

export default function GenerateInvoicePage({
  invoice,
  items,
  templates,
  branding,
  orgId,
  invoiceId,
}: GenerateInvoicePageProps) {
  // State management
  // Template selection
  // Preview rendering
  // Customization controls
}
```

### API Endpoints Used

1. **PDF Preview**: `GET /api/org/[orgId]/invoices/[invoiceId]/pdf?template=[templateId]`
   - Returns PDF for preview in iframe
   - Content-Type: `application/pdf`
   - Content-Disposition: `inline`

2. **PDF Download**: `GET /api/org/[orgId]/invoices/[invoiceId]/pdf?download=true&template=[templateId]`
   - Returns PDF for download
   - Content-Type: `application/pdf`
   - Content-Disposition: `attachment`

3. **Update Template**: `PUT /api/org/[orgId]/invoices/[invoiceId]`
   - Updates invoice with selected template_id
   - Body: `{ template_id: string }`

### State Management

The page manages the following state:

- `selectedTemplateId`: Currently selected template
- `customizationSettings`: Font style, size, colors (if customizable)
- `isTemplateGalleryOpen`: Whether template gallery is visible
- `isLoading`: Loading state for preview updates

### Template Gallery Component

**File**: `components/invoices/TemplateGallery.tsx`

Features:
- Grid layout for template thumbnails
- Click handler for template selection
- Visual indication of currently selected template
- Responsive design (mobile-friendly)

### Preview Frame Component

**File**: `components/invoices/InvoicePreviewFrame.tsx`

Features:
- A4-sized iframe or PDF viewer
- Handles multi-page invoices
- Loading states
- Error handling

## Design Specifications

### Layout Dimensions

- **Preview Frame**: 
  - Width: Max 794px (A4 width at 96 DPI)
  - Height: Min 1123px (A4 height at 96 DPI)
  - Aspect Ratio: Maintained at all screen sizes
  - Centered on page

- **Sidebar Width**: 
  - Desktop: 320px
  - Tablet: 280px
  - Mobile: Full width (stacked below preview)

### Color Scheme

- **Primary Background**: Light grey (`bg-gray-50`)
- **Preview Container**: White with shadow
- **Sidebar**: White cards with borders
- **Active Button**: Yellow highlight (as shown in image)
- **Destructive Button**: Red highlight

### Responsive Breakpoints

- **Desktop**: Side-by-side layout (preview + sidebar)
- **Tablet**: Side-by-side with adjusted widths
- **Mobile**: Stacked layout (preview on top, sidebar below)

## Integration Points

### Changes Required in Invoice Editor

**File**: `components/invoices/WYSIWYGInvoiceEditor.tsx`

1. **Button Text Change**:
   ```tsx
   // Change from:
   Generate PDF
   // To:
   Generate Invoice
   ```

2. **Button Action Change**:
   ```tsx
   // Change from:
   onClick={() => setTemplateModalOpen(true)}
   // To:
   <Link href={`/app/org/${orgId}/invoices/${invoiceId}/generate`}>
     <Button>Generate Invoice</Button>
   </Link>
   ```

3. **Remove Modal Components**:
   - Remove `PDFPreviewModal` usage
   - Remove `TemplateSelectionModal` usage (or repurpose for gallery)
   - Keep template selection logic for editor page if needed

## Database Considerations

### Template Thumbnails

Options for storing template thumbnails:

1. **Storage Path in Database**:
   - Add `thumbnail_path` column to `invoice_templates` table
   - Store thumbnails in Supabase Storage
   - Reference path in database

2. **Generated Thumbnails**:
   - Generate thumbnails on-the-fly from template previews
   - Cache generated thumbnails

3. **Default Thumbnails**:
   - Use placeholder images for templates without thumbnails
   - Generate thumbnails asynchronously

## Future Enhancements

1. **Real-time Color Customization**: 
   - Color picker for each palette swatch
   - Live preview updates

2. **Template Search/Filter**:
   - Search templates by name
   - Filter by category or style

3. **Template Preview on Hover**:
   - Show larger preview when hovering over thumbnail
   - Quick preview without selecting

4. **Save Customization Presets**:
   - Save custom font/color combinations
   - Apply presets to multiple invoices

5. **Multi-Template Comparison**:
   - Side-by-side comparison of templates
   - A/B testing interface

## Testing Checklist

- [ ] Navigation to Generate Invoice page works
- [ ] Back button returns to invoice editor
- [ ] Preview frame displays invoice correctly
- [ ] Template gallery opens and closes properly
- [ ] Template selection updates preview
- [ ] Font style changes update preview
- [ ] Font size changes update preview
- [ ] Download button generates and downloads PDF
- [ ] Multi-page invoices display correctly
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Loading states display correctly
- [ ] Error handling for failed template loads
- [ ] Template thumbnails load correctly
- [ ] Quick actions work as expected

## Related Files

- `app/app/org/[orgId]/invoices/[invoiceId]/page.tsx` - Invoice editor page
- `components/invoices/WYSIWYGInvoiceEditor.tsx` - Invoice editor component
- `components/invoices/PDFPreviewModal.tsx` - Current modal (to be replaced)
- `components/invoices/TemplateSelectionModal.tsx` - Template selection (to be repurposed)
- `app/api/org/[orgId]/invoices/[invoiceId]/pdf/route.ts` - PDF generation API
- `lib/pdf/InvoiceHtmlTemplate.tsx` - PDF template component

## Notes

- The page maintains the same security and access controls as the invoice editor
- All template changes are saved to the invoice when a template is selected
- The preview uses the same PDF generation logic as the download
- Template customization (font/style) may be template-specific (some templates may not support all options)
