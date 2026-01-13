# WYSIWYG Invoice Editor Integration Plan

## Overview

The design bundle contains a complete WYSIWYG invoice editor that perfectly matches your requirements. This document outlines how to integrate it into the Next.js app.

## Design Analysis

### ✅ What We Have

1. **Complete WYSIWYG Invoice Editor** (`InvoiceEditor.tsx`)
   - Invoice-like layout from the start
   - All fields editable inline
   - Real-time calculations
   - Auto-save functionality
   - Missing fields tracking

2. **Inline Editing Components**
   - `InlineEditableText` - Text fields (click to edit)
   - `InlineEditableNumber` - Numeric fields
   - `InlineEditableMoney` - Currency fields
   - `InlineEditableDate` - Date picker
   - `InlineCustomerSelect` - Customer dropdown

3. **UI Components** (shadcn/ui style)
   - Button, Popover, Calendar, Command, etc.
   - All using Radix UI primitives
   - Tailwind CSS styling

4. **Features**
   - Missing fields summary with click-to-focus
   - Auto-save with status indicator
   - Professional invoice layout
   - Hover states and visual feedback

## Integration Strategy

### Phase 1: Install Dependencies

**Required packages:**
```bash
npm install date-fns lucide-react @radix-ui/react-popover @radix-ui/react-calendar class-variance-authority clsx tailwind-merge
```

**Optional (for better UX):**
```bash
npm install cmdk  # For command palette (customer search)
```

### Phase 2: Copy UI Components

Copy these to `components/ui/`:
- `button.tsx`
- `popover.tsx`
- `calendar.tsx`
- `command.tsx` (for customer search)
- `utils.ts` (cn function)

### Phase 3: Adapt Invoice Components

**Adapt these components for Next.js:**

1. **InlineEditableText** → `components/invoices/InlineEditableText.tsx`
   - ✅ Already compatible
   - Minor: Update import paths

2. **InlineEditableNumber** → `components/invoices/InlineEditableNumber.tsx`
   - ✅ Already compatible

3. **InlineEditableMoney** → `components/invoices/InlineEditableMoney.tsx`
   - ✅ Already compatible
   - Update currency symbol to use invoice currency

4. **InlineEditableDate** → `components/invoices/InlineEditableDate.tsx`
   - ✅ Already compatible
   - Uses date-fns (need to install)

5. **InlineCustomerSelect** → `components/invoices/InlineCustomerSelect.tsx`
   - ✅ Already compatible
   - Connect to real customers from Supabase

6. **MissingFieldsSummary** → `components/invoices/MissingFieldsSummary.tsx`
   - ✅ Already compatible

### Phase 4: Adapt InvoiceEditor Component

**Key Adaptations Needed:**

1. **Data Structure Mapping**
   ```typescript
   // Design uses:
   interface InvoiceDraft {
     invoiceNumber: string;
     issueDate: Date;
     dueDate: Date;
     company: CompanyInfo;
     billTo: BillToInfo;
     items: InvoiceItem[];
     notes: string;
   }

   // Our DB has:
   - invoice_number (text)
   - issue_date (date)
   - due_date (date)
   - org_branding (for company info)
   - customers (for billTo)
   - invoice_items (for items)
   - notes (text)
   ```

2. **Data Loading**
   - Load invoice from Supabase
   - Load org branding
   - Load customer data
   - Map to InvoiceDraft structure

3. **Auto-Save Integration**
   - Replace mock auto-save with real API calls
   - Use debounced save to `/api/org/[orgId]/invoices/[invoiceId]`
   - Show save status

4. **Company Info**
   - Load from `org_branding` table
   - Allow editing (save to org_branding)

5. **Customer Selection**
   - Load from `customers` table (org-scoped)
   - Auto-fill customer details when selected

6. **Invoice Items**
   - Map to/from `invoice_items` table
   - Real-time calculation of totals
   - Auto-save on change

## File Structure After Integration

```
components/
├── ui/                          # shadcn/ui components
│   ├── button.tsx
│   ├── popover.tsx
│   ├── calendar.tsx
│   ├── command.tsx
│   └── utils.ts
└── invoices/
    ├── InvoiceEditor.tsx        # Main WYSIWYG editor
    ├── InlineEditableText.tsx
    ├── InlineEditableNumber.tsx
    ├── InlineEditableMoney.tsx
    ├── InlineEditableDate.tsx
    ├── InlineCustomerSelect.tsx
    └── MissingFieldsSummary.tsx
```

## Data Flow

### Loading Invoice
1. Server component fetches:
   - Invoice data
   - Invoice items
   - Customer data
   - Org branding
2. Maps to `InvoiceDraft` structure
3. Passes to `InvoiceEditor` client component

### Saving Changes
1. User edits field inline
2. Component updates local state
3. Debounced auto-save (500ms)
4. Calls API route to save
5. Updates save status

### API Integration
- `PUT /api/org/[orgId]/invoices/[invoiceId]` - Save invoice
- `GET /api/org/[orgId]/invoices/[invoiceId]` - Load invoice
- Auto-save on field blur/change

## Styling Considerations

### Current Design Uses:
- Tailwind CSS 4.x (we have 3.x)
- Custom theme colors
- Specific spacing/layout

### Adaptations:
- Update Tailwind config if needed
- Ensure colors match (indigo theme)
- Test responsive behavior

## Key Features to Preserve

1. ✅ **WYSIWYG Layout** - Invoice looks like invoice
2. ✅ **Inline Editing** - Click any field to edit
3. ✅ **Real-time Calculations** - Totals update instantly
4. ✅ **Auto-save** - Changes save automatically
5. ✅ **Missing Fields Tracking** - Shows what's incomplete
6. ✅ **Professional Appearance** - Clean, invoice-like design

## Implementation Steps

### Step 1: Install Dependencies
```bash
npm install date-fns lucide-react @radix-ui/react-popover @radix-ui/react-calendar class-variance-authority clsx tailwind-merge cmdk
```

### Step 2: Copy UI Components
- Copy shadcn/ui components to `components/ui/`
- Ensure they work with Tailwind 3.x

### Step 3: Copy Invoice Components
- Copy inline editing components
- Update import paths for Next.js
- Adapt currency handling

### Step 4: Create Adapted InvoiceEditor
- Map Supabase data to InvoiceDraft
- Connect to real API endpoints
- Implement auto-save
- Connect to org branding

### Step 5: Replace Current Editor
- Update `/app/org/[orgId]/invoices/[invoiceId]/page.tsx`
- Use new InvoiceEditor component
- Test all functionality

### Step 6: Polish & Test
- Test inline editing
- Test auto-save
- Test calculations
- Test customer selection
- Test date pickers

## Compatibility Check

### ✅ Compatible
- React 18 (matches our version)
- TypeScript
- Tailwind CSS (may need minor updates)
- Next.js 14 App Router (client components work)

### ⚠️ Needs Attention
- Tailwind 4.x → 3.x (may need config updates)
- Import paths (update for Next.js structure)
- Currency handling (adapt to invoice currency)
- Date handling (ensure timezone consistency)

## Estimated Integration Time

- **Phase 1-2**: 30 minutes (dependencies + UI components)
- **Phase 3**: 1 hour (adapt invoice components)
- **Phase 4**: 2 hours (integrate with Supabase)
- **Phase 5**: 30 minutes (replace current editor)
- **Phase 6**: 1 hour (testing & polish)

**Total: ~5 hours**

## Next Steps

1. Review this plan
2. Start with dependency installation
3. Copy and adapt components one by one
4. Test incrementally
5. Replace current editor when ready

---

**Status**: Design is fully compatible and ready for integration! 🎉
