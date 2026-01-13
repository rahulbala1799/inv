# Invoice App - Multi-Tenant SaaS

A production-ready, multi-tenant invoice management SaaS application built with Next.js 14, TypeScript, Tailwind CSS, and Supabase. This application provides secure, tenant-isolated invoice creation, management, and PDF generation capabilities.

## 🎯 Project Overview

**Goal**: A simple invoice-only SaaS that allows users to:
- Create invoices quickly
- Generate and download invoice PDFs
- Mark invoices as paid/unpaid
- Manage customers
- Support multiple invoice templates
- Multi-tenant architecture with strict tenant isolation enforced by Postgres RLS

**Non-Goals** (Not included in v1):
- Bookkeeping, expenses, bank feeds, reports, inventory
- Stripe payments integration (intentionally out of scope for v1)
- Complex analytics dashboards
- Admin override that bypasses RLS

## 👤 Who This App Is For

This app is designed for:
- Freelancers and solo professionals
- Consultants and contractors
- Small service-based businesses
- Users who want to send invoices without learning accounting software

**NOT for:**
- Accountants or bookkeeping firms
- Businesses needing expense tracking or bank reconciliation
- Companies with employees or payroll needs
- Users looking for full financial reporting

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase
  - Authentication
  - PostgreSQL Database
  - Storage (for PDFs and logos)
- **PDF Generation**: `@react-pdf/renderer` or `pdf-lib` (server-side)
- **Deployment**: Vercel
- **SSR**: Supabase SSR helpers for Next.js

## 📋 Features

### Core Features
- ✅ User authentication (sign up/login)
- ✅ Multi-organization support (users can belong to multiple orgs)
- ✅ Organization-scoped dashboard
- ✅ Customer management (CRUD)
- ✅ Invoice management (CRUD)
- ✅ Invoice status tracking (DRAFT, SENT, PAID, VOID)
- ✅ Multiple invoice templates
- ✅ PDF generation and download
- ✅ Optional PDF storage in Supabase Storage
- ✅ Organization branding (logo, business details)
- ✅ Automatic invoice numbering per organization

### Security Features
- ✅ Row Level Security (RLS) on all tenant tables
- ✅ Server-side membership verification
- ✅ Defense-in-depth security (RLS + application-level checks)
- ✅ Storage RLS for tenant-isolated file access
- ✅ No cross-tenant data access (even with guessed UUIDs)

## 🧭 Design Principles

The application follows these core principles:
- **Speed over completeness**: Fast invoice creation takes priority over feature breadth
- **Clarity over features**: Simple, focused workflows over complex options
- **Security by default**: Database-enforced tenant isolation is non-negotiable
- **Boring is good**: Stability and reliability over novelty
- **Opinionated simplicity**: The app makes choices so users don't have to

These principles explain why the app is intentionally limited in scope.

## 🗄 Database Schema

### Tables

#### 1. `organizations`
- `id` (uuid, primary key)
- `name` (text)
- `created_at` (timestamptz, default now())
- `created_by` (uuid, references auth.users)

#### 2. `org_members`
- `id` (uuid, primary key)
- `org_id` (uuid, references organizations.id on delete cascade)
- `user_id` (uuid, references auth.users on delete cascade)
- `role` (text: 'OWNER' | 'ADMIN' | 'MEMBER')
- `created_at` (timestamptz, default now())
- Unique constraint: `(org_id, user_id)`

#### 3. `customers`
- `id` (uuid, primary key)
- `org_id` (uuid, foreign key)
- `name` (text)
- `email` (text, nullable)
- `phone` (text, nullable)
- `address_line1` (text, nullable)
- `address_line2` (text, nullable)
- `city` (text, nullable)
- `county` (text, nullable)
- `postcode` (text, nullable)
- `country` (text, nullable)
- `created_at` (timestamptz, default now())
- Index: `org_id`

