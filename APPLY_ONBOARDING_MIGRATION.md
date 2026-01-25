# Apply Onboarding Migration

The `charges_vat` column needs to be added to the `org_branding` table for the onboarding flow to work.

## Quick Fix: Apply Migration Now

### Option 1: Using Supabase Dashboard (Recommended - Easiest)

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy and paste this SQL:

```sql
-- Add charges_vat field to org_branding table
-- This field indicates whether the organization charges VAT

ALTER TABLE org_branding
ADD COLUMN IF NOT EXISTS charges_vat BOOLEAN DEFAULT FALSE;

-- Update existing records based on vat_number
-- If vat_number exists and is not empty, set charges_vat to TRUE
UPDATE org_branding 
SET charges_vat = TRUE 
WHERE vat_number IS NOT NULL AND vat_number != '';

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_org_branding_charges_vat ON org_branding(charges_vat);
```

6. Click **Run** to execute the migration
7. You should see "Success. No rows returned" or similar success message

### Option 2: Using Supabase CLI

If you have Supabase CLI set up:

```bash
# Navigate to project directory
cd "/Users/rahul/Documents/1 New Apps/Inv App/Inv"

# Apply the migration
supabase db push

# Or apply specific migration
supabase migration up
```

### Option 3: Direct SQL Execution

If you have direct database access:

```bash
# Connect to your database
psql "postgresql://[your-connection-string]"

# Then run:
\i supabase/migrations/020_add_charges_vat_to_branding.sql
```

## Verify Migration Applied

After running the migration, verify it worked by running this in Supabase SQL Editor:

```sql
-- Check if column exists
SELECT column_name, data_type, column_default
FROM information_schema.columns 
WHERE table_name = 'org_branding' 
  AND column_name = 'charges_vat';
```

**Expected Result:**
- Should return one row showing:
  - `column_name`: `charges_vat`
  - `data_type`: `boolean`
  - `column_default`: `false`

## Check Existing Data

Verify existing records were updated correctly:

```sql
-- Check charges_vat values
SELECT 
  org_id,
  business_name,
  vat_number,
  charges_vat
FROM org_branding
LIMIT 10;
```

**Expected:**
- Records with `vat_number` should have `charges_vat = true`
- Records without `vat_number` should have `charges_vat = false`

## After Migration

Once the migration is applied:

1. ✅ The onboarding flow will work correctly
2. ✅ Settings page will show VAT configuration
3. ✅ Existing organizations will have `charges_vat` set based on their VAT number

## Troubleshooting

### Error: "column already exists"
- The migration has already been applied. You can ignore this or skip the `ADD COLUMN` line.

### Error: "permission denied"
- Make sure you're using the correct database user with ALTER TABLE permissions
- In Supabase Dashboard, you should have the right permissions automatically

### Still seeing the error after migration?
1. Clear your browser cache
2. Wait a few seconds for Supabase schema cache to refresh
3. Try the onboarding flow again

## Need Help?

If you continue to see errors after applying the migration:
1. Check the Supabase logs for any errors
2. Verify the column exists using the verification query above
3. Make sure you're connected to the correct database/project
