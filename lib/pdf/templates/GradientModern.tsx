import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const GradientModern = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 p-12 shadow-2xl">
      <div className="bg-white rounded-2xl p-12 shadow-xl">
        {/* Header */}
        <div className="relative mb-12">
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full blur-3xl opacity-30"></div>
          <div className="relative">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              INVOICE
            </h1>
            <p className="text-gray-600">#{invoice.invoice_number}</p>
          </div>
        </div>

        {/* Company Info */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl">
            <h3 className="text-sm font-bold text-cyan-900 mb-3">FROM</h3>
            <p className="font-bold text-lg">{branding?.business_name || 'Creative Studio'}</p>
            {branding?.address_line1 && (
              <p className="text-gray-600 text-sm">{branding.address_line1}</p>
            )}
            {(branding?.city || branding?.postcode) && (
              <p className="text-gray-600 text-sm">
                {[branding.city, branding.postcode].filter(Boolean).join(', ')}
              </p>
            )}
            {branding?.email && (
              <p className="text-gray-600 text-sm">{branding.email}</p>
            )}
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
            <h3 className="text-sm font-bold text-purple-900 mb-3">TO</h3>
            {invoice.customers ? (
              <>
                <p className="font-bold text-lg">{invoice.customers.name}</p>
                {invoice.customers.address_line1 && (
                  <p className="text-gray-600 text-sm">{invoice.customers.address_line1}</p>
                )}
                {(invoice.customers.city || invoice.customers.postcode) && (
                  <p className="text-gray-600 text-sm">
                    {[invoice.customers.city, invoice.customers.postcode].filter(Boolean).join(', ')}
                  </p>
                )}
              </>
            ) : (
              <p className="text-gray-600 italic">No customer selected</p>
            )}
          </div>
        </div>

        {/* Dates */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-lg">
            <div className="text-xs opacity-80 mb-1">Issue Date</div>
            <div className="font-bold">{formatDate(invoice.issue_date)}</div>
          </div>
          {invoice.due_date && (
            <div className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 rounded-lg">
              <div className="text-xs opacity-80 mb-1">Due Date</div>
              <div className="font-bold">{formatDate(invoice.due_date)}</div>
            </div>
          )}
        </div>

        {/* Items */}
        <table className="w-full mb-8">
          <thead>
            <tr className="bg-gradient-to-r from-cyan-100 to-purple-100">
              <th className="text-left p-4 rounded-tl-lg">Description</th>
              <th className="text-right p-4 w-32">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <tr key={item.id || index} className="border-b border-gray-100">
                  <td className="p-4">{item.description || ''}</td>
                  <td className="text-right p-4 font-semibold">
                    {formatCurrency(Number(item.line_total || 0), invoice.currency)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="p-4 text-center text-gray-500 italic">No items</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-96">
            <div className="flex justify-between py-3">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">
                {formatCurrency(Number(invoice.subtotal), invoice.currency)}
              </span>
            </div>
            {invoice.tax_total > 0 && (
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Tax</span>
                <span className="font-semibold">
                  {formatCurrency(Number(invoice.tax_total), invoice.currency)}
                </span>
              </div>
            )}
            <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white p-6 rounded-xl mt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">TOTAL DUE</span>
                <span className="text-3xl font-bold">
                  {formatCurrency(Number(invoice.total), invoice.currency)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div className="bg-gradient-to-r from-cyan-50 to-purple-50 p-6 rounded-xl">
            <p className="text-gray-700 text-sm">{invoice.notes}</p>
          </div>
        )}
      </div>
    </div>
  )
}
