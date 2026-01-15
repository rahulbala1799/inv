-- Migration: Add customization_json field to invoices table
-- This allows storing font style, font size, and color preferences per invoice

ALTER TABLE invoices 
ADD COLUMN IF NOT EXISTS customization_json JSONB DEFAULT '{}';

-- Add comment for documentation
COMMENT ON COLUMN invoices.customization_json IS 'Stores invoice customization preferences: fontStyle, fontSize, and colors (primary, secondary, background, neutral, heading, body)';

-- Create index for faster queries if needed
CREATE INDEX IF NOT EXISTS idx_invoices_customization_json ON invoices USING GIN (customization_json);
