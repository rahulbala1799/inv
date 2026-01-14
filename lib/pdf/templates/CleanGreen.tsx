import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const CleanGreen = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-12 shadow-2xl">
      {/* Header */}
      <div className="mb-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="inline-block bg-green-600 text-white px-6 py-2 rounded-full mb-4">
              <span className="font-bold text-lg">INVOICE</span>
            </div>
            <h1 className="text-4xl font-bold text-green-800 mb-2">
              {branding?.business_name || 'CREATIVE STUDIO'}
            </h1>
          </div>
          <div className="text-right bg-green-50 p-6 rounded-lg border-2 border-green-200">
            <div className="text-sm text-green-700 mb-1">Invoice Number</div>
            <div className="text-2xl font-bold text-green-900">#{invoice.invoice_number}</div>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-green-700 font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            FROM
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            {branding?.address_line1 && (
              <p className="text-sm text-gray-600">{branding.address_line1}</p>
            )}
            {(branding?.city || branding?.postcode) && (
              <p className="text-sm text-gray-600">
                {[branding.city, branding.postcode].filter(Boolean).join(', ')}
              </p>
            )}
            {branding?.phone && <p className="text-sm text-gray-600">{branding.phone}</p>}
            {branding?.email && (
              <p className="text-sm text-green-600 font-semibold">{branding.email}</p>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-green-700 font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            TO
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            {invoice.customers ? (
              <>
                <p className="font-bold text-lg mb-1">{invoice.customers.name}</p>
                {invoice.customers.address_line1 && (
                  <p className="text-sm text-gray-600">{invoice.customers.address_line1}</p>
                )}
                {(invoice.customers.city || invoice.customers.postcode) && (
                  <p className="text-sm text-gray-600">
                    {[invoice.customers.city, invoice.customers.postcode].filter(Boolean).join(', ')}
                  </p>
                )}
              </>
            ) : (
              <p className="text-gray-600 italic">No customer selected</p>
            )}
          </div>
        </div>
      </div>

      {/* Date Info */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <div className="text-xs text-green-700 uppercase mb-1">Issue Date</div>
          <div className="font-bold text-green-900">{formatDate(invoice.issue_date)}</div>
        </div>
        {invoice.due_date && (
          <div className="flex-1 bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <div className="text-xs text-green-700 uppercase mb-1">Due Date</div>
            <div className="font-bold text-green-900">{formatDate(invoice.due_date)}</div>
          </div>
        )}
      </div>

      {/* Items */}
      <div className="mb-8">
        <h3 className="text-green-800 font-bold mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          SERVICES PROVIDED
        </h3>
        <table className="w-full">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="text-left p-4 rounded-tl-lg">Description</th>
              <th className="text-center p-4 w-20">Qty</th>
              <th className="text-right p-4 w-28">Rate</th>
              <th className="text-right p-4 w-32 rounded-tr-lg">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <tr key={item.id || index} className="border-b border-green-100 hover:bg-green-50">
                  <td className="p-4">{item.description || ''}</td>
                  <td className="text-center p-4">{item.quantity || 0}</td>
                  <td className="text-right p-4">
                    {formatCurrency(Number(item.unit_price || 0), invoice.currency)}
                  </td>
                  <td className="text-right p-4 font-bold text-green-700">
                    {formatCurrency(Number(item.line_total || 0), invoice.currency)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500 italic">No items</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-96">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span className="font-semibold">
                {formatCurrency(Number(invoice.subtotal), invoice.currency)}
              </span>
            </div>
            {invoice.tax_total > 0 && (
              <div className="flex justify-between text-gray-700">
                <span>Tax</span>
                <span className="font-semibold">
                  {formatCurrency(Number(invoice.tax_total), invoice.currency)}
                </span>
              </div>
            )}
          </div>
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm opacity-90 mb-1">Total Amount Due</div>
                <div className="text-3xl font-bold">
                  {formatCurrency(Number(invoice.total), invoice.currency)}
                </div>
              </div>
              <div className="text-5xl">✓</div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      {(invoice.notes || branding?.bank_name) && (
        <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
          <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Payment Instructions
          </h3>
          {invoice.notes && (
            <p className="text-gray-700 text-sm mb-2">{invoice.notes}</p>
          )}
          {branding?.bank_name && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-xs text-green-700 mb-1">Bank Transfer</p>
                <p className="text-sm font-semibold">{branding.bank_name}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center">
        <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-500 mb-4"></div>
        <p className="text-green-600 font-semibold text-lg">Thank you for your business! 🌟</p>
        {branding?.website && (
          <p className="text-gray-500 text-sm mt-1">{branding.website}</p>
        )}
      </div>
    </div>
  )
}
