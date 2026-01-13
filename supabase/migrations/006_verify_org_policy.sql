-- Verify and fix the organizations insert policy
-- Check if auth.uid() is available

-- Drop and recreate with explicit check
DROP POLICY IF EXISTS "Authenticated users can create organizations" ON organizations;

CREATE POLICY "Authenticated users can create organizations"
  ON organizations FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() IS NOT NULL AND
    created_by IS NOT NULL AND
    auth.uid() = created_by
  );

-- Also ensure the SELECT policy allows users to see orgs they created
-- (in case they need to see it before the trigger creates the membership)
DROP POLICY IF EXISTS "Users can view organizations they belong to" ON organizations;

CREATE POLICY "Users can view organizations they belong to"
  ON organizations FOR SELECT
  USING (
    is_org_member(id) OR
    created_by = auth.uid()
  );
