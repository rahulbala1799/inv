import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const VibrantPurple = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-12 shadow-2xl">
      {/* Decorative top bar */}
      <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 mb-8"></div>

      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-5xl font-bold text-purple-600 mb-3">INVOICE</h1>
          <div className="text-3xl font-bold text-gray-800">#{invoice.invoice_number}</div>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold text-purple-900 mb-2">
            {branding?.business_name || 'CREATIVE STUDIO'}
          </h2>
          {branding?.address_line1 && (
            <p className="text-gray-600 text-sm">{branding.address_line1}</p>
          )}
          {(branding?.city || branding?.postcode) && (
            <p className="text-gray-600 text-sm">
              {[branding.city, branding.postcode].filter(Boolean).join(', ')}
            </p>
          )}
          {branding?.email && (
            <p className="text-purple-600 font-semibold text-sm">{branding.email}</p>
          )}
        </div>
      </div>

      {/* Invoice Details Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-purple-100 p-4 rounded-lg border-l-4 border-purple-600">
          <div className="text-xs text-purple-700 font-bold uppercase mb-1">Issue Date</div>
          <div className="text-lg font-bold text-purple-900">{formatDate(invoice.issue_date)}</div>
        </div>
        {invoice.due_date && (
          <div className="bg-pink-100 p-4 rounded-lg border-l-4 border-pink-600">
            <div className="text-xs text-pink-700 font-bold uppercase mb-1">Due Date</div>
            <div className="text-lg font-bold text-pink-900">{formatDate(invoice.due_date)}</div>
          </div>
        )}
      </div>

      {/* Client Info */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg mb-8">
        <h3 className="text-purple-900 font-bold mb-3 flex items-center gap-2">
          <span className="bg-purple-600 text-white px-3 py-1 rounded text-sm">BILLED TO</span>
        </h3>
        {invoice.customers ? (
          <>
            <p className="font-bold text-2xl text-purple-900 mb-1">{invoice.customers.name}</p>
            {invoice.customers.address_line1 && (
              <p className="text-gray-700">{invoice.customers.address_line1}</p>
            )}
            {(invoice.customers.city || invoice.customers.postcode) && (
              <p className="text-gray-700">
                {[invoice.customers.city, invoice.customers.postcode].filter(Boolean).join(', ')}
              </p>
            )}
          </>
        ) : (
          <p className="text-gray-600 italic">No customer selected</p>
        )}
      </div>

      {/* Items */}
      <table className="w-full mb-8">
        <thead>
          <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <th className="text-left p-4 rounded-tl-lg">Service Description</th>
            <th className="text-center p-4 w-20">Qty</th>
            <th className="text-right p-4 w-32">Rate</th>
            <th className="text-right p-4 w-32 rounded-tr-lg">Total</th>
          </tr>
        </thead>
        <tbody>
          {items && items.length > 0 ? (
            items.map((item, index) => (
              <tr key={item.id || index} className="border-b-2 border-purple-100">
                <td className="p-4 font-medium">{item.description || ''}</td>
                <td className="text-center p-4">{item.quantity || 0}</td>
                <td className="text-right p-4">
                  {formatCurrency(Number(item.unit_price || 0), invoice.currency)}
                </td>
                <td className="text-right p-4 font-bold text-purple-900">
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

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-96">
          <div className="bg-purple-50 p-6 rounded-lg">
            <div className="flex justify-between py-2">
              <span className="text-gray-700">Subtotal</span>
              <span className="font-semibold">
                {formatCurrency(Number(invoice.subtotal), invoice.currency)}
              </span>
            </div>
            {invoice.tax_total > 0 && (
              <div className="flex justify-between py-2 border-b border-purple-200">
                <span className="text-gray-700">Tax</span>
                <span className="font-semibold">
                  {formatCurrency(Number(invoice.tax_total), invoice.currency)}
                </span>
              </div>
            )}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-5 rounded-lg mt-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">AMOUNT DUE</span>
                <span className="text-3xl font-bold">
                  {formatCurrency(Number(invoice.total), invoice.currency)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Info */}
      {(invoice.notes || branding?.bank_name) && (
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg border-l-4 border-purple-600">
          <h3 className="font-bold text-purple-900 mb-3">💳 Payment Information</h3>
          {invoice.notes && (
            <p className="text-gray-700 text-sm mb-2">{invoice.notes}</p>
          )}
          {branding?.bank_name && (
            <p className="text-gray-700 text-sm">Bank: {branding.bank_name}</p>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center">
        <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 mb-4"></div>
        <p className="text-purple-600 font-semibold">Thank you for your business!</p>
        {branding?.website && (
          <p className="text-gray-500 text-sm">{branding.website}</p>
        )}
      </div>
    </div>
  )
}
