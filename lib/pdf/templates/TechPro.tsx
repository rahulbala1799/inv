import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const TechPro = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-2xl">
      {/* Sidebar Layout */}
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-72 bg-indigo-900 text-white p-8 flex-shrink-0">
          {/* Logo */}
          <div className="mb-8">
            {branding?.logoUrl ? (
              <img src={branding.logoUrl} alt="Logo" className="w-20 h-20 rounded-lg mb-4" />
            ) : (
              <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mb-4">
                <span className="text-indigo-900 font-bold text-2xl">
                  {branding?.business_name ? getInitials(branding.business_name) : 'CS'}
                </span>
              </div>
            )}
            <h1 className="text-xl font-bold">{branding?.business_name || 'CREATIVE STUDIO'}</h1>
          </div>

          {/* Company Info */}
          <div className="mb-8">
            <h3 className="text-indigo-300 text-xs uppercase font-bold mb-3">Contact Info</h3>
            {branding?.address_line1 && (
              <p className="text-sm text-indigo-100 mb-2">{branding.address_line1}</p>
            )}
            {(branding?.city || branding?.postcode) && (
              <p className="text-sm text-indigo-100 mb-2">
                {[branding.city, branding.postcode].filter(Boolean).join(', ')}
              </p>
            )}
            {branding?.country && (
              <p className="text-sm text-indigo-100 mb-2">{branding.country}</p>
            )}
            {branding?.phone && (
              <p className="text-sm text-indigo-100 mt-4">{branding.phone}</p>
            )}
            {branding?.email && (
              <p className="text-sm text-indigo-100">{branding.email}</p>
            )}
            {branding?.vat_number && (
              <p className="text-sm text-indigo-100 mt-4">Tax ID: {branding.vat_number}</p>
            )}
          </div>

          {/* Invoice Details */}
          <div className="mb-8 pt-8 border-t border-indigo-700">
            <h3 className="text-indigo-300 text-xs uppercase font-bold mb-3">Invoice Details</h3>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-indigo-300">Invoice Number</p>
                <p className="font-bold">#{invoice.invoice_number}</p>
              </div>
              <div>
                <p className="text-xs text-indigo-300">Issue Date</p>
                <p className="font-semibold">{formatDate(invoice.issue_date)}</p>
              </div>
              {invoice.due_date && (
                <div>
                  <p className="text-xs text-indigo-300">Due Date</p>
                  <p className="font-semibold">{formatDate(invoice.due_date)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Bank Details */}
          {(branding?.bank_name || branding?.bank_account_number) && (
            <div className="pt-8 border-t border-indigo-700">
              <h3 className="text-indigo-300 text-xs uppercase font-bold mb-3">Payment Details</h3>
              <div className="space-y-2 text-sm">
                {branding.bank_name && (
                  <div>
                    <p className="text-xs text-indigo-300">Bank</p>
                    <p className="text-indigo-100">{branding.bank_name}</p>
                  </div>
                )}
                {branding.bank_account_number && (
                  <div>
                    <p className="text-xs text-indigo-300">Account</p>
                    <p className="text-indigo-100">{branding.bank_account_number}</p>
                  </div>
                )}
                {branding.bank_sort_code && (
                  <div>
                    <p className="text-xs text-indigo-300">Routing</p>
                    <p className="text-indigo-100">{branding.bank_sort_code}</p>
                  </div>
                )}
                {branding.bank_bic && (
                  <div>
                    <p className="text-xs text-indigo-300">SWIFT</p>
                    <p className="text-indigo-100">{branding.bank_bic}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-12">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-5xl font-bold text-indigo-900 mb-4">INVOICE</h2>
            <div className="h-1 w-24 bg-indigo-600"></div>
          </div>

          {/* Bill To */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-indigo-600 uppercase mb-3">Bill To</h3>
            {invoice.customers ? (
              <>
                <p className="font-bold text-xl text-gray-900 mb-1">{invoice.customers.name}</p>
                {invoice.customers.email && (
                  <p className="text-gray-600">{invoice.customers.email}</p>
                )}
                {invoice.customers.address_line1 && (
                  <p className="text-gray-600">{invoice.customers.address_line1}</p>
                )}
                {invoice.customers.address_line2 && (
                  <p className="text-gray-600">{invoice.customers.address_line2}</p>
                )}
                {(invoice.customers.city || invoice.customers.postcode) && (
                  <p className="text-gray-600">
                    {[invoice.customers.city, invoice.customers.postcode].filter(Boolean).join(', ')}
                  </p>
                )}
                {invoice.customers.country && (
                  <p className="text-gray-600">{invoice.customers.country}</p>
                )}
              </>
            ) : (
              <p className="text-gray-600 italic">No customer selected</p>
            )}
          </div>

          {/* Items */}
          <table className="w-full mb-8">
            <thead>
              <tr className="border-b-2 border-indigo-900">
                <th className="text-left py-3 text-sm font-bold text-indigo-900">ITEM</th>
                <th className="text-center py-3 text-sm font-bold text-indigo-900 w-24">QTY</th>
                <th className="text-right py-3 text-sm font-bold text-indigo-900 w-32">RATE</th>
                <th className="text-right py-3 text-sm font-bold text-indigo-900 w-32">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {items && items.length > 0 ? (
                items.map((item, index) => (
                  <tr key={item.id || index} className="border-b border-gray-200">
                    <td className="py-4">
                      <p className="font-semibold text-gray-900">{item.description || ''}</p>
                    </td>
                    <td className="text-center py-4">{item.quantity || 0}</td>
                    <td className="text-right py-4">
                      {formatCurrency(Number(item.unit_price || 0), invoice.currency)}
                    </td>
                    <td className="text-right py-4 font-bold">
                      {formatCurrency(Number(item.line_total || 0), invoice.currency)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-500 italic">
                    No items
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-80">
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">
                  {formatCurrency(Number(invoice.subtotal), invoice.currency)}
                </span>
              </div>
              {invoice.tax_total > 0 && (
                <div className="flex justify-between py-3 border-b-2 border-gray-300">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">
                    {formatCurrency(Number(invoice.tax_total), invoice.currency)}
                  </span>
                </div>
              )}
              <div className="bg-indigo-900 text-white p-6 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">TOTAL DUE</span>
                  <span className="text-3xl font-bold">
                    {formatCurrency(Number(invoice.total), invoice.currency)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="font-bold">Notes:</span> {invoice.notes}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
