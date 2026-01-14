import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const CorporateElegant = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-12 shadow-2xl">
      {/* Header with background */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white p-8 -mx-12 -mt-12 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-4">{branding?.business_name || 'CREATIVE STUDIO'}</h1>
            {branding?.address_line1 && (
              <p className="text-purple-200 text-sm">{branding.address_line1}</p>
            )}
            {(branding?.city || branding?.postcode) && (
              <p className="text-purple-200 text-sm">
                {[branding.city, branding.postcode].filter(Boolean).join(', ')}
              </p>
            )}
            {branding?.email && (
              <p className="text-purple-200 text-sm">{branding.email}</p>
            )}
          </div>
          <div className="bg-white text-purple-900 px-6 py-4 rounded shadow-lg">
            <div className="text-xs text-purple-600 mb-1">Invoice Number</div>
            <div className="text-2xl font-bold">#{invoice.invoice_number}</div>
          </div>
        </div>
      </div>

      {/* Invoice Info */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-purple-900 font-bold mb-3 text-sm uppercase">Client Information</h3>
            {invoice.customers ? (
              <>
                <p className="font-bold text-lg mb-2">{invoice.customers.name}</p>
                {invoice.customers.email && (
                  <p className="text-gray-600 text-sm">{invoice.customers.email}</p>
                )}
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
        <div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-purple-900 font-bold mb-3 text-sm uppercase">Invoice Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Date Issued:</span>
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
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr className="bg-purple-100 text-purple-900">
              <th className="text-left p-4 rounded-tl-lg">Service Description</th>
              <th className="text-center p-4 w-20">Qty</th>
              <th className="text-right p-4 w-32">Rate</th>
              <th className="text-right p-4 w-32 rounded-tr-lg">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <tr key={item.id || index} className="border-b border-gray-200">
                  <td className="p-4">{item.description || ''}</td>
                  <td className="text-center p-4">{item.quantity || 0}</td>
                  <td className="text-right p-4">
                    {formatCurrency(Number(item.unit_price || 0), invoice.currency)}
                  </td>
                  <td className="text-right p-4 font-semibold text-purple-900">
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
            <div className="flex justify-between py-4 mt-2">
              <span className="text-xl font-bold text-purple-900">Total Amount Due</span>
              <span className="text-2xl font-bold text-purple-900">
                {formatCurrency(Number(invoice.total), invoice.currency)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Info */}
      {(branding?.bank_name || branding?.bank_account_number || invoice.notes) && (
        <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-700">
          {invoice.notes && (
            <>
              <h3 className="font-bold text-purple-900 mb-3">Payment Information</h3>
              <p className="text-gray-700 text-sm mb-2">{invoice.notes}</p>
            </>
          )}
          {(branding?.bank_name || branding?.bank_account_number) && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {branding.bank_name && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Bank Name</p>
                  <p className="font-semibold text-sm">{branding.bank_name}</p>
                </div>
              )}
              {branding.bank_account_number && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Account Number</p>
                  <p className="font-semibold text-sm">{branding.bank_account_number}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-gray-500 text-sm">Thank you for your business!</p>
        {branding?.website && (
          <p className="text-purple-700 font-semibold text-sm mt-1">{branding.website}</p>
        )}
      </div>
    </div>
  )
}
