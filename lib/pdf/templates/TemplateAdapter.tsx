import React from 'react'
import { InvoiceTemplateProps } from './types'
import { ClassicBlue } from './ClassicBlue'
import { ModernMinimal } from './ModernMinimal'
import { BaseTemplate } from './BaseTemplate'

// Import all original templates (all fully converted)
import { CorporateElegant } from './CorporateElegant'
import { CreativeBold } from './CreativeBold'
import { SimpleBlackWhite } from './SimpleBlackWhite'
import { GradientModern } from './GradientModern'
import { ProfessionalGray } from './ProfessionalGray'
import { VibrantPurple } from './VibrantPurple'
import { CleanGreen } from './CleanGreen'
import { LuxuryGold } from './LuxuryGold'

// Import new tech-themed templates
import { TechMinimal } from './TechMinimal'
import { TechDark } from './TechDark'
import { TechPro } from './TechPro'
import { TechGrid } from './TechGrid'
import { TechModern } from './TechModern'
import { TechNeon } from './TechNeon'
import { TechFuturistic } from './TechFuturistic'
import { TechCyber } from './TechCyber'
import { TechMatrix } from './TechMatrix'
import { TechDigital } from './TechDigital'

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
  
  // Fully converted templates
  'corporate-elegant': CorporateElegant,
  'creative-bold': CreativeBold,
  'simple-bw': SimpleBlackWhite,
  'gradient-modern': GradientModern,
  'professional-gray': ProfessionalGray,
  'vibrant-purple': VibrantPurple,
  'clean-green': CleanGreen,
  'luxury-gold': LuxuryGold,
  
  // New tech-themed templates (all fully converted with dynamic data)
  'tech-minimal': TechMinimal,
  'tech-dark': TechDark,
  'tech-pro': TechPro,
  'tech-grid': TechGrid,
  'tech-modern': TechModern,
  'tech-neon': TechNeon,
  'tech-futuristic': TechFuturistic,
  'tech-cyber': TechCyber,
  'tech-matrix': TechMatrix,
  'tech-digital': TechDigital,
  
  // Legacy mappings (from old template system)
  'classic': ClassicBlue,
  'minimal': ModernMinimal,
  'elegant': CorporateElegant,
  'bold': CreativeBold,
  'clean': CleanGreen,
  'modern': GradientModern,
  'professional': ProfessionalGray,
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