#### 4. `invoices`
- `id` (uuid, primary key)
- `org_id` (uuid, foreign key)
- `invoice_number` (text) - unique per org
- `status` (text: 'DRAFT' | 'SENT' | 'PAID' | 'VOID')
- `issue_date` (date)
- `due_date` (date, nullable)
- `customer_id` (uuid, foreign key to customers)
- `currency` (text, default 'EUR')
- `subtotal` (numeric(12,2))
- `tax_total` (numeric(12,2))
- `total` (numeric(12,2))
- `notes` (text, nullable)
- `template_id` (uuid, nullable, references invoice_templates)
- `pdf_storage_path` (text, nullable) - path in Supabase Storage if saved
- `created_at` (timestamptz, default now())
- Unique constraint: `(org_id, invoice_number)`
- Indexes: `org_id`, `customer_id`, `status`

#### 5. `invoice_items`
- `id` (uuid, primary key)
- `org_id` (uuid, foreign key)
- `invoice_id` (uuid, foreign key to invoices on delete cascade)
- `description` (text)
- `quantity` (numeric(12,2))
- `unit_price` (numeric(12,2))
- `tax_rate` (numeric(5,2)) - percent, nullable or default 0
- `line_total` (numeric(12,2))
- `sort_order` (int)
- Indexes: `org_id`, `invoice_id`

#### 6. `invoice_templates`
- `id` (uuid, primary key)
- `org_id` (uuid, foreign key, nullable) - null for global templates
- `name` (text)
- `config_json` (jsonb) - template config (logo position, colors, layout flags)
- `is_default` (boolean, default false)
- `created_at` (timestamptz, default now())
- Index: `org_id`

#### 7. `org_branding`
- `id` (uuid, primary key)
- `org_id` (uuid, unique foreign key)
- `business_name` (text)
- `vat_number` (text, nullable)
- `address_line1` (text, nullable)
- `address_line2` (text, nullable)
- `city` (text, nullable)
- `county` (text, nullable)
- `postcode` (text, nullable)
- `country` (text, nullable)
- `logo_storage_path` (text, nullable)
- `default_currency` (text, default 'EUR')
- `created_at` (timestamptz, default now())

#### 8. `org_sequences` (for invoice numbering)
- `org_id` (uuid, primary key, references organizations.id)
- `next_invoice_number` (int, default 1)

## 🔒 Security Architecture

### Row Level Security (RLS)

All tenant tables have RLS enabled:
- `organizations`
- `org_members`
- `customers`
- `invoices`
- `invoice_items`
- `invoice_templates`
- `org_branding`

### Security DEFINER Function

```sql
is_org_member(org_id uuid) returns boolean
```
- Checks if the current user (`auth.uid()`) is a member of the specified organization
- Used in all RLS policies for tenant isolation

### RLS Policies

1. **org_members**
   - SELECT: Members can read rows for orgs they belong to
   - INSERT: Only OWNER/ADMIN can insert members
   - UPDATE: Members can update their own membership fields (limited)
   - DELETE: Only OWNER/ADMIN can delete members

2. **organizations**
   - SELECT: Users can select orgs where they are members
   - INSERT: Authenticated users can create orgs (trigger creates OWNER membership)

3. **customers, invoices, invoice_items, invoice_templates, org_branding**
   - SELECT/INSERT/UPDATE/DELETE: Only allowed where `is_org_member(org_id)` is true
   - WITH CHECK: Ensures `org_id` is provided and user is a member

### Triggers

- **Auto-create org_members**: On `organizations` insert, automatically creates `org_members` row making `created_by` an OWNER

### Storage RLS

Supabase Storage bucket: `invoices`
- Files stored under: `${org_id}/invoices/${invoice_id}.pdf`
- Storage policies enforce tenant isolation:
  - Users can only read/write objects under their `org_id` prefix
  - Uses `is_org_member()` function for access control

### Application-Level Security

- **Never trust `orgId` from client**: Always verify membership server-side
- **Server Actions/Route Handlers**: All mutations use server-side Supabase client with anon key and SSR session cookies so RLS is always enforced
- **Defense in Depth**: All DB operations include `org_id` filters even though RLS exists
- **Service Role Key Usage**: The service role key is only used for local/admin scripts (seed/migrations) and is never used for user-facing requests. This keeps the security story clean and ensures RLS is always enforced.
- **Environment Variables**: All Supabase credentials stored in Vercel environment variables

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Supabase account and project
- Vercel account (for deployment)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Inv
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Run the SQL migrations from `supabase/migrations/` in your Supabase SQL editor
   - Create a Storage bucket named `invoices` in Supabase Storage

