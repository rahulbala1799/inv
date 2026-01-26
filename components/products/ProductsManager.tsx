'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Edit2, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProductModal from './ProductModal'

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
  is_active: boolean
  created_at: string
}

interface ProductsManagerProps {
  orgId: string
}

export default function ProductsManager({ orgId }: ProductsManagerProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState<string | null>(null)

  const loadProducts = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (searchTerm) {
        params.set('search', searchTerm)
      }
      const response = await fetch(`/api/org/${orgId}/products?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products || [])
      } else {
        setError('Failed to load products')
      }
    } catch (err) {
      setError('Failed to load products')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [orgId, searchTerm])

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return
    }

    try {
      const response = await fetch(`/api/org/${orgId}/products/${productId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        loadProducts()
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to delete product')
      }
    } catch (err) {
      alert('Failed to delete product')
      console.error(err)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setShowAddModal(true)
  }

  const handleModalClose = () => {
    setShowAddModal(false)
    setEditingProduct(null)
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-500">Loading products...</div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Product Catalog</h2>
              <p className="text-sm text-gray-600 mt-1">
                Save frequently used items as products for quick invoice creation
              </p>
            </div>
            <Button
              onClick={() => {
                setEditingProduct(null)
                setShowAddModal(true)
              }}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {products.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="mb-2">No products yet.</p>
              <p className="text-sm">
                {searchTerm
                  ? 'Try a different search term.'
                  : 'Click "Add Product" to create your first product.'}
              </p>
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
                      Description
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      VAT Rate
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <span className="font-medium text-gray-900">{product.name}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {product.description || '-'}
                      </td>
                      <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                        {formatCurrency(product.unit_price, product.currency)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {product.vat_rates ? (
                          <span>
                            {product.vat_rates.name} ({product.vat_rates.rate}%)
                          </span>
                        ) : (
                          <span className="text-gray-400">No VAT</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-indigo-600 hover:text-indigo-700 p-1"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
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
      </div>

      <ProductModal
        open={showAddModal}
        onOpenChange={handleModalClose}
        orgId={orgId}
        productId={editingProduct?.id || null}
        initialData={
          editingProduct
            ? {
                name: editingProduct.name,
                description: editingProduct.description || '',
                unit_price: editingProduct.unit_price,
                vat_rate_id: editingProduct.vat_rates?.id || null,
              }
            : undefined
        }
        onSuccess={() => {
          loadProducts()
          handleModalClose()
        }}
      />
    </>
  )
}
