# Onboarding Flow Documentation

## Overview

The onboarding flow is a guided setup process that new users complete immediately after signing up. It ensures that organizations are properly configured with essential business information before users can start creating invoices.

## Flow Architecture

### User Journey

```
Signup → Email Verification → Onboarding → Dashboard
```

1. **Signup**: User creates account via `/signup`
2. **Email Verification**: User confirms email (if enabled)
3. **Onboarding**: New users are redirected to `/onboarding` to complete setup
4. **Dashboard**: After onboarding completion, users are redirected to their organization dashboard

### Onboarding Detection

The system determines if a user needs onboarding by checking:
- Whether the user has completed onboarding (stored in user metadata or organization branding)
- Whether the organization has essential settings configured (business name, address)

## Onboarding Steps

### Step 1: Organization Setup

The first step collects essential business information required for invoice generation.

#### Required Fields
- **Business Name**: The legal name of the business/organization
  - Validation: Must not be empty, minimum 2 characters

#### Optional Fields
- **Address Line 1**: Primary street address
- **Address Line 2**: Additional address information (suite, unit, etc.)
- **City**: City name
- **County/State**: County or state name
- **Postcode**: Postal/ZIP code
- **Country**: Country name

#### Default Currency Selection

The onboarding includes a required currency selection:

- **Default Currency**: The primary currency for invoices and transactions
  - **Required field**
  - **Searchable dropdown** component
  - Includes all major world currencies (EUR, USD, GBP, CAD, AUD, JPY, CHF, etc.)
  - Users can type to search/filter currencies
  - Default value: EUR (Euro)
  - Format: Display currency code and name (e.g., "EUR - Euro", "USD - US Dollar")

**Currency List**: The dropdown should include all ISO 4217 currency codes with their full names for easy identification.

#### VAT Configuration

The onboarding includes a critical VAT setup question:

1. **Do you charge VAT?** (Yes/No radio buttons)
   - This is a required field
   - Determines whether VAT-related fields are shown

2. **If "Yes" is selected:**
   - Show VAT Number field
   - VAT Number is **optional** (user can skip for now)
   - Placeholder: "Enter your VAT number (optional)"
   - Help text: "You can add this later in settings"

3. **If "No" is selected:**
   - Hide VAT Number field completely
   - No VAT-related questions are shown

#### Data Storage

All organization settings are stored in the `org_branding` table:
- `business_name` (required)
- `address_line1`, `address_line2`, `city`, `county`, `postcode`, `country` (optional)
- `default_currency` (required, defaults to 'EUR' if not specified)
- `charges_vat` (boolean, new field to be added)
- `vat_number` (optional, only if `charges_vat` is true)

### Step 2: Customer Setup (Optional)

After completing organization setup, users are asked if they want to set up their first customer.

#### Customer Setup Prompt

- **Question**: "Would you like to add your first customer now?"
- **Options**: 
  - "Yes, add a customer" button
  - "Skip for now" button

#### If User Chooses to Add Customer

Display a simplified customer creation form with:
- **Customer Name** (required)
- **Email** (optional)
- **Phone** (optional)
- **Address** fields (optional)
- **VAT Number** (optional, only shown if organization charges VAT)

After customer creation:
- Show success message
- Proceed to dashboard

#### If User Chooses to Skip

- Show message: "No problem! You can add customers anytime from the dashboard."
- Proceed directly to dashboard

## Implementation Details

### Database Schema Changes

#### New Field: `charges_vat`

Add to `org_branding` table:
```sql
ALTER TABLE org_branding 
ADD COLUMN charges_vat BOOLEAN DEFAULT FALSE;
```

This field indicates whether the organization charges VAT, which:
- Controls VAT number field visibility
- Affects invoice calculations
- Determines VAT-related UI elements

### Currency Dropdown Implementation

#### Component Requirements

The currency selection should use a searchable dropdown component (e.g., shadcn/ui Command component or similar):

**Features:**
- **Searchable**: Users can type to filter currencies
- **Keyboard Navigation**: Arrow keys to navigate, Enter to select
- **Display Format**: "CODE - Name" (e.g., "EUR - Euro", "USD - US Dollar")
- **Default Value**: EUR (Euro) pre-selected
- **Accessible**: Proper ARIA labels and keyboard support

