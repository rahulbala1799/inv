import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const TechFuturistic = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="max-w-5xl mx-auto bg-white p-12 shadow-2xl">
      {/* Angled Header Design */}
      <div className="relative mb-12">
        <div className="absolute top-0 right-0 w-96 h-48 bg-gradient-to-br from-teal-500 to-teal-700 transform skew-y-3"></div>
        <div className="relative z-10 flex justify-between items-start pt-8">
          <div className="flex items-center gap-4">
            {branding?.logoUrl ? (
              <img src={branding.logoUrl} alt="Logo" className="w-24 h-24 border-4 border-teal-600 rounded-lg" />
            ) : (
              <div className="w-24 h-24 bg-white border-4 border-teal-600 rounded-lg flex items-center justify-center shadow-xl">
                <span className="text-teal-600 font-bold text-3xl">
                  {branding?.business_name ? getInitials(branding.business_name) : 'CS'}
                </span>
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{branding?.business_name || 'CREATIVE STUDIO'}</h1>
            </div>
          </div>
          <div className="bg-white px-8 py-4 shadow-lg">
            <p className="text-sm text-gray-600 mb-1">Invoice Number</p>
            <p className="text-3xl font-bold text-teal-600">#{invoice.invoice_number}</p>
          </div>
        </div>
      </div>

      {/* Company and Client Grid */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-lg">
          <h3 className="text-xs font-bold text-teal-700 uppercase mb-3">From</h3>
          <p className="font-semibold text-gray-900">{branding?.business_name || 'Creative Studio'}</p>
          {branding?.address_line1 && <p className="text-sm text-gray-700">{branding.address_line1}</p>}
          {(branding?.city || branding?.postcode) && (
            <p className="text-sm text-gray-700">
              {[branding.city, branding.postcode].filter(Boolean).join(', ')}
            </p>
          )}
          {branding?.phone && <p className="text-sm text-gray-700 mt-2">{branding.phone}</p>}
          {branding?.email && (
            <p className="text-sm text-teal-600 font-semibold">{branding.email}</p>
          )}
        </div>
        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-teal-600">
          <h3 className="text-xs font-bold text-gray-700 uppercase mb-3">Bill To</h3>
          {invoice.customers ? (
            <>
              <p className="font-bold text-xl text-gray-900">{invoice.customers.name}</p>
              {invoice.customers.address_line1 && (
                <p className="text-sm text-gray-700">{invoice.customers.address_line1}</p>
              )}
              {(invoice.customers.city || invoice.customers.postcode) && (
                <p className="text-sm text-gray-700">
                  {[invoice.customers.city, invoice.customers.postcode].filter(Boolean).join(', ')}
                </p>
              )}
            </>
          ) : (
            <p className="text-gray-600 italic">No customer selected</p>
          )}
        </div>
      </div>

      {/* Invoice Info Bar */}
      <div className="bg-teal-600 text-white p-6 rounded-lg mb-8 grid grid-cols-4 gap-6">
        <div>
          <p className="text-teal-200 text-xs uppercase mb-1">Issue Date</p>
          <p className="font-bold text-lg">{formatDate(invoice.issue_date)}</p>
        </div>
        {invoice.due_date && (
          <div>
            <p className="text-teal-200 text-xs uppercase mb-1">Due Date</p>
            <p className="font-bold text-lg">{formatDate(invoice.due_date)}</p>
          </div>
        )}
      </div>

      {/* Items */}
      <div className="mb-8">
        <div className="grid grid-cols-12 gap-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-4 rounded-t-lg font-bold text-sm">
          <div className="col-span-6">SERVICE</div>
          <div className="col-span-2 text-center">QTY</div>
          <div className="col-span-2 text-right">RATE</div>
          <div className="col-span-2 text-right">TOTAL</div>
        </div>
        <div className="border-x-2 border-b-2 border-teal-200 rounded-b-lg">
          {items && items.length > 0 ? (
            items.map((item, index) => (
              <div
                key={item.id || index}
                className={`grid grid-cols-12 gap-4 p-4 ${index % 2 === 0 ? 'bg-teal-50' : 'bg-white'}`}
              >
                <div className="col-span-6">
                  <p className="font-bold text-gray-900">{item.description || ''}</p>
                </div>
                <div className="col-span-2 text-center">{item.quantity || 0}</div>
                <div className="col-span-2 text-right">
                  {formatCurrency(Number(item.unit_price || 0), invoice.currency)}
                </div>
                <div className="col-span-2 text-right font-bold text-teal-700">
                  {formatCurrency(Number(item.line_total || 0), invoice.currency)}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 italic">No items</div>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-8">
        {/* Bank Info */}
        {(branding?.bank_name || branding?.bank_account_number) && (
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-lg border-2 border-teal-200">
            <h3 className="font-bold text-teal-900 mb-4 text-lg">Bank Transfer Information</h3>
            <div className="space-y-3 text-sm">
              {branding.bank_name && (
                <div>
                  <p className="text-teal-700 font-semibold">Bank Name</p>
                  <p className="text-gray-900">{branding.bank_name}</p>
                </div>
              )}
              {branding.bank_account_number && (
                <div>
                  <p className="text-teal-700 font-semibold">Account Number</p>
                  <p className="text-gray-900 font-mono">{branding.bank_account_number}</p>
                </div>
              )}
              {branding.bank_sort_code && (
                <div>
                  <p className="text-teal-700 font-semibold">Routing Number</p>
                  <p className="text-gray-900 font-mono">{branding.bank_sort_code}</p>
                </div>
              )}
              {branding.bank_bic && (
                <div>
                  <p className="text-teal-700 font-semibold">SWIFT Code</p>
                  <p className="text-gray-900 font-mono">{branding.bank_bic}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Totals */}
        <div>
          <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
            <div className="space-y-4">
              <div className="flex justify-between text-lg">
                <span className="text-gray-700">Subtotal</span>
                <span className="font-bold">
                  {formatCurrency(Number(invoice.subtotal), invoice.currency)}
                </span>
              </div>
              {invoice.tax_total > 0 && (
                <div className="flex justify-between text-lg pb-4 border-b-2 border-gray-300">
                  <span className="text-gray-700">Tax</span>
                  <span className="font-bold">
                    {formatCurrency(Number(invoice.tax_total), invoice.currency)}
                  </span>
                </div>
              )}
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-6 rounded-lg -mx-6 -mb-6">
                <p className="text-sm opacity-90 mb-2">Total Amount Due</p>
                <p className="text-5xl font-bold">
                  {formatCurrency(Number(invoice.total), invoice.currency)}
                </p>
                <p className="text-sm opacity-90 mt-2">{invoice.currency}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {invoice.notes && (
        <div className="mt-8 p-6 bg-teal-50 rounded-lg border-l-4 border-teal-600">
          <p className="text-sm text-gray-700">
            <span className="font-bold text-teal-900">Payment Terms:</span> {invoice.notes}
          </p>
        </div>
      )}
    </div>
  )
}