4. **Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

5. **Run database migrations**
   - Execute all SQL files in `supabase/migrations/` in order
   - This creates tables, functions, triggers, and RLS policies

6. **Seed initial data (optional)**
   ```bash
   npm run seed
   ```
   This creates 3 default invoice templates.

7. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

8. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
Inv/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Auth routes (login, signup)
│   │   ├── login/
│   │   └── signup/
│   ├── app/                     # Main app routes
│   │   ├── org/
│   │   │   └── [orgId]/
│   │   │       ├── dashboard/
│   │   │       ├── customers/
│   │   │       ├── invoices/
│   │   │       │   ├── new/
│   │   │       │   └── [invoiceId]/
│   │   │       └── settings/
│   │   └── page.tsx             # Org picker
│   ├── api/                     # API routes
│   │   └── org/
│   │       └── [orgId]/
│   │           └── invoices/
│   │               └── [invoiceId]/
│   │                   └── pdf/
│   ├── layout.tsx
│   └── page.tsx                 # Root redirect
├── components/                   # React components
│   ├── ui/                      # Reusable UI components
│   ├── invoices/
│   ├── customers/
│   └── layout/
├── lib/                          # Utilities and helpers
│   ├── supabase/
│   │   ├── client.ts            # Client-side Supabase client
│   │   ├── server.ts            # Server-side Supabase client
│   │   └── middleware.ts        # Middleware helpers
│   ├── db/                       # Database types and helpers
│   ├── pdf/                      # PDF generation utilities
│   └── utils.ts
├── supabase/
│   └── migrations/               # SQL migration files
│       ├── 001_initial_schema.sql
│       ├── 002_rls_policies.sql
│       ├── 003_storage_policies.sql
│       └── 004_seed_templates.sql
├── types/                        # TypeScript type definitions
├── public/                       # Static assets
├── .env.local                    # Local environment variables (gitignored)
├── .env.example                  # Example environment variables
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## 🛣 Application Routes

### Public Routes
- `/login` - User login page
- `/signup` - User registration page

### Protected Routes (require authentication)
- `/app` - Redirects to last org or org picker
- `/app/org/[orgId]/dashboard` - Organization dashboard
- `/app/org/[orgId]/customers` - Customer list and management
- `/app/org/[orgId]/invoices` - Invoice list (filterable by status)
- `/app/org/[orgId]/invoices/new` - Create new invoice
- `/app/org/[orgId]/invoices/[invoiceId]` - View/edit invoice
- `/app/org/[orgId]/settings` - Organization settings (branding + templates)

### API Routes
- `GET /api/org/[orgId]/invoices/[invoiceId]/pdf` - Generate and download invoice PDF

## 🔧 Configuration

### Environment Variables

#### Required
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous/public key (used everywhere - client + server with SSR session cookies so RLS is always enforced)
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key. This key is only used for local/admin scripts (seed/migrations) and is never used for user-facing requests.

#### Optional
- `NODE_ENV` - Environment (development, production)
- `NEXT_PUBLIC_APP_URL` - Your application URL (for production)

### Supabase Configuration

1. **Enable Row Level Security** on all tenant tables
2. **Create Storage Bucket**: `invoices` (private bucket with RLS)
3. **Set up Storage Policies** for tenant isolation
4. **Configure Email Templates** (optional, for auth emails)

## 📤 Data Ownership & Portability

- All invoice and customer data belongs to the organization that created it
- No proprietary data formats are used; all data is stored in standard PostgreSQL tables
- PDFs are standard format and can be regenerated at any time
- Data can be exported directly from the database or through future API endpoints
- Organizations maintain full control and ownership of their data

## 📦 Deployment

### Deploy to Vercel

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   In Vercel project settings, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

4. **Deploy**
   - Vercel will automatically deploy on push to main branch
   - Or click "Deploy" in the Vercel dashboard

5. **Run Database Migrations**
   - Execute all SQL files from `supabase/migrations/` in your Supabase SQL editor
   - Ensure migrations run in order

6. **Set up Storage Bucket**
   - In Supabase Dashboard → Storage, create bucket `invoices`
   - Configure RLS policies for the bucket

