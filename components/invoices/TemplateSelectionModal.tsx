'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

interface Template {
  id: string
  name: string
  config_json: any
  is_default?: boolean
}

interface TemplateSelectionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  templates: Template[]
  selectedTemplateId: string | null
  invoiceId: string
  orgId: string
  onSelectTemplate: (templateId: string) => void
  onGeneratePDF: (templateId: string) => void
}

export default function TemplateSelectionModal({
  open,
  onOpenChange,
  templates,
  selectedTemplateId,
  invoiceId,
  orgId,
  onSelectTemplate,
  onGeneratePDF,
}: TemplateSelectionModalProps) {
  const [localSelectedId, setLocalSelectedId] = useState<string | null>(selectedTemplateId)
  const [hoveredTemplateId, setHoveredTemplateId] = useState<string | null>(null)

  const handleSelect = (templateId: string) => {
    setLocalSelectedId(templateId)
    onSelectTemplate(templateId)
  }

  const handleGenerate = () => {
    if (localSelectedId) {
      onGeneratePDF(localSelectedId)
      onOpenChange(false)
    }
  }

  const getTemplatePreviewColor = (template: Template) => {
    const config = template.config_json || {}
    return config.accentColor || config.primaryColor || '#4F46E5'
  }

  const getTemplateDescription = (template: Template) => {
    const config = template.config_json || {}
    const layout = config.layout || 'classic'
    const descriptions: Record<string, string> = {
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select Invoice Template</DialogTitle>
          <DialogDescription>
            Choose a template to generate your PDF invoice. You can preview and select from 7 professional templates.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {templates.map((template) => {
            const isSelected = localSelectedId === template.id
            const previewColor = getTemplatePreviewColor(template)
            const description = getTemplateDescription(template)

            return (
              <button
                key={template.id}
                onClick={() => handleSelect(template.id)}
                className={`
                  relative p-4 border-2 rounded-lg transition-all
                  ${isSelected 
                    ? 'border-indigo-500 bg-indigo-50 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }
                `}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-indigo-500 rounded-full p-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}

                {/* Template Preview - Visual Thumbnail */}
                <div 
                  className="mb-3 relative group"
                  onMouseEnter={() => setHoveredTemplateId(template.id)}
                  onMouseLeave={() => setHoveredTemplateId(null)}
                >
                  <div
                    className="w-full h-40 rounded border-2 border-gray-200 overflow-hidden bg-white relative cursor-pointer"
                    style={{
                      borderColor: isSelected ? previewColor : '#E5E7EB',
                      backgroundColor: template.config_json?.backgroundColor || '#FFFFFF',
                    }}
                  >
                    {/* Template Structure Preview */}
                    <div className="p-2 h-full flex flex-col">
                      {/* Header Bar */}
                      <div 
                        className="h-6 mb-1 rounded"
                        style={{ 
                          backgroundColor: template.config_json?.headerBackground || template.config_json?.primaryColor || '#F3F4F6',
                        }}
                      >
                        <div className="flex items-center justify-between px-2 h-full">
                          <div className="flex items-center gap-1">
                            {template.config_json?.logoPosition === 'top-left' && (
                              <div 
                                className="w-3 h-3 rounded"
                                style={{ backgroundColor: previewColor }}
                              />
                            )}
                            <div 
                              className="text-[6px] font-bold"
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
                              className="w-3 h-3 rounded"
                              style={{ backgroundColor: previewColor }}
                            />
                          )}
                        </div>
                      </div>
                      
                      {/* Table Header */}
                      <div 
                        className="h-4 mb-1 rounded"
                        style={{ 
                          backgroundColor: template.config_json?.tableHeaderBackground || '#F3F4F6',
                        }}
                      >
                        <div className="flex gap-1 px-1 h-full items-center">
                          <div 
                            className="flex-1 h-2 rounded"
                            style={{ backgroundColor: template.config_json?.tableHeaderTextColor || template.config_json?.textColor || '#000000', opacity: 0.3 }}
                          />
                          <div 
                            className="w-8 h-2 rounded"
                            style={{ backgroundColor: template.config_json?.tableHeaderTextColor || template.config_json?.textColor || '#000000', opacity: 0.3 }}
                          />
                          <div 
                            className="w-8 h-2 rounded"
                            style={{ backgroundColor: template.config_json?.tableHeaderTextColor || template.config_json?.textColor || '#000000', opacity: 0.3 }}
                          />
                        </div>
                      </div>
                      
                      {/* Table Rows */}
                      {[1, 2].map((i) => (
                        <div key={i} className="h-3 mb-0.5 flex gap-1 px-1">
                          <div className="flex-1 h-full bg-gray-100 rounded" />
                          <div className="w-8 h-full bg-gray-100 rounded" />
                          <div className="w-8 h-full bg-gray-100 rounded" />
                        </div>
                      ))}
                      
                      {/* Totals Section */}
                      <div className="mt-auto flex justify-end gap-2">
                        <div 
                          className="h-3 w-12 rounded"
                          style={{ backgroundColor: previewColor, opacity: 0.2 }}
                        />
                        <div 
                          className="h-3 w-16 rounded"
                          style={{ backgroundColor: previewColor }}
                        />
                      </div>
                    </div>
                    
                    {/* Hover overlay - Show full preview */}
                    {hoveredTemplateId === template.id && (
                      <div className="absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center">
                        <div className="bg-white px-3 py-1.5 rounded shadow-lg text-xs font-semibold border">
                          Click to preview full PDF
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Template Info */}
                <div>
                  <h3 className="font-semibold text-sm mb-1">{template.name}</h3>
                  <p className="text-xs text-gray-600">{description}</p>
                  {template.is_default && (
                    <span className="inline-block mt-2 text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      Default
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={!localSelectedId}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Generate PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
