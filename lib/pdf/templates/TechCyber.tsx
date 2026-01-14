import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const TechCyber = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="max-w-5xl mx-auto bg-white p-12 shadow-2xl">
      {/* Top Border */}
      <div className="h-2 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 -mx-12 -mt-12 mb-10"></div>

      {/* Header */}
      <div className="grid grid-cols-3 gap-8 mb-10">
        <div className="col-span-2">
          <div className="flex items-center gap-4 mb-4">
            {branding?.logoUrl ? (
              <img src={branding.logoUrl} alt="Logo" className="w-20 h-20 rounded-xl" />
            ) : (
              <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">
                  {branding?.business_name ? getInitials(branding.business_name) : 'CS'}
                </span>
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{branding?.business_name || 'CREATIVE STUDIO'}</h1>
            </div>
          </div>
          <div className="text-sm text-gray-600 space-y-1 ml-24">
            {(branding?.address_line1 || branding?.city || branding?.postcode) && (
              <p>
                {[branding.address_line1, branding.city, branding.postcode].filter(Boolean).join(', ')}
              </p>
            )}
            {branding?.phone && <p>Phone: {branding.phone}</p>}
            {branding?.email && <p>Email: {branding.email}</p>}
            {branding?.website && <p>Web: {branding.website}</p>}
            {branding?.vat_number && <p>Tax ID: {branding.vat_number}</p>}
          </div>
        </div>
        <div className="text-right">
          <div className="bg-rose-50 p-6 rounded-lg border-2 border-rose-200">
            <h2 className="text-4xl font-bold text-rose-600 mb-3">INVOICE</h2>
            <div className="text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Number:</span>
                <span className="font-bold">#{invoice.invoice_number}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Date:</span>
                <span className="font-bold">{formatDate(invoice.issue_date)}</span>
              </div>
              {invoice.due_date && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Due:</span>
                  <span className="font-bold">{formatDate(invoice.due_date)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-lg mb-8 border-l-4 border-rose-500">
        <div className="grid grid-cols-2">
          <div>
            <h3 className="text-xs font-bold text-rose-700 uppercase mb-2">Invoice To</h3>
            {invoice.customers ? (
              <>
                <p className="font-bold text-xl text-gray-900">{invoice.customers.name}</p>
                {invoice.customers.address_line1 && (
                  <p className="text-gray-700">{invoice.customers.address_line1}</p>
                )}
                {(invoice.customers.city || invoice.customers.postcode) && (
                  <p className="text-gray-700">
                    {[invoice.customers.city, invoice.customers.postcode].filter(Boolean).join(', ')}
                  </p>
                )}
                {invoice.customers.email && (
                  <p className="text-gray-700">{invoice.customers.email}</p>
                )}
              </>
            ) : (
              <p className="text-gray-600 italic">No customer selected</p>
            )}
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-rose-500 to-pink-500 text-white">
              <th className="text-left p-4 rounded-tl-lg">#</th>
              <th className="text-left p-4">Service Description</th>
              <th className="text-center p-4">Qty</th>
              <th className="text-right p-4">Unit Price</th>
              <th className="text-right p-4 rounded-tr-lg">Line Total</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <tr
                  key={item.id || index}
                  className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-rose-50'}`}
                >
                  <td className="p-4 font-bold text-rose-600">
                    {String(index + 1).padStart(2, '0')}
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-gray-900">{item.description || ''}</p>
                  </td>
                  <td className="p-4 text-center">{item.quantity || 0}</td>
                  <td className="p-4 text-right">
                    {formatCurrency(Number(item.unit_price || 0), invoice.currency)}
                  </td>
                  <td className="p-4 text-right font-bold text-gray-900">
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

      {/* Summary Grid */}
      <div className="grid grid-cols-2 gap-8">
        {/* Payment Info */}
        {(branding?.bank_name || branding?.bank_account_number) && (
          <div>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-rose-500"></span>
              Bank Account Information
            </h3>
            <div className="bg-rose-50 p-6 rounded-lg border border-rose-200">
              <table className="w-full text-sm">
                <tbody>
                  {branding.bank_name && (
                    <tr className="border-b border-rose-200">
                      <td className="py-2 text-gray-600">Bank Name:</td>
                      <td className="py-2 text-right font-semibold">{branding.bank_name}</td>
                    </tr>
                  )}
                  {branding.bank_account_number && (
                    <tr className="border-b border-rose-200">
                      <td className="py-2 text-gray-600">Account Number:</td>
                      <td className="py-2 text-right font-semibold font-mono">
                        {branding.bank_account_number}
                      </td>
                    </tr>
                  )}
                  {branding.bank_sort_code && (
                    <tr className="border-b border-rose-200">
                      <td className="py-2 text-gray-600">Routing Number:</td>
                      <td className="py-2 text-right font-semibold font-mono">
                        {branding.bank_sort_code}
                      </td>
                    </tr>
                  )}
                  {branding.bank_bic && (
                    <tr>
                      <td className="py-2 text-gray-600">SWIFT Code:</td>
                      <td className="py-2 text-right font-semibold font-mono">{branding.bank_bic}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Total */}
        <div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="space-y-3">
              <div className="flex justify-between text-lg">
                <span className="text-gray-700">Subtotal:</span>
                <span className="font-bold">
                  {formatCurrency(Number(invoice.subtotal), invoice.currency)}
                </span>
              </div>
              {invoice.tax_total > 0 && (
                <div className="flex justify-between text-lg pb-3 border-b-2 border-gray-300">
                  <span className="text-gray-700">Tax:</span>
                  <span className="font-bold">
                    {formatCurrency(Number(invoice.tax_total), invoice.currency)}
                  </span>
                </div>
              )}
              <div className="pt-2">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xl font-bold text-gray-900">TOTAL DUE:</span>
                  <span className="text-4xl font-bold text-rose-600">
                    {formatCurrency(Number(invoice.total), invoice.currency)}
                  </span>
                </div>
                <p className="text-right text-sm text-gray-500">{invoice.currency}</p>
              </div>
            </div>
          </div>
          {invoice.due_date && (
            <div className="mt-4 bg-rose-500 text-white p-4 rounded-lg text-center">
              <p className="font-bold">Please pay by {formatDate(invoice.due_date)}</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 pt-6 border-t-2 border-rose-200">
        <div className="text-center">
          <p className="text-gray-700 font-semibold mb-2">Thank you for your business!</p>
          {branding?.email && (
            <p className="text-sm text-gray-600">
              For any questions regarding this invoice, please contact us at {branding.email}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
