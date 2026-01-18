'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Download, 
  FileText, 
  Copy, 
  Trash2, 
  Edit,
  Loader2,
  Sparkles
} from 'lucide-react'
import TemplateGallery from './TemplateGallery'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Template {
  id: string
  name: string
  config_json: any
  is_default?: boolean
}

interface GenerateInvoicePageProps {
  invoice: any
  items: any[]
  templates: Template[]
  branding: any
  orgId: string
  invoiceId: string
  orgName: string
}

export default function GenerateInvoicePage({
  invoice,
  items,
  templates,
  branding,
  orgId,
  invoiceId,
  orgName,
}: GenerateInvoicePageProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    invoice.template_id || templates.find(t => t.is_default)?.id || templates[0]?.id || null
  )
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const currentTemplate = templates.find(t => t.id === selectedTemplateId)

  const pdfUrl = useMemo(() => {
    const params = new URLSearchParams()
    params.set('format', 'html')
    if (selectedTemplateId) params.set('template', selectedTemplateId)
    return `/api/org/${orgId}/invoices/${invoiceId}/pdf?${params.toString()}`
  }, [orgId, invoiceId, selectedTemplateId])

  const handleTemplateChange = async (templateId: string) => {
    setSelectedTemplateId(templateId)
    setIsLoading(true)

    // Update invoice with selected template
    try {
      await fetch(`/api/org/${orgId}/invoices/${invoiceId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ template_id: templateId }),
      })
    } catch (error) {
      console.error('Failed to update template:', error)
    }
    
    // Simulate loading for smooth UX
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  const handleDownload = () => {
    const params = new URLSearchParams()
    if (selectedTemplateId) params.set('template', selectedTemplateId)
    params.set('download', 'true')
    window.open(`/api/org/${orgId}/invoices/${invoiceId}/pdf?${params.toString()}`, '_blank')
  }

  const handleDuplicate = async () => {
    try {
      const response = await fetch(`/api/org/${orgId}/invoices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...invoice,
          invoice_number: `${invoice.invoice_number}-COPY`,
          status: 'DRAFT',
          id: undefined,
        }),
      })
      
      if (response.ok) {
        const data = await response.json()
        window.location.href = `/app/org/${orgId}/invoices/${data.id}`
      }
    } catch (error) {
      console.error('Failed to duplicate invoice:', error)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await fetch(`/api/org/${orgId}/invoices/${invoiceId}`, {
        method: 'DELETE',
      })
      window.location.href = `/app/org/${orgId}/invoices`
    } catch (error) {
      console.error('Failed to delete invoice:', error)
      setIsDeleting(false)
    }
  }


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID': return 'bg-green-100 text-green-700 border-green-200'
      case 'SENT': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'VOID': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href={`/app/org/${orgId}/invoices/${invoiceId}`}>
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Invoice
                </Button>
              </Link>
              
              <div className="h-6 w-px bg-gray-300" />
              
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <h1 className="text-lg font-semibold text-gray-900">
                    Invoice {invoice.invoice_number}
                  </h1>
                  <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {invoice.customers?.name || 'No customer'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link href={`/app/org/${orgId}/dashboard`}>
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Link href={`/app/org/${orgId}/invoices`}>
                <Button variant="ghost" size="sm">
                  All Invoices
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,340px] gap-6">
          
          {/* Left: Preview Frame */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Invoice Preview</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Preview how your invoice will look when generated
                </p>
              </div>
              
              <Button
                onClick={handleDownload}
                className="bg-indigo-600 hover:bg-indigo-700 gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>

            {/* PDF Preview Container */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-[800px] bg-gray-50">
                  <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                  <p className="text-gray-600 font-medium">Loading preview...</p>
                  <p className="text-sm text-gray-500 mt-1">Applying template changes</p>
                </div>
              ) : (
                <div className="relative">
                  <iframe
                    key={selectedTemplateId}
                    src={pdfUrl}
                    className="w-full border-0"
                    style={{ 
                      height: '1123px', // A4 height
                      minHeight: '800px',
                    }}
                    title="Invoice Preview"
                  />
                  
                  {/* Overlay badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md border border-gray-200">
                    <p className="text-xs font-medium text-gray-700">
                      {currentTemplate?.name || 'Default Template'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Actions & Customization */}
          <div className="space-y-4">
            
            {/* Quick Actions Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                Quick Actions
              </h3>
              
              <div className="space-y-2">
                <Link href={`/app/org/${orgId}/invoices/${invoiceId}`} className="block">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-3 h-12"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Edit className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium text-sm">Edit</span>
                      <span className="text-xs text-gray-500">Modify details</span>
                    </div>
                  </Button>
                </Link>

                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-3 h-12 bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 hover:from-yellow-100 hover:to-amber-100"
                  onClick={() => setIsGalleryOpen(true)}
                >
                  <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-yellow-700" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium text-sm text-yellow-900">Template</span>
                    <span className="text-xs text-yellow-700">Change style</span>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-3 h-12"
                  onClick={handleDownload}
                >
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                    <Download className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium text-sm">Download</span>
                    <span className="text-xs text-gray-500">Save as PDF</span>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-3 h-12"
                  onClick={handleDuplicate}
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                    <Copy className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium text-sm">Duplicate</span>
                    <span className="text-xs text-gray-500">Make a copy</span>
                  </div>
                </Button>

                <div className="pt-2 border-t border-gray-100 mt-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-3 h-12 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium text-sm">Delete Invoice</span>
                      <span className="text-xs text-red-500">Permanent action</span>
                    </div>
                  </Button>
                </div>
              </div>
            </div>

            {/* Invoice Info Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 p-5">
              <h3 className="text-xs font-semibold text-indigo-900 mb-3">
                Invoice Details
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-indigo-700">Items:</span>
                  <span className="font-medium text-indigo-900">{items.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-indigo-700">Total:</span>
                  <span className="font-medium text-indigo-900">
                    ${(invoice.total || invoice.total_amount || 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-indigo-700">Date:</span>
                  <span className="font-medium text-indigo-900">
                    {invoice.issue_date 
                      ? new Date(invoice.issue_date).toLocaleDateString() 
                      : 'Not set'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Template Gallery Modal */}
      <TemplateGallery
        open={isGalleryOpen}
        onOpenChange={setIsGalleryOpen}
        templates={templates}
        selectedTemplateId={selectedTemplateId}
        onSelectTemplate={handleTemplateChange}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Invoice?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete invoice{' '}
              <span className="font-semibold">{invoice.invoice_number}</span> and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Invoice'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
