-- Enable RLS on all tenant tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_branding ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_sequences ENABLE ROW LEVEL SECURITY;

-- Security DEFINER function to check org membership
CREATE OR REPLACE FUNCTION is_org_member(p_org_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM org_members
    WHERE org_id = p_org_id
      AND user_id = auth.uid()
  );
END;
$$;

-- Organizations policies
CREATE POLICY "Users can view organizations they belong to"
  ON organizations FOR SELECT
  USING (is_org_member(id));

CREATE POLICY "Authenticated users can create organizations"
  ON organizations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Org members policies
CREATE POLICY "Users can view members of their orgs"
  ON org_members FOR SELECT
  USING (is_org_member(org_id));

CREATE POLICY "Owners and admins can add members"
  ON org_members FOR INSERT
  TO authenticated
  WITH CHECK (
    is_org_member(org_id) AND
    EXISTS (
      SELECT 1 FROM org_members
      WHERE org_id = org_members.org_id
        AND user_id = auth.uid()
        AND role IN ('OWNER', 'ADMIN')
    )
  );

CREATE POLICY "Owners and admins can delete members"
  ON org_members FOR DELETE
  TO authenticated
  USING (
    is_org_member(org_id) AND
    EXISTS (
      SELECT 1 FROM org_members
      WHERE org_id = org_members.org_id
        AND user_id = auth.uid()
        AND role IN ('OWNER', 'ADMIN')
    )
  );

-- Customers policies
CREATE POLICY "Users can manage customers in their orgs"
  ON customers FOR ALL
  TO authenticated
  USING (is_org_member(org_id))
  WITH CHECK (is_org_member(org_id));

-- Invoices policies
CREATE POLICY "Users can manage invoices in their orgs"
  ON invoices FOR ALL
  TO authenticated
  USING (is_org_member(org_id))
  WITH CHECK (is_org_member(org_id));

-- Invoice items policies
CREATE POLICY "Users can manage invoice items in their orgs"
  ON invoice_items FOR ALL
  TO authenticated
  USING (is_org_member(org_id))
  WITH CHECK (is_org_member(org_id));

-- Invoice templates policies
CREATE POLICY "Users can view global templates and their org templates"
  ON invoice_templates FOR SELECT
  TO authenticated
  USING (org_id IS NULL OR is_org_member(org_id));

CREATE POLICY "Users can manage templates in their orgs"
  ON invoice_templates FOR INSERT
  TO authenticated
  WITH CHECK (org_id IS NULL OR is_org_member(org_id));

CREATE POLICY "Users can update templates in their orgs"
  ON invoice_templates FOR UPDATE
  TO authenticated
  USING (org_id IS NULL OR is_org_member(org_id))
  WITH CHECK (org_id IS NULL OR is_org_member(org_id));

CREATE POLICY "Users can delete templates in their orgs"
  ON invoice_templates FOR DELETE
  TO authenticated
  USING (org_id IS NULL OR is_org_member(org_id));

-- Org branding policies
CREATE POLICY "Users can manage branding in their orgs"
  ON org_branding FOR ALL
  TO authenticated
  USING (is_org_member(org_id))
  WITH CHECK (is_org_member(org_id));

-- Org sequences policies (read-only for members, no direct inserts)
CREATE POLICY "Users can view sequences for their orgs"
  ON org_sequences FOR SELECT
  TO authenticated
  USING (is_org_member(org_id));
