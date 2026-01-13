-- Organizations table
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Org members table
CREATE TABLE org_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('OWNER', 'ADMIN', 'MEMBER')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(org_id, user_id)
);

-- Org sequences for invoice numbering
CREATE TABLE org_sequences (
  org_id UUID PRIMARY KEY REFERENCES organizations(id) ON DELETE CASCADE,
  next_invoice_number INTEGER NOT NULL DEFAULT 1
);

-- Customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  county TEXT,
  postcode TEXT,
  country TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_customers_org_id ON customers(org_id);

-- Invoice templates table
CREATE TABLE invoice_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  config_json JSONB NOT NULL DEFAULT '{}',
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_invoice_templates_org_id ON invoice_templates(org_id);

-- Invoices table
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  invoice_number TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('DRAFT', 'SENT', 'PAID', 'VOID')) DEFAULT 'DRAFT',
  issue_date DATE NOT NULL,
  due_date DATE,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  currency TEXT NOT NULL DEFAULT 'EUR',
  subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,
  tax_total NUMERIC(12,2) NOT NULL DEFAULT 0,
  total NUMERIC(12,2) NOT NULL DEFAULT 0,
  notes TEXT,
  template_id UUID REFERENCES invoice_templates(id) ON DELETE SET NULL,
  pdf_storage_path TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(org_id, invoice_number)
);

CREATE INDEX idx_invoices_org_id ON invoices(org_id);
CREATE INDEX idx_invoices_customer_id ON invoices(customer_id);
CREATE INDEX idx_invoices_status ON invoices(status);

-- Invoice items table
CREATE TABLE invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity NUMERIC(12,2) NOT NULL DEFAULT 1,
  unit_price NUMERIC(12,2) NOT NULL DEFAULT 0,
  tax_rate NUMERIC(5,2) DEFAULT 0,
  line_total NUMERIC(12,2) NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_invoice_items_org_id ON invoice_items(org_id);
CREATE INDEX idx_invoice_items_invoice_id ON invoice_items(invoice_id);

-- Org branding table
CREATE TABLE org_branding (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL UNIQUE REFERENCES organizations(id) ON DELETE CASCADE,
  business_name TEXT,
  vat_number TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  county TEXT,
  postcode TEXT,
  country TEXT,
  logo_storage_path TEXT,
  default_currency TEXT DEFAULT 'EUR',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Function to allocate invoice number atomically
CREATE OR REPLACE FUNCTION allocate_invoice_number(p_org_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  v_next_number INTEGER;
BEGIN
  -- Ensure sequence exists
  INSERT INTO org_sequences (org_id, next_invoice_number)
  VALUES (p_org_id, 1)
  ON CONFLICT (org_id) DO NOTHING;
  
  -- Increment and return the new number
  UPDATE org_sequences
  SET next_invoice_number = next_invoice_number + 1
  WHERE org_id = p_org_id
  RETURNING next_invoice_number INTO v_next_number;
  
  RETURN v_next_number;
END;
$$;

-- Trigger function to auto-create org_members and sequences on org creation
CREATE OR REPLACE FUNCTION handle_new_organization()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Create org_members entry for creator as OWNER
  INSERT INTO org_members (org_id, user_id, role)
  VALUES (NEW.id, NEW.created_by, 'OWNER');
  
  -- Create org_sequences entry
  INSERT INTO org_sequences (org_id, next_invoice_number)
  VALUES (NEW.id, 1);
  
  -- Create default org_branding entry
  INSERT INTO org_branding (org_id, default_currency)
  VALUES (NEW.id, 'EUR');
  
  RETURN NEW;
END;
$$;

-- Trigger on organizations insert
CREATE TRIGGER on_organization_created
  AFTER INSERT ON organizations
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_organization();
