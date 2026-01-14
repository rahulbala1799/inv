import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const SimpleBlackWhite = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-16 shadow-2xl">
      <div className="border-4 border-black p-12">
        {/* Header */}
        <div className="text-center mb-12 border-b-2 border-black pb-8">
          <h1 className="text-5xl font-bold mb-4">INVOICE</h1>
          <div className="text-2xl font-bold">#{invoice.invoice_number}</div>
        </div>

        {/* Company & Client */}
        <div className="grid grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="font-bold text-xl mb-4 uppercase">From</h3>
            <p className="font-bold text-lg">{branding?.business_name || 'Creative Studio'}</p>
            {branding?.address_line1 && <p>{branding.address_line1}</p>}
            {(branding?.city || branding?.postcode) && (
              <p>{[branding.city, branding.postcode].filter(Boolean).join(', ')}</p>
            )}
            {branding?.phone && <p>{branding.phone}</p>}
          </div>
          <div>
            <h3 className="font-bold text-xl mb-4 uppercase">To</h3>
            {invoice.customers ? (
              <>
                <p className="font-bold text-lg">{invoice.customers.name}</p>
                {invoice.customers.address_line1 && <p>{invoice.customers.address_line1}</p>}
                {(invoice.customers.city || invoice.customers.postcode) && (
                  <p>
                    {[invoice.customers.city, invoice.customers.postcode].filter(Boolean).join(', ')}
                  </p>
                )}
              </>
            ) : (
              <p className="text-gray-500 italic">No customer selected</p>
            )}
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-12 mb-12 border-y-2 border-black py-6">
          <div>
            <span className="font-bold">Issue Date:</span> {formatDate(invoice.issue_date)}
          </div>
          {invoice.due_date && (
            <div>
              <span className="font-bold">Due Date:</span> {formatDate(invoice.due_date)}
            </div>
          )}
        </div>

        {/* Items */}
        <table className="w-full mb-12">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="text-left py-4 font-bold">DESCRIPTION</th>
              <th className="text-right py-4 font-bold w-32">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <tr key={item.id || index} className="border-b border-gray-300">
                  <td className="py-4">{item.description || ''}</td>
                  <td className="text-right py-4 font-semibold">
                    {formatCurrency(Number(item.line_total || 0), invoice.currency)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="py-4 text-center text-gray-500 italic">No items</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-12">
          <div className="w-96">
            <div className="flex justify-between py-3 border-b border-gray-300">
              <span className="font-bold">SUBTOTAL</span>
              <span>{formatCurrency(Number(invoice.subtotal), invoice.currency)}</span>
            </div>
            {invoice.tax_total > 0 && (
              <div className="flex justify-between py-3 border-b border-gray-300">
                <span className="font-bold">TAX</span>
                <span>{formatCurrency(Number(invoice.tax_total), invoice.currency)}</span>
              </div>
            )}
            <div className="flex justify-between py-4 bg-black text-white px-4 mt-4">
              <span className="font-bold text-xl">TOTAL</span>
              <span className="font-bold text-2xl">
                {formatCurrency(Number(invoice.total), invoice.currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center border-t-2 border-black pt-6">
          {invoice.due_date && (
            <p className="font-bold">Payment Due: {formatDate(invoice.due_date)}</p>
          )}
          {invoice.notes && <p className="mt-2">{invoice.notes}</p>}
          {!invoice.notes && <p className="mt-2">Thank you for your business</p>}
        </div>
      </div>
    </div>
  )
}
