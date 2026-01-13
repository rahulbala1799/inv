-- Seed 3 global invoice templates (org_id is NULL for global templates)

INSERT INTO invoice_templates (org_id, name, config_json, is_default) VALUES
(
  NULL,
  'Classic',
  '{
    "layout": "classic",
    "logoPosition": "top-left",
    "primaryColor": "#4F46E5",
    "secondaryColor": "#6B7280",
    "showTaxBreakdown": true,
    "showPaymentTerms": true
  }'::jsonb,
  true
),
(
  NULL,
  'Modern',
  '{
    "layout": "modern",
    "logoPosition": "top-center",
    "primaryColor": "#059669",
    "secondaryColor": "#374151",
    "showTaxBreakdown": true,
    "showPaymentTerms": true
  }'::jsonb,
  false
),
(
  NULL,
  'Minimal',
  '{
    "layout": "minimal",
    "logoPosition": "top-right",
    "primaryColor": "#1F2937",
    "secondaryColor": "#9CA3AF",
    "showTaxBreakdown": false,
    "showPaymentTerms": false
  }'::jsonb,
  false
)
ON CONFLICT DO NOTHING;
