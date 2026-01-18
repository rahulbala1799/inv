-- Migration 023: Add default_template_id to org_branding table
-- This allows each organization to have a default invoice template
-- The default template is set when a template is used on an invoice

ALTER TABLE org_branding
ADD COLUMN IF NOT EXISTS default_template_id UUID REFERENCES invoice_templates(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_org_branding_default_template ON org_branding(default_template_id);

COMMENT ON COLUMN org_branding.default_template_id IS 'The default invoice template ID for this organization. Set automatically when a template is used on an invoice.';
