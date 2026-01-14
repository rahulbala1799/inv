import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

/**
 * Base template component with common structure
 * Other templates can extend or use this as a reference
 */
export function BaseTemplate({ invoice, items, branding, template }: InvoiceTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white p-12 shadow-2xl">
      {/* Header */}
      <div className="border-b-2 border-gray-300 pb-8 mb-8">
        <div className="flex justify-between items-start">
          <div>
            {branding?.logoUrl && (
              <img src={branding.logoUrl} alt="Logo" className="h-16 mb-4" />
            )}
            <h1 className="text-4xl font-bold mb-2">
              {branding?.business_name || 'Company Name'}
            </h1>
            {branding?.address_line1 && (
              <p className="text-gray-600">{branding.address_line1}</p>
            )}
            {(branding?.city || branding?.postcode) && (
              <p className="text-gray-600">
                {[branding.city, branding.postcode].filter(Boolean).join(', ')}
              </p>
            )}
            {branding?.country && (
              <p className="text-gray-600">{branding.country}</p>
            )}
            {branding?.phone && (
              <p className="text-gray-600">{branding.phone}</p>
            )}
            {branding?.email && (
              <p className="text-gray-600">{branding.email}</p>
            )}
          </div>
          <div className="text-right">
            <h2 className="text-5xl font-bold mb-4">INVOICE</h2>
            <p className="text-gray-600">
              <span className="font-semibold">Invoice #:</span> #{invoice.invoice_number}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Date:</span> {formatDate(invoice.issue_date)}
            </p>
            {invoice.due_date && (
              <p className="text-gray-600">
                <span className="font-semibold">Due Date:</span> {formatDate(invoice.due_date)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bill To Section */}
      <div className="mb-8">
        <h3 className="font-bold text-sm uppercase mb-3">Bill To</h3>
        {invoice.customers ? (
          <>
            <p className="font-bold text-lg mb-1">{invoice.customers.name}</p>
            {invoice.customers.email && (
              <p className="text-gray-600">{invoice.customers.email}</p>
            )}
            {invoice.customers.address_line1 && (
              <p className="text-gray-600">{invoice.customers.address_line1}</p>
            )}
            {invoice.customers.address_line2 && (
              <p className="text-gray-600">{invoice.customers.address_line2}</p>
            )}
            {(invoice.customers.city || invoice.customers.postcode) && (
              <p className="text-gray-600">
                {[invoice.customers.city, invoice.customers.postcode].filter(Boolean).join(', ')}
              </p>
            )}
            {invoice.customers.country && (
              <p className="text-gray-600">{invoice.customers.country}</p>
            )}
          </>
        ) : (
          <p className="text-gray-600 italic">No customer selected</p>
        )}
      </div>

      {/* Items Table */}
      <table className="w-full mb-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="text-left p-3">Description</th>
            <th className="text-right p-3">Qty</th>
            <th className="text-right p-3">Rate</th>
            <th className="text-right p-3">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items && items.length > 0 ? (
            items.map((item, index) => (
              <tr key={item.id || index} className="border-b border-gray-200">
                <td className="p-3">{item.description || ''}</td>
                <td className="text-right p-3">{item.quantity || 0}</td>
                <td className="text-right p-3">
                  {formatCurrency(Number(item.unit_price || 0), invoice.currency)}
                </td>
                <td className="text-right p-3 font-semibold">
                  {formatCurrency(Number(item.line_total || 0), invoice.currency)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-3 text-center text-gray-500 italic">
                No items
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-80">
          <div className="flex justify-between py-2 border-b border-gray-200">
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
          <div className="flex justify-between py-3 bg-gray-100 px-4 mt-2">
            <span className="text-lg font-bold">TOTAL</span>
            <span className="text-xl font-bold">
              {formatCurrency(Number(invoice.total), invoice.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {invoice.notes && (
        <div className="mb-8 p-6 bg-gray-50 rounded">
          <h3 className="font-bold mb-2">Notes</h3>
          <p className="text-gray-600 text-sm">{invoice.notes}</p>
        </div>
      )}

      {/* Payment Info */}
      {(branding?.bank_name || branding?.bank_account_number || branding?.bank_iban) && (
        <div className="mb-8 p-6 bg-gray-50 rounded">
          <h3 className="font-bold mb-2">Payment Details</h3>
          {branding.bank_name && (
            <p className="text-gray-600 text-sm">Bank: {branding.bank_name}</p>
          )}
          {branding.bank_account_number && (
            <p className="text-gray-600 text-sm">Account: {branding.bank_account_number}</p>
          )}
          {branding.bank_iban && (
            <p className="text-gray-600 text-sm">IBAN: {branding.bank_iban}</p>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-gray-200 pt-4 text-center text-gray-500 text-sm">
        <p>Thank you for your business!</p>
        {branding?.website && <p>{branding.website}</p>}
      </div>
    </div>
  )
}
