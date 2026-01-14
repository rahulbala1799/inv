import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const CreativeBold = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl flex">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-emerald-600 to-emerald-800 text-white p-8 flex-shrink-0">
        <div className="mb-12">
          <h1 className="text-2xl font-bold mb-8 leading-tight">{branding?.business_name || 'CREATIVE STUDIO'}</h1>
          <div className="text-emerald-100 text-sm space-y-1">
            {branding?.address_line1 && <p>{branding.address_line1}</p>}
            {(branding?.city || branding?.postcode) && (
              <p>{[branding.city, branding.postcode].filter(Boolean).join(', ')}</p>
            )}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-3">Contact</h3>
          <div className="text-emerald-100 text-sm space-y-1">
            {branding?.phone && <p>{branding.phone}</p>}
            {branding?.email && <p>{branding.email}</p>}
            {branding?.website && <p>{branding.website}</p>}
          </div>
        </div>

        {branding?.vat_number && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3">Tax ID</h3>
            <p className="text-emerald-100 text-sm">{branding.vat_number}</p>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12">
        <div className="mb-8">
          <h2 className="text-5xl font-bold text-emerald-600 mb-2">INVOICE</h2>
        </div>

        {/* Invoice Details */}
        <div className="bg-emerald-50 p-6 mb-8 border-l-4 border-emerald-600 grid grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-gray-500 uppercase mb-1">Invoice Number</div>
            <div className="font-bold text-lg">#{invoice.invoice_number}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase mb-1">Date Issued</div>
            <div className="font-bold text-lg">{formatDate(invoice.issue_date)}</div>
          </div>
          {invoice.due_date && (
            <div>
              <div className="text-xs text-gray-500 uppercase mb-1">Payment Due</div>
              <div className="font-bold text-lg">{formatDate(invoice.due_date)}</div>
            </div>
          )}
        </div>

        {/* Bill To */}
        <div className="mb-8 bg-gray-50 p-6">
          <div className="text-emerald-600 font-bold text-sm uppercase mb-3">Bill To</div>
          {invoice.customers ? (
            <>
              <p className="font-bold text-xl mb-2">{invoice.customers.name}</p>
              {invoice.customers.address_line1 && (
                <p className="text-gray-600">{invoice.customers.address_line1}</p>
              )}
              {(invoice.customers.city || invoice.customers.postcode) && (
                <p className="text-gray-600">
                  {[invoice.customers.city, invoice.customers.postcode].filter(Boolean).join(', ')}
                </p>
              )}
            </>
          ) : (
            <p className="text-gray-600 italic">No customer selected</p>
          )}
        </div>

        {/* Items */}
        <table className="w-full mb-8">
          <thead>
            <tr className="bg-emerald-600 text-white">
              <th className="text-left p-3 text-xs uppercase">Description</th>
              <th className="text-center p-3 text-xs uppercase w-16">Qty</th>
              <th className="text-right p-3 text-xs uppercase w-28">Rate</th>
              <th className="text-right p-3 text-xs uppercase w-28">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <tr
                  key={item.id || index}
                  className={`border-b border-gray-200 ${index % 2 === 1 ? 'bg-emerald-50' : ''}`}
                >
                  <td className="p-3">{item.description || ''}</td>
                  <td className="text-center p-3">{item.quantity || 0}</td>
                  <td className="text-right p-3">
                    {formatCurrency(Number(item.unit_price || 0), invoice.currency)}
                  </td>
                  <td className="text-right p-3 font-bold text-emerald-600">
                    {formatCurrency(Number(item.line_total || 0), invoice.currency)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-500 italic">No items</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-80">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">
                {formatCurrency(Number(invoice.subtotal), invoice.currency)}
              </span>
            </div>
            {invoice.tax_total > 0 && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Tax</span>
                <span className="font-semibold">
                  {formatCurrency(Number(invoice.tax_total), invoice.currency)}
                </span>
              </div>
            )}
            <div className="flex justify-between py-4 border-t-2 border-emerald-600 mt-2">
              <span className="text-xl font-bold text-emerald-600">TOTAL DUE</span>
              <span className="text-2xl font-bold text-emerald-600">
                {formatCurrency(Number(invoice.total), invoice.currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        {(invoice.notes || branding?.bank_name) && (
          <div className="bg-emerald-50 p-6 border-l-4 border-emerald-500">
            <h3 className="font-bold text-emerald-900 mb-2 text-sm uppercase">Payment Instructions</h3>
            {invoice.notes && (
              <p className="text-gray-700 text-sm">{invoice.notes}</p>
            )}
            {branding?.bank_name && (
              <p className="text-gray-700 text-sm mt-2">Bank: {branding.bank_name}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