**Currency Data Structure:**
```typescript
interface Currency {
  code: string;      // ISO 4217 code (e.g., "EUR", "USD")
  name: string;      // Full name (e.g., "Euro", "US Dollar")
  symbol?: string;   // Currency symbol (e.g., "€", "$")
}
```

**Supported Currencies:**
The dropdown should include all major currencies, including but not limited to:
- EUR (Euro)
- USD (US Dollar)
- GBP (British Pound)
- CAD (Canadian Dollar)
- AUD (Australian Dollar)
- JPY (Japanese Yen)
- CHF (Swiss Franc)
- CNY (Chinese Yuan)
- INR (Indian Rupee)
- And other ISO 4217 currencies

**Implementation Notes:**
- Use a combobox/command pattern for searchable dropdown
- Filter currencies as user types
- Highlight matching text in results
- Show currency code prominently for quick identification
- Store only the currency code (e.g., "EUR") in the database

### Routing Logic

#### Onboarding Route Protection

The `/onboarding` route:
- Requires authentication
- Checks if user has completed onboarding
- Redirects to dashboard if already completed
- Only accessible for new users

#### Post-Signup Redirect

Modify signup flow:
- After successful signup → redirect to `/onboarding` (instead of `/app`)
- After onboarding completion → redirect to `/app/org/{orgId}/dashboard`

#### Middleware Updates

Update middleware to:
- Allow access to `/onboarding` for authenticated users
- Check onboarding completion status
- Redirect appropriately based on completion state

### Component Structure

```
/onboarding
  ├── page.tsx (main onboarding page)
  ├── actions.ts (server actions for onboarding)
  └── components/
      ├── OrganizationSetupStep.tsx
      ├── CustomerSetupStep.tsx
      ├── OnboardingProgress.tsx
      └── CurrencySelect.tsx (searchable currency dropdown)
```

### State Management

The onboarding flow uses:
- **Server Actions**: For data persistence
- **URL State**: For step navigation (optional, can use client state)
- **Form State**: React state for form inputs and validation

### Validation Rules

#### Organization Setup
- Business name: Required, 2-100 characters
- Default currency: Required, must be valid ISO 4217 currency code
- Address fields: Optional, but if provided, validate format
- VAT question: Required (must select Yes or No)
- VAT number: Optional if charges_vat is true, not shown if false

#### Customer Setup
- Customer name: Required, 2-100 characters
- Email: Optional, but if provided, must be valid email format
- Phone: Optional, validate format if provided
- Address fields: Optional

### Error Handling

- **Validation Errors**: Display inline with form fields
- **Server Errors**: Show error banner at top of form
- **Network Errors**: Retry mechanism with user-friendly message
- **Session Expiry**: Redirect to login with appropriate message

## UI Design & User Experience

### Design Philosophy

The onboarding experience should feel **polished, modern, and welcoming**. It's the first impression users have of the application, so it must be exceptional. The design should be:

- **Simple**: Clean, uncluttered interface that doesn't overwhelm
- **Polished**: Smooth animations, professional styling, attention to detail
- **Modern**: Using Next.js and React components extensively, not plain HTML
- **Guided**: Clear progress indication and helpful guidance
- **Delightful**: Subtle animations and micro-interactions that make it enjoyable

### Visual Design

#### Layout Structure

**Main Container:**
```tsx
<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
  <div className="container mx-auto px-4 py-8 md:py-16">
    <div className="max-w-2xl mx-auto">
      {/* Onboarding content */}
    </div>
  </div>
</div>
```

- **Full-height gradient background**: Soft blue-to-indigo gradient (`bg-gradient-to-br from-blue-50 via-white to-indigo-50`)
- **Centered container**: Max width of 2xl for optimal reading
- **Responsive padding**: More padding on desktop, less on mobile

#### Card Design

**Main Content Card:**
```tsx
<Card className="bg-white shadow-xl rounded-2xl p-8 md:p-12">
  {/* Step content */}
</Card>
```

