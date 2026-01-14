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
  onSelectTemplate: (templateId: string) => void
  onGeneratePDF: (templateId: string) => void
}

export default function TemplateSelectionModal({
  open,
  onOpenChange,
  templates,
  selectedTemplateId,
  onSelectTemplate,
  onGeneratePDF,
}: TemplateSelectionModalProps) {
  const [localSelectedId, setLocalSelectedId] = useState<string | null>(selectedTemplateId)

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

                {/* Template Preview */}
                <div className="mb-3">
                  <div
                    className="w-full h-32 rounded border-2 border-gray-200 flex items-center justify-center"
                    style={{
                      backgroundColor: template.config_json?.backgroundColor || '#FFFFFF',
                      borderColor: isSelected ? previewColor : '#E5E7EB',
                    }}
                  >
                    <div className="text-center">
                      <div
                        className="w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center text-white font-bold text-xl"
                        style={{ backgroundColor: previewColor }}
                      >
                        {template.name.charAt(0)}
                      </div>
                      <div
                        className="text-xs font-semibold"
                        style={{ color: template.config_json?.textColor || '#000000' }}
                      >
                        {template.name}
                      </div>
                    </div>
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
