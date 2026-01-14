import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const LuxuryGold = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-amber-50 to-yellow-50 p-12 shadow-2xl">
      <div className="bg-white p-12 border-4 border-amber-400">
        {/* Ornamental Header */}
        <div className="text-center mb-10 border-b-2 border-amber-400 pb-8">
          <div className="text-amber-600 text-4xl mb-2">✦</div>
          <h1 className="text-5xl font-bold text-amber-900 mb-3" style={{ fontFamily: 'serif' }}>
            INVOICE
          </h1>
          <div className="text-amber-700 font-semibold text-xl tracking-wider">
            #{invoice.invoice_number}
          </div>
          <div className="text-amber-600 text-4xl mt-2">✦</div>
        </div>

        {/* Company & Client */}
        <div className="grid grid-cols-2 gap-8 mb-10">
          <div className="border-2 border-amber-200 p-6 bg-amber-50">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-0.5 bg-amber-500"></div>
              <h3 className="font-bold text-amber-900 uppercase tracking-wider text-sm">From</h3>
              <div className="w-8 h-0.5 bg-amber-500"></div>
            </div>
            <p className="font-bold text-2xl text-amber-900 mb-2" style={{ fontFamily: 'serif' }}>
              {branding?.business_name || 'Creative Studio'}
            </p>
            {branding?.address_line1 && <p className="text-gray-700">{branding.address_line1}</p>}
            {(branding?.city || branding?.postcode) && (
              <p className="text-gray-700">
                {[branding.city, branding.postcode].filter(Boolean).join(', ')}
              </p>
            )}
            {branding?.email && (
              <p className="text-amber-700 font-semibold mt-2">{branding.email}</p>
            )}
            {branding?.phone && <p className="text-gray-700">{branding.phone}</p>}
          </div>
          <div className="border-2 border-amber-200 p-6 bg-amber-50">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-0.5 bg-amber-500"></div>
              <h3 className="font-bold text-amber-900 uppercase tracking-wider text-sm">To</h3>
              <div className="w-8 h-0.5 bg-amber-500"></div>
            </div>
            {invoice.customers ? (
              <>
                <p className="font-bold text-2xl text-amber-900 mb-2" style={{ fontFamily: 'serif' }}>
                  {invoice.customers.name}
                </p>
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
        </div>

        {/* Date Information */}
        <div className="flex justify-center gap-12 mb-10 bg-gradient-to-r from-amber-50 to-yellow-50 p-6 border-y-2 border-amber-300">
          <div className="text-center">
            <div className="text-xs text-amber-700 uppercase tracking-wider mb-1">Issue Date</div>
            <div className="font-bold text-amber-900">{formatDate(invoice.issue_date)}</div>
          </div>
          {invoice.due_date && (
            <>
              <div className="w-0.5 bg-amber-300"></div>
              <div className="text-center">
                <div className="text-xs text-amber-700 uppercase tracking-wider mb-1">Due Date</div>
                <div className="font-bold text-amber-900">{formatDate(invoice.due_date)}</div>
              </div>
            </>
          )}
        </div>

        {/* Items */}
        <table className="w-full mb-8">
          <thead>
            <tr className="bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50">
              <th className="text-left p-4 font-bold uppercase tracking-wide text-sm">Description</th>
              <th className="text-center p-4 font-bold uppercase tracking-wide text-sm w-20">Qty</th>
              <th className="text-right p-4 font-bold uppercase tracking-wide text-sm w-32">Rate</th>
              <th className="text-right p-4 font-bold uppercase tracking-wide text-sm w-32">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <tr key={item.id || index} className="border-b-2 border-amber-100">
                  <td className="p-4 text-gray-800">{item.description || ''}</td>
                  <td className="text-center p-4">{item.quantity || 0}</td>
                  <td className="text-right p-4">
                    {formatCurrency(Number(item.unit_price || 0), invoice.currency)}
                  </td>
                  <td className="text-right p-4 font-bold text-amber-900">
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
        <div className="flex justify-end mb-10">
          <div className="w-96">
            <div className="bg-amber-50 p-6 border-2 border-amber-200">
              <div className="flex justify-between py-2 text-gray-700">
                <span>Subtotal</span>
                <span className="font-semibold">
                  {formatCurrency(Number(invoice.subtotal), invoice.currency)}
                </span>
              </div>
              {invoice.tax_total > 0 && (
                <div className="flex justify-between py-2 border-b-2 border-amber-200">
                  <span>Tax</span>
                  <span className="font-semibold">
                    {formatCurrency(Number(invoice.tax_total), invoice.currency)}
                  </span>
                </div>
              )}
              <div className="bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 p-6 mt-4 -mx-6 -mb-6">
                <div className="flex justify-between items-center">
                  <span
                    className="text-lg font-bold uppercase tracking-wider"
                    style={{ fontFamily: 'serif' }}
                  >
                    Total Due
                  </span>
                  <span className="text-3xl font-bold" style={{ fontFamily: 'serif' }}>
                    {formatCurrency(Number(invoice.total), invoice.currency)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        {(invoice.notes || branding?.bank_name || branding?.bank_account_number) && (
          <div className="border-2 border-amber-200 p-6 bg-gradient-to-r from-amber-50 to-yellow-50">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-0.5 bg-amber-500"></div>
              <h3 className="font-bold text-amber-900 uppercase tracking-wider text-sm">
                Payment Details
              </h3>
              <div className="flex-1 h-0.5 bg-amber-500"></div>
            </div>
            {invoice.notes && (
              <p className="text-gray-700 text-sm mb-3">{invoice.notes}</p>
            )}
            {(branding?.bank_name || branding?.bank_account_number) && (
              <div className="grid grid-cols-2 gap-4">
                {branding.bank_name && (
                  <div>
                    <p className="text-xs text-amber-700 mb-1">Bank Name</p>
                    <p className="font-semibold">{branding.bank_name}</p>
                  </div>
                )}
                {branding.bank_account_number && (
                  <div>
                    <p className="text-xs text-amber-700 mb-1">Account</p>
                    <p className="font-semibold">{branding.bank_account_number}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 text-center border-t-2 border-amber-400 pt-6">
          <div className="text-amber-600 text-2xl mb-2">✦</div>
          <p className="text-amber-900 font-bold text-lg" style={{ fontFamily: 'serif' }}>
            Thank You For Your Business
          </p>
          {branding?.website && (
            <p className="text-amber-700 text-sm mt-2">{branding.website}</p>
          )}
          <div className="text-amber-600 text-2xl mt-2">✦</div>
        </div>
      </div>
    </div>
  )
}
