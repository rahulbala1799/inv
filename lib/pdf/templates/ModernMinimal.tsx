import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const ModernMinimal = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-12 shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-start mb-12">
        <div>
          {branding?.logoUrl && (
            <img src={branding.logoUrl} alt="Logo" className="h-16 mb-4" />
          )}
          <h1 className="text-3xl font-bold tracking-wider mb-6">
            {branding?.business_name || 'CREATIVE STUDIO'}
          </h1>
          {branding?.address_line1 && (
            <p className="text-gray-500 text-sm">{branding.address_line1}</p>
          )}
          {(branding?.city || branding?.postcode) && (
            <p className="text-gray-500 text-sm">
              {[branding.city, branding.postcode].filter(Boolean).join(', ')}
            </p>
          )}
          {branding?.phone && (
            <p className="text-gray-500 text-sm">{branding.phone}</p>
          )}
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400 uppercase tracking-widest mb-2">Invoice</div>
          <div className="text-3xl font-bold mb-4">#{invoice.invoice_number}</div>
          <div className="text-sm text-gray-500">{formatDate(invoice.issue_date)}</div>
          {invoice.due_date && (
            <div className="text-sm text-gray-500">Due: {formatDate(invoice.due_date)}</div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t-2 border-black mb-12"></div>

      {/* Bill To */}
      <div className="mb-12">
        <div className="text-xs text-gray-400 uppercase tracking-widest mb-3">Billed To</div>
        {invoice.customers ? (
          <>
            <div className="text-xl font-bold mb-2">{invoice.customers.name}</div>
            {invoice.customers.email && (
              <div className="text-gray-600">{invoice.customers.email}</div>
            )}
            {invoice.customers.address_line1 && (
              <div className="text-gray-600">{invoice.customers.address_line1}</div>
            )}
            {invoice.customers.address_line2 && (
              <div className="text-gray-600">{invoice.customers.address_line2}</div>
            )}
            {(invoice.customers.city || invoice.customers.postcode) && (
              <div className="text-gray-600">
                {[invoice.customers.city, invoice.customers.postcode].filter(Boolean).join(', ')}
              </div>
            )}
            {invoice.customers.country && (
              <div className="text-gray-600">{invoice.customers.country}</div>
            )}
          </>
        ) : (
          <div className="text-gray-600 italic">No customer selected</div>
        )}
      </div>

      {/* Items */}
      <table className="w-full mb-12">
        <thead className="border-b-2 border-black">
          <tr className="text-xs uppercase tracking-wider">
            <th className="text-left pb-4 font-bold">Description</th>
            <th className="text-center pb-4 font-bold">Qty</th>
            <th className="text-right pb-4 font-bold">Rate</th>
            <th className="text-right pb-4 font-bold">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items && items.length > 0 ? (
            items.map((item, index) => (
              <tr key={item.id || index} className="border-b border-gray-200">
                <td className="py-4">
                  <div className="font-medium">{item.description || ''}</div>
                </td>
                <td className="text-center py-4 text-gray-600">{item.quantity || 0}</td>
                <td className="text-right py-4 text-gray-600">
                  {formatCurrency(Number(item.unit_price || 0), invoice.currency)}
                </td>
                <td className="text-right py-4 font-semibold">
                  {formatCurrency(Number(item.line_total || 0), invoice.currency)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-4 text-center text-gray-500 italic">
                No items
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end mb-12">
        <div className="w-80">
          <div className="flex justify-between py-3 border-b border-gray-200">
            <span className="text-gray-600">Subtotal</span>
            <span>{formatCurrency(Number(invoice.subtotal), invoice.currency)}</span>
          </div>
          {invoice.tax_total > 0 && (
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Tax</span>
              <span>{formatCurrency(Number(invoice.tax_total), invoice.currency)}</span>
            </div>
          )}
          <div className="flex justify-between py-4 border-t-2 border-black mt-4">
            <span className="text-xl font-bold">Total</span>
            <span className="text-2xl font-bold">
              {formatCurrency(Number(invoice.total), invoice.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {(invoice.notes || branding?.bank_name || branding?.bank_account_number) && (
        <div className="mb-8">
          <div className="text-xs text-gray-400 uppercase tracking-widest mb-3">Payment Details</div>
          {invoice.notes && (
            <p className="text-gray-600 text-sm">{invoice.notes}</p>
          )}
          {(branding?.bank_name || branding?.bank_account_number) && (
            <p className="text-gray-600 text-sm mt-2">
              {branding.bank_name && `Bank: ${branding.bank_name}`}
              {branding.bank_name && branding.bank_account_number && ' • '}
              {branding.bank_account_number && `Account: ${branding.bank_account_number}`}
            </p>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-gray-200 pt-6 text-center text-gray-400 text-sm">
        {branding?.website || 'www.creativestudio.com'}
      </div>
    </div>
  )
}
