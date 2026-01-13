# Apply VAT Number Migration

The `vat_number` column needs to be added to the `customers` table. 

## Steps to Apply:

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **SQL Editor**
4. Run this SQL:

```sql
-- Add vat_number column to customers table
ALTER TABLE customers
ADD COLUMN IF NOT EXISTS vat_number TEXT;
```

5. Click **Run** to execute the migration

## Verify it worked:

After running, you can verify the column exists by running:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'customers' AND column_name = 'vat_number';
```

This should return one row showing the `vat_number` column.
