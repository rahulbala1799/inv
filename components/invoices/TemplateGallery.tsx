'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Check, Sparkles, Palette, Layout } from 'lucide-react'

interface Template {
  id: string
  name: string
  config_json: any
  is_default?: boolean
}

interface TemplateGalleryProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  templates: Template[]
  selectedTemplateId: string | null
  onSelectTemplate: (templateId: string) => void
}

export default function TemplateGallery({
  open,
  onOpenChange,
  templates,
  selectedTemplateId,
  onSelectTemplate,
}: TemplateGalleryProps) {
  const [hoveredTemplateId, setHoveredTemplateId] = useState<string | null>(null)

  const handleSelect = (templateId: string) => {
    onSelectTemplate(templateId)
    onOpenChange(false)
  }

  const getTemplatePreviewColor = (template: Template) => {
    const config = template.config_json || {}
    return config.accentColor || config.primaryColor || '#4F46E5'
  }

  const getTemplateDescription = (template: Template) => {
    const config = template.config_json || {}
    const layout = config.layout || 'classic'
    const descriptions: Record<string, string> = {
      'classic-blue': 'Timeless professional design with blue accents',
      'modern-minimal': 'Clean, minimalist black and white aesthetic',
      'bold-purple': 'Eye-catching layout with bold purple header',
      'elegant-green': 'Sophisticated design with elegant green tones',
      'warm-orange': 'Friendly and approachable orange styling',
      'tech-cyan': 'Modern tech-inspired cyan and dark theme',
      'luxury-gold': 'Premium gold accents for high-end services',
      classic: 'Traditional layout with professional styling',
      minimal: 'Clean, minimalist black and white design',
      modern: 'Contemporary design with vibrant colors',
      elegant: 'Sophisticated layout with elegant typography',
      bold: 'Bold header with strong visual impact',
      clean: 'Ultra-clean design with minimal elements',
      professional: 'Classic professional business layout',
    }
    return descriptions[layout] || 'Professional invoice template'
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-8 pt-8 pb-6 border-b bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Layout className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Template Gallery</DialogTitle>
              <DialogDescription className="text-sm mt-1">
                Choose from {templates.length} professional invoice templates
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => {
              const isSelected = selectedTemplateId === template.id
              const previewColor = getTemplatePreviewColor(template)
              const description = getTemplateDescription(template)
              const isHovered = hoveredTemplateId === template.id

              return (
                <button
                  key={template.id}
                  onClick={() => handleSelect(template.id)}
                  onMouseEnter={() => setHoveredTemplateId(template.id)}
                  onMouseLeave={() => setHoveredTemplateId(null)}
                  className={`
                    relative group overflow-hidden rounded-xl transition-all duration-300
                    ${isSelected 
                      ? 'ring-2 ring-indigo-500 ring-offset-2 shadow-xl scale-[1.02]' 
                      : 'hover:shadow-lg hover:scale-[1.01]'
                    }
                  `}
                >
                  <div className={`
                    p-5 border-2 rounded-xl bg-white transition-all
                    ${isSelected 
                      ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50' 
                      : 'border-gray-200 hover:border-indigo-300'
                    }
                  `}>
                    {/* Selection Badge */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 z-10">
                        <div className="bg-indigo-600 rounded-full p-1.5 shadow-lg">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}

                    {/* Default Badge */}
                    {template.is_default && !isSelected && (
                      <div className="absolute top-3 right-3 z-10">
                        <div className="bg-amber-400 text-amber-900 text-xs font-semibold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Default
                        </div>
                      </div>
                    )}

                    {/* Template Preview Thumbnail */}
                    <div className="relative mb-4 group-hover:scale-[1.02] transition-transform duration-300">
                      <div
                        className="w-full rounded-lg border-2 overflow-hidden bg-white shadow-md relative"
                        style={{
                          height: '240px',
                          borderColor: isSelected ? previewColor : '#E5E7EB',
                          backgroundColor: template.config_json?.backgroundColor || '#FFFFFF',
                        }}
                      >
                        {/* Template Structure Preview */}
                        <div className="p-3 h-full flex flex-col">
                          {/* Header Bar */}
                          <div 
                            className="h-10 mb-2 rounded-md flex items-center justify-between px-3 shadow-sm"
                            style={{ 
                              backgroundColor: template.config_json?.headerBackground || template.config_json?.primaryColor || '#F3F4F6',
                            }}
                          >
                            <div className="flex items-center gap-2">
                              {template.config_json?.logoPosition !== 'top-right' && (
                                <div 
                                  className="w-6 h-6 rounded shadow-sm"
                                  style={{ backgroundColor: previewColor }}
                                />
                              )}
                              <div 
                                className="text-xs font-bold"
                                style={{ 
                                  color: template.config_json?.headerBackground === '#000000' || template.config_json?.tableHeaderBackground === '#000000' 
                                    ? '#FFFFFF' 
                                    : (template.config_json?.primaryColor || '#000000')
                                }}
                              >
                                INVOICE
                              </div>
                            </div>
                            {template.config_json?.logoPosition === 'top-right' && (
                              <div 
                                className="w-6 h-6 rounded shadow-sm"
                                style={{ backgroundColor: previewColor }}
                              />
                            )}
                          </div>
                          
                          {/* Company & Customer Info */}
                          <div className="grid grid-cols-2 gap-2 mb-2">
                            <div className="space-y-1">
                              <div className="h-2 bg-gray-300 rounded w-3/4" />
                              <div className="h-1.5 bg-gray-200 rounded w-full" />
                              <div className="h-1.5 bg-gray-200 rounded w-5/6" />
                            </div>
                            <div className="space-y-1">
                              <div className="h-2 bg-gray-300 rounded w-2/3" />
                              <div className="h-1.5 bg-gray-200 rounded w-full" />
                              <div className="h-1.5 bg-gray-200 rounded w-4/5" />
                            </div>
                          </div>
                          
                          {/* Table Header */}
                          <div 
                            className="h-6 mb-1 rounded flex items-center px-2 shadow-sm"
                            style={{ 
                              backgroundColor: template.config_json?.tableHeaderBackground || '#F3F4F6',
                            }}
                          >
                            <div className="flex gap-2 w-full">
                              <div 
                                className="flex-1 h-2 rounded"
                                style={{ 
                                  backgroundColor: template.config_json?.tableHeaderTextColor || template.config_json?.textColor || '#000000', 
                                  opacity: 0.4 
                                }}
                              />
                              <div 
                                className="w-12 h-2 rounded"
                                style={{ 
                                  backgroundColor: template.config_json?.tableHeaderTextColor || template.config_json?.textColor || '#000000', 
                                  opacity: 0.4 
                                }}
                              />
                              <div 
                                className="w-12 h-2 rounded"
                                style={{ 
                                  backgroundColor: template.config_json?.tableHeaderTextColor || template.config_json?.textColor || '#000000', 
                                  opacity: 0.4 
                                }}
                              />
                            </div>
                          </div>
                          
                          {/* Table Rows */}
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="h-5 mb-1 flex gap-2 px-2">
                              <div className="flex-1 h-full bg-gray-100 rounded" />
                              <div className="w-12 h-full bg-gray-100 rounded" />
                              <div className="w-12 h-full bg-gray-100 rounded" />
                            </div>
                          ))}
                          
                          {/* Totals Section */}
                          <div className="mt-auto flex justify-end gap-3 items-center">
                            <div className="text-[10px] font-semibold text-gray-600">TOTAL</div>
                            <div 
                              className="h-6 w-20 rounded flex items-center justify-center shadow-sm"
                              style={{ backgroundColor: previewColor }}
                            >
                              <span className="text-[10px] font-bold text-white">$1,234</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Hover Overlay */}
                        {isHovered && !isSelected && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center pb-4 transition-opacity duration-200">
                            <div className="bg-white px-4 py-2 rounded-lg shadow-xl border border-gray-200">
                              <span className="text-xs font-semibold text-gray-900">Click to select</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Template Info */}
                    <div className="text-left">
                      <h3 className="font-semibold text-base mb-1.5 text-gray-900 flex items-center gap-2">
                        {template.name}
                        {isSelected && (
                          <span className="text-xs font-normal text-indigo-600">(Current)</span>
                        )}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
                      
                      {/* Color Preview Dots */}
                      <div className="flex items-center gap-1.5 mt-3">
                        <Palette className="w-3 h-3 text-gray-400" />
                        <div className="flex gap-1.5">
                          <div 
                            className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: template.config_json?.primaryColor || '#4F46E5' }}
                          />
                          <div 
                            className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: template.config_json?.accentColor || '#FCD34D' }}
                          />
                          <div 
                            className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: template.config_json?.backgroundColor || '#FFFFFF' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="px-8 py-5 border-t bg-gray-50 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {selectedTemplateId && (
              <span>
                <span className="font-medium text-gray-900">
                  {templates.find(t => t.id === selectedTemplateId)?.name}
                </span>
                {' '}selected
              </span>
            )}
          </div>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
