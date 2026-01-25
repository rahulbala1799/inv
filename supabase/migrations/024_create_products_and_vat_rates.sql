-- Migration 024: Create Products and VAT Rates tables
-- Products allow users to save frequently used invoice items
-- VAT Rates provide simple percentage-based tax rates with auto-generated names

-- VAT Rates Table
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

-- Products Table
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
CREATE INDEX idx_products_vat_rate_id ON products(vat_rate_id);

-- Add optional product reference to invoice_items
ALTER TABLE invoice_items 
ADD COLUMN product_id UUID REFERENCES products(id) ON DELETE SET NULL;

CREATE INDEX idx_invoice_items_product_id ON invoice_items(product_id);

-- Function to auto-generate VAT rate name (V01, V02, V03, etc.)
CREATE OR REPLACE FUNCTION generate_vat_rate_name(p_org_id UUID)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  v_count INTEGER;
  v_name TEXT;
BEGIN
  -- Count existing VAT rates for this org (including inactive ones for numbering)
  SELECT COUNT(*) INTO v_count
  FROM vat_rates
  WHERE org_id = p_org_id;
  
  -- Generate name: V01, V02, V03, etc.
  v_name := 'V' || LPAD((v_count + 1)::TEXT, 2, '0');
  
  RETURN v_name;
END;
$$;

-- Trigger to auto-generate VAT rate name before insert
CREATE OR REPLACE FUNCTION set_vat_rate_name()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Only set name if not provided (shouldn't happen, but safety check)
  IF NEW.name IS NULL OR NEW.name = '' THEN
    NEW.name := generate_vat_rate_name(NEW.org_id);
  END IF;
  
  -- Update updated_at timestamp
  NEW.updated_at := NOW();
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER before_vat_rate_insert
  BEFORE INSERT ON vat_rates
  FOR EACH ROW
  EXECUTE FUNCTION set_vat_rate_name();

-- Trigger to update updated_at on vat_rates update
CREATE OR REPLACE FUNCTION update_vat_rate_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER before_vat_rate_update
  BEFORE UPDATE ON vat_rates
  FOR EACH ROW
  EXECUTE FUNCTION update_vat_rate_timestamp();

-- Trigger to update updated_at on products update
CREATE OR REPLACE FUNCTION update_product_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER before_product_update
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_product_timestamp();

-- Enable RLS
ALTER TABLE vat_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- RLS Policies for vat_rates
CREATE POLICY "Users can view VAT rates for their orgs"
  ON vat_rates FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM org_members
      WHERE org_members.org_id = vat_rates.org_id
      AND org_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create VAT rates for their orgs"
  ON vat_rates FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM org_members
      WHERE org_members.org_id = vat_rates.org_id
      AND org_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update VAT rates for their orgs"
  ON vat_rates FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM org_members
      WHERE org_members.org_id = vat_rates.org_id
      AND org_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete VAT rates for their orgs"
  ON vat_rates FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM org_members
      WHERE org_members.org_id = vat_rates.org_id
      AND org_members.user_id = auth.uid()
    )
  );

-- RLS Policies for products
CREATE POLICY "Users can view products for their orgs"
  ON products FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM org_members
      WHERE org_members.org_id = products.org_id
      AND org_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create products for their orgs"
  ON products FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM org_members
      WHERE org_members.org_id = products.org_id
      AND org_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update products for their orgs"
  ON products FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM org_members
      WHERE org_members.org_id = products.org_id
      AND org_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete products for their orgs"
  ON products FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM org_members
      WHERE org_members.org_id = products.org_id
      AND org_members.user_id = auth.uid()
    )
  );
