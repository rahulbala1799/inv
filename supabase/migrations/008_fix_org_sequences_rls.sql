-- Fix org_sequences RLS policies to allow invoice number allocation
-- The allocate_invoice_number function needs to INSERT and UPDATE sequences

-- Drop the existing read-only policy
DROP POLICY IF EXISTS "Users can view sequences for their orgs" ON org_sequences;

-- Allow org members to view sequences for their orgs
CREATE POLICY "Users can view sequences for their orgs"
  ON org_sequences FOR SELECT
  TO authenticated
  USING (is_org_member(org_id));

-- Allow org members to insert sequences for their orgs (for initial creation)
CREATE POLICY "Users can insert sequences for their orgs"
  ON org_sequences FOR INSERT
  TO authenticated
  WITH CHECK (is_org_member(org_id));

-- Allow org members to update sequences for their orgs (for invoice number allocation)
CREATE POLICY "Users can update sequences for their orgs"
  ON org_sequences FOR UPDATE
  TO authenticated
  USING (is_org_member(org_id))
  WITH CHECK (is_org_member(org_id));
