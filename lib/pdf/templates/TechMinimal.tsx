import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const TechMinimal = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="max-w-5xl mx-auto bg-white p-12 shadow-2xl">
      {/* Header with Logo */}
      <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-blue-600">
        <div className="flex items-center gap-6">
          {branding?.logoUrl ? (
            <img src={branding.logoUrl} alt="Logo" className="w-24 h-24 rounded-lg" />
          ) : (
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-3xl">
                {branding?.business_name ? getInitials(branding.business_name) : 'CS'}
              </span>
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {branding?.business_name || 'CREATIVE STUDIO'}
            </h1>
            <p className="text-gray-600">Professional Design Services</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-4xl font-bold text-blue-600 mb-2">INVOICE</h2>
          <div className="bg-blue-50 px-4 py-2 rounded">
            <span className="text-sm text-gray-600">Invoice #: </span>
            <span className="font-bold text-blue-900">#{invoice.invoice_number}</span>
          </div>
        </div>
      </div>

      {/* Company and Client Info */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div>
          <h3 className="text-sm font-bold text-blue-600 uppercase mb-3">From</h3>
          {branding?.address_line1 && (
            <p className="text-sm text-gray-700">{branding.address_line1}</p>
          )}
          {(branding?.city || branding?.postcode) && (
            <p className="text-sm text-gray-700">
              {[branding.city, branding.postcode].filter(Boolean).join(', ')}
            </p>
          )}
          {branding?.country && (
            <p className="text-sm text-gray-700">{branding.country}</p>
          )}
          {branding?.phone && (
            <p className="text-sm text-gray-700 mt-2">{branding.phone}</p>
          )}
          {branding?.email && (
            <p className="text-sm text-blue-600 font-semibold">{branding.email}</p>
          )}
        </div>
        <div>
          <h3 className="text-sm font-bold text-blue-600 uppercase mb-3">Bill To</h3>
          {invoice.customers ? (
            <>
              <p className="font-bold text-gray-900">{invoice.customers.name}</p>
              {invoice.customers.email && (
                <p className="text-sm text-gray-700">{invoice.customers.email}</p>
              )}
              {invoice.customers.address_line1 && (
                <p className="text-sm text-gray-700">{invoice.customers.address_line1}</p>
              )}
              {invoice.customers.address_line2 && (
                <p className="text-sm text-gray-700">{invoice.customers.address_line2}</p>
              )}
              {(invoice.customers.city || invoice.customers.postcode) && (
                <p className="text-sm text-gray-700">
                  {[invoice.customers.city, invoice.customers.postcode].filter(Boolean).join(', ')}
                </p>
              )}
              {invoice.customers.country && (
                <p className="text-sm text-gray-700">{invoice.customers.country}</p>
              )}
            </>
          ) : (
            <p className="text-gray-600 italic">No customer selected</p>
          )}
        </div>
        <div>
          <h3 className="text-sm font-bold text-blue-600 uppercase mb-3">Invoice Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Date:</span>
              <span className="font-semibold">{formatDate(invoice.issue_date)}</span>
            </div>
            {invoice.due_date && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Due Date:</span>
                <span className="font-semibold">{formatDate(invoice.due_date)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full mb-8">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="text-left p-4 text-sm font-semibold">#</th>
            <th className="text-left p-4 text-sm font-semibold">Description</th>
            <th className="text-center p-4 text-sm font-semibold w-24">Qty</th>
            <th className="text-right p-4 text-sm font-semibold w-32">Unit Price</th>
            <th className="text-right p-4 text-sm font-semibold w-32">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items && items.length > 0 ? (
            items.map((item, index) => (
              <tr
                key={item.id || index}
                className={`border-b border-gray-200 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}
              >
                <td className="p-4 text-gray-600">{index + 1}</td>
                <td className="p-4">
                  <div className="font-semibold text-gray-900">{item.description || ''}</div>
                </td>
                <td className="text-center p-4">{item.quantity || 0}</td>
                <td className="text-right p-4">
                  {formatCurrency(Number(item.unit_price || 0), invoice.currency)}
                </td>
                <td className="text-right p-4 font-semibold">
                  {formatCurrency(Number(item.line_total || 0), invoice.currency)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500 italic">
                No items
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Totals Section with Bank Details */}
      <div className="grid grid-cols-2 gap-8">
        {/* Bank Details */}
        {(branding?.bank_name || branding?.bank_account_number || branding?.bank_iban) && (
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-4">Payment Information</h3>
            <div className="space-y-3 text-sm">
              {branding.bank_name && (
                <div>
                  <p className="text-gray-600 text-xs uppercase mb-1">Bank Name</p>
                  <p className="font-semibold text-gray-900">{branding.bank_name}</p>
                </div>
              )}
              {branding.bank_account_number && (
                <div>
                  <p className="text-gray-600 text-xs uppercase mb-1">Account Number</p>
                  <p className="font-semibold text-gray-900">{branding.bank_account_number}</p>
                </div>
              )}
              {branding.bank_sort_code && (
                <div>
                  <p className="text-gray-600 text-xs uppercase mb-1">Sort Code</p>
                  <p className="font-semibold text-gray-900">{branding.bank_sort_code}</p>
                </div>
              )}
              {branding.bank_iban && (
                <div>
                  <p className="text-gray-600 text-xs uppercase mb-1">IBAN</p>
                  <p className="font-semibold text-gray-900">{branding.bank_iban}</p>
                </div>
              )}
              {branding.bank_bic && (
                <div>
                  <p className="text-gray-600 text-xs uppercase mb-1">SWIFT Code</p>
                  <p className="font-semibold text-gray-900">{branding.bank_bic}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Grand Total */}
        <div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between py-2 text-gray-700">
              <span>Subtotal</span>
              <span className="font-semibold">
                {formatCurrency(Number(invoice.subtotal), invoice.currency)}
              </span>
            </div>
            {invoice.tax_total > 0 && (
              <div className="flex justify-between py-2 text-gray-700 border-b border-gray-300">
                <span>Tax</span>
                <span className="font-semibold">
                  {formatCurrency(Number(invoice.tax_total), invoice.currency)}
                </span>
              </div>
            )}
            <div className="flex justify-between py-4 mt-2">
              <span className="text-xl font-bold text-gray-900">TOTAL DUE</span>
              <span className="text-3xl font-bold text-blue-600">
                {formatCurrency(Number(invoice.total), invoice.currency)}
              </span>
            </div>
          </div>
          {invoice.due_date && (
            <div className="mt-4 p-4 bg-blue-600 text-white rounded-lg text-center">
              <p className="text-sm">
                Payment Due: <span className="font-bold">{formatDate(invoice.due_date)}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Notes */}
      {invoice.notes && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="font-bold text-gray-900 mb-2">Notes</h3>
          <p className="text-sm text-gray-600">{invoice.notes}</p>
        </div>
      )}
    </div>
  )
}
