'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

interface InvoiceItem {
  id?: string
  description: string
  quantity: number
  unit_price: number
  tax_rate: number
  line_total: number
  sort_order: number
}

interface Invoice {
  id: string
  invoice_number: string
  status: string
  issue_date: string
  due_date: string | null
  customer_id: string
  currency: string
  subtotal: number
  tax_total: number
  total: number
  notes: string | null
  template_id: string | null
  customers?: { name: string }
}

export default function InvoiceEditor({
  invoice: initialInvoice,
  items: initialItems,
  customers,
  templates,
  orgId,
}: {
  invoice: Invoice
  items: InvoiceItem[]
  customers: { id: string; name: string }[]
  templates: { id: string; name: string; is_default: boolean }[]
  orgId: string
}) {
  const router = useRouter()
  const [invoice, setInvoice] = useState(initialInvoice)
  const [items, setItems] = useState<InvoiceItem[]>(initialItems.length > 0 ? initialItems : [{
    description: '',
    quantity: 1,
    unit_price: 0,
    tax_rate: 0,
    line_total: 0,
    sort_order: 0,
  }])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    calculateTotals()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  function calculateTotals() {
    let subtotal = 0
    let taxTotal = 0

    items.forEach((item) => {
      const lineSubtotal = Number(item.quantity) * Number(item.unit_price)
      const lineTax = lineSubtotal * (Number(item.tax_rate) / 100)
      item.line_total = lineSubtotal + lineTax
      subtotal += lineSubtotal
      taxTotal += lineTax
    })

    const total = subtotal + taxTotal

    setInvoice({
      ...invoice,
      subtotal: Number(subtotal.toFixed(2)),
      tax_total: Number(taxTotal.toFixed(2)),
      total: Number(total.toFixed(2)),
    })
  }

  function addItem() {
    setItems([
      ...items,
      {
        description: '',
        quantity: 1,
        unit_price: 0,
        tax_rate: 0,
        line_total: 0,
        sort_order: items.length,
      },
    ])
  }

  function removeItem(index: number) {
    setItems(items.filter((_, i) => i !== index).map((item, i) => ({ ...item, sort_order: i })))
  }

  function updateItem(index: number, field: keyof InvoiceItem, value: string | number) {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  async function handleSave() {
    setSaving(true)
    try {
      const response = await fetch(`/api/org/${orgId}/invoices/${invoice.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoice, items }),
      })

      if (!response.ok) {
        throw new Error('Failed to save invoice')
      }

      router.refresh()
    } catch (error) {
      alert('Failed to save invoice')
    } finally {
      setSaving(false)
    }
  }

  async function handleStatusChange(newStatus: string) {
    setSaving(true)
    try {
      const response = await fetch(`/api/org/${orgId}/invoices/${invoice.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoice: { ...invoice, status: newStatus }, items }),
      })

      if (!response.ok) {
        throw new Error('Failed to update status')
      }

      setInvoice({ ...invoice, status: newStatus })
      router.refresh()
    } catch (error) {
      alert('Failed to update status')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Invoice #{invoice.invoice_number}</h1>
        </div>
        <div className="flex gap-4">
          <Link
            href={`/api/org/${orgId}/invoices/${invoice.id}/pdf`}
            target="_blank"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Download PDF
          </Link>
          <select
            value={invoice.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="DRAFT">Draft</option>
            <option value="SENT">Sent</option>
            <option value="PAID">Paid</option>
            <option value="VOID">Void</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* Invoice Details */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Customer</label>
            <select
              value={invoice.customer_id}
              onChange={(e) => setInvoice({ ...invoice, customer_id: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Template</label>
            <select
              value={invoice.template_id || ''}
              onChange={(e) => setInvoice({ ...invoice, template_id: e.target.value || null })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Default</option>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Issue Date</label>
            <input
              type="date"
              value={invoice.issue_date}
              onChange={(e) => setInvoice({ ...invoice, issue_date: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
            <input
              type="date"
              value={invoice.due_date || ''}
              onChange={(e) => setInvoice({ ...invoice, due_date: e.target.value || null })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Invoice Items */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Items</h2>
            <button
              onClick={addItem}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              + Add Item
            </button>
          </div>

          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Description</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Qty</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Unit Price</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Tax %</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Total</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
                      placeholder="Item description"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={item.unit_price}
                      onChange={(e) => updateItem(index, 'unit_price', parseFloat(e.target.value) || 0)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={item.tax_rate}
                      onChange={(e) => updateItem(index, 'tax_rate', parseFloat(e.target.value) || 0)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm font-medium">
                    {formatCurrency(item.line_total, invoice.currency)}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-64 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">{formatCurrency(invoice.subtotal, invoice.currency)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax:</span>
              <span className="font-medium">{formatCurrency(invoice.tax_total, invoice.currency)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total:</span>
              <span>{formatCurrency(invoice.total, invoice.currency)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
          <textarea
            value={invoice.notes || ''}
            onChange={(e) => setInvoice({ ...invoice, notes: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Invoice'}
          </button>
          <Link
            href={`/app/org/${orgId}/invoices`}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Back to Invoices
          </Link>
        </div>
      </div>
    </div>
  )
}
