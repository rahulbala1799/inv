'use client'

import { useState } from 'react'
import { Save, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProductSavePromptProps {
  itemDescription: string
  itemPrice: number
  itemVatRate: number
  orgId: string
  onSave: () => void
  onDismiss: () => void
}

export default function ProductSavePrompt({
  itemDescription,
  itemPrice,
  itemVatRate,
  orgId,
  onSave,
  onDismiss,
}: ProductSavePromptProps) {
  const [isDismissed, setIsDismissed] = useState(false)

  const handleDismiss = () => {
    setIsDismissed(true)
    onDismiss()
  }

  if (isDismissed) {
    return null
  }

  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mt-3 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
      <div className="flex-shrink-0 mt-0.5">
        <Save className="w-5 h-5 text-indigo-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-indigo-900 mb-1">
          Save as product?
        </p>
        <p className="text-sm text-indigo-700">
          Save &quot;{itemDescription}&quot; as a product for quick reuse in future invoices.
        </p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <Button
          onClick={onSave}
          size="sm"
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Save as Product
        </Button>
        <button
          onClick={handleDismiss}
          className="text-indigo-600 hover:text-indigo-700 p-1"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
