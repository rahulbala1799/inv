# UI/UX Design Documentation

## Overview

This document provides a comprehensive overview of the user interface and user experience design for the Invoice Application after a user logs in. It covers the complete user journey, screen layouts, navigation structure, and design patterns.

---

## Post-Login Flow

### Initial Redirect
After successful login, users are automatically redirected to `/app` - the Organization Selection screen.

**Login Flow:**
- User enters credentials on `/login` page
- Upon successful authentication, redirected to `/app`
- If authentication fails, user remains on login page with error message

---

## Screen 1: Organization Selection (`/app`)

### Layout & Design
- **Background**: Gradient from blue-50 via white to indigo-50 (`bg-gradient-to-br from-blue-50 via-white to-indigo-50`)
- **Container**: Centered layout with max-width of 4xl
- **Padding**: 16 units vertical padding (`py-16`)

### Header Section
- **Title**: "Your Organizations" - Large, bold text (text-4xl, font-bold, text-gray-900)
- **Subtitle**: "Select an organization to get started" - Gray text (text-gray-600)

### Content States

#### State 1: No Organizations
When user has no organizations:
- White card with rounded corners and shadow (`bg-white rounded-xl shadow-lg p-8`)
- Centered text: "You don't have any organizations yet."
- **Create Organization Form** displayed inline:
  - Input field for organization name
  - Submit button: Indigo background (`bg-indigo-600`), white text, rounded corners
  - Button states: Hover effect (`hover:bg-indigo-700`), disabled state for loading

#### State 2: Has Organizations
When user has one or more organizations:
- **Organization Grid**: 2-column grid on medium+ screens (`md:grid-cols-2 gap-4`)
- Each organization card:
  - White background with shadow (`bg-white rounded-xl shadow-lg p-6`)
  - Hover effect: Enhanced shadow (`hover:shadow-xl transition-shadow`)
  - Organization name: Large, bold (text-2xl, font-bold, text-gray-900)
  - Role badge: Small gray text (text-sm, text-gray-500)
  - Clickable: Links to `/app/org/{orgId}/dashboard`

- **Create New Organization Section** (below grid):
  - White card with shadow
  - Title: "Create New Organization" (text-xl, font-bold)
  - Same form as State 1

### Error Handling
- Error messages displayed in red alert box:
  - Red background (`bg-red-50`)
  - Red border (`border-red-200`)
  - Red text (`text-red-700`)
  - Rounded corners (`rounded-lg`)

---

## Screen 2: Organization Dashboard (`/app/org/[orgId]/dashboard`)

### Navigation Bar
The navigation bar appears at the top of all organization pages and includes:

#### Left Section
- **Logo/Brand**: "Invoice App" - Large, bold text (text-xl, font-bold, text-gray-900)
  - Links to dashboard
- **Navigation Links** (horizontal layout, gap-4):
  - Dashboard
  - Customers
  - Invoices
  - Settings
  - All links: Gray text (`text-gray-700`), hover to darker gray (`hover:text-gray-900`), medium font weight

#### Right Section
- **Organization Name**: Small gray text (text-sm, text-gray-600)
- **Switch Org Link**: Indigo text (`text-indigo-600 hover:text-indigo-700`), links to `/app`
- **Sign Out Button**: Gray text, hover to darker gray

#### Navigation Bar Styling
- White background (`bg-white`)
- Bottom border (`border-b border-gray-200`)
- Container with horizontal padding (`container mx-auto px-4`)
- Height: 16 units (`h-16`)
- Flexbox layout with space-between

### Main Content Area
- **Background**: Light gray (`bg-gray-50`)
- **Container**: Centered with padding (`container mx-auto px-4 py-8`)

### Dashboard Content

#### Header
- **Title**: "Dashboard" (text-3xl, font-bold, text-gray-900)
- **Subtitle**: "Overview of your invoices and business" (text-gray-600)

#### Statistics Cards (3-column grid)
Three stat cards displayed in a responsive grid (`md:grid-cols-3 gap-6`):

1. **Total Invoices**
   - White card with shadow (`bg-white rounded-lg shadow p-6`)
   - Label: "Total Invoices" (text-sm, font-medium, text-gray-500)
   - Value: Large number (text-3xl, font-bold, text-gray-900)

2. **Paid**
   - Same card styling
   - Label: "Paid"
   - Value: Large number in green (text-3xl, font-bold, text-green-600)
   - Currency formatted

