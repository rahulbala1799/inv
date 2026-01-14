import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const TechGrid = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="max-w-5xl mx-auto bg-white p-12 shadow-2xl">
      {/* Decorative Header */}
      <div className="border-t-8 border-emerald-600 -mx-12 -mt-12 mb-8"></div>
      
      <div className="flex justify-between items-start mb-8">
        {/* Logo and Company */}
        <div className="flex items-start gap-4">
          {branding?.logoUrl ? (
            <img src={branding.logoUrl} alt="Logo" className="w-24 h-24 rounded-xl" />
          ) : (
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-3xl">
                {branding?.business_name ? getInitials(branding.business_name) : 'CS'}
              </span>
            </div>
          )}
          <div className="pt-2">
            <h1 className="text-3xl font-bold text-gray-900">{branding?.business_name || 'CREATIVE STUDIO'}</h1>
            <div className="mt-3 text-sm text-gray-600 space-y-1">
              {(branding?.address_line1 || branding?.city || branding?.postcode) && (
                <p>
                  {[branding.address_line1, branding.city, branding.postcode].filter(Boolean).join(', ')}
                </p>
              )}
              {(branding?.phone || branding?.email) && (
                <p>
                  {branding.phone && `Phone: ${branding.phone}`}
                  {branding.phone && branding.email && ' | '}
                  {branding.email && `Email: ${branding.email}`}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Invoice Number Badge */}
        <div className="text-right">
          <div className="inline-block bg-emerald-600 text-white px-8 py-4 rounded-lg shadow-lg">
            <p className="text-sm font-semibold mb-1">INVOICE</p>
            <p className="text-2xl font-bold">#{invoice.invoice_number}</p>
          </div>
        </div>
      </div>

      {/* Info Boxes */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-emerald-50 p-5 rounded-lg border-l-4 border-emerald-600">
          <p className="text-xs text-emerald-700 font-bold uppercase mb-2">Invoice Date</p>
          <p className="text-lg font-bold text-gray-900">{formatDate(invoice.issue_date)}</p>
        </div>
        {invoice.due_date && (
          <div className="bg-emerald-50 p-5 rounded-lg border-l-4 border-emerald-600">
            <p className="text-xs text-emerald-700 font-bold uppercase mb-2">Due Date</p>
            <p className="text-lg font-bold text-gray-900">{formatDate(invoice.due_date)}</p>
          </div>
        )}
      </div>

      {/* Bill To */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
        <h3 className="text-sm font-bold text-emerald-700 uppercase mb-3">Bill To</h3>
        {invoice.customers ? (
          <div className="grid grid-cols-2">
            <div>
              <p className="font-bold text-xl text-gray-900 mb-2">{invoice.customers.name}</p>
              {invoice.customers.address_line1 && (
                <p className="text-gray-700">{invoice.customers.address_line1}</p>
              )}
              {(invoice.customers.city || invoice.customers.postcode) && (
                <p className="text-gray-700">
                  {[invoice.customers.city, invoice.customers.postcode].filter(Boolean).join(', ')}
                </p>
              )}
            </div>
            <div className="text-right">
              {invoice.customers.email && (
                <>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="font-semibold text-gray-900">{invoice.customers.email}</p>
                </>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-600 italic">No customer selected</p>
        )}
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
              <th className="text-left p-4 font-semibold">#</th>
              <th className="text-left p-4 font-semibold">Description</th>
              <th className="text-center p-4 font-semibold">Qty</th>
              <th className="text-right p-4 font-semibold">Unit Price</th>
              <th className="text-right p-4 font-semibold">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-emerald-50">
                  <td className="p-4 font-semibold text-gray-600">
                    {String(index + 1).padStart(2, '0')}
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-gray-900">{item.description || ''}</p>
                  </td>
                  <td className="p-4 text-center">{item.quantity || 0}</td>
                  <td className="p-4 text-right">
                    {formatCurrency(Number(item.unit_price || 0), invoice.currency)}
                  </td>
                  <td className="p-4 text-right font-bold text-emerald-700">
                    {formatCurrency(Number(item.line_total || 0), invoice.currency)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500 italic">No items</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-8">
        {/* Bank Details */}
        {(branding?.bank_name || branding?.bank_account_number) && (
          <div className="space-y-4">
            <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
              <h3 className="font-bold text-emerald-900 mb-4 text-lg">Bank Transfer Details</h3>
              <div className="space-y-2 text-sm">
                {branding.bank_name && (
                  <div className="flex justify-between border-b border-emerald-200 pb-2">
                    <span className="text-gray-600">Bank Name:</span>
                    <span className="font-semibold text-gray-900">{branding.bank_name}</span>
                  </div>
                )}
                {branding.bank_account_number && (
                  <div className="flex justify-between border-b border-emerald-200 pb-2">
                    <span className="text-gray-600">Account Number:</span>
                    <span className="font-semibold text-gray-900">{branding.bank_account_number}</span>
                  </div>
                )}
                {branding.bank_sort_code && (
                  <div className="flex justify-between border-b border-emerald-200 pb-2">
                    <span className="text-gray-600">Routing Number:</span>
                    <span className="font-semibold text-gray-900">{branding.bank_sort_code}</span>
                  </div>
                )}
                {branding.bank_bic && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">SWIFT Code:</span>
                    <span className="font-semibold text-gray-900">{branding.bank_bic}</span>
                  </div>
                )}
              </div>
            </div>
            {invoice.notes && (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-sm text-yellow-900">
                  <span className="font-bold">Note:</span> {invoice.notes}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Totals */}
        <div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="space-y-3">
              <div className="flex justify-between text-lg pb-3 border-b border-gray-300">
                <span className="text-gray-700">Subtotal</span>
                <span className="font-bold">{formatCurrency(Number(invoice.subtotal), invoice.currency)}</span>
              </div>
              {invoice.tax_total > 0 && (
                <div className="flex justify-between text-lg pb-3 border-b border-gray-300">
                  <span className="text-gray-700">Tax</span>
                  <span className="font-bold">{formatCurrency(Number(invoice.tax_total), invoice.currency)}</span>
                </div>
              )}
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-6 rounded-lg -mx-6 -mb-6 mt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Total Amount Due</p>
                    <p className="text-4xl font-bold">{formatCurrency(Number(invoice.total), invoice.currency)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-90">Currency</p>
                    <p className="text-2xl font-bold">{invoice.currency}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t-2 border-emerald-200 text-center">
        <p className="text-gray-600 text-sm">
          Thank you for your business!
          {branding?.website && ` | ${branding.website}`}
        </p>
      </div>
    </div>
  )
}
