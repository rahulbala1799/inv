'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import VatRateModal from '@/components/products/VatRateModal'

interface VatRate {
  id: string
  name: string
  rate: number
  is_default: boolean
  is_active: boolean
}

interface VatRatesManagerProps {
  orgId: string
}

export default function VatRatesManager({ orgId }: VatRatesManagerProps) {
  const [vatRates, setVatRates] = useState<VatRate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadVatRates = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/org/${orgId}/vat-rates`)
      if (response.ok) {
        const data = await response.json()
        setVatRates(data.vatRates || [])
      } else {
        setError('Failed to load VAT rates')
      }
    } catch (err) {
      setError('Failed to load VAT rates')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadVatRates()
  }, [orgId])

  const handleDelete = async (vatRateId: string) => {
    if (!confirm('Are you sure you want to delete this VAT rate?')) {
      return
    }

    try {
      const response = await fetch(`/api/org/${orgId}/vat-rates/${vatRateId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        loadVatRates()
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to delete VAT rate')
      }
    } catch (err) {
      alert('Failed to delete VAT rate')
      console.error(err)
    }
  }

  const handleSetDefault = async (vatRateId: string) => {
    try {
      const response = await fetch(`/api/org/${orgId}/vat-rates/${vatRateId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_default: true }),
      })

      if (response.ok) {
        loadVatRates()
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to set default VAT rate')
      }
    } catch (err) {
      alert('Failed to set default VAT rate')
      console.error(err)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-500">Loading VAT rates...</div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">VAT Rates</h3>
            <p className="text-sm text-gray-600 mt-1">
              Manage your VAT rates. Names are auto-generated (V01, V02, etc.)
            </p>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add VAT Rate
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {vatRates.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No VAT rates yet. Click &quot;Add VAT Rate&quot; to create your first one.</p>
          </div>
        ) : (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Rate
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {vatRates.map((rate) => (
                  <tr key={rate.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{rate.name}</span>
                        {rate.is_default && (
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{rate.rate}%</td>
                    <td className="px-4 py-3">
                      {rate.is_active ? (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Active
                        </span>
                      ) : (
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {!rate.is_default && (
                          <button
                            onClick={() => handleSetDefault(rate.id)}
                            className="text-xs text-indigo-600 hover:text-indigo-700"
                            title="Set as default"
                          >
                            Set Default
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(rate.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <VatRateModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        orgId={orgId}
        onSuccess={() => {
          loadVatRates()
          setShowAddModal(false)
        }}
      />
    </>
  )
}
