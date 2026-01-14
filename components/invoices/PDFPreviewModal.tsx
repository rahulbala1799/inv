'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Download, X, ChevronLeft, ChevronRight } from 'lucide-react'

interface Template {
  id: string
  name: string
  config_json: any
  is_default?: boolean
}

interface PDFPreviewModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  templates: Template[]
  selectedTemplateId: string | null
  invoiceId: string
  orgId: string
  onTemplateChange: (templateId: string) => void
}

export default function PDFPreviewModal({
  open,
  onOpenChange,
  templates,
  selectedTemplateId,
  invoiceId,
  orgId,
  onTemplateChange,
}: PDFPreviewModalProps) {
  const [currentTemplateId, setCurrentTemplateId] = useState<string | null>(selectedTemplateId)
  const [isLoading, setIsLoading] = useState(false)

  const currentTemplateIndex = templates.findIndex(t => t.id === currentTemplateId)
  const currentTemplate = templates[currentTemplateIndex] || templates[0]

  const handleTemplateChange = (templateId: string) => {
    setCurrentTemplateId(templateId)
    onTemplateChange(templateId)
    setIsLoading(true)
    // Reload iframe after a brief moment
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  const handlePreviousTemplate = () => {
    if (currentTemplateIndex > 0) {
      const prevTemplate = templates[currentTemplateIndex - 1]
      handleTemplateChange(prevTemplate.id)
    }
  }

  const handleNextTemplate = () => {
    if (currentTemplateIndex < templates.length - 1) {
      const nextTemplate = templates[currentTemplateIndex + 1]
      handleTemplateChange(nextTemplate.id)
    }
  }

  const handleDownload = () => {
    const pdfUrl = `/api/org/${orgId}/invoices/${invoiceId}/pdf?download=true${currentTemplateId ? `&template=${currentTemplateId}` : ''}`
    window.open(pdfUrl, '_blank')
  }

  const pdfUrl = `/api/org/${orgId}/invoices/${invoiceId}/pdf${currentTemplateId ? `?template=${currentTemplateId}` : ''}`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>PDF Preview</DialogTitle>
              <DialogDescription>
                Preview your invoice with the selected template. You can switch templates or download the PDF.
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousTemplate}
                disabled={currentTemplateIndex === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <select
                value={currentTemplateId || ''}
                onChange={(e) => handleTemplateChange(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
              >
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextTemplate}
                disabled={currentTemplateIndex === templates.length - 1}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                onClick={handleDownload}
                className="bg-indigo-600 hover:bg-indigo-700"
                size="sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden mt-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading preview...</p>
              </div>
            </div>
          ) : (
            <iframe
              src={pdfUrl}
              className="w-full h-full border border-gray-200 rounded-lg"
              title="PDF Preview"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
