import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const TechMatrix = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="max-w-5xl mx-auto bg-white p-12 shadow-2xl">
      {/* Header with Logo */}
      <div className="flex justify-between items-start mb-10">
        <div className="flex gap-6">
          {branding?.logoUrl ? (
            <img src={branding.logoUrl} alt="Logo" className="w-28 h-28 rounded-2xl" />
          ) : (
            <div className="w-28 h-28 bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-xl">
              <span className="text-white font-bold text-4xl">
                {branding?.business_name ? getInitials(branding.business_name) : 'CS'}
              </span>
            </div>
          )}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {branding?.business_name || 'CREATIVE STUDIO'}
            </h1>
            <div className="text-sm text-gray-600 space-y-1">
              {branding?.address_line1 && <p>{branding.address_line1}</p>}
              {(branding?.city || branding?.postcode || branding?.country) && (
                <p>
                  {[branding.city, branding.postcode, branding.country].filter(Boolean).join(', ')}
                </p>
              )}
              {branding?.phone && <p>Tel: {branding.phone}</p>}
              {branding?.email && <p>Email: {branding.email}</p>}
              {branding?.vat_number && <p>Tax ID: {branding.vat_number}</p>}
            </div>
          </div>
        </div>
        <div>
          <div className="text-right mb-4">
            <h2 className="text-6xl font-bold text-violet-600">INVOICE</h2>
          </div>
          <div className="bg-violet-100 px-6 py-4 rounded-lg">
            <p className="text-sm text-violet-700 mb-1">Invoice Number</p>
            <p className="text-2xl font-bold text-violet-900">#{invoice.invoice_number}</p>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="border-2 border-violet-200 rounded-lg p-6 bg-violet-50">
          <h3 className="text-xs font-bold text-violet-700 uppercase tracking-wider mb-4">Bill To</h3>
          {invoice.customers ? (
            <>
              <p className="font-bold text-2xl text-gray-900 mb-2">{invoice.customers.name}</p>
              {invoice.customers.address_line1 && (
                <p className="text-gray-700">{invoice.customers.address_line1}</p>
              )}
              {(invoice.customers.city || invoice.customers.postcode) && (
                <p className="text-gray-700">
                  {[invoice.customers.city, invoice.customers.postcode].filter(Boolean).join(', ')}
                </p>
              )}
              {invoice.customers.country && <p className="text-gray-700">{invoice.customers.country}</p>}
              {invoice.customers.email && (
                <p className="text-gray-700 mt-2">{invoice.customers.email}</p>
              )}
            </>
          ) : (
            <p className="text-gray-600 italic">No customer selected</p>
          )}
        </div>
        <div className="border-2 border-violet-200 rounded-lg p-6 bg-violet-50">
          <h3 className="text-xs font-bold text-violet-700 uppercase tracking-wider mb-4">Invoice Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-violet-200">
              <span className="text-gray-600">Issue Date:</span>
              <span className="font-bold text-gray-900">{formatDate(invoice.issue_date)}</span>
            </div>
            {invoice.due_date && (
              <div className="flex justify-between items-center pb-2 border-b border-violet-200">
                <span className="text-gray-600">Due Date:</span>
                <span className="font-bold text-gray-900">{formatDate(invoice.due_date)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-violet-600">
          Services Provided
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-4 p-4 bg-violet-600 text-white rounded-t-lg font-semibold">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Description</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Rate</div>
            <div className="col-span-2 text-right">Amount</div>
          </div>

          {items && items.length > 0 ? (
            items.map((item, index) => (
              <div
                key={item.id || index}
                className={`grid grid-cols-12 gap-4 p-4 border-b border-violet-100 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-violet-50'
                }`}
              >
                <div className="col-span-1 font-bold text-violet-600">{index + 1}</div>
                <div className="col-span-5">
                  <p className="font-semibold text-gray-900">{item.description || ''}</p>
                </div>
                <div className="col-span-2 text-center">{item.quantity || 0}</div>
                <div className="col-span-2 text-right">
                  {formatCurrency(Number(item.unit_price || 0), invoice.currency)}
                </div>
                <div className="col-span-2 text-right font-bold">
                  {formatCurrency(Number(item.line_total || 0), invoice.currency)}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 italic">No items</div>
          )}
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-2 gap-8">
        {/* Bank Details */}
        {(branding?.bank_name || branding?.bank_account_number) && (
          <div>
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-6 rounded-lg border-2 border-violet-200">
              <h3 className="font-bold text-violet-900 text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-violet-600 rounded-full"></span>
                Payment Information
              </h3>
              <div className="space-y-3">
                {branding.bank_name && (
                  <div>
                    <p className="text-xs text-violet-700 uppercase font-bold mb-1">Bank Name</p>
                    <p className="font-semibold text-gray-900">{branding.bank_name}</p>
                  </div>
                )}
                {branding.bank_account_number && (
                  <div>
                    <p className="text-xs text-violet-700 uppercase font-bold mb-1">Account Number</p>
                    <p className="font-semibold text-gray-900 font-mono">{branding.bank_account_number}</p>
                  </div>
                )}
                {branding.bank_sort_code && (
                  <div>
                    <p className="text-xs text-violet-700 uppercase font-bold mb-1">Routing Number</p>
                    <p className="font-semibold text-gray-900 font-mono">{branding.bank_sort_code}</p>
                  </div>
                )}
                {branding.bank_bic && (
                  <div>
                    <p className="text-xs text-violet-700 uppercase font-bold mb-1">SWIFT Code</p>
                    <p className="font-semibold text-gray-900 font-mono">{branding.bank_bic}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Totals */}
        <div>
          <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
            <div className="space-y-4">
              <div className="flex justify-between text-xl">
                <span className="text-gray-700">Subtotal</span>
                <span className="font-bold">
                  {formatCurrency(Number(invoice.subtotal), invoice.currency)}
                </span>
              </div>
              {invoice.tax_total > 0 && (
                <div className="flex justify-between text-xl pb-4 border-b-2 border-gray-300">
                  <span className="text-gray-700">Tax</span>
                  <span className="font-bold">
                    {formatCurrency(Number(invoice.tax_total), invoice.currency)}
                  </span>
                </div>
              )}
              <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-8 rounded-lg -mx-6 -mb-6">
                <p className="text-sm opacity-90 mb-2">Total Amount Due</p>
                <p className="text-5xl font-bold mb-2">
                  {formatCurrency(Number(invoice.total), invoice.currency)}
                </p>
                <p className="text-sm opacity-90">{invoice.currency}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      {invoice.notes && (
        <div className="mt-10 bg-violet-50 border-l-4 border-violet-600 p-6 rounded">
          <h4 className="font-bold text-violet-900 mb-2">Terms & Conditions</h4>
          <p className="text-sm text-gray-700">{invoice.notes}</p>
        </div>
      )}
    </div>
  )
}
