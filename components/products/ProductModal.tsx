'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import VatRateModal from './VatRateModal'

interface VatRate {
  id: string
  name: string
  rate: number
}

interface ProductModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  orgId: string
  initialData?: {
    name?: string
    description?: string
    unit_price?: number
    vat_rate_id?: string | null
    vat_rate_percentage?: number // For matching VAT rate by percentage
  }
  onSuccess?: () => void
}

export default function ProductModal({
  open,
  onOpenChange,
  orgId,
  initialData,
  onSuccess,
}: ProductModalProps) {
  const [name, setName] = useState(initialData?.name || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [unitPrice, setUnitPrice] = useState(initialData?.unit_price?.toString() || '')
  const [vatRateId, setVatRateId] = useState<string | null>(initialData?.vat_rate_id || null)
  const [vatRates, setVatRates] = useState<VatRate[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showVatModal, setShowVatModal] = useState(false)

  // Load VAT rates when modal opens
  useEffect(() => {
    if (open) {
      loadVatRates()
      // Reset form with initial data
      if (initialData) {
        setName(initialData.name || '')
        setDescription(initialData.description || '')
        setUnitPrice(initialData.unit_price?.toString() || '')
        setVatRateId(initialData.vat_rate_id || null)
      }
    }
  }, [open, initialData])

  // Match VAT rate by percentage after rates are loaded
  useEffect(() => {
    if (open && initialData?.vat_rate_percentage !== undefined && vatRates.length > 0 && !vatRateId) {
      const matchingRate = vatRates.find(
        rate => Math.abs(rate.rate - initialData.vat_rate_percentage!) < 0.01
      )
      if (matchingRate) {
        setVatRateId(matchingRate.id)
      }
    }
  }, [open, vatRates, initialData?.vat_rate_percentage, vatRateId])

  const loadVatRates = async () => {
    try {
      const response = await fetch(`/api/org/${orgId}/vat-rates`)
      if (response.ok) {
        const data = await response.json()
        setVatRates(data.vatRates || [])
      }
    } catch (err) {
      console.error('Failed to load VAT rates:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('Product name is required')
      return
    }

    const priceNum = Number(unitPrice)
    if (isNaN(priceNum) || priceNum < 0) {
      setError('Unit price must be a positive number')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/org/${orgId}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim() || null,
          unit_price: priceNum,
          vat_rate_id: vatRateId || null,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to save product')
      }

      // Reset form and close modal
      setName('')
      setDescription('')
      setUnitPrice('')
      setVatRateId(null)
      setError(null)
      onOpenChange(false)

      if (onSuccess) {
        onSuccess()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save product')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setName('')
      setDescription('')
      setUnitPrice('')
      setVatRateId(null)
      setError(null)
      onOpenChange(false)
    }
  }

  const handleVatRateAdded = () => {
    loadVatRates()
    setShowVatModal(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Save Product</DialogTitle>
            <DialogDescription>
              Save this item as a product for quick reuse in future invoices.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                required
                disabled={isSubmitting}
                maxLength={100}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description (optional)"
                rows={3}
                disabled={isSubmitting}
                maxLength={500}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700 mb-2">
                Unit Price *
              </label>
              <input
                type="number"
                id="unitPrice"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="vatRate" className="block text-sm font-medium text-gray-700">
                  VAT Rate
                </label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowVatModal(true)}
                  className="text-xs text-indigo-600 hover:text-indigo-700"
                >
                  + Add VAT Rate
                </Button>
              </div>
              <select
                id="vatRate"
                value={vatRateId || ''}
                onChange={(e) => setVatRateId(e.target.value || null)}
                disabled={isSubmitting}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">No VAT</option>
                {vatRates.map((rate) => (
                  <option key={rate.id} value={rate.id}>
                    {rate.name} ({rate.rate}%)
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !name.trim() || !unitPrice}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                {isSubmitting ? 'Saving...' : 'Save Product'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {showVatModal && (
        <VatRateModal
          open={showVatModal}
          onOpenChange={setShowVatModal}
          orgId={orgId}
          onSuccess={handleVatRateAdded}
        />
      )}
    </>
  )
}