- **Elevated card**: White background with shadow-xl for depth
- **Rounded corners**: Large border radius (rounded-2xl) for modern feel
- **Generous padding**: Comfortable spacing inside the card
- **Smooth transitions**: All interactions should have transition effects

#### Typography

**Page Title:**
```tsx
<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
  Welcome! Let's get you set up
</h1>
<p className="text-lg text-gray-600 mb-8">
  We'll help you configure your account in just a few steps
</p>
```

- **Large, bold headings**: Create hierarchy and importance
- **Warm, friendly copy**: Use welcoming language
- **Clear hierarchy**: Different sizes for different importance levels

**Step Titles:**
```tsx
<h2 className="text-2xl font-semibold text-gray-900 mb-2">
  Organization Details
</h2>
<p className="text-gray-600 mb-6">
  Tell us about your business
</p>
```

### Progress Indicator

**Visual Progress Component:**
```tsx
<div className="mb-8">
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
        1
      </div>
      <span className="font-medium text-gray-900">Organization</span>
    </div>
    <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-semibold">
        2
      </div>
      <span className="font-medium text-gray-500">Customer</span>
    </div>
  </div>
</div>
```

- **Step numbers**: Circular badges showing current step
- **Connecting line**: Visual connection between steps
- **Active state**: Indigo for current, gray for upcoming
- **Completed state**: Green checkmark for completed steps
- **Smooth transitions**: Animate between steps

### Form Design

#### Input Fields

**Modern Input Component:**
```tsx
<div className="space-y-2">
  <Label htmlFor="business_name" className="text-sm font-medium text-gray-700">
    Business Name <span className="text-red-500">*</span>
  </Label>
  <Input
    id="business_name"
    name="business_name"
    placeholder="Enter your business name"
    className="h-12 text-base"
    required
  />
  {error && (
    <p className="text-sm text-red-600 flex items-center gap-1">
      <AlertCircle className="w-4 h-4" />
      {error}
    </p>
  )}
</div>
```

- **Large input fields**: Height of 12 (48px) for better touch targets
- **Clear labels**: Bold labels with required indicators
- **Inline validation**: Show errors directly below fields
- **Icon support**: Use lucide-react icons for visual feedback
- **Focus states**: Clear focus rings using Tailwind focus utilities

#### Currency Dropdown

**Searchable Currency Select:**
```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      role="combobox"
      className="w-full h-12 justify-between text-left font-normal"
    >
      <span>{selectedCurrency ? `${selectedCurrency.code} - ${selectedCurrency.name}` : "Select currency..."}</span>
      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-full p-0" align="start">
    <Command>
      <CommandInput placeholder="Search currency..." />
      <CommandList>
        <CommandEmpty>No currency found.</CommandEmpty>
        <CommandGroup>
          {currencies.map((currency) => (
            <CommandItem
              key={currency.code}
              value={`${currency.code} ${currency.name}`}
              onSelect={() => handleSelect(currency)}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  selectedCurrency?.code === currency.code ? "opacity-100" : "opacity-0"
                )}
              />
              <div className="flex items-center gap-2">
                <span className="font-medium">{currency.code}</span>
                <span className="text-gray-500">-</span>
                <span>{currency.name}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>
```

- **Command component**: Use shadcn/ui Command for searchable dropdown
- **Visual feedback**: Checkmark for selected item
- **Keyboard navigation**: Full keyboard support
- **Search functionality**: Real-time filtering as user types
- **Professional appearance**: Matches overall design system

#### Radio Button Group (VAT Question)

**Styled Radio Group:**
```tsx
<RadioGroup value={chargesVat} onValueChange={setChargesVat} className="space-y-3">
  <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-300 transition-colors cursor-pointer">
    <RadioGroupItem value="yes" id="vat-yes" />
    <Label htmlFor="vat-yes" className="flex-1 cursor-pointer font-medium">
      Yes, I charge VAT
    </Label>
  </div>
  <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-300 transition-colors cursor-pointer">
    <RadioGroupItem value="no" id="vat-no" />
    <Label htmlFor="vat-no" className="flex-1 cursor-pointer font-medium">
      No, I don't charge VAT
    </Label>
  </div>
</RadioGroup>
```

