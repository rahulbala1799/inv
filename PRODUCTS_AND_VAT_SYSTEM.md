# Products and VAT System

## Overview

This document outlines the design and implementation plan for a Products and VAT management system. The system allows users to save frequently used invoice items as reusable products, and manage VAT rates for their organization.

## Goals

1. **Simplify Invoice Creation**: Allow users to save invoice items as products for quick reuse
2. **VAT Management**: Provide a simple way to manage and apply VAT rates
3. **Streamlined UX**: Minimal friction when adding products - ask only when needed
4. **Organization-Scoped**: Products and VAT rates are per-organization

## Database Schema

### 1. Products Table

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  unit_price NUMERIC(12,2) NOT NULL DEFAULT 0,
  vat_rate_id UUID REFERENCES vat_rates(id) ON DELETE SET NULL,
  currency TEXT NOT NULL DEFAULT 'EUR',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(org_id, name)
);

CREATE INDEX idx_products_org_id ON products(org_id);
CREATE INDEX idx_products_is_active ON products(org_id, is_active);
```

**Fields:**
- `id`: Unique identifier
- `org_id`: Organization this product belongs to
- `name`: Product name (required, unique per org)
- `description`: Product description (optional)
- `unit_price`: Default unit price
- `vat_rate_id`: Reference to VAT rate (optional, can be null)
- `currency`: Currency for the price
- `is_active`: Soft delete flag (default: true)
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### 2. VAT Rates Table

```sql
CREATE TABLE vat_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- Auto-generated: "V01", "V02", "V03", etc.
  rate NUMERIC(5,2) NOT NULL, -- e.g., 20.00 for 20%
  is_default BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(org_id, rate) -- Only one VAT rate per percentage per org
);

