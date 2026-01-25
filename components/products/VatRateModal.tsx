'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface VatRateModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  orgId: string
  onSuccess?: () => void
}

export default function VatRateModal({ open, onOpenChange, orgId, onSuccess }: VatRateModalProps) {
  const [rate, setRate] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const rateNum = Number(rate)
    if (isNaN(rateNum) || rateNum < 0 || rateNum > 100) {
      setError('VAT percentage must be between 0 and 100')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/org/${orgId}/vat-rates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rate: rateNum }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create VAT rate')
      }

      // Reset form and close modal
      setRate('')
      setError(null)
      onOpenChange(false)
      
      if (onSuccess) {
        onSuccess()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create VAT rate')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setRate('')
      setError(null)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add VAT Rate</DialogTitle>
          <DialogDescription>
            Enter the VAT percentage. The system will automatically generate a name (V01, V02, etc.).
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="rate" className="block text-sm font-medium text-gray-700 mb-2">
              VAT Percentage *
            </label>
            <div className="relative">
              <input
                type="number"
                id="rate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="20"
                min="0"
                max="100"
                step="0.01"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-12"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Will be saved with an auto-generated name (V01, V02, etc.)
            </p>
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
              disabled={isSubmitting || !rate}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {isSubmitting ? 'Adding...' : 'Add VAT Rate'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
