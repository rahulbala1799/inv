import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const ClassicBlue = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-12 shadow-2xl">
      {/* Header */}
      <div className="border-b-4 border-blue-600 pb-8 mb-8">
        <div className="flex justify-between items-start">
          <div>
            {branding?.logoUrl && (
              <img src={branding.logoUrl} alt="Logo" className="h-16 mb-4" />
            )}
            <h1 className="text-4xl font-bold text-blue-600 mb-2">
              {branding?.business_name || 'CREATIVE STUDIO'}
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
            <h2 className="text-5xl font-bold text-gray-800 mb-4">INVOICE</h2>
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
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-blue-50 p-6 rounded">
          <h3 className="text-blue-600 font-bold text-sm uppercase mb-3">Bill To</h3>
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
        <div className="bg-blue-50 p-6 rounded">
          <h3 className="text-blue-600 font-bold text-sm uppercase mb-3">Invoice Details</h3>
          {branding?.vat_number && (
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">VAT ID:</span> {branding.vat_number}
            </p>
          )}
          {invoice.customers?.vat_number && (
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Customer VAT:</span> {invoice.customers.vat_number}
            </p>
          )}
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full mb-8">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="text-left p-3">Description</th>
            <th className="text-right p-3 w-24">Qty</th>
            <th className="text-right p-3 w-32">Rate</th>
            <th className="text-right p-3 w-32">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items && items.length > 0 ? (
            items.map((item, index) => (
              <tr
                key={item.id || index}
                className={`border-b border-gray-200 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}
              >
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
          <div className="flex justify-between py-3 bg-blue-600 text-white px-4 mt-2">
            <span className="text-lg font-bold">TOTAL DUE</span>
            <span className="text-xl font-bold">
              {formatCurrency(Number(invoice.total), invoice.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Notes & Payment Info */}
      {(invoice.notes || branding?.bank_name || branding?.bank_account_number || branding?.bank_iban) && (
        <div className="bg-blue-50 p-6 rounded border-l-4 border-blue-600 mb-8">
          {invoice.notes && (
            <>
              <h3 className="font-bold mb-2">Payment Instructions</h3>
              <p className="text-gray-600 text-sm">{invoice.notes}</p>
            </>
          )}
          {(branding?.bank_name || branding?.bank_account_number || branding?.bank_iban) && (
            <div className="mt-3">
              {branding.bank_name && (
                <p className="text-gray-600 text-sm">Bank: {branding.bank_name}</p>
              )}
              {branding.bank_account_number && (
                <p className="text-gray-600 text-sm">Account: {branding.bank_account_number}</p>
              )}
              {branding.bank_sort_code && (
                <p className="text-gray-600 text-sm">Sort Code: {branding.bank_sort_code}</p>
              )}
              {branding.bank_iban && (
                <p className="text-gray-600 text-sm">IBAN: {branding.bank_iban}</p>
              )}
              {branding.bank_bic && (
                <p className="text-gray-600 text-sm">BIC: {branding.bank_bic}</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-gray-200 pt-4 text-center text-gray-500 text-sm">
        <p>Thank you for your business!</p>
        {branding?.website && (
          <p>{branding.website}</p>
        )}
      </div>
    </div>
  );
};
