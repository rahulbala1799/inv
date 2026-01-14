import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const TechDigital = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-2xl">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 h-3"></div>

      <div className="p-12">
        {/* Header */}
        <div className="grid grid-cols-3 gap-8 mb-10">
          <div className="col-span-2 flex gap-6">
            {branding?.logoUrl ? (
              <img src={branding.logoUrl} alt="Logo" className="w-24 h-24 border-4 border-cyan-600 rounded-full flex-shrink-0" />
            ) : (
              <div className="w-24 h-24 border-4 border-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-cyan-600 font-bold text-3xl">
                  {branding?.business_name ? getInitials(branding.business_name) : 'CS'}
                </span>
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                {branding?.business_name || 'CREATIVE STUDIO'}
              </h1>
              <div className="text-sm text-gray-600">
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
                {(branding?.website || branding?.vat_number) && (
                  <p>
                    {branding.website && `${branding.website}`}
                    {branding.website && branding.vat_number && ' | '}
                    {branding.vat_number && `Tax ID: ${branding.vat_number}`}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl border-2 border-cyan-200">
              <h2 className="text-5xl font-bold text-cyan-600 mb-4">INVOICE</h2>
              <div className="space-y-1 text-sm">
                <p className="text-gray-600"># {invoice.invoice_number}</p>
                <p className="text-gray-600">Date: {formatDate(invoice.issue_date)}</p>
                {invoice.due_date && (
                  <p className="text-gray-600">Due: {formatDate(invoice.due_date)}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bill To Section */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="col-span-2 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xs font-bold text-cyan-700 uppercase tracking-wider mb-3">Bill To</h3>
            {invoice.customers ? (
              <>
                <p className="font-bold text-2xl text-gray-900 mb-2">{invoice.customers.name}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    {invoice.customers.address_line1 && (
                      <p className="text-gray-700">{invoice.customers.address_line1}</p>
                    )}
                    {(invoice.customers.city || invoice.customers.postcode) && (
                      <p className="text-gray-700">
                        {[invoice.customers.city, invoice.customers.postcode].filter(Boolean).join(', ')}
                      </p>
                    )}
                  </div>
                  <div>
                    {invoice.customers.email && (
                      <p className="text-gray-700">Email: {invoice.customers.email}</p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <p className="text-gray-600 italic">No customer selected</p>
            )}
          </div>
          <div className="bg-cyan-50 p-6 rounded-lg border border-cyan-200">
            <h3 className="text-xs font-bold text-cyan-700 uppercase tracking-wider mb-3">Payment Terms</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700">
                <span className="font-semibold">Terms:</span> Net 30 Days
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Currency:</span> {invoice.currency}
              </p>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-4 rounded-t-lg">
            <div className="grid grid-cols-12 gap-4 font-semibold">
              <div className="col-span-5">SERVICE DESCRIPTION</div>
              <div className="col-span-3">DETAILS</div>
              <div className="col-span-2 text-right">RATE</div>
              <div className="col-span-2 text-right">AMOUNT</div>
            </div>
          </div>
          <div className="border-x-2 border-b-2 border-cyan-200 rounded-b-lg">
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <div
                  key={item.id || index}
                  className={`grid grid-cols-12 gap-4 px-6 py-5 border-b border-cyan-100 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-cyan-50'
                  }`}
                >
                  <div className="col-span-5">
                    <p className="font-bold text-gray-900">{item.description || ''}</p>
                  </div>
                  <div className="col-span-3 text-gray-600 text-sm">
                    Qty: {item.quantity || 0}
                  </div>
                  <div className="col-span-2 text-right text-gray-700">
                    {formatCurrency(Number(item.unit_price || 0), invoice.currency)}
                  </div>
                  <div className="col-span-2 text-right font-bold text-cyan-700">
                    {formatCurrency(Number(item.line_total || 0), invoice.currency)}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-5 text-center text-gray-500 italic">No items</div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-8">
          {/* Payment Info */}
          {(branding?.bank_name || branding?.bank_account_number) && (
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-4 pb-2 border-b-2 border-cyan-600">
                Wire Transfer Details
              </h3>
              <div className="space-y-4">
                {branding.bank_name && (
                  <div>
                    <p className="text-xs text-cyan-700 font-bold uppercase mb-1">Bank Name</p>
                    <p className="font-semibold text-gray-900">{branding.bank_name}</p>
                  </div>
                )}
                {branding.bank_account_number && (
                  <div>
                    <p className="text-xs text-cyan-700 font-bold uppercase mb-1">Account Number</p>
                    <p className="font-semibold text-gray-900 font-mono text-lg">
                      {branding.bank_account_number}
                    </p>
                  </div>
                )}
                {branding.bank_sort_code && (
                  <div>
                    <p className="text-xs text-cyan-700 font-bold uppercase mb-1">Routing Number</p>
                    <p className="font-semibold text-gray-900 font-mono">{branding.bank_sort_code}</p>
                  </div>
                )}
                {branding.bank_bic && (
                  <div>
                    <p className="text-xs text-cyan-700 font-bold uppercase mb-1">SWIFT Code</p>
                    <p className="font-semibold text-gray-900 font-mono">{branding.bank_bic}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Totals */}
          <div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="space-y-3">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="font-bold">
                      {formatCurrency(Number(invoice.subtotal), invoice.currency)}
                    </span>
                  </div>
                  {invoice.tax_total > 0 && (
                    <div className="flex justify-between text-lg border-b border-gray-300 pb-3">
                      <span className="text-gray-700">Tax</span>
                      <span className="font-bold">
                        {formatCurrency(Number(invoice.tax_total), invoice.currency)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-2xl font-bold text-gray-900">TOTAL</span>
                    <div className="text-right">
                      <p className="text-5xl font-bold text-cyan-600">
                        {formatCurrency(Number(invoice.total), invoice.currency)}
                      </p>
                      <p className="text-sm text-gray-500">{invoice.currency}</p>
                    </div>
                  </div>
                </div>
              </div>
              {invoice.due_date && (
                <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-5 rounded-lg text-center">
                  <p className="text-sm opacity-90 mb-1">Payment Due By</p>
                  <p className="text-2xl font-bold">{formatDate(invoice.due_date)}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-8">
            <div>
              {invoice.notes && (
                <>
                  <h4 className="font-bold text-gray-900 mb-2">Notes</h4>
                  <p className="text-sm text-gray-600">{invoice.notes}</p>
                </>
              )}
            </div>
            <div className="text-right">
              {branding?.email && (
                <>
                  <h4 className="font-bold text-gray-900 mb-2">Questions?</h4>
                  <p className="text-sm text-gray-600">Contact us at</p>
                  <p className="text-sm text-cyan-600 font-semibold">{branding.email}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 h-3"></div>
    </div>
  )
}
