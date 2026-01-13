-- Note: This migration assumes you've created the 'invoices' bucket in Supabase Storage
-- Storage bucket should be created as PRIVATE via Supabase Dashboard or CLI
-- Files are stored under: {org_id}/invoices/{invoice_id}.pdf

-- Storage policy: Users can read files in their org's folder
CREATE POLICY "Users can read invoices in their org"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'invoices' AND
  (storage.foldername(name))[1] IN (
    SELECT org_id::text
    FROM org_members
    WHERE user_id = auth.uid()
  )
);

-- Storage policy: Users can upload files to their org's folder
CREATE POLICY "Users can upload invoices to their org"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'invoices' AND
  (storage.foldername(name))[1] IN (
    SELECT org_id::text
    FROM org_members
    WHERE user_id = auth.uid()
  )
);

-- Storage policy: Users can update files in their org's folder
CREATE POLICY "Users can update invoices in their org"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'invoices' AND
  (storage.foldername(name))[1] IN (
    SELECT org_id::text
    FROM org_members
    WHERE user_id = auth.uid()
  )
)
WITH CHECK (
  bucket_id = 'invoices' AND
  (storage.foldername(name))[1] IN (
    SELECT org_id::text
    FROM org_members
    WHERE user_id = auth.uid()
  )
);

-- Storage policy: Users can delete files in their org's folder
CREATE POLICY "Users can delete invoices in their org"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'invoices' AND
  (storage.foldername(name))[1] IN (
    SELECT org_id::text
    FROM org_members
    WHERE user_id = auth.uid()
  )
);
