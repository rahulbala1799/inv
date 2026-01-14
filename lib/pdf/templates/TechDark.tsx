import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const TechDark = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="max-w-5xl mx-auto bg-white p-12 shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 -mx-12 -mt-12 p-8 mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {branding?.logoUrl ? (
              <img src={branding.logoUrl} alt="Logo" className="w-20 h-20 rounded" />
            ) : (
              <div className="w-20 h-20 bg-white rounded flex items-center justify-center">
                <span className="text-slate-800 font-bold text-2xl">
                  {branding?.business_name ? getInitials(branding.business_name) : 'CS'}
                </span>
              </div>
            )}
            <div className="text-white">
              <h1 className="text-2xl font-bold mb-1">{branding?.business_name || 'CREATIVE STUDIO'}</h1>
              {branding?.website && <p className="text-slate-300 text-sm">{branding.website}</p>}
            </div>
          </div>
          <div className="text-right text-white">
            <h2 className="text-5xl font-bold mb-2">INVOICE</h2>
            <p className="text-slate-300">#{invoice.invoice_number}</p>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Invoice From</h3>
          <p className="font-bold text-lg text-slate-900">{branding?.business_name || 'Creative Studio'}</p>
          {branding?.address_line1 && <p className="text-sm text-slate-600">{branding.address_line1}</p>}
          {(branding?.city || branding?.postcode) && (
            <p className="text-sm text-slate-600">
              {[branding.city, branding.postcode].filter(Boolean).join(', ')}
              {branding?.country && `, ${branding.country}`}
            </p>
          )}
          {branding?.phone && <p className="text-sm text-slate-600 mt-2">Phone: {branding.phone}</p>}
          {branding?.email && <p className="text-sm text-slate-600">Email: {branding.email}</p>}
          {branding?.vat_number && <p className="text-sm text-slate-600">Tax ID: {branding.vat_number}</p>}
        </div>
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Invoice To</h3>
          {invoice.customers ? (
            <>
              <p className="font-bold text-lg text-slate-900">{invoice.customers.name}</p>
              {invoice.customers.email && <p className="text-sm text-slate-600 mt-2">Email: {invoice.customers.email}</p>}
              {invoice.customers.address_line1 && <p className="text-sm text-slate-600">{invoice.customers.address_line1}</p>}
              {(invoice.customers.city || invoice.customers.postcode) && (
                <p className="text-sm text-slate-600">
                  {[invoice.customers.city, invoice.customers.postcode].filter(Boolean).join(', ')}
                  {invoice.customers.country && `, ${invoice.customers.country}`}
                </p>
              )}
            </>
          ) : (
            <p className="text-slate-600 italic">No customer selected</p>
          )}
        </div>
      </div>

      {/* Date Info Bar */}
      <div className="grid grid-cols-4 gap-4 mb-8 bg-slate-50 p-4 rounded">
        <div>
          <p className="text-xs text-slate-500 uppercase mb-1">Invoice Date</p>
          <p className="font-bold text-slate-900">{formatDate(invoice.issue_date)}</p>
        </div>
        {invoice.due_date && (
          <div>
            <p className="text-xs text-slate-500 uppercase mb-1">Due Date</p>
            <p className="font-bold text-slate-900">{formatDate(invoice.due_date)}</p>
          </div>
        )}
      </div>

      {/* Line Items */}
      <div className="mb-8">
        <div className="bg-slate-800 text-white px-4 py-3 grid grid-cols-12 gap-4 font-semibold text-sm">
          <div className="col-span-6">DESCRIPTION</div>
          <div className="col-span-2 text-center">QUANTITY</div>
          <div className="col-span-2 text-right">UNIT PRICE</div>
          <div className="col-span-2 text-right">AMOUNT</div>
        </div>
        
        <div className="border-x border-b border-slate-200">
          {items && items.length > 0 ? (
            items.map((item, index) => (
              <div
                key={item.id || index}
                className={`px-4 py-4 grid grid-cols-12 gap-4 items-center ${index < items.length - 1 ? 'border-b border-slate-200' : ''} ${index % 2 === 1 ? 'bg-slate-50' : ''}`}
              >
                <div className="col-span-6">
                  <p className="font-semibold text-slate-900">{item.description || ''}</p>
                </div>
                <div className="col-span-2 text-center">{item.quantity || 0}</div>
                <div className="col-span-2 text-right">
                  {formatCurrency(Number(item.unit_price || 0), invoice.currency)}
                </div>
                <div className="col-span-2 text-right font-bold">
                  {formatCurrency(Number(item.line_total || 0), invoice.currency)}
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-4 text-center text-slate-500 italic">No items</div>
          )}
        </div>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-2 gap-8">
        {/* Bank Details */}
        {(branding?.bank_name || branding?.bank_account_number) && (
          <div className="border-2 border-slate-800 p-6 rounded">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-slate-800"></span>
              BANK DETAILS
            </h3>
            <div className="space-y-3 text-sm">
              {branding.bank_name && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Bank Name:</span>
                  <span className="font-semibold">{branding.bank_name}</span>
                </div>
              )}
              {branding.bank_account_number && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Account Number:</span>
                  <span className="font-semibold">{branding.bank_account_number}</span>
                </div>
              )}
              {branding.bank_sort_code && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Routing Number:</span>
                  <span className="font-semibold">{branding.bank_sort_code}</span>
                </div>
              )}
              {branding.bank_bic && (
                <div className="flex justify-between">
                  <span className="text-slate-600">SWIFT:</span>
                  <span className="font-semibold">{branding.bank_bic}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Totals */}
        <div>
          <div className="space-y-3">
            <div className="flex justify-between text-lg py-3 border-b border-slate-200">
              <span className="text-slate-600">Subtotal:</span>
              <span className="font-bold">{formatCurrency(Number(invoice.subtotal), invoice.currency)}</span>
            </div>
            {invoice.tax_total > 0 && (
              <div className="flex justify-between text-lg py-3 border-b border-slate-200">
                <span className="text-slate-600">Tax:</span>
                <span className="font-bold">{formatCurrency(Number(invoice.tax_total), invoice.currency)}</span>
              </div>
            )}
            <div className="bg-slate-800 text-white p-6 rounded">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">TOTAL DUE ({invoice.currency})</span>
                <span className="text-4xl font-bold">{formatCurrency(Number(invoice.total), invoice.currency)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {invoice.notes && (
        <div className="mt-8 pt-6 border-t-2 border-slate-200">
          <p className="text-sm text-slate-600 text-center">{invoice.notes}</p>
        </div>
      )}
    </div>
  )
}
