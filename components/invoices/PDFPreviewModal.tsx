'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Download, X } from 'lucide-react'

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



  const handleDownload = () => {
    const pdfUrl = `/api/org/${orgId}/invoices/${invoiceId}/pdf?download=true${currentTemplateId ? `&template=${currentTemplateId}` : ''}`
    window.open(pdfUrl, '_blank')
  }

  const pdfUrl = `/api/org/${orgId}/invoices/${invoiceId}/pdf${currentTemplateId ? `?template=${currentTemplateId}` : ''}`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[95vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>PDF Preview</DialogTitle>
              <DialogDescription>
                Preview your invoice with the selected template. You can switch templates or download the PDF.
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
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

        <div className="flex-1 overflow-auto p-6 min-h-0">
          {isLoading ? (
            <div className="flex items-center justify-center h-full min-h-[600px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading preview...</p>
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <iframe
                src={pdfUrl}
                className="border border-gray-200 rounded-lg shadow-sm"
                style={{ 
                  height: 'calc(95vh - 220px)', // Account for header and padding
                  minHeight: '1123px', // A4 page height (297mm at 96 DPI)
                  width: '100%',
                  maxWidth: '794px' // A4 width (210mm at 96 DPI)
                }}
                title="PDF Preview"
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
