import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const TechNeon = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="max-w-5xl mx-auto bg-white p-12 shadow-2xl border-8 border-double border-gray-300">
      {/* Logo and Header */}
      <div className="text-center mb-8 pb-6 border-b-2 border-gray-800">
        {branding?.logoUrl ? (
          <img src={branding.logoUrl} alt="Logo" className="inline-block w-24 h-24 rounded-full mb-4" />
        ) : (
          <div className="inline-block w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mb-4">
            <span className="text-white font-bold text-3xl">
              {branding?.business_name ? getInitials(branding.business_name) : 'CS'}
            </span>
          </div>
        )}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{branding?.business_name || 'CREATIVE STUDIO'}</h1>
        <div className="text-gray-600">
          {(branding?.address_line1 || branding?.city || branding?.postcode) && (
            <p>
              {[branding.address_line1, branding.city, branding.postcode].filter(Boolean).join(' • ')}
            </p>
          )}
          {(branding?.phone || branding?.email) && (
            <p>
              {branding.phone && `${branding.phone}`}
              {branding.phone && branding.email && ' • '}
              {branding.email && `${branding.email}`}
            </p>
          )}
          {branding?.website && <p>{branding.website}</p>}
        </div>
      </div>

      {/* Invoice Title and Number */}
      <div className="text-center mb-8">
        <h2 className="text-6xl font-bold text-gray-900 mb-3">INVOICE</h2>
        <div className="inline-block bg-gray-900 text-white px-8 py-3 text-2xl font-bold">
          #{invoice.invoice_number}
        </div>
      </div>

      {/* Client and Dates */}
      <div className="grid grid-cols-3 gap-6 mb-8 text-center">
        <div className="border-2 border-gray-800 p-5">
          <p className="text-xs font-bold uppercase mb-2">Invoice To</p>
          {invoice.customers ? (
            <>
              <p className="font-bold text-lg">{invoice.customers.name}</p>
            </>
          ) : (
            <p className="text-gray-500 italic">No customer</p>
          )}
        </div>
        <div className="border-2 border-gray-800 p-5">
          <p className="text-xs font-bold uppercase mb-2">Invoice Date</p>
          <p className="font-bold text-lg">{formatDate(invoice.issue_date)}</p>
        </div>
        {invoice.due_date && (
          <div className="border-2 border-gray-800 p-5">
            <p className="text-xs font-bold uppercase mb-2">Due Date</p>
            <p className="font-bold text-lg">{formatDate(invoice.due_date)}</p>
          </div>
        )}
      </div>

      {/* Items */}
      <table className="w-full mb-8 border-2 border-gray-800">
        <thead>
          <tr className="bg-gray-900 text-white">
            <th className="text-left p-4 border-r-2 border-white">DESCRIPTION</th>
            <th className="text-center p-4 border-r-2 border-white w-24">QTY</th>
            <th className="text-right p-4 border-r-2 border-white w-32">RATE</th>
            <th className="text-right p-4 w-32">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {items && items.length > 0 ? (
            items.map((item, index) => (
              <tr
                key={item.id || index}
                className={index < items.length - 1 ? 'border-b-2 border-gray-300' : ''}
              >
                <td className="p-4">{item.description || ''}</td>
                <td className="text-center p-4">{item.quantity || 0}</td>
                <td className="text-right p-4">
                  {formatCurrency(Number(item.unit_price || 0), invoice.currency)}
                </td>
                <td className="text-right p-4 font-bold">
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

      {/* Summary */}
      <div className="grid grid-cols-2 gap-8">
        {(branding?.bank_name || branding?.bank_account_number) && (
          <div className="border-2 border-gray-800 p-6">
            <h3 className="font-bold text-lg mb-4 text-center">PAYMENT DETAILS</h3>
            <div className="space-y-2 text-sm">
              {branding.bank_name && (
                <div className="flex justify-between border-b border-gray-300 pb-2">
                  <span>Bank:</span>
                  <span className="font-bold">{branding.bank_name}</span>
                </div>
              )}
              {branding.bank_account_number && (
                <div className="flex justify-between border-b border-gray-300 pb-2">
                  <span>Number:</span>
                  <span className="font-bold">{branding.bank_account_number}</span>
                </div>
              )}
              {branding.bank_sort_code && (
                <div className="flex justify-between border-b border-gray-300 pb-2">
                  <span>Routing:</span>
                  <span className="font-bold">{branding.bank_sort_code}</span>
                </div>
              )}
              {branding.bank_bic && (
                <div className="flex justify-between">
                  <span>SWIFT:</span>
                  <span className="font-bold">{branding.bank_bic}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="border-2 border-gray-800 p-6">
          <div className="space-y-3">
            <div className="flex justify-between text-lg">
              <span>SUBTOTAL</span>
              <span className="font-bold">
                {formatCurrency(Number(invoice.subtotal), invoice.currency)}
              </span>
            </div>
            {invoice.tax_total > 0 && (
              <div className="flex justify-between text-lg border-b-2 border-gray-300 pb-3">
                <span>TAX</span>
                <span className="font-bold">
                  {formatCurrency(Number(invoice.tax_total), invoice.currency)}
                </span>
              </div>
            )}
            <div className="bg-gray-900 text-white p-6 -mx-6 -mb-6 flex justify-between items-center">
              <span className="text-2xl font-bold">TOTAL</span>
              <span className="text-4xl font-bold">
                {formatCurrency(Number(invoice.total), invoice.currency)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {invoice.notes && (
        <div className="mt-8 pt-6 border-t-2 border-gray-800 text-center">
          <p className="font-bold text-lg">{invoice.notes}</p>
        </div>
      )}
    </div>
  )
}