3. **Pending**
   - Same card styling
   - Label: "Pending"
   - Value: Large number in yellow (text-3xl, font-bold, text-yellow-600)
   - Currency formatted

#### Recent Invoices Table
- **Container**: White card with shadow (`bg-white rounded-lg shadow`)
- **Header Section**:
  - Title: "Recent Invoices" (text-xl, font-bold, text-gray-900)
  - "New Invoice" button: Indigo background (`bg-indigo-600`), white text, rounded corners
  - Border bottom separating header from table

- **Table Structure**:
  - **Header Row**: Gray background (`bg-gray-50`)
    - Columns: Invoice #, Customer, Date, Status, Total, Actions
    - Text: Small, uppercase, gray (`text-xs font-medium text-gray-500 uppercase`)
  - **Data Rows**:
    - Alternating row styling with dividers (`divide-y divide-gray-200`)
    - Status badges with color coding:
      - **PAID**: Green (`bg-green-100 text-green-800`)
      - **SENT**: Yellow (`bg-yellow-100 text-yellow-800`)
      - **DRAFT**: Gray (`bg-gray-100 text-gray-800`)
      - **Other**: Red (`bg-red-100 text-red-800`)
    - Status badges: Rounded full (`rounded-full`), small padding
    - Action links: Indigo color (`text-indigo-600 hover:text-indigo-700`)
  - **Empty State**: Centered gray text with link to create first invoice

---

## Screen 3: Invoices Page (`/app/org/[orgId]/invoices`)

### Header Section
- **Left**: Title and subtitle (same styling as dashboard)
  - Title: "Invoices" (text-3xl, font-bold)
  - Subtitle: "Manage and track your invoices"
- **Right**: "+ New Invoice" button (same styling as dashboard button)

### Filter Tabs
Horizontal filter buttons above the table:
- **All**: Active state (indigo background, white text), Inactive (gray background, gray text)
- **Draft**: Same styling pattern
- **Sent**: Same styling pattern
- **Paid**: Same styling pattern
- All filters: Rounded corners (`rounded-lg`), medium font weight
- Active filter: `bg-indigo-600 text-white`
- Inactive filter: `bg-gray-200 text-gray-700 hover:bg-gray-300`

### Invoices Table
- Same table structure as dashboard
- Additional column: **PDF** link in Actions column
- PDF link opens in new tab (`target="_blank"`)
- Same empty state with link to create invoice

### Error Display
- Red alert box at top if errors occur
- Red background, border, and text
- Displays error message from URL parameters

---

## Screen 4: Customers Page (`/app/org/[orgId]/customers`)

### Header Section
- **Left**: Title and subtitle
  - Title: "Customers" (text-3xl, font-bold)
  - Subtitle: "Manage your customer database"
- **Right**: Create Customer button (component-based, likely similar styling to New Invoice button)

### Customers Table
- **Columns**: Name, Email, Phone, City, Actions
- **Table Styling**: Same as invoices table
- **Data Display**:
  - Name: Bold, dark text
  - Email, Phone, City: Gray text, shows "-" if empty
- **Actions**:
  - Edit link: Indigo color
  - Delete button: Component-based (likely red or gray)
- **Empty State**: Centered message with instruction to create first customer

---

## Screen 5: Settings Page (`/app/org/[orgId]/settings`)

### Header Section
- **Title**: "Settings" (text-3xl, font-bold)
- **Subtitle**: "Manage your organization settings and preferences"

### Success/Error Messages
- **Success**: Green alert box (`bg-green-50 border-green-200 text-green-800`)
- **Error**: Red alert box (same as other pages)

### Settings Sections

#### Organization Settings Card
- White card with shadow (`bg-white rounded-lg shadow p-6`)
- **Title**: "Organization Settings" (text-xl, font-bold)
- **Description**: Small gray text explaining the section
- **Form Component**: `OrganizationSettingsForm`
  - Likely includes fields for:
    - Company name
    - Address
    - Contact information
    - Logo upload
    - Other branding elements

#### Invoice Templates Card
- White card with shadow
- **Title**: "Invoice Templates" (text-xl, font-bold)
- **Template List**:
  - Each template in a bordered container (`border border-gray-200 rounded-lg p-4`)
  - Template name: Medium font weight
  - **Badges**:
    - "Default" badge: Indigo background (`bg-indigo-100 text-indigo-800`)
    - "Global" badge: Gray background (`bg-gray-100 text-gray-800`)
  - Badges: Small text (`text-xs`), rounded corners, padding