- **Card-style options**: Each option is a card, not just a radio button
- **Hover effects**: Border color changes on hover
- **Large touch targets**: Easy to click/tap
- **Clear labels**: Descriptive text for each option
- **Smooth transitions**: Border color transitions smoothly

### Buttons

#### Primary Action Button

```tsx
<Button
  type="submit"
  size="lg"
  className="w-full md:w-auto px-8 h-12 text-base font-semibold"
  disabled={isPending}
>
  {isPending ? (
    <>
      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      Saving...
    </>
  ) : (
    "Continue"
  )}
</Button>
```

- **Large size**: Height of 12 (48px) for prominence
- **Full width on mobile**: Better mobile UX
- **Loading state**: Show spinner and disabled state
- **Icon support**: Use lucide-react icons
- **Smooth transitions**: All state changes animated

#### Secondary Button (Skip)

```tsx
<Button
  type="button"
  variant="ghost"
  onClick={handleSkip}
  className="text-gray-600 hover:text-gray-900"
>
  Skip for now
</Button>
```

- **Ghost variant**: Subtle, doesn't compete with primary action
- **Clear intent**: "Skip for now" is friendly and non-committal
- **Hover effect**: Text color change on hover

### Animations & Transitions

#### Step Transitions

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={currentStep}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    {/* Step content */}
  </motion.div>
</AnimatePresence>
```

- **Framer Motion**: Use for smooth step transitions
- **Slide animation**: Content slides in from right, out to left
- **Fade effect**: Opacity transition for smoothness
- **Fast but smooth**: 300ms duration feels responsive

#### Micro-interactions

- **Input focus**: Subtle scale or border color change
- **Button hover**: Slight elevation or color shift
- **Checkbox/Radio**: Smooth check animation
- **Error appearance**: Slide down with fade in
- **Success state**: Celebration animation (optional, subtle)

### Customer Setup Step

#### Conditional Rendering

```tsx
{showCustomerForm ? (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="mt-6">
      {/* Customer form */}
    </Card>
  </motion.div>
) : (
  <div className="mt-6 text-center">
    <p className="text-gray-600 mb-4">
      No problem! You can add customers anytime from the dashboard.
    </p>
  </div>
)}
```

- **Smooth expansion**: Form slides down when "Yes" is selected
- **Friendly message**: Reassuring text when skipping
- **Card container**: Customer form in its own card for separation

### Error & Success States

#### Error Display

```tsx
{error && (
  <Alert variant="destructive" className="mb-6">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>{error}</AlertDescription>
  </Alert>
)}
```

- **Alert component**: Use shadcn/ui Alert component
- **Destructive variant**: Red styling for errors
- **Icon support**: Visual indicator with icon
- **Clear messaging**: Title and description

#### Success State

```tsx
<Alert className="mb-6 border-green-200 bg-green-50">
  <CheckCircle className="h-4 w-4 text-green-600" />
  <AlertTitle className="text-green-800">Success!</AlertTitle>
  <AlertDescription className="text-green-700">
    Customer created successfully
  </AlertDescription>
</Alert>
```

- **Green styling**: Success color scheme
- **Positive reinforcement**: Celebrate small wins
- **Clear feedback**: User knows action completed

### Loading States

#### Form Submission

```tsx
<Button disabled={isPending}>
  {isPending ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Saving...
    </>
  ) : (
    "Continue"
  )}
