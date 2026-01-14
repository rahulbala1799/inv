-- Add contact information fields to org_branding table
-- These fields are used in PDF invoice templates for contact info section

ALTER TABLE org_branding
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS website TEXT;
