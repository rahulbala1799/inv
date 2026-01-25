import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const ModernMinimal = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
  return (
    <>
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 10mm;
            @bottom-right {
              content: "Page " counter(page) " of " counter(pages);
              font-size: 9pt;
              color: #666;
            }
          }
          .page-break {
            page-break-before: always;
            break-before: page;
          }
          .no-break {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .table-header {
            display: table-header-group;
          }
          .table-row {
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }
        .invoice-container {
          width: 100%;
          max-width: 210mm;
          margin: 0 auto;
          padding: 10mm;
          font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
          font-size: 10pt;
          color: #1a1a1a;
        }
        .header-section {
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #e5e5e5;
        }
        .logo-invoice-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        .logo-container {
          display: inline-block;
        }
        .logo-container img {
          height: 80px;
          max-width: 200px;
          width: auto;
          object-fit: contain;
          display: block;
        }
        .logo-container img[src=""],
        .logo-container img:not([src]) {
          display: none;
        }
        .invoice-title-top {
          font-size: 32pt;
          font-weight: 300;
          color: #1a1a1a;
          letter-spacing: 2px;
          text-align: right;
        }
        .bill-from-to-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 20px;
        }
        .bill-from-section {
          display: flex;
          flex-direction: column;
        }
        .bill-from-title {
          font-size: 8pt;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #999;
          margin-bottom: 8px;
        }
        .bill-from-content {
          font-size: 10pt;
          line-height: 1.5;
        }
        .bill-from-content .company-name {
          font-size: 14pt;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 4px;
        }
        .bill-from-content .company-details {
          font-size: 9pt;
          color: #666;
          line-height: 1.4;
        }
        .invoice-details {
          text-align: right;
          margin-top: 10px;
        }
        .invoice-meta {
          font-size: 9pt;
          color: #666;
          line-height: 1.6;
        }
        .invoice-meta strong {
          color: #1a1a1a;
          font-weight: 600;
        }
        .bill-to-section {
          display: flex;
          flex-direction: column;
        }
        .bill-to-title {
          font-size: 8pt;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #999;
          margin-bottom: 8px;
        }
        .bill-to-content {
          font-size: 10pt;
          line-height: 1.5;
        }
        .bill-to-content strong {
          font-weight: 600;
          color: #1a1a1a;
        }
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        .items-table thead {
          background-color: #f8f8f8;
          border-bottom: 2px solid #e5e5e5;
        }
        .items-table th {
          text-align: left;
          padding: 10px 8px;
          font-size: 9pt;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #666;
        }
        .items-table th:last-child,
        .items-table td:last-child {
          text-align: right;
        }
        .items-table td {
          padding: 10px 8px;
          font-size: 10pt;
          border-bottom: 1px solid #f0f0f0;
        }
        .items-table td:first-child {
          word-wrap: break-word;
          word-break: break-word;
          max-width: 300px;
          overflow-wrap: break-word;
        }
        .items-table tbody tr:hover {
          background-color: #fafafa;
        }
        .totals-section {
          margin-top: 20px;
          margin-bottom: 30px;
        }
        .totals-container {
          width: 280px;
          margin-left: auto;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 10pt;
        }
        .total-row.grand-total {
          border-top: 2px solid #1a1a1a;
          margin-top: 8px;
          padding-top: 12px;
          font-size: 14pt;
          font-weight: 600;
        }
        .footer-section {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e5e5;
          font-size: 9pt;
          color: #666;
          line-height: 1.6;
        }
      `}</style>

      <div className="invoice-container">
        {/* Header Section - Always on first page */}
        <div className="header-section no-break">
          {/* Logo and INVOICE Title Row */}
          <div className="logo-invoice-row">
            {branding?.logoUrl && (
              <div className="logo-container">
                <img 
                  src={branding.logoUrl} 
                  alt={branding?.business_name || 'Company Logo'}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
            <div className="invoice-title-top">INVOICE</div>
          </div>

          {/* Bill From and Bill To Row */}
          <div className="bill-from-to-section no-break">
            <div className="bill-from-section">
              <div className="bill-from-title">Bill From</div>
              <div className="bill-from-content">
                <div className="company-name">
                  {branding?.business_name || 'Company Name'}
                </div>
                <div className="company-details">
                  {branding?.address_line1 && <div>{branding.address_line1}</div>}
                  {branding?.address_line2 && <div>{branding.address_line2}</div>}
                  {(branding?.city || branding?.postcode) && (
                    <div>
                      {[branding.city, branding.postcode].filter(Boolean).join(', ')}
                      {branding?.country && `, ${branding.country}`}
                    </div>
                  )}
                  {branding?.vat_number && (
                    <div style={{ marginTop: '4px' }}>VAT: {branding.vat_number}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="bill-to-section">
              <div className="bill-to-title">Bill To</div>
              <div className="bill-to-content">
                {invoice.customers?.name ? (
                  <>
                    <div><strong>{invoice.customers.name}</strong></div>
                    {invoice.customers.email && <div>{invoice.customers.email}</div>}
                    {invoice.customers.address_line1 && <div>{invoice.customers.address_line1}</div>}
                    {invoice.customers.address_line2 && <div>{invoice.customers.address_line2}</div>}
                    {(invoice.customers.city || invoice.customers.postcode) && (
                      <div>
                        {[invoice.customers.city, invoice.customers.postcode]
                          .filter(Boolean)
                          .join(', ')}
                        {invoice.customers.country && `, ${invoice.customers.country}`}
                      </div>
                    )}
                    {invoice.customers.vat_number && (
                      <div style={{ marginTop: '4px' }}>VAT: {invoice.customers.vat_number}</div>
                    )}
                  </>
                ) : (
                  <div style={{ color: '#999', fontStyle: 'italic' }}>
                    {invoice.customers ? 'Customer information incomplete' : 'No customer selected'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Invoice Details - Right aligned */}
          <div className="invoice-details">
            <div className="invoice-meta">
              <div><strong>Invoice #:</strong> {invoice.invoice_number}</div>
              <div><strong>Date:</strong> {formatDate(invoice.issue_date)}</div>
              {invoice.due_date && (
                <div><strong>Due Date:</strong> {formatDate(invoice.due_date)}</div>
              )}
            </div>
          </div>
        </div>

        {/* Line Items Table - Can span multiple pages */}
        <table className="items-table">
          <thead className="table-header">
            <tr>
              <th>Description</th>
              <th style={{ textAlign: 'right', width: '60px' }}>Qty</th>
              <th style={{ textAlign: 'right', width: '90px' }}>Unit Price</th>
              <th style={{ textAlign: 'right', width: '70px' }}>Tax %</th>
              <th style={{ textAlign: 'right', width: '100px' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <tr key={item.id || index} className="table-row">
                  <td>
                    <div>{item.description || ''}</div>
                    {item.product_description && (
                      <div style={{ fontSize: '8pt', color: '#6B7280', marginTop: '2px', fontStyle: 'italic' }}>
                        {item.product_description}
                      </div>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>{item.quantity || 0}</td>
                  <td style={{ textAlign: 'right' }}>
                    {formatCurrency(Number(item.unit_price || 0), invoice.currency)}
                  </td>
                  <td style={{ textAlign: 'right' }}>{item.tax_rate || 0}%</td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>
                    {formatCurrency(Number(item.line_total || 0), invoice.currency)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                  No items
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Totals Section - Only on last page */}
        <div className="totals-section no-break">
          <div className="totals-container">
            <div className="total-row">
              <span>Subtotal</span>
              <span>{formatCurrency(Number(invoice.subtotal), invoice.currency)}</span>
            </div>
            {invoice.tax_total > 0 && (
              <div className="total-row">
                <span>Tax</span>
                <span>{formatCurrency(Number(invoice.tax_total), invoice.currency)}</span>
              </div>
            )}
            <div className="total-row grand-total">
              <span>Total</span>
              <span>{formatCurrency(Number(invoice.total), invoice.currency)}</span>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        {(invoice.notes || branding?.bank_name || branding?.bank_iban) && (
          <div className="footer-section no-break">
            {invoice.notes && (
              <div style={{ marginBottom: '12px' }}>
                <strong>Notes:</strong> {invoice.notes}
              </div>
            )}
            {(branding?.bank_name || branding?.bank_account_number || branding?.bank_iban) && (
              <div>
                <strong>Payment Details:</strong>
                {branding.bank_name && <div>Bank: {branding.bank_name}</div>}
                {branding.bank_account_number && (
                  <div>Account: {branding.bank_account_number}</div>
                )}
                {branding.bank_sort_code && <div>Sort Code: {branding.bank_sort_code}</div>}
                {branding.bank_iban && <div>IBAN: {branding.bank_iban}</div>}
                {branding.bank_bic && <div>BIC: {branding.bank_bic}</div>}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
