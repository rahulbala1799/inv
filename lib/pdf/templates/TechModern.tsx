import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const TechModern = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="max-w-5xl mx-auto bg-gradient-to-br from-gray-50 to-white p-12 shadow-2xl">
      <div className="bg-white p-10 rounded-lg shadow-lg border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-start mb-10 pb-8 border-b-4 border-orange-500">
          <div>
            <div className="flex items-center gap-4 mb-4">
              {branding?.logoUrl ? (
                <img src={branding.logoUrl} alt="Logo" className="w-20 h-20 rounded-full" />
              ) : (
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">
                    {branding?.business_name ? getInitials(branding.business_name) : 'CS'}
                  </span>
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{branding?.business_name || 'CREATIVE STUDIO'}</h1>
                <p className="text-orange-600 font-medium">Professional Services</p>
              </div>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              {(branding?.address_line1 || branding?.city || branding?.postcode) && (
                <p>
                  {[branding.address_line1, branding.city, branding.postcode].filter(Boolean).join(' | ')}
                </p>
              )}
              {(branding?.phone || branding?.email) && (
                <p>
                  {branding.phone && `${branding.phone}`}
                  {branding.phone && branding.email && ' | '}
                  {branding.email && `${branding.email}`}
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
          <div className="text-right">
            <h2 className="text-5xl font-bold text-orange-600 mb-2">INVOICE</h2>
            <div className="bg-orange-100 px-6 py-2 rounded-full inline-block">
              <span className="font-bold text-orange-900">#{invoice.invoice_number}</span>
            </div>
          </div>
        </div>

        {/* Client and Date Info */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
              <h3 className="text-xs font-bold text-orange-700 uppercase tracking-wide mb-3">Billed To</h3>
              {invoice.customers ? (
                <>
                  <p className="font-bold text-xl text-gray-900 mb-2">{invoice.customers.name}</p>
                  {invoice.customers.address_line1 && (
                    <p className="text-gray-700">{invoice.customers.address_line1}</p>
                  )}
                  {(invoice.customers.city || invoice.customers.postcode) && (
                    <p className="text-gray-700">
                      {[invoice.customers.city, invoice.customers.postcode].filter(Boolean).join(', ')}
                    </p>
                  )}
                  {invoice.customers.country && (
                    <p className="text-gray-700">{invoice.customers.country}</p>
                  )}
                  {invoice.customers.email && (
                    <p className="text-gray-700 mt-2">{invoice.customers.email}</p>
                  )}
                </>
              ) : (
                <p className="text-gray-600 italic">No customer selected</p>
              )}
            </div>
          </div>
          <div>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-400">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">Invoice Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Date Issued:</span>
                  <span className="font-bold text-gray-900">{formatDate(invoice.issue_date)}</span>
                </div>
                {invoice.due_date && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Due Date:</span>
                    <span className="font-bold text-gray-900">{formatDate(invoice.due_date)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Services Table */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-orange-500"></span>
            Services Provided
          </h3>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <tr>
                  <th className="text-left p-4 font-semibold text-sm">ITEM</th>
                  <th className="text-left p-4 font-semibold text-sm">DESCRIPTION</th>
                  <th className="text-center p-4 font-semibold text-sm w-20">QTY</th>
                  <th className="text-right p-4 font-semibold text-sm w-28">RATE</th>
                  <th className="text-right p-4 font-semibold text-sm w-32">AMOUNT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items && items.length > 0 ? (
                  items.map((item, index) => (
                    <tr key={item.id || index} className="hover:bg-orange-50">
                      <td className="p-4 font-bold text-orange-600">
                        {String(index + 1).padStart(3, '0')}
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-gray-900">{item.description || ''}</p>
                      </td>
                      <td className="p-4 text-center">{item.quantity || 0}</td>
                      <td className="p-4 text-right">
                        {formatCurrency(Number(item.unit_price || 0), invoice.currency)}
                      </td>
                      <td className="p-4 text-right font-bold">
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
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-2 gap-8">
          {/* Bank Details */}
          {(branding?.bank_name || branding?.bank_account_number) && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
                <h3 className="font-bold text-orange-900 mb-4 text-lg flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Bank Account Details
                </h3>
                <div className="space-y-3 text-sm">
                  {branding.bank_name && (
                    <div>
                      <p className="text-orange-700 font-semibold mb-1">Bank Name</p>
                      <p className="text-gray-900">{branding.bank_name}</p>
                    </div>
                  )}
                  {branding.bank_account_number && (
                    <div>
                      <p className="text-orange-700 font-semibold mb-1">Account Number</p>
                      <p className="text-gray-900 font-mono">{branding.bank_account_number}</p>
                    </div>
                  )}
                  {branding.bank_sort_code && (
                    <div>
                      <p className="text-orange-700 font-semibold mb-1">Routing Number</p>
                      <p className="text-gray-900 font-mono">{branding.bank_sort_code}</p>
                    </div>
                  )}
                  {branding.bank_bic && (
                    <div>
                      <p className="text-orange-700 font-semibold mb-1">SWIFT/BIC</p>
                      <p className="text-gray-900 font-mono">{branding.bank_bic}</p>
                    </div>
                  )}
                </div>
              </div>
              {invoice.notes && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <p className="text-sm text-blue-900">
                    <span className="font-bold">Payment Terms:</span> {invoice.notes}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Total */}
          <div>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-bold">
                    {formatCurrency(Number(invoice.subtotal), invoice.currency)}
                  </span>
                </div>
                {invoice.tax_total > 0 && (
                  <div className="flex justify-between text-lg border-b border-gray-300 pb-4">
                    <span className="text-gray-700">Tax</span>
                    <span className="font-bold">
                      {formatCurrency(Number(invoice.tax_total), invoice.currency)}
                    </span>
                  </div>
                )}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-6 -mx-6 -mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm opacity-90 mb-1">Amount Due ({invoice.currency})</p>
                      <p className="text-4xl font-bold">
                        {formatCurrency(Number(invoice.total), invoice.currency)}
                      </p>
                    </div>
                    <div className="text-6xl opacity-20">$</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm">
            Thank you for choosing {branding?.business_name || 'Creative Studio'}. We appreciate your business!
          </p>
          {branding?.email && (
            <p className="text-gray-500 text-xs mt-2">
              For questions about this invoice, please contact us at {branding.email}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
