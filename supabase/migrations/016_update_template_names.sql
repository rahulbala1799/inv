-- Update template names to be more descriptive and professional

-- Template 1: Classic with Orange Accent → Professional Dark
UPDATE invoice_templates 
SET name = 'Professional Dark'
WHERE name = 'Classic with Orange Accent' AND org_id IS NULL;

-- Template 2: Minimalist Architect → Minimalist
UPDATE invoice_templates 
SET name = 'Minimalist'
WHERE name = 'Minimalist Architect' AND org_id IS NULL;

-- Template 3: Elegant Signature → Elegant
UPDATE invoice_templates 
SET name = 'Elegant'
WHERE name = 'Elegant Signature' AND org_id IS NULL;

-- Template 4: Modern Green → Modern
UPDATE invoice_templates 
SET name = 'Modern'
WHERE name = 'Modern Green' AND org_id IS NULL;

-- Template 5: Bold Blue → Bold
UPDATE invoice_templates 
SET name = 'Bold'
WHERE name = 'Bold Blue' AND org_id IS NULL;

-- Template 6: Clean Minimal → Clean
UPDATE invoice_templates 
SET name = 'Clean'
WHERE name = 'Clean Minimal' AND org_id IS NULL;

-- Template 7: Professional Classic → Classic
UPDATE invoice_templates 
SET name = 'Classic'
WHERE name = 'Professional Classic' AND org_id IS NULL;
