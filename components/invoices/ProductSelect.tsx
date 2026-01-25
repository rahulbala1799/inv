'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'

interface VatRate {
  id: string
  name: string
  rate: number
}

interface Product {
  id: string
  name: string
  description: string | null
  unit_price: number
  currency: string
  vat_rates: VatRate | null
}

interface ProductSelectProps {
  onSelect: (product: Product) => void
  orgId: string
  currency: string
  className?: string
  refreshKey?: number | string // Force refresh when this changes
}

export function ProductSelect({ onSelect, orgId, currency, className = '', refreshKey }: ProductSelectProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true)
      try {
        const params = new URLSearchParams()
        if (searchTerm) {
          params.set('search', searchTerm)
        }
        const response = await fetch(`/api/org/${orgId}/products?${params.toString()}`)
        if (response.ok) {
          const data = await response.json()
          // Filter by currency if needed, or show all
          setProducts(data.products || [])
        }
      } catch (err) {
        console.error('Failed to load products:', err)
      } finally {
        setIsLoading(false)
      }
    }

    if (isOpen) {
      loadProducts()
    }
  }, [orgId, isOpen, searchTerm, refreshKey]) // Added refreshKey to dependencies

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchTerm('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (product: Product) => {
    onSelect(product)
    setIsOpen(false)
    setSearchTerm('')
  }

  const formatCurrency = (amount: number, curr: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: curr,
    }).format(amount)
  }

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-2 py-1 text-xs text-indigo-600 hover:text-indigo-700 border border-indigo-200 rounded hover:bg-indigo-50"
        title="Select from products"
      >
        Select Product
      </button>

      {isOpen && (
        <div className="absolute z-50 w-96 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          {/* Search input */}
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-8 pr-8 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoFocus
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Products list */}
          <div className="max-h-60 overflow-auto">
            {isLoading ? (
              <div className="px-4 py-8 text-center text-sm text-gray-500">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-gray-500">
                {searchTerm ? 'No products found' : 'No products available'}
              </div>
            ) : (
              products.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => handleSelect(product)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-gray-900">{product.name}</div>
                      {product.description && (
                        <div className="text-xs text-gray-500 mt-1 truncate">{product.description}</div>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-medium text-gray-700">
                          {formatCurrency(product.unit_price, product.currency)}
                        </span>
                        {product.vat_rates && (
                          <span className="text-xs text-gray-500">
                            VAT: {product.vat_rates.name} ({product.vat_rates.rate}%)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
