-- Add 7 invoice templates from invtemplates.pdf
-- These templates are based on the exact designs from the PDF

-- Unset existing defaults before adding new templates
UPDATE invoice_templates 
SET is_default = false 
WHERE org_id IS NULL AND is_default = true;

-- Template 1: Classic with Orange Accent (Circular logo with orange accent, dark header bar)
INSERT INTO invoice_templates (org_id, name, config_json, is_default) VALUES
(
  NULL,
  'Classic with Orange Accent',
  '{
    "layout": "classic",
    "logoPosition": "top-left",
    "primaryColor": "#000000",
    "secondaryColor": "#4B5563",
    "accentColor": "#FF6B35",
    "backgroundColor": "#FFFFFF",
    "textColor": "#000000",
    "fontFamily": "Helvetica",
    "fontSize": 12,
    "pagePadding": 40,
    "showTaxBreakdown": true,
    "showPaymentTerms": true,
    "showBankDetails": true,
    "showContactInfo": true,
    "headerBackground": "#000000",
    "tableHeaderBackground": "#000000",
    "tableHeaderTextColor": "#FFFFFF",
    "tableColumns": ["DESCRIPTION", "QTY", "PRICE", "TOTAL"],
    "footerLayout": "two-column"
  }'::jsonb,
  true
)
ON CONFLICT DO NOTHING;

-- Template 2: Minimalist Architect (Geometric logo, SAMIRA HADID style, B&W)
INSERT INTO invoice_templates (org_id, name, config_json, is_default) VALUES
(
  NULL,
  'Minimalist Architect',
  '{
    "layout": "minimal",
    "logoPosition": "top-left",
    "primaryColor": "#000000",
    "secondaryColor": "#000000",
    "accentColor": "#000000",
    "backgroundColor": "#FFFFFF",
    "textColor": "#000000",
    "fontFamily": "Helvetica",
    "fontSize": 11,
    "pagePadding": 50,
    "showTaxBreakdown": true,
    "showPaymentTerms": false,
    "showBankDetails": false,
    "headerBackground": "transparent",
    "tableHeaderBackground": "transparent",
    "tableColumns": ["DESCRIPTION", "RATE", "HOURS", "AMOUNT"],
    "totalsAlignment": "right",
    "companyNameStyle": "large-bold"
  }'::jsonb,
  false
)
ON CONFLICT DO NOTHING;

-- Template 3: Elegant Signature (Handwritten-style logo, top-right, signature line)
INSERT INTO invoice_templates (org_id, name, config_json, is_default) VALUES
(
  NULL,
  'Elegant Signature',
  '{
    "layout": "elegant",
    "logoPosition": "top-right",
    "primaryColor": "#000000",
    "secondaryColor": "#4B5563",
    "accentColor": "#6B7280",
    "backgroundColor": "#FFFFFF",
    "textColor": "#000000",
    "fontFamily": "Helvetica",
    "fontSize": 12,
    "pagePadding": 45,
    "showTaxBreakdown": true,
    "showPaymentTerms": true,
    "showBankDetails": true,
    "showSignatureLine": true,
    "headerBackground": "transparent",
    "tableHeaderBackground": "transparent",
    "tableColumns": ["DESCRIPTION", "RATE", "QTY", "TOTAL"]
  }'::jsonb,
  false
)
ON CONFLICT DO NOTHING;

-- Template 4: Modern Green (Modern layout with green accent, centered logo)
INSERT INTO invoice_templates (org_id, name, config_json, is_default) VALUES
(
  NULL,
  'Modern Green',
  '{
    "layout": "modern",
    "logoPosition": "top-center",
    "primaryColor": "#059669",
    "secondaryColor": "#374151",
    "accentColor": "#10B981",
    "backgroundColor": "#FFFFFF",
    "textColor": "#1F2937",
    "fontFamily": "Helvetica",
    "fontSize": 12,
    "pagePadding": 40,
    "showTaxBreakdown": true,
    "showPaymentTerms": true,
    "showBankDetails": true,
    "headerBackground": "#ECFDF5",
    "tableHeaderBackground": "#F0FDF4",
    "tableColumns": ["DESCRIPTION", "QTY", "PRICE", "TOTAL"]
  }'::jsonb,
  false
)
ON CONFLICT DO NOTHING;

-- Template 5: Bold Blue (Bold header with blue background, white text)
INSERT INTO invoice_templates (org_id, name, config_json, is_default) VALUES
(
  NULL,
  'Bold Blue',
  '{
    "layout": "bold",
    "logoPosition": "top-left",
    "primaryColor": "#2563EB",
    "secondaryColor": "#1E40AF",
    "accentColor": "#3B82F6",
    "backgroundColor": "#FFFFFF",
    "textColor": "#1F2937",
    "fontFamily": "Helvetica",
    "fontSize": 12,
    "pagePadding": 35,
    "showTaxBreakdown": true,
    "showPaymentTerms": true,
    "showBankDetails": true,
    "headerBackground": "#2563EB",
    "tableHeaderBackground": "#2563EB",
    "tableHeaderTextColor": "#FFFFFF",
    "tableColumns": ["DESCRIPTION", "QTY", "PRICE", "TOTAL"]
  }'::jsonb,
  false
)
ON CONFLICT DO NOTHING;

-- Template 6: Clean Minimal (Ultra-clean, minimal styling, light grey accents)
INSERT INTO invoice_templates (org_id, name, config_json, is_default) VALUES
(
  NULL,
  'Clean Minimal',
  '{
    "layout": "clean",
    "logoPosition": "top-left",
    "primaryColor": "#374151",
    "secondaryColor": "#6B7280",
    "accentColor": "#9CA3AF",
    "backgroundColor": "#FFFFFF",
    "textColor": "#1F2937",
    "fontFamily": "Helvetica",
    "fontSize": 11,
    "pagePadding": 50,
    "showTaxBreakdown": true,
    "showPaymentTerms": false,
    "showBankDetails": false,
    "headerBackground": "transparent",
    "tableHeaderBackground": "#FAFAFA",
    "tableColumns": ["DESCRIPTION", "QTY", "PRICE", "TOTAL"]
  }'::jsonb,
  false
)
ON CONFLICT DO NOTHING;

-- Template 7: Professional Classic (Traditional professional layout, grey header)
INSERT INTO invoice_templates (org_id, name, config_json, is_default) VALUES
(
  NULL,
  'Professional Classic',
  '{
    "layout": "professional",
    "logoPosition": "top-left",
    "primaryColor": "#1F2937",
    "secondaryColor": "#4B5563",
    "accentColor": "#6B7280",
    "backgroundColor": "#FFFFFF",
    "textColor": "#1F2937",
    "fontFamily": "Helvetica",
    "fontSize": 12,
    "pagePadding": 40,
    "showTaxBreakdown": true,
    "showPaymentTerms": true,
    "showBankDetails": true,
    "headerBackground": "transparent",
    "tableHeaderBackground": "#F3F4F6",
    "tableColumns": ["DESCRIPTION", "QTY", "PRICE", "TOTAL"]
  }'::jsonb,
  false
)
ON CONFLICT DO NOTHING;
