-- Migration 022: Add Template 4 (SaaS Professional) and Template 5 (Editorial Magazine)
-- These are new print-ready invoice templates with distinct designs

-- Unset existing defaults before adding new templates
UPDATE invoice_templates 
SET is_default = false 
WHERE org_id IS NULL AND is_default = true;

-- Template 4: SaaS Professional
INSERT INTO invoice_templates (org_id, name, config_json, is_default) 
SELECT 
  NULL,
  'SaaS Professional',
  '{
    "layout": "saas-professional",
    "logoPosition": "top-left",
    "primaryColor": "#4F46E5",
    "secondaryColor": "#6366F1",
    "accentColor": "#6366F1",
    "backgroundColor": "#FFFFFF",
    "textColor": "#111827",
    "fontFamily": "Inter, Helvetica Neue, Helvetica, Arial",
    "fontSize": 10,
    "pagePadding": 0,
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
  WHERE (name = 'SaaS Professional' OR config_json->>'layout' = 'saas-professional') 
    AND org_id IS NULL
);

-- Template 5: Editorial Magazine
INSERT INTO invoice_templates (org_id, name, config_json, is_default) 
SELECT 
  NULL,
  'Editorial Magazine',
  '{
    "layout": "editorial-magazine",
    "logoPosition": "top-left",
    "primaryColor": "#F97316",
    "secondaryColor": "#14B8A6",
    "accentColor": "#14B8A6",
    "backgroundColor": "#FFFFFF",
    "textColor": "#0F172A",
    "fontFamily": "Playfair Display, Georgia, Times New Roman",
    "fontSize": 10,
    "pagePadding": 0,
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
  WHERE (name = 'Editorial Magazine' OR config_json->>'layout' = 'editorial-magazine') 
    AND org_id IS NULL
);