- **Empty State**: "No templates available" in gray text

---

## Screen 6: Invoice Editor (`/app/org/[orgId]/invoices/[invoiceId]`)

### Overview
- Uses `WYSIWYGInvoiceEditor` component
- Full-page invoice editing interface
- Inline editing capabilities
- Real-time preview of invoice

### Features
- Customer selection dropdown
- Editable invoice fields (dates, amounts, text)
- Invoice line items management
- Template selection
- Branding integration
- Status management

---

## Design System

### Color Palette

#### Primary Colors
- **Indigo**: Primary action color
  - `indigo-600`: Primary buttons, links
  - `indigo-700`: Hover states
  - `indigo-50`: Light backgrounds

#### Status Colors
- **Green**: Success/Paid status
  - `green-600`: Paid amounts
  - `green-100`: Status badges background
  - `green-800`: Status badges text
  - `green-50`: Success alerts

- **Yellow**: Warning/Pending status
  - `yellow-600`: Pending amounts
  - `yellow-100`: Status badges background
  - `yellow-800`: Status badges text

- **Red**: Error/Overdue status
  - `red-100`: Status badges background
  - `red-800`: Status badges text
  - `red-50`: Error alerts
  - `red-200`: Error borders
  - `red-700`: Error text

#### Neutral Colors
- **Gray Scale**:
  - `gray-50`: Table headers, light backgrounds
  - `gray-100`: Status badges, borders
  - `gray-200`: Borders, inactive buttons
  - `gray-300`: Hover states
  - `gray-500`: Secondary text
  - `gray-600`: Body text
  - `gray-700`: Links, hover text
  - `gray-900`: Headings, primary text

#### Background Colors
- **White**: Cards, main content areas
- **Gray-50**: Page backgrounds
- **Gradient**: Blue-50 → White → Indigo-50 (organization selection page)

### Typography

#### Headings
- **H1**: `text-4xl font-bold text-gray-900` (page titles)
- **H2**: `text-3xl font-bold text-gray-900` (section titles)
- **H3**: `text-xl font-bold text-gray-900` (subsection titles)
- **H4**: `text-sm font-medium text-gray-500` (labels, table headers)

#### Body Text
- **Primary**: `text-gray-900` (main content)
- **Secondary**: `text-gray-600` (subtitles, descriptions)
- **Tertiary**: `text-gray-500` (metadata, less important info)

#### Text Sizes
- **Large**: `text-3xl` (statistics, large numbers)
- **Base**: Default (body text)
- **Small**: `text-sm` (labels, metadata)
- **Extra Small**: `text-xs` (badges, table headers)

### Spacing

#### Padding
- **Cards**: `p-6` or `p-8` (internal card padding)
- **Sections**: `py-8` (vertical section spacing)
- **Tables**: `px-6 py-3` (table cell padding)

#### Margins
- **Sections**: `mb-8` (margin bottom between sections)
- **Elements**: `mb-2`, `mb-4`, `mb-6` (various element spacing)

#### Gaps
- **Grids**: `gap-4` or `gap-6` (grid item spacing)
- **Flex**: `gap-4` or `gap-8` (flex item spacing)

### Components

#### Buttons

**Primary Button**:
- Background: `bg-indigo-600`
- Text: White
- Hover: `hover:bg-indigo-700`
- Padding: `px-4 py-2`
- Border radius: `rounded-lg`
- Font: `font-medium` or `font-semibold`
- Transition: `transition-colors`

**Secondary Button** (Filters):
- Background: `bg-gray-200`
- Text: `text-gray-700`
- Hover: `hover:bg-gray-300`
- Active: `bg-indigo-600 text-white`

#### Cards
- Background: `bg-white`
- Shadow: `shadow` or `shadow-lg`
- Border radius: `rounded-lg` or `rounded-xl`
- Padding: `p-6` or `p-8`

#### Tables
- Container: White card with shadow
- Header: `bg-gray-50`
- Rows: Dividers (`divide-y divide-gray-200`)
- Cells: `px-6 py-3` or `px-6 py-4`
- Text alignment: Left-aligned

#### Badges
- Status badges: `px-2 py-1 text-xs font-semibold rounded-full`
- Info badges: `px-2 py-1 text-xs rounded`

