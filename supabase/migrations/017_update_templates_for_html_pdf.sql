-- Migration 017: Update invoice templates for HTML-to-PDF migration
-- This migration updates template configurations to use new layout names that match Figma templates

-- Update existing templates to use new layout names
UPDATE invoice_templates 
SET config_json = jsonb_set(
  config_json,
  '{layout}',
  CASE 
    WHEN config_json->>'layout' = 'classic' THEN '"classic-blue"'
    WHEN config_json->>'layout' = 'minimal' THEN '"modern-minimal"'
    WHEN config_json->>'layout' = 'elegant' THEN '"corporate-elegant"'
    WHEN config_json->>'layout' = 'bold' THEN '"creative-bold"'
    WHEN config_json->>'layout' = 'clean' THEN '"simple-bw"'
    WHEN config_json->>'layout' = 'modern' THEN '"gradient-modern"'
    WHEN config_json->>'layout' = 'professional' THEN '"professional-gray"'
    ELSE config_json->'layout'
  END
)
WHERE org_id IS NULL;

-- Add new Figma templates if they don't exist
-- Template 1: Classic Blue (if not exists)
INSERT INTO invoice_templates (org_id, name, config_json, is_default) 
SELECT 
  NULL,
  'Classic Blue',
  '{
    "layout": "classic-blue",
    "logoPosition": "top-left",
    "primaryColor": "#2563EB",
    "secondaryColor": "#1E40AF",
    "accentColor": "#3B82F6",
    "backgroundColor": "#FFFFFF",
    "textColor": "#000000",
    "fontFamily": "Helvetica",
    "fontSize": 12,
    "pagePadding": 48,
    "showTaxBreakdown": true,
    "showPaymentTerms": true,
    "showBankDetails": true
  }'::jsonb,
  false
WHERE NOT EXISTS (
  SELECT 1 FROM invoice_templates 
  WHERE name = 'Classic Blue' AND org_id IS NULL
);

-- Template 2: Modern Minimal (if not exists)
INSERT INTO invoice_templates (org_id, name, config_json, is_default) 
SELECT 
  NULL,
  'Modern Minimal',
  '{
    "layout": "modern-minimal",
    "logoPosition": "top-left",
    "primaryColor": "#1F2937",
    "secondaryColor": "#000000",
    "accentColor": "#000000",
    "backgroundColor": "#FFFFFF",
    "textColor": "#000000",
    "fontFamily": "Helvetica",
    "fontSize": 11,
    "pagePadding": 48,
    "showTaxBreakdown": true,
    "showPaymentTerms": false,
    "showBankDetails": false
  }'::jsonb,
  false
WHERE NOT EXISTS (
  SELECT 1 FROM invoice_templates 
  WHERE name = 'Modern Minimal' AND org_id IS NULL
);

-- Template 3: Corporate Elegant (if not exists)
INSERT INTO invoice_templates (org_id, name, config_json, is_default) 
SELECT 
  NULL,
  'Corporate Elegant',
  '{
    "layout": "corporate-elegant",
    "logoPosition": "top-left",
    "primaryColor": "#7C3AED",
    "secondaryColor": "#5B21B6",
    "accentColor": "#A855F7",
    "backgroundColor": "#FFFFFF",
    "textColor": "#000000",
    "fontFamily": "Helvetica",
    "fontSize": 12,
    "pagePadding": 48,
    "showTaxBreakdown": true,
    "showPaymentTerms": true,
    "showBankDetails": true
  }'::jsonb,
  false
WHERE NOT EXISTS (
  SELECT 1 FROM invoice_templates 
  WHERE name = 'Corporate Elegant' AND org_id IS NULL
);

-- Template 4: Creative Bold (if not exists)
INSERT INTO invoice_templates (org_id, name, config_json, is_default) 
SELECT 
  NULL,
  'Creative Bold',
  '{
    "layout": "creative-bold",
    "logoPosition": "top-left",
    "primaryColor": "#059669",
    "secondaryColor": "#047857",
    "accentColor": "#10B981",
    "backgroundColor": "#FFFFFF",
    "textColor": "#000000",
    "fontFamily": "Helvetica",
    "fontSize": 12,
    "pagePadding": 48,
    "showTaxBreakdown": true,
    "showPaymentTerms": true,
    "showBankDetails": true
  }'::jsonb,
  false
WHERE NOT EXISTS (
  SELECT 1 FROM invoice_templates 
  WHERE name = 'Creative Bold' AND org_id IS NULL
);

-- Template 5: Simple B&W (if not exists)
INSERT INTO invoice_templates (org_id, name, config_json, is_default) 
SELECT 
  NULL,
  'Simple B&W',
  '{
    "layout": "simple-bw",
    "logoPosition": "top-left",
    "primaryColor": "#000000",
    "secondaryColor": "#000000",
    "accentColor": "#000000",
    "backgroundColor": "#FFFFFF",
    "textColor": "#000000",
    "fontFamily": "Helvetica",
    "fontSize": 11,
    "pagePadding": 48,
    "showTaxBreakdown": true,
    "showPaymentTerms": false,
    "showBankDetails": false
  }'::jsonb,
  false
