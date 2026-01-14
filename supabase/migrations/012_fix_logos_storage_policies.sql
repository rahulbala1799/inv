-- Fix logos storage policies
-- Drop existing policies if they exist (in case of errors)
DROP POLICY IF EXISTS "Users can read logos" ON storage.objects;
DROP POLICY IF EXISTS "Public can read logos" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload logos to their org" ON storage.objects;
DROP POLICY IF EXISTS "Users can update logos in their org" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete logos in their org" ON storage.objects;

-- Storage policy: Users can read all logos (public bucket)
CREATE POLICY "Users can read logos"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'logos');

-- Storage policy: Public can read logos (for invoice display)
CREATE POLICY "Public can read logos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'logos');

-- Storage policy: Users can upload logos to their org's folder
-- Path format: {orgId}/logo.{ext}
-- foldername(name)[1] extracts the first folder which is the orgId
CREATE POLICY "Users can upload logos to their org"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'logos' AND
  (storage.foldername(name))[1] IN (
    SELECT org_id::text
    FROM org_members
    WHERE user_id = auth.uid()
  )
);

-- Storage policy: Users can update logos in their org's folder
CREATE POLICY "Users can update logos in their org"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'logos' AND
  (storage.foldername(name))[1] IN (
    SELECT org_id::text
    FROM org_members
    WHERE user_id = auth.uid()
  )
)
WITH CHECK (
  bucket_id = 'logos' AND
  (storage.foldername(name))[1] IN (
    SELECT org_id::text
    FROM org_members
    WHERE user_id = auth.uid()
  )
);

-- Storage policy: Users can delete logos in their org's folder
CREATE POLICY "Users can delete logos in their org"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'logos' AND
  (storage.foldername(name))[1] IN (
    SELECT org_id::text
    FROM org_members
    WHERE user_id = auth.uid()
  )
);
