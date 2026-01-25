'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

interface VatRate {
  id: string
  name: string
  rate: number
  is_default: boolean
}

interface VatRateSelectProps {
  value: number // The tax_rate percentage value
  onChange: (value: number) => void
  orgId: string
  className?: string
}

export function VatRateSelect({ value, onChange, orgId, className = '' }: VatRateSelectProps) {
  const [vatRates, setVatRates] = useState<VatRate[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadVatRates = async () => {
      try {
        const response = await fetch(`/api/org/${orgId}/vat-rates`)
        if (response.ok) {
          const data = await response.json()
          setVatRates(data.vatRates || [])
        }
      } catch (err) {
        console.error('Failed to load VAT rates:', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadVatRates()
  }, [orgId])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedRate = vatRates.find((vr) => parseFloat(vr.rate.toString()) === value)
  const displayValue = selectedRate ? `${selectedRate.name} (${selectedRate.rate}%)` : value > 0 ? `${value}%` : 'Select VAT'

  const handleSelect = (rate: number) => {
    onChange(rate)
    setIsOpen(false)
  }

  if (isLoading) {
    return (
      <div className={`px-2 py-1 text-sm ${className}`}>
        <input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
          min={0}
          max={100}
          step={0.1}
          placeholder="VAT %"
        />
      </div>
    )
  }

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-2 py-1 text-sm border border-gray-300 rounded hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-between bg-white"
      >
        <span className={value > 0 ? 'text-gray-900' : 'text-gray-400'}>{displayValue}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {/* Custom value option */}
          <button
            type="button"
            onClick={() => {
              const customValue = prompt('Enter VAT percentage:', value > 0 ? value.toString() : '')
              if (customValue !== null) {
                const numValue = parseFloat(customValue)
                if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
                  handleSelect(numValue)
                }
              }
            }}
            className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 border-b border-gray-100"
          >
            <span className="text-gray-600">+ Custom Value...</span>
          </button>

          {/* VAT rate options */}
          {vatRates.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-500">No VAT rates configured</div>
          ) : (
            vatRates.map((rate) => (
              <button
                key={rate.id}
                type="button"
                onClick={() => handleSelect(parseFloat(rate.rate.toString()))}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 ${
                  value === parseFloat(rate.rate.toString()) ? 'bg-indigo-50 text-indigo-700' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{rate.name}</span>
                  <span className="text-gray-600">{rate.rate}%</span>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