WHERE NOT EXISTS (
  SELECT 1 FROM invoice_templates 
  WHERE name = 'Simple B&W' AND org_id IS NULL
);

-- Template 6: Gradient Modern (if not exists)
INSERT INTO invoice_templates (org_id, name, config_json, is_default) 
SELECT 
  NULL,
  'Gradient Modern',
  '{
    "layout": "gradient-modern",
    "logoPosition": "top-center",
    "primaryColor": "#06B6D4",
    "secondaryColor": "#0891B2",
    "accentColor": "#22D3EE",
    "backgroundColor": "#FFFFFF",
    "textColor": "#000000",
    "fontFamily": "Helvetica",
    "fontSize": 12,
    "pagePadding": 48,
    "showTaxBreakdown": true,
    "showPaymentTerms": true,
    "showBankDetails": true
  }'::jsonb,
  false
WHERE NOT EXISTS (
  SELECT 1 FROM invoice_templates 
  WHERE name = 'Gradient Modern' AND org_id IS NULL
);

-- Template 7: Professional Gray (if not exists)
INSERT INTO invoice_templates (org_id, name, config_json, is_default) 
SELECT 
  NULL,
  'Professional Gray',
  '{
    "layout": "professional-gray",
    "logoPosition": "top-left",
    "primaryColor": "#4B5563",
    "secondaryColor": "#374151",
    "accentColor": "#6B7280",
    "backgroundColor": "#FFFFFF",
    "textColor": "#000000",
    "fontFamily": "Helvetica",
    "fontSize": 12,
    "pagePadding": 48,
    "showTaxBreakdown": true,
    "showPaymentTerms": true,
    "showBankDetails": true
  }'::jsonb,
  false
WHERE NOT EXISTS (
  SELECT 1 FROM invoice_templates 
  WHERE name = 'Professional Gray' AND org_id IS NULL
);

-- Template 8: Vibrant Purple (if not exists)
INSERT INTO invoice_templates (org_id, name, config_json, is_default) 
SELECT 
  NULL,
  'Vibrant Purple',
  '{
    "layout": "vibrant-purple",
    "logoPosition": "top-left",
    "primaryColor": "#A855F7",
    "secondaryColor": "#9333EA",
    "accentColor": "#C084FC",
    "backgroundColor": "#FFFFFF",
    "textColor": "#000000",
    "fontFamily": "Helvetica",
    "fontSize": 12,
    "pagePadding": 48,
    "showTaxBreakdown": true,
    "showPaymentTerms": true,
    "showBankDetails": true
  }'::jsonb,
  false
WHERE NOT EXISTS (
  SELECT 1 FROM invoice_templates 
  WHERE name = 'Vibrant Purple' AND org_id IS NULL
);

-- Template 9: Clean Green (if not exists)
INSERT INTO invoice_templates (org_id, name, config_json, is_default) 
SELECT 
  NULL,
  'Clean Green',
  '{
    "layout": "clean-green",
    "logoPosition": "top-left",
    "primaryColor": "#10B981",
    "secondaryColor": "#059669",
    "accentColor": "#34D399",
    "backgroundColor": "#FFFFFF",
    "textColor": "#000000",
    "fontFamily": "Helvetica",
    "fontSize": 12,
    "pagePadding": 48,
    "showTaxBreakdown": true,
    "showPaymentTerms": true,
    "showBankDetails": true
  }'::jsonb,
  false
WHERE NOT EXISTS (
  SELECT 1 FROM invoice_templates 
  WHERE name = 'Clean Green' AND org_id IS NULL
);

-- Template 10: Luxury Gold (if not exists)
INSERT INTO invoice_templates (org_id, name, config_json, is_default) 
SELECT 
  NULL,
  'Luxury Gold',
  '{
    "layout": "luxury-gold",
    "logoPosition": "top-center",
    "primaryColor": "#D97706",
    "secondaryColor": "#B45309",
    "accentColor": "#F59E0B",
    "backgroundColor": "#FFFFFF",
    "textColor": "#000000",
    "fontFamily": "Helvetica",
    "fontSize": 12,
    "pagePadding": 48,
    "showTaxBreakdown": true,
    "showPaymentTerms": true,
    "showBankDetails": true
  }'::jsonb,
  false
WHERE NOT EXISTS (
  SELECT 1 FROM invoice_templates 
  WHERE name = 'Luxury Gold' AND org_id IS NULL
);

-- Set Classic Blue as default if no default exists
UPDATE invoice_templates 
SET is_default = true 
WHERE name = 'Classic Blue' 
  AND org_id IS NULL
  AND NOT EXISTS (
    SELECT 1 FROM invoice_templates 
    WHERE org_id IS NULL AND is_default = true
  );
