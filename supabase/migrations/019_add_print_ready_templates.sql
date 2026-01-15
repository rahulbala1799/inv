-- Migration 019: Add A4 print-ready invoice templates
-- Modern Minimal (updated), Professional Classic, and Bold Contemporary templates
-- These templates are optimized for A4 printing with proper page breaks and multi-page support

-- Template 1: Professional Classic
INSERT INTO invoice_templates (org_id, name, config_json, is_default) 
SELECT 
  NULL,
  'Professional Classic',
  '{
    "layout": "professional-classic",
    "logoPosition": "top-left",
    "primaryColor": "#2c2c2c",
    "secondaryColor": "#555555",
    "accentColor": "#2c2c2c",
    "backgroundColor": "#FFFFFF",
    "textColor": "#2c2c2c",
    "fontFamily": "Georgia",
    "fontSize": 10,
    "pagePadding": 10,
    "showTaxBreakdown": true,
    "showPaymentTerms": true,
    "showBankDetails": true,
    "printReady": true,
    "pageSize": "A4",
    "repeatHeadersOnPages": true
  }'::jsonb,
  false
WHERE NOT EXISTS (
  SELECT 1 FROM invoice_templates 
  WHERE name = 'Professional Classic' AND org_id IS NULL
);

-- Template 2: Bold Contemporary
INSERT INTO invoice_templates (org_id, name, config_json, is_default) 
SELECT 
  NULL,
  'Bold Contemporary',
  '{
    "layout": "bold-contemporary",
    "logoPosition": "header-left",
    "primaryColor": "#667eea",
    "secondaryColor": "#764ba2",
    "accentColor": "#667eea",
    "backgroundColor": "#FFFFFF",
    "textColor": "#1a1a1a",
    "fontFamily": "Roboto",
    "fontSize": 10,
    "pagePadding": 10,
    "showTaxBreakdown": true,
    "showPaymentTerms": true,
    "showBankDetails": true,
    "printReady": true,
    "pageSize": "A4",
    "repeatHeadersOnPages": true
  }'::jsonb,
  false
WHERE NOT EXISTS (
  SELECT 1 FROM invoice_templates 
  WHERE name = 'Bold Contemporary' AND org_id IS NULL
);

-- Update Modern Minimal template configuration for print-ready support and set as default
UPDATE invoice_templates
SET 
  config_json = config_json || '{
    "printReady": true,
    "pageSize": "A4",
    "repeatHeadersOnPages": true
  }'::jsonb,
  is_default = true
WHERE name = 'Modern Minimal' 
  AND org_id IS NULL;

-- Remove default flag from all other templates
UPDATE invoice_templates
SET is_default = false
WHERE name != 'Modern Minimal' 
  AND org_id IS NULL
  AND is_default = true;