### Post-Deployment Checklist

- [ ] All environment variables set in Vercel
- [ ] Database migrations executed
- [ ] Storage bucket created and configured
- [ ] RLS policies verified
- [ ] Test user registration and login
- [ ] Test organization creation
- [ ] Test invoice creation and PDF generation
- [ ] Verify tenant isolation (test with multiple orgs)

## 🔐 Security Checklist

This application implements multi-tenant security through multiple layers:

### Database Layer (RLS)
- ✅ RLS enabled on all tenant tables
- ✅ `is_org_member()` function enforces membership checks
- ✅ Policies prevent cross-tenant reads/writes
- ✅ WITH CHECK clauses ensure `org_id` is validated on insert/update
- ✅ Trigger automatically creates org membership on org creation

### Application Layer
- ✅ Server-side membership verification before all mutations
- ✅ All queries include `org_id` filters (defense in depth)
- ✅ Server Actions/Route Handlers use server-side Supabase client with anon key and SSR session cookies (RLS always enforced)
- ✅ Service role key only used for admin scripts, never for user-facing requests
- ✅ `orgId` from URL/params verified server-side

### Storage Layer
- ✅ Storage RLS policies enforce tenant isolation
- ✅ Files stored under `org_id` prefix
- ✅ Users can only access files for orgs they belong to

### Testing Tenant Isolation

To verify tenant isolation works:
1. Create two organizations (Org A and Org B)
2. Create invoices in Org A
3. Try to access Org A's invoice IDs from Org B's context
4. Verify RLS blocks access even with correct UUIDs

## 📝 Invoice Numbering

The application implements automatic invoice numbering per organization:

- Uses `org_sequences` table to track next invoice number per org
- On invoice creation, allocates next number in a transaction
- Format: Sequential integer (1, 2, 3, ...) per organization
- Invoice numbers are unique per organization (enforced by unique constraint)

## 🎨 Invoice Templates

The application supports multiple invoice templates:

- **Default Templates**: 3 global templates seeded on setup
- **Custom Templates**: Organizations can create custom templates
- **Template Configuration**: Stored as JSONB (`config_json`) with:
  - Logo position
  - Color scheme
  - Layout flags
  - Custom styling options

Templates can be:
- Global (`org_id` is null) - available to all organizations
- Organization-specific (`org_id` set) - only available to that org

## 📄 PDF Generation

PDFs are generated server-side via API route:

- **Route**: `GET /api/org/[orgId]/invoices/[invoiceId]/pdf`
- **Process**:
  1. Verifies user is org member
  2. Fetches invoice data (invoice, items, customer, branding, template)
  3. Generates PDF using `@react-pdf/renderer` or `pdf-lib`
  4. Returns `application/pdf` response
  5. Optionally uploads to Supabase Storage and updates `pdf_storage_path`

## 🧪 Development

### Running Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Database Migrations

Migrations are located in `supabase/migrations/`. Execute them in order:

1. `001_initial_schema.sql` - Creates all tables
2. `002_rls_policies.sql` - Sets up RLS policies
3. `003_storage_policies.sql` - Configures storage RLS
4. `004_seed_templates.sql` - Seeds default templates

### Type Generation

If using Supabase TypeScript types:

```bash
npx supabase gen types typescript --project-id your-project-id > types/supabase.ts
```

## ⚠️ Known Limitations (v1)

The following features are intentionally not included in v1:
- No recurring invoices
- No automated reminders
- No online payments
- No expense tracking
- No accounting reports

These limitations are intentional trade-offs to keep the system simple, fast, and reliable. The app focuses exclusively on invoice creation and tracking.

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Vercel Deployment Guide](https://vercel.com/docs)

## 🤝 Contributing

This is a production-ready application. When contributing:

1. Ensure all security checks pass
2. Verify tenant isolation is maintained
3. Test with multiple organizations
4. Follow TypeScript best practices
5. Maintain clean, readable code

## 📄 License

[Specify your license here]

## 🆘 Support

For issues or questions:
1. Check the documentation above
2. Review Supabase logs for database issues
3. Check Vercel logs for deployment issues
4. Verify environment variables are set correctly

---

**Built with ❤️ using Next.js, TypeScript, and Supabase**