#### Links
- Color: `text-indigo-600`
- Hover: `hover:text-indigo-700`
- Navigation links: `text-gray-700 hover:text-gray-900`

#### Forms
- Input fields: `border border-gray-300 rounded-lg`
- Focus: `focus:ring-2 focus:ring-indigo-500 focus:border-transparent`
- Labels: `text-sm font-medium text-gray-700`

#### Alerts
- Success: `bg-green-50 border-green-200 text-green-800`
- Error: `bg-red-50 border-red-200 text-red-700`
- Padding: `p-4` or `p-3`
- Border radius: `rounded-lg`

### Layout Patterns

#### Container
- Max width: `container mx-auto`
- Horizontal padding: `px-4`
- Vertical padding: `py-8` or `py-16`

#### Grid Layouts
- Responsive: `grid md:grid-cols-2` or `md:grid-cols-3`
- Gap: `gap-4` or `gap-6`

#### Flex Layouts
- Navigation: `flex items-center justify-between`
- Headers: `flex items-center justify-between`
- Button groups: `flex gap-2` or `flex gap-4`

---

## Navigation Structure

### Top Navigation Bar
Present on all organization pages (`/app/org/[orgId]/*`):

```
┌─────────────────────────────────────────────────────────────┐
│ [Invoice App]  [Dashboard] [Customers] [Invoices] [Settings] │
│                                    [Org Name] [Switch Org] [Sign Out] │
└─────────────────────────────────────────────────────────────┘
```

### Navigation Items
1. **Dashboard** → `/app/org/[orgId]/dashboard`
2. **Customers** → `/app/org/[orgId]/customers`
3. **Invoices** → `/app/org/[orgId]/invoices`
4. **Settings** → `/app/org/[orgId]/settings`

### Utility Actions
- **Switch Org**: Returns to organization selection (`/app`)
- **Sign Out**: Logs out user, redirects to `/login`

---

## User Flow Summary

1. **Login** → `/login`
2. **Organization Selection** → `/app`
   - If no orgs: Create first organization
   - If has orgs: Select organization or create new
3. **Dashboard** → `/app/org/[orgId]/dashboard`
   - View statistics
   - View recent invoices
   - Quick action: Create new invoice
4. **Invoices** → `/app/org/[orgId]/invoices`
   - View all invoices
   - Filter by status
   - Create new invoice
   - View/Edit invoice
   - Download PDF
5. **Customers** → `/app/org/[orgId]/customers`
   - View all customers
   - Create customer
   - Edit customer
   - Delete customer
6. **Settings** → `/app/org/[orgId]/settings`
   - Configure organization details
   - Manage branding
   - View templates
7. **Invoice Editor** → `/app/org/[orgId]/invoices/[invoiceId]`
   - Edit invoice details
   - Manage line items
   - Change status
   - Select template

---

## Responsive Design

### Breakpoints
- **Mobile**: Default (no prefix)
- **Medium+**: `md:` prefix (768px+)
- **Large+**: `lg:` prefix (1024px+)

### Responsive Patterns
- Grids: Single column on mobile, multi-column on medium+
- Navigation: Horizontal on all screen sizes
- Tables: Horizontal scroll on mobile (`overflow-x-auto`)
- Padding: Adjusted for smaller screens

---

## Accessibility Considerations

### Color Contrast
- Text on colored backgrounds meets WCAG standards
- Status badges use sufficient contrast
- Links are clearly distinguishable

### Interactive Elements
- Buttons have hover states
- Links have hover states
- Form inputs have focus states
- Disabled states are visually distinct

### Semantic HTML
- Proper heading hierarchy
- Table structure with headers
- Form labels associated with inputs
- Button types specified

---

## Future Enhancements

Potential areas for UI/UX improvements:
- Mobile navigation menu (hamburger menu)
- Breadcrumb navigation
- Search functionality
- Advanced filtering options
- Keyboard shortcuts
- Dark mode support
- Customizable dashboard widgets
- Drag-and-drop invoice item reordering
- Real-time collaboration indicators

---

## Notes

- All pages use server-side rendering (Next.js App Router)
- Authentication is checked on every page
- Organization membership is verified before access
- Error states are handled gracefully with user-friendly messages
- Loading states are handled by form submission buttons
- The design follows a consistent, modern, professional aesthetic
- Color coding is used consistently for status indicators
- White space is used effectively for visual hierarchy
