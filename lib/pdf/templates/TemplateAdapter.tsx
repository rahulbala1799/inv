import React from 'react'
import { InvoiceTemplateProps } from './types'
import { ClassicBlue } from './ClassicBlue'
import { ModernMinimal } from './ModernMinimal'
import { BaseTemplate } from './BaseTemplate'

// Import remaining templates (will be converted in Phase 3)
// For now, they'll use BaseTemplate as fallback
import { CorporateElegant } from './CorporateElegant'
import { CreativeBold } from './CreativeBold'
import { SimpleBlackWhite } from './SimpleBlackWhite'
import { GradientModern } from './GradientModern'
import { ProfessionalGray } from './ProfessionalGray'
import { VibrantPurple } from './VibrantPurple'
import { CleanGreen } from './CleanGreen'
import { LuxuryGold } from './LuxuryGold'

/**
 * Template component type
 */
type TemplateComponent = React.ComponentType<InvoiceTemplateProps>

/**
 * Template mapping from layout name to component
 */
const templateMap: Record<string, TemplateComponent> = {
  // Fully converted templates
  'classic-blue': ClassicBlue,
  'modern-minimal': ModernMinimal,
  
  // Templates using BaseTemplate temporarily (to be converted in Phase 3)
  'corporate-elegant': BaseTemplate, // TODO: Convert CorporateElegant
  'creative-bold': BaseTemplate, // TODO: Convert CreativeBold
  'simple-bw': BaseTemplate, // TODO: Convert SimpleBlackWhite
  'gradient-modern': BaseTemplate, // TODO: Convert GradientModern
  'professional-gray': BaseTemplate, // TODO: Convert ProfessionalGray
  'vibrant-purple': BaseTemplate, // TODO: Convert VibrantPurple
  'clean-green': BaseTemplate, // TODO: Convert CleanGreen
  'luxury-gold': BaseTemplate, // TODO: Convert LuxuryGold
  
  // Legacy mappings (from old template system)
  'classic': ClassicBlue,
  'minimal': ModernMinimal,
  'elegant': BaseTemplate,
  'bold': BaseTemplate,
  'clean': BaseTemplate,
  'modern': BaseTemplate,
  'professional': BaseTemplate,
}

/**
 * Get template component by layout name
 * 
 * @param layout - Layout name from template config
 * @returns Template component or ClassicBlue as default
 */
export function getTemplateComponent(layout: string | undefined | null): TemplateComponent {
  if (!layout) {
    return ClassicBlue // Default template
  }
  
  return templateMap[layout.toLowerCase()] || ClassicBlue
}

/**
 * Render template component with props
 * 
 * @param layout - Layout name
 * @param props - Template props
 * @returns Rendered template component
 */
export function renderTemplate(
  layout: string | undefined | null,
  props: InvoiceTemplateProps
): React.ReactElement {
  const TemplateComponent = getTemplateComponent(layout)
  return <TemplateComponent {...props} />
}