</Button>
```

- **Disabled state**: Prevent double submission
- **Spinner icon**: Visual loading indicator
- **Text change**: "Saving..." provides context
- **Smooth transition**: State change is animated

### Component Library Usage

#### Preferred Components

Use **shadcn/ui** components extensively:

- **Card**: For main content containers
- **Button**: For all actions (primary, secondary, ghost variants)
- **Input**: For text inputs
- **Label**: For form labels
- **RadioGroup**: For VAT question
- **Popover + Command**: For currency dropdown
- **Alert**: For error/success messages
- **Separator**: For visual separation
- **Badge**: For step indicators

#### React Patterns

- **Client Components**: Use `'use client'` for interactive elements
- **Server Actions**: Use for form submissions
- **React Hooks**: useState, useTransition, useEffect
- **Form Handling**: React Hook Form (optional) or native form handling
- **State Management**: Local component state for form data

### Mobile Optimization

#### Responsive Design

- **Stack on mobile**: Single column layout
- **Full-width buttons**: Better touch targets
- **Larger inputs**: Minimum 44px height for touch
- **Reduced padding**: Less padding on small screens
- **Simplified navigation**: Fewer elements visible

#### Touch Interactions

- **Large tap targets**: All interactive elements minimum 44x44px
- **Swipe gestures**: Consider swipe between steps (optional)
- **Keyboard handling**: Proper input types (email, tel, etc.)
- **Viewport meta**: Proper mobile viewport settings

### Accessibility

#### ARIA & Semantic HTML

- **Proper labels**: All inputs have associated labels
- **ARIA attributes**: Use aria-describedby for errors
- **Semantic HTML**: Use proper form, fieldset, legend elements
- **Focus management**: Focus moves to errors when they appear
- **Screen reader support**: All interactive elements are accessible

#### Keyboard Navigation

- **Tab order**: Logical tab sequence
- **Enter to submit**: Forms submit on Enter
- **Escape to cancel**: Cancel actions with Escape
- **Arrow keys**: Navigate radio groups and dropdowns
- **Focus indicators**: Clear focus rings on all interactive elements

### Color Scheme

#### Primary Colors
- **Indigo**: Primary actions (`indigo-600`, `indigo-700` on hover)
- **Blue**: Accents and links (`blue-600`)
- **Green**: Success states (`green-600`, `green-50` backgrounds)

#### Neutral Colors
- **Gray-900**: Primary text
- **Gray-600**: Secondary text
- **Gray-500**: Tertiary text
- **Gray-200**: Borders
- **Gray-50**: Light backgrounds

#### Status Colors
- **Red**: Errors (`red-600`, `red-50` backgrounds)
- **Green**: Success (`green-600`, `green-50` backgrounds)
- **Yellow**: Warnings (if needed)

### Spacing & Layout

#### Consistent Spacing
- **Section spacing**: `mb-8` between major sections
- **Field spacing**: `space-y-6` for form fields
- **Card padding**: `p-8` on desktop, `p-6` on mobile
- **Button spacing**: `gap-4` between button groups

#### Grid & Flexbox
- **Responsive grid**: Use grid for address fields (2 columns on desktop)
- **Flex layouts**: Use flex for button groups and labels
- **Gap utilities**: Consistent gap spacing throughout

### Final Polish

#### Details That Matter

1. **Smooth scrolling**: Ensure page scrolls smoothly to errors
2. **Focus restoration**: Restore focus after form submission
3. **Optimistic updates**: Show success immediately, then sync
4. **Error recovery**: Clear errors when user starts typing
5. **Helpful hints**: Placeholder text that guides users
6. **Visual hierarchy**: Clear visual distinction between sections
7. **Consistent styling**: All components follow design system
8. **Performance**: Fast load times, smooth animations

#### Example Complete Step Component

```tsx
'use client'

import { useState, useTransition } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Loader2, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import CurrencySelect from './CurrencySelect'

