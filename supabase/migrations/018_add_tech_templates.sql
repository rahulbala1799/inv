-- Migration 018: Add 10 new tech-themed invoice templates
-- These templates are exact copies of the templates from more templates.zip with dynamic data binding

-- Template 1: Tech Minimal
INSERT INTO invoice_templates (org_id, name, config_json, is_default) 
SELECT 
  NULL,
  'Tech Minimal',
  '{
    "layout": "tech-minimal",
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
  WHERE name = 'Tech Minimal' AND org_id IS NULL
);

-- Template 2: Tech Dark
INSERT INTO invoice_templates (org_id, name, config_json, is_default) 
SELECT 
  NULL,
  'Tech Dark',
  '{
    "layout": "tech-dark",
    "logoPosition": "top-left",
    "primaryColor": "#1E293B",
    "secondaryColor": "#0F172A",
    "accentColor": "#475569",
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
  WHERE name = 'Tech Dark' AND org_id IS NULL
);

-- Template 3: Tech Pro
INSERT INTO invoice_templates (org_id, name, config_json, is_default) 
SELECT 
  NULL,
  'Tech Pro',
  '{
    "layout": "tech-pro",
    "logoPosition": "sidebar",
    "primaryColor": "#4F46E5",
    "secondaryColor": "#4338CA",
    "accentColor": "#6366F1",
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
  WHERE name = 'Tech Pro' AND org_id IS NULL
);

-- Template 4: Tech Grid
INSERT INTO invoice_templates (org_id, name, config_json, is_default) 
SELECT 
  NULL,
  'Tech Grid',
  '{
    "layout": "tech-grid",
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
  WHERE name = 'Tech Grid' AND org_id IS NULL
);

-- Template 5: Tech Modern
INSERT INTO invoice_templates (org_id, name, config_json, is_default) 
SELECT 
  NULL,
  'Tech Modern',
  '{
    "layout": "tech-modern",
    "logoPosition": "top-left",
    "primaryColor": "#F97316",
    "secondaryColor": "#EA580C",
    "accentColor": "#FB923C",
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
  WHERE name = 'Tech Modern' AND org_id IS NULL
);

-- Template 6: Tech Neon
INSERT INTO invoice_templates (org_id, name, config_json, is_default) 
SELECT 
  NULL,
  'Tech Neon',
  '{
    "layout": "tech-neon",
    "logoPosition": "center",
    "primaryColor": "#000000",
    "secondaryColor": "#1F2937",
    "accentColor": "#374151",
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
  WHERE name = 'Tech Neon' AND org_id IS NULL
);

-- Template 7: Tech Futuristic
INSERT INTO invoice_templates (org_id, name, config_json, is_default) 
SELECT 
  NULL,
  'Tech Futuristic',
  '{
    "layout": "tech-futuristic",
    "logoPosition": "top-left",
    "primaryColor": "#14B8A6",
    "secondaryColor": "#0D9488",
    "accentColor": "#2DD4BF",
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
  WHERE name = 'Tech Futuristic' AND org_id IS NULL
);

-- Template 8: Tech Cyber
INSERT INTO invoice_templates (org_id, name, config_json, is_default) 
SELECT 
  NULL,
  'Tech Cyber',
  '{
    "layout": "tech-cyber",
    "logoPosition": "top-left",
    "primaryColor": "#E11D48",
    "secondaryColor": "#BE185D",
    "accentColor": "#F43F5E",
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
  WHERE name = 'Tech Cyber' AND org_id IS NULL
);

-- Template 9: Tech Matrix
INSERT INTO invoice_templates (org_id, name, config_json, is_default) 
SELECT 
  NULL,
  'Tech Matrix',
  '{
    "layout": "tech-matrix",
    "logoPosition": "top-left",
    "primaryColor": "#7C3AED",
    "secondaryColor": "#6D28D9",
    "accentColor": "#8B5CF6",
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
  WHERE name = 'Tech Matrix' AND org_id IS NULL
);

-- Template 10: Tech Digital
INSERT INTO invoice_templates (org_id, name, config_json, is_default) 
SELECT 
  NULL,
  'Tech Digital',
  '{
    "layout": "tech-digital",
    "logoPosition": "top-left",
    "primaryColor": "#0891B2",
    "secondaryColor": "#0E7490",
    "accentColor": "#06B6D4",
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
  WHERE name = 'Tech Digital' AND org_id IS NULL
);
