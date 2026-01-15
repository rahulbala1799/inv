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