export default function OrganizationSetupStep({ onComplete }: { onComplete: (data: any) => void }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [chargesVat, setChargesVat] = useState<string>('')
  
  // Form state...
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white shadow-xl rounded-2xl">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-semibold">Organization Details</CardTitle>
          <CardDescription>Tell us about your business</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {/* Form fields with beautiful styling */}
          
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              size="lg"
              className="flex-1 md:flex-none px-8"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Saving...
                </>
              ) : (
                'Continue'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
```

This creates a **polished, modern, and delightful** onboarding experience using Next.js and React components throughout, with attention to every detail that makes the UI feel amazing.

## User Experience Considerations

### Progress Indication

- Show progress indicator (e.g., "Step 1 of 2")
- Visual feedback for completed steps
- Clear indication of current step

### Skip Functionality

- All optional steps can be skipped
- Clear messaging about what can be done later
- No pressure to complete everything immediately

### Mobile Responsiveness

- Forms must be mobile-friendly
- Touch-friendly input fields
- Responsive button layouts
- Proper keyboard handling
- Currency dropdown must work well on mobile (touch-friendly, proper sizing)

### Accessibility

- Proper form labels and ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Edge Cases

### Existing Users

- Users who signed up before onboarding was implemented
- Solution: Check if `business_name` exists in `org_branding`
- If missing, redirect to onboarding
- If present, allow normal access

### Multiple Organizations

- Users can have multiple organizations
- Onboarding only applies to the first organization
- Subsequent organizations use quick setup

### Incomplete Onboarding

- User starts onboarding but doesn't complete
- Solution: Store partial progress (optional)
- On next login, redirect back to onboarding
- Or allow access but show reminder banner

## Testing Checklist

### Organization Setup
- [ ] Business name validation (required, min length)
- [ ] Default currency selection is required
- [ ] Currency dropdown is searchable and filters correctly
- [ ] Currency dropdown displays code and name (e.g., "EUR - Euro")
- [ ] Default currency value (EUR) is pre-selected
- [ ] Address fields accept valid input
- [ ] VAT question is required
- [ ] VAT number field shows/hides based on VAT selection
- [ ] VAT number is optional when shown
- [ ] Form submission saves all data correctly
- [ ] Error handling for invalid data
- [ ] Error handling for server errors

### Customer Setup
- [ ] Skip button works correctly
- [ ] Customer form shows when "Yes" is selected
- [ ] Customer name validation
- [ ] Customer creation saves correctly
- [ ] Success message displays
- [ ] Redirect to dashboard after completion

### Flow Integration
- [ ] Signup redirects to onboarding
- [ ] Onboarding completion redirects to dashboard
- [ ] Existing users bypass onboarding
- [ ] Authentication required for onboarding
- [ ] Session expiry handled gracefully

### UI/UX
- [ ] Progress indicator works
- [ ] Mobile responsive
- [ ] Accessible (keyboard, screen readers)
- [ ] Loading states during submission
- [ ] Success/error messages clear

## Future Enhancements

### Potential Additions

1. **Logo Upload**: Allow users to upload business logo during onboarding
2. **Invoice Template Selection**: Choose default invoice template
4. **Import Data**: Option to import existing customers/invoices
5. **Tutorial Mode**: Interactive tutorial after onboarding
6. **Progress Saving**: Save partial progress for later completion

### Analytics

Track onboarding metrics:
- Completion rate
- Drop-off points
- Time to complete
- Field completion rates
- Skip rates for optional steps

## Migration Plan

### For Existing Users

1. Add `charges_vat` column to `org_branding` (defaults to FALSE)
2. For existing organizations:
   - If `vat_number` exists and is not null → set `charges_vat = TRUE`
   - Otherwise → `charges_vat = FALSE`
3. Add onboarding completion check:
   - If `business_name` is null or empty → redirect to onboarding
   - Otherwise → allow normal access

### Database Migration

```sql
-- Add charges_vat column
ALTER TABLE org_branding 
ADD COLUMN charges_vat BOOLEAN DEFAULT FALSE;

-- Update existing records based on vat_number
UPDATE org_branding 
SET charges_vat = TRUE 
WHERE vat_number IS NOT NULL AND vat_number != '';

-- Add index for performance
CREATE INDEX idx_org_branding_charges_vat ON org_branding(charges_vat);
```

## Security Considerations

- All form submissions use server actions (not client-side API calls)
- Input validation on both client and server
- SQL injection prevention (using Supabase parameterized queries)
- XSS prevention (React's built-in escaping)
- CSRF protection (Next.js server actions)
- Rate limiting on form submissions (future enhancement)

## Performance

- Lazy load onboarding components
- Optimize form re-renders
- Minimize database queries
- Cache organization data where appropriate
- Use optimistic UI updates where possible

## Conclusion

The onboarding flow is a critical first impression for new users. It should be:
- **Simple**: Clear, focused steps
- **Fast**: Quick to complete
- **Flexible**: Allow skipping optional steps
- **Helpful**: Guide users without being overwhelming
- **Professional**: Reflect the quality of the application

By following this documentation, the onboarding flow will provide a smooth, professional experience that sets users up for success with the invoicing application.
