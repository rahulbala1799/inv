'use client'

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { formatCurrency } from '@/lib/utils'

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

interface ProductAutocompleteProps {
  value: string
  onChange: (value: string) => void
  onProductSelect?: (product: Product) => void
  onNoProductSelected?: () => void
  orgId: string
  currency: string
  placeholder?: string
  className?: string
  required?: boolean
  refreshKey?: number | string
}

export const ProductAutocomplete = forwardRef<HTMLDivElement, ProductAutocompleteProps>(
  (
    {
      value,
      onChange,
      onProductSelect,
      onNoProductSelected,
      orgId,
      currency,
      placeholder = "Type to search products or enter description...",
      className = "",
      required = false,
      refreshKey,
    },
    ref
  ) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editValue, setEditValue] = useState(value)
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [hasSelectedProduct, setHasSelectedProduct] = useState(false)
    const [wordCount, setWordCount] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const suggestionsRef = useRef<HTMLDivElement>(null)

    // Expose the container ref to parent via forwardRef
    useImperativeHandle(ref, () => {
      if (containerRef.current) {
        return containerRef.current
      }
      // Return a dummy element if ref is not yet set (shouldn't happen in practice)
      return document.createElement('div') as HTMLDivElement
    }, [])

    // Count words in the input
    useEffect(() => {
      const words = editValue.trim().split(/\s+/).filter(w => w.length > 0)
      setWordCount(words.length)
    }, [editValue])

    // Load products when user types (after 1-2 words)
    useEffect(() => {
      const loadProducts = async () => {
        if (!isEditing || wordCount < 1) {
          setProducts([])
          setShowSuggestions(false)
          return
        }

        setIsLoading(true)
        try {
          const params = new URLSearchParams()
          if (editValue.trim()) {
            params.set('search', editValue.trim())
          }
          const response = await fetch(`/api/org/${orgId}/products?${params.toString()}`)
          if (response.ok) {
            const data = await response.json()
            const matchingProducts = data.products || []
            setProducts(matchingProducts)
            setShowSuggestions(matchingProducts.length > 0 && editValue.trim().length > 0)
          }
        } catch (err) {
          console.error('Failed to load products:', err)
        } finally {
          setIsLoading(false)
        }
      }

      // Debounce the search
      const timeoutId = setTimeout(() => {
        loadProducts()
      }, 300)

      return () => clearTimeout(timeoutId)
    }, [editValue, isEditing, orgId, wordCount, refreshKey])

    // Handle click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setShowSuggestions(false)
          // Don't trigger onNoProductSelected here - let handleBlur handle it
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
      if (isEditing && inputRef.current) {
        inputRef.current.focus()
      }
    }, [isEditing])

    useEffect(() => {
      // Sync value from props, but skip if we just selected a product (to prevent reset)
      if (!hasSelectedProduct && value !== editValue) {
        setEditValue(value)
      }
    }, [value])

    const handleClick = () => {
      setIsEditing(true)
    }

    const handleBlur = () => {
      // Delay to allow click on suggestion
      setTimeout(() => {
        // Don't update if we just selected a product (onProductSelect already handled it)
        if (!hasSelectedProduct) {
          setIsEditing(false)
          setShowSuggestions(false)
          onChange(editValue)
          // If user finished typing and didn't select a product, trigger callback
          if (editValue.trim() && onNoProductSelected) {
            onNoProductSelected()
          }
        } else {
          // Just close the editor if product was selected
          setIsEditing(false)
          setShowSuggestions(false)
        }
      }, 200)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setEditValue(value)
        setShowSuggestions(false)
        setIsEditing(false)
        setHasSelectedProduct(false)
      } else if (e.key === 'Enter') {
        if (selectedIndex >= 0 && products[selectedIndex]) {
          handleProductSelect(products[selectedIndex])
        } else {
          handleBlur()
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < products.length - 1 ? prev + 1 : prev
        )
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
      } else if (e.key === 'Tab' && selectedIndex >= 0 && products[selectedIndex]) {
        e.preventDefault()
        handleProductSelect(products[selectedIndex])
      }
    }

    const handleProductSelect = (product: Product) => {
      // Prevent multiple calls
      if (hasSelectedProduct) {
        return
      }
      
      // Set description to just product name (not combined)
      setEditValue(product.name)
      setHasSelectedProduct(true)
      setShowSuggestions(false)
      setIsEditing(false)
      
      // Call onProductSelect - this already updates description, so don't call onChange
      // The onProductSelect callback handles all the updates including description
      if (onProductSelect) {
        onProductSelect(product)
      }
      
      // Don't call onChange here - onProductSelect already updated the description
      // This prevents duplicate updates
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setEditValue(newValue)
      setHasSelectedProduct(false)
      setSelectedIndex(-1)
      
      // Show suggestions if we have at least 1 word
      const words = newValue.trim().split(/\s+/).filter(w => w.length > 0)
      if (words.length >= 1 && products.length > 0) {
        setShowSuggestions(true)
      }
    }

    const isEmpty = !editValue || editValue.trim() === ""
    const displayText = isEmpty ? placeholder : editValue

    // Scroll selected item into view
    useEffect(() => {
      if (selectedIndex >= 0 && suggestionsRef.current) {
        const selectedElement = suggestionsRef.current.children[selectedIndex] as HTMLElement
        if (selectedElement) {
          selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
        }
      }
    }, [selectedIndex])

    if (isEditing) {
      return (
        <div ref={containerRef} className={`relative ${className}`}>
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full px-2 py-1 text-sm border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder={placeholder}
          />
          
          {showSuggestions && products.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
            >
              {products.map((product, index) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleProductSelect(product)
                  }}
                  onMouseDown={(e) => {
                    // Prevent blur event from firing before click
                    e.preventDefault()
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors ${
                    index === selectedIndex ? 'bg-indigo-50 border-indigo-200' : ''
                  }`}
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
              ))}
            </div>
          )}
          
          {isLoading && wordCount >= 1 && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center text-sm text-gray-500">
              Searching products...
            </div>
          )}
        </div>
      )
    }

    return (
      <div
        ref={containerRef}
        onClick={handleClick}
        className={`cursor-pointer transition-colors relative ${className} ${
          isEmpty ? "text-amber-500 italic" : ""
        }`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleClick()
          }
        }}
      >
        <span className="inline-flex items-center gap-2">
          {displayText}
        </span>
      </div>
    )
  }
)

ProductAutocomplete.displayName = "ProductAutocomplete"
