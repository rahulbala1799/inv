import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const ProfessionalGray = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-12 shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-start mb-12 pb-8 border-b-4 border-gray-800">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {branding?.business_name || 'CREATIVE STUDIO'}
          </h1>
          <div className="text-gray-600 space-y-1">
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
          </div>
        </div>
        <div className="text-right">
          <div className="bg-gray-800 text-white px-6 py-3 rounded mb-3">
            <div className="text-sm opacity-80">Invoice</div>
            <div className="text-2xl font-bold">#{invoice.invoice_number}</div>
          </div>
          <div className="text-sm text-gray-600">
            <p>Date: {formatDate(invoice.issue_date)}</p>
            {invoice.due_date && <p>Due: {formatDate(invoice.due_date)}</p>}
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-8">
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-sm font-bold text-gray-700 uppercase mb-3">Bill To</h3>
          {invoice.customers ? (
            <>
              <p className="font-bold text-xl text-gray-900">{invoice.customers.name}</p>
              {invoice.customers.email && (
                <p className="text-gray-600">{invoice.customers.email}</p>
              )}
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
      </div>

      {/* Items */}
      <table className="w-full mb-8">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="text-left p-4">Description</th>
            <th className="text-center p-4 w-20">Qty</th>
            <th className="text-right p-4 w-28">Rate</th>
            <th className="text-right p-4 w-32">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items && items.length > 0 ? (
            items.map((item, index) => (
              <tr
                key={item.id || index}
                className="border-b border-gray-200 hover:bg-gray-50"
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

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-96 bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between py-2 text-gray-700">
            <span>Subtotal</span>
            <span className="font-semibold">
              {formatCurrency(Number(invoice.subtotal), invoice.currency)}
            </span>
          </div>
          {invoice.tax_total > 0 && (
            <div className="flex justify-between py-2 text-gray-700 border-b border-gray-300">
              <span>Tax</span>
              <span className="font-semibold">
                {formatCurrency(Number(invoice.tax_total), invoice.currency)}
              </span>
            </div>
          )}
          <div className="flex justify-between py-4 mt-2">
            <span className="text-xl font-bold text-gray-900">Total Amount</span>
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(Number(invoice.total), invoice.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Terms */}
      {(invoice.notes || branding?.bank_name || branding?.bank_account_number) && (
        <div className="bg-gray-100 p-6 rounded-lg border-l-4 border-gray-800">
          {invoice.notes && (
            <>
              <h3 className="font-bold text-gray-900 mb-2">Payment Terms</h3>
              <p className="text-gray-700 text-sm">{invoice.notes}</p>
            </>
          )}
          {(branding?.bank_name || branding?.bank_account_number) && (
            <div className="mt-3 text-sm text-gray-600">
              {branding.bank_name && <p>Bank: {branding.bank_name}</p>}
              {branding.bank_account_number && <p>Account: {branding.bank_account_number}</p>}
              {branding.bank_sort_code && <p>Routing: {branding.bank_sort_code}</p>}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>Thank you for your business!</p>
      </div>
    </div>
  )
}