CREATE INDEX idx_vat_rates_org_id ON vat_rates(org_id);
CREATE INDEX idx_vat_rates_is_active ON vat_rates(org_id, is_active);
```

**Fields:**
- `id`: Unique identifier
- `org_id`: Organization this VAT rate belongs to
- `name`: Auto-generated name (e.g., "V01", "V02", "V03") - system generated based on creation order
- `rate`: VAT percentage (e.g., 20.00 for 20%) - **User only enters this**
- `is_default`: Whether this is the default VAT rate for the org
- `is_active`: Soft delete flag
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

**Name Generation Logic:**
- First VAT rate created: "V01"
- Second VAT rate created: "V02"
- Third VAT rate created: "V03"
- And so on...
- Names are sequential based on creation order per organization

### 3. Update Invoice Items (Optional)

Add optional reference to product:

```sql
ALTER TABLE invoice_items 
ADD COLUMN product_id UUID REFERENCES products(id) ON DELETE SET NULL;
```

This allows tracking which products were used in invoices (optional, for analytics).

## User Flow

### Scenario 1: Adding Invoice Item with Product Save Prompt

1. **User adds invoice item** in the invoice editor
2. **User enters description** (e.g., "Web Development Services")
3. **User enters price and VAT**
4. **After saving the item**, show a subtle prompt:
   - "💾 Save this as a product for quick reuse?"
   - Options: "Save as Product" button | "Not now" (dismiss)

### Scenario 2: Saving Product

1. **User clicks "Save as Product"**
2. **Simple modal opens** with pre-filled data:
   - **Name**: Auto-filled from description (editable)
   - **Description**: Pre-filled from invoice item (editable)
   - **Price**: Pre-filled from unit_price (editable)
   - **VAT Rate**: Dropdown with org's VAT rates (pre-selected if available)
3. **User can edit** any field
4. **User clicks "Save Product"**
5. **Product is saved** and modal closes
6. **Success feedback**: "Product saved!" (toast/notification)

### Scenario 3: Using Saved Product

1. **User adds new invoice item**
2. **User can search/select from saved products** (optional enhancement)
3. **Product details auto-fill**: description, price, VAT rate
4. **User can still edit** before saving to invoice

## UI Components

### 1. Product Save Prompt

**Location**: After invoice item is added/updated

**Design**:
- Subtle toast or inline notification
- Non-intrusive, dismissible
- Only shows once per item (don't show again if dismissed)

**Example**:
```
┌─────────────────────────────────────────┐
│ 💾 Save "Web Development Services" as   │
│    a product for quick reuse?           │
│    [Save as Product]  [Not now]         │
└─────────────────────────────────────────┘
```

### 2. VAT Rate Creation Modal (Simple)

**Trigger**: Clicking "+ Add VAT Rate" in product modal or settings

**Fields**:
- **VAT Percentage** (required, number input)
  - User only enters the percentage (e.g., 20, 5, 0)
  - Format: Number input, accepts decimals (e.g., 20.5 for 20.5%)
  - Validation: Required, >= 0, <= 100
  - System auto-generates name: V01, V02, V03, etc.

**Actions**:
- **Add VAT Rate** (primary button)
- **Cancel** (secondary button)

**Layout**:
```
┌─────────────────────────────────────┐
│ Add VAT Rate                        │
├─────────────────────────────────────┤
│                                     │
│ VAT Percentage *                    │
│ [20                            ] %  │
│                                     │
│ (Will be saved as: V01)            │
│                                     │
│          [Cancel]  [Add VAT Rate]  │
└─────────────────────────────────────┘
```

**Note**: The name preview shows what the system will generate (V01, V02, etc.) based on how many VAT rates already exist.

### 3. Product Modal

**Trigger**: Clicking "Save as Product" from prompt

**Fields**:
- **Name** (required, text input)
  - Auto-filled from description
  - Max length: 100 characters
  - Validation: Required, unique per org
  
- **Description** (optional, textarea)
  - Pre-filled from invoice item description
  - Max length: 500 characters
  
- **Price** (required, number input)
  - Pre-filled from unit_price
  - Format: Currency input with 2 decimals
  - Validation: Required, >= 0
  
- **VAT Rate** (optional, dropdown)
  - Shows organization's VAT rates
  - Format: "V01 (20%)" or "V02 (5%)" - displays auto-generated name with percentage
  - Can be empty (no VAT)
  - Quick add: "+ Add VAT Rate" button opens simple modal to add new percentage

**Actions**:
- **Save Product** (primary button)
- **Cancel** (secondary button)

**Layout**:
```
┌─────────────────────────────────────┐
│ Save Product                         │
├─────────────────────────────────────┤
│                                     │
│ Name *                              │
│ [Web Development Services        ]  │
│                                     │
│ Description                         │
│ [Custom web development...        ]  │
│                                     │
│ Price *                             │
│ [€ 1,500.00                      ]  │
│                                     │
│ VAT Rate                            │
│ [V01 (20%)                    ▼]   │
│ [+ Add VAT Rate]                    │
│                                     │
│          [Cancel]  [Save Product]   │
└─────────────────────────────────────┘
```

## API Endpoints

### Products

#### GET `/api/org/[orgId]/products`
Get all active products for organization
- Query params: `?active=true` (default), `?search=term`
- Returns: Array of products with VAT rate info

#### POST `/api/org/[orgId]/products`
Create new product
- Body: `{ name, description, unit_price, vat_rate_id, currency }`
- Returns: Created product

#### PUT `/api/org/[orgId]/products/[productId]`
Update product
- Body: `{ name, description, unit_price, vat_rate_id, currency, is_active }`
- Returns: Updated product

#### DELETE `/api/org/[orgId]/products/[productId]`
Soft delete product (sets `is_active = false`)
- Returns: Success status

### VAT Rates

#### GET `/api/org/[orgId]/vat-rates`
Get all active VAT rates for organization
- Returns: Array of VAT rates

#### POST `/api/org/[orgId]/vat-rates`
Create new VAT rate
- Body: `{ rate, is_default }` - **name is auto-generated by system**
- Returns: Created VAT rate with auto-generated name
- Note: If `is_default = true`, unset other defaults
- Note: System generates name (V01, V02, etc.) based on existing count + 1

#### PUT `/api/org/[orgId]/vat-rates/[vatRateId]`
Update VAT rate
- Body: `{ rate, is_default, is_active }` - **name cannot be changed (auto-generated)**
- Returns: Updated VAT rate
- Note: Rate percentage can be updated, but name stays the same

#### DELETE `/api/org/[orgId]/vat-rates/[vatRateId]`
Soft delete VAT rate
- Returns: Success status

## Implementation Phases

### Phase 1: Database & Basic Structure
- [ ] Create database migration for `products` table
- [ ] Create database migration for `vat_rates` table
- [ ] Add RLS policies for both tables
- [ ] Create basic API endpoints (GET, POST)

### Phase 2: VAT Rates Management
- [ ] Create simple VAT rate creation UI (just percentage input)
- [ ] Auto-generate VAT rate names (V01, V02, V03, etc.)
- [ ] Allow deleting VAT rates
- [ ] Set default VAT rate per organization
- [ ] Display VAT rates in dropdown as "V01 (20%)" format

### Phase 3: Product Save Flow
- [ ] Add "Save as Product" prompt to invoice editor
- [ ] Create ProductModal component
- [ ] Implement product save API integration
- [ ] Add success/error feedback

### Phase 4: Product Usage (Future Enhancement)
- [ ] Add product search/select when adding invoice items
- [ ] Auto-fill invoice item from product
- [ ] Show product indicator in invoice items list

## VAT Rate Creation

### Simple User Flow
1. User clicks "+ Add VAT Rate" (in product modal or settings)
2. Simple modal opens with just one field:
   - **VAT Percentage** (number input, e.g., 20, 5, 0)
3. User enters percentage and clicks "Add"
4. System automatically:
   - Generates name: "V01", "V02", "V03" (based on creation order)
   - Saves the VAT rate
   - Shows in dropdown as "V01 (20%)"

### Name Generation
- Names are auto-generated sequentially per organization
- Format: "V" + zero-padded number (V01, V02, V03, ... V10, V11, etc.)
- Based on creation order (not rate value)
- Example: If user creates 20% first, then 5%, then 0%:
  - V01 (20%)
  - V02 (5%)
  - V03 (0%)

### No Default Rates
- Users create VAT rates as needed
- No pre-population on org creation
- Simple and clean - user only enters what they need

## Data Migration

For existing organizations:
- No automatic migration needed
- Users can create VAT rates and products as needed
- Existing invoice items remain unchanged

## Security (RLS Policies)

### Products
- **SELECT**: Users can view products for orgs they belong to
- **INSERT**: Users can create products for orgs they belong to
- **UPDATE**: Users can update products for orgs they belong to
- **DELETE**: Users can soft-delete products for orgs they belong to

### VAT Rates
- **SELECT**: Users can view VAT rates for orgs they belong to
- **INSERT**: Users can create VAT rates for orgs they belong to
- **UPDATE**: Users can update VAT rates for orgs they belong to
- **DELETE**: Users can soft-delete VAT rates for orgs they belong to

## UI/UX Considerations

### Simplicity First
- Don't overwhelm users with product management
- Only prompt to save when it makes sense
- Keep the product modal minimal (4 fields max)

### Non-Blocking
- Product save is optional
- Users can dismiss the prompt
- Invoice creation continues normally without products

### Smart Defaults
- Pre-fill all fields from invoice item
- Auto-select appropriate VAT rate if available
- Suggest product name from description

### Future Enhancements
- Product categories
- Product images
- Bulk product import
- Product usage analytics
- Product templates

## File Structure

```
supabase/migrations/
  └── 024_create_products_and_vat_rates.sql

