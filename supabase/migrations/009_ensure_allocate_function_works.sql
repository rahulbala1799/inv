-- Ensure allocate_invoice_number function works with RLS
-- The function needs to be able to INSERT and UPDATE org_sequences
-- Since it's SECURITY DEFINER, it runs with elevated privileges, but RLS still applies
-- We've added the policies, but let's also ensure the function is set up correctly

-- Recreate the function to ensure it's properly configured
CREATE OR REPLACE FUNCTION allocate_invoice_number(p_org_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_next_number INTEGER;
BEGIN
  -- Ensure sequence exists (this will be blocked by RLS if policies don't allow INSERT)
  INSERT INTO org_sequences (org_id, next_invoice_number)
  VALUES (p_org_id, 1)
  ON CONFLICT (org_id) DO NOTHING;
  
  -- Increment and return the new number (this will be blocked by RLS if policies don't allow UPDATE)
  UPDATE org_sequences
  SET next_invoice_number = next_invoice_number + 1
  WHERE org_id = p_org_id
  RETURNING next_invoice_number INTO v_next_number;
  
  -- If no row was updated, it means the INSERT above didn't work and there's no sequence
  -- This shouldn't happen if policies are correct, but handle it gracefully
  IF v_next_number IS NULL THEN
    -- Try to insert again (in case of race condition)
    INSERT INTO org_sequences (org_id, next_invoice_number)
    VALUES (p_org_id, 1)
    ON CONFLICT (org_id) DO UPDATE
    SET next_invoice_number = org_sequences.next_invoice_number + 1
    RETURNING next_invoice_number INTO v_next_number;
  END IF;
  
  RETURN v_next_number;
END;
$$;
