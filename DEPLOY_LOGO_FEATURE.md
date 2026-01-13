# Deploy Logo Upload Feature

This guide will help you deploy the new Organization Settings with logo upload feature.

## Step 1: Run Database Migration

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/mgzalgpueyfotjnvgvzz
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy and paste the contents of `supabase/migrations/011_logos_storage_policies.sql`
5. Click **Run** to execute the migration

This creates the RLS policies for the logos storage bucket.

## Step 2: Create Logos Storage Bucket

1. In Supabase Dashboard, go to **Storage**
2. Click **New bucket**
3. Configure the bucket:
   - **Name**: `logos`
   - **Public bucket**: ✅ **Enable this** (logos need to be publicly accessible for invoice display)
   - **File size limit**: 5 MB (or your preference)
   - **Allowed MIME types**: `image/*` (optional, for extra security)
4. Click **Create bucket**

The RLS policies from Step 1 will automatically apply to this bucket.

## Step 3: Verify Migration

Run this query in SQL Editor to verify the policies were created:

```sql
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
AND policyname LIKE '%logo%';
```

You should see 5 policies:
- Users can read logos
- Public can read logos
- Users can upload logos to their org
- Users can update logos in their org
- Users can delete logos in their org

## Step 4: Test the Feature

1. Go to your app (local or deployed)
2. Navigate to Settings: `/app/org/[your-org-id]/settings`
3. You should see the new "Organization Settings" section with:
   - Logo upload component
   - Company Name field
   - Street Address field
   - City, State/Province, Postal Code fields
   - Country field
   - VAT/Tax ID field
4. Upload a logo and fill in the organization details
5. Save the settings
6. Create or edit an invoice to verify the logo appears

## Troubleshooting

### Logo doesn't upload
- Check that the `logos` bucket exists and is PUBLIC
- Verify RLS policies are applied (Step 3)
- Check browser console for errors

### Logo doesn't display on invoice
- Verify the logo was uploaded successfully (check Supabase Storage)
- Check that `logo_storage_path` is saved in `org_branding` table
- Verify the bucket is PUBLIC (required for public URL access)

### Migration fails
- Make sure you're running the migration in the correct Supabase project
- Check that previous migrations (001-010) have been run
- Verify you have the necessary permissions

## Quick Verification Query

Run this to check if everything is set up correctly:

```sql
-- Check if org_branding has logo_storage_path column
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'org_branding' 
AND column_name = 'logo_storage_path';

-- Check storage policies
SELECT policyname 
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
AND policyname LIKE '%logo%';
```

Both queries should return results if everything is set up correctly.