app/api/org/[orgId]/
  ├── products/
  │   ├── route.ts (GET, POST)
  │   └── [productId]/
  │       └── route.ts (PUT, DELETE)
  └── vat-rates/
      ├── route.ts (GET, POST)
      └── [vatRateId]/
          └── route.ts (PUT, DELETE)

components/
  ├── products/
  │   ├── ProductModal.tsx
  │   ├── ProductSavePrompt.tsx
  │   └── ProductSelector.tsx (future)
  └── vat/
      └── VatRateManager.tsx (future)

app/app/org/[orgId]/
  └── products/
      └── page.tsx (future - product management page)
```

## Testing Checklist

### VAT Rates
- [ ] Create VAT rate (just enter percentage)
- [ ] Verify auto-generated name (V01, V02, etc.)
- [ ] Verify unique rate per org (can't have duplicate percentages)
- [ ] Set default VAT rate
- [ ] Update VAT rate percentage
- [ ] Soft delete VAT rate
- [ ] Verify only one default per org
- [ ] Verify RLS policies work

### Products
- [ ] Save product from invoice item
- [ ] Create product manually
- [ ] Update product
- [ ] Soft delete product
- [ ] Verify unique name per org
- [ ] Verify product with VAT rate
- [ ] Verify product without VAT rate
- [ ] Verify RLS policies work

### Integration
- [ ] Product save prompt appears after item save
- [ ] Product modal pre-fills correctly
- [ ] Product saves successfully
- [ ] Success feedback displays
- [ ] Dismissing prompt doesn't show again for same item

## Notes

- **Soft Deletes**: Both products and VAT rates use `is_active` flag for soft deletes
- **Currency**: Products store currency, but for simplicity, we can start with org's default currency
- **VAT Rate Optional**: Products can exist without VAT rate (for flexibility)
- **Unique Names**: Product names are unique per organization
- **Default VAT**: Only one default VAT rate per organization
- **VAT Rate Names**: Auto-generated (V01, V02, etc.) - users never enter names
- **VAT Rate Uniqueness**: Only one VAT rate per percentage per organization (enforced by UNIQUE constraint)
- **Simple UX**: VAT rate creation is just entering a number - system handles the rest
