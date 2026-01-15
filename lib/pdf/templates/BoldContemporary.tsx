import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const BoldContemporary = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
  return (
    <>
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 10mm 10mm 20mm 10mm;
            @bottom-right {
              content: "Page " counter(page) " of " counter(pages);
              font-size: 9pt;
              color: #666;
              margin-bottom: 5mm;
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
          body {
            margin: 0;
            padding: 0;
          }
        }
        .invoice-container {
          width: 100%;
          max-width: 210mm;
          margin: 0 auto;
          padding: 8mm;
          font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
          font-size: 10pt;
          color: #1a1a1a;
          min-height: 270mm;
          padding-bottom: 15mm;
        }
        .top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          padding: 15px 20px;
          background: linear-gradient(135deg, #16a085 0%, #27ae60 100%);
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(22, 160, 133, 0.2);
        }
        .logo-container {
          display: inline-block;
        }
        .logo-container img {
          height: 60px;
          max-width: 160px;
          width: auto;
          object-fit: contain;
          display: block;
          background: #fff;
          padding: 6px 10px;
          border-radius: 6px;
        }
        .logo-container img[src=""],
        .logo-container img:not([src]) {
          display: none;
        }
        .invoice-header-right {
          text-align: right;
          color: #fff;
        }
        .invoice-title {
          font-size: 38pt;
          font-weight: 900;
          color: #fff;
          margin-bottom: 4px;
          letter-spacing: 2px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .invoice-number {
          font-size: 12pt;
          font-weight: 600;
          opacity: 0.95;
        }
        .invoice-dates {
          display: flex;
          gap: 30px;
          margin-bottom: 25px;
          padding: 15px 20px;
          background-color: #f8f9fa;
          border-left: 5px solid #16a085;
          border-radius: 6px;
        }
        .date-item {
          flex: 1;
        }
        .date-label {
          font-size: 8pt;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #16a085;
          margin-bottom: 6px;
          font-weight: 700;
        }
        .date-value {
          font-size: 11pt;
          font-weight: 600;
          color: #2c3e50;
        }
        .parties-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
          margin-bottom: 30px;
        }
        .party-card {
          padding: 20px;
          background: #fff;
          border: 2px solid #16a085;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(22, 160, 133, 0.15);
        }
        .party-title {
          font-size: 10pt;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 12px;
          color: #fff;
          background: linear-gradient(135deg, #16a085 0%, #27ae60 100%);
          padding: 8px 12px;
          border-radius: 4px;
          letter-spacing: 0.5px;
        }
        .party-content {
          font-size: 10pt;
          line-height: 1.7;
        }
        .company-name {
          font-size: 15pt;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 8px;
        }
        .company-details {
          font-size: 9.5pt;
          color: #555;
          line-height: 1.6;
        }
        .party-content strong {
          font-size: 12pt;
          font-weight: 700;
          color: #2c3e50;
        }
        .items-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          margin-bottom: 25px;
          border: 3px solid #16a085;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(22, 160, 133, 0.2);
        }
        .items-table thead {
          background: linear-gradient(135deg, #16a085 0%, #27ae60 100%);
          color: #fff;
        }
        .items-table th {
          text-align: left;
          padding: 16px 14px;
          font-size: 10pt;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-right: 2px solid rgba(255, 255, 255, 0.3);
        }
        .items-table th:last-child {
          border-right: none;
        }
        .items-table th:last-child,
        .items-table td:last-child {
          text-align: right;
        }
        .items-table td {
          padding: 16px 14px;
          font-size: 10pt;
          border-bottom: 2px solid #e8f8f5;
          border-right: 2px solid #e8f8f5;
          background-color: #fff;
        }
        .items-table td:last-child {
          border-right: none;
        }
        .items-table td:first-child {
          word-wrap: break-word;
          word-break: break-word;
          max-width: 350px;
          overflow-wrap: break-word;
        }
        .items-table tbody tr:nth-child(even) {
          background-color: #f0fdf4;
        }
        .items-table tbody tr:nth-child(odd) {
          background-color: #ffffff;
        }
        .items-table tbody tr:last-child td {
          border-bottom: none;
        }
        .items-table tbody tr:hover {
          background-color: #e8f8f5 !important;
        }
        .totals-section {
          margin-top: 25px;
          margin-bottom: 20px;
        }
        .totals-container {
          width: 340px;
          margin-left: auto;
          background: linear-gradient(135deg, #16a085 0%, #27ae60 100%);
          border-radius: 10px;
          padding: 24px;
          color: #fff;
          box-shadow: 0 6px 16px rgba(22, 160, 133, 0.3);
          border: 3px solid #0d8c6f;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          font-size: 11.5pt;
          border-bottom: 2px solid rgba(255, 255, 255, 0.3);
        }
        .total-row:last-child {
          border-bottom: none;
        }
        .total-row.grand-total {
          margin-top: 15px;
          padding-top: 18px;
          border-top: 3px solid rgba(255, 255, 255, 0.4);
          font-size: 20pt;
          font-weight: 900;
        }
        .footer-section {
          margin-top: 30px;
          padding: 20px;
          background: linear-gradient(to right, #f0fdf4 0%, #ffffff 100%);
          border-top: 4px solid #16a085;
          border-radius: 6px;
          font-size: 9.5pt;
          line-height: 1.8;
          color: #555;
        }
        .footer-section strong {
          color: #16a085;
          font-weight: 700;
        }
      `}</style>

      <div className="invoice-container">
        {/* Top Bar: Logo + Invoice Title */}
        <div className="top-bar no-break">
          <div className="logo-container">
            {branding?.logoUrl && (
              <img 
                src={branding.logoUrl} 
                alt={branding?.business_name || 'Company Logo'}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
          </div>
          <div className="invoice-header-right">
            <div className="invoice-title">INVOICE</div>
            <div className="invoice-number">#{invoice.invoice_number}</div>
          </div>
        </div>

        {/* Invoice Dates */}
        <div className="invoice-dates no-break">
          <div className="date-item">
            <div className="date-label">Issue Date</div>
            <div className="date-value">{formatDate(invoice.issue_date)}</div>
          </div>
          {invoice.due_date && (
            <div className="date-item">
              <div className="date-label">Due Date</div>
              <div className="date-value">{formatDate(invoice.due_date)}</div>
            </div>
          )}
        </div>

        {/* Bill From and Bill To Section */}
        <div className="parties-section no-break">
          <div className="party-card">
            <div className="party-title">Bill From</div>
            <div className="party-content">
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
                  <div style={{ marginTop: '8px', fontWeight: 600 }}>
                    VAT: {branding.vat_number}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="party-card">
            <div className="party-title">Bill To</div>
            <div className="party-content">
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
                    <div style={{ marginTop: '8px' }}>
                      <strong>VAT:</strong> {invoice.customers.vat_number}
                    </div>
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

        {/* Line Items Table */}
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
                  <td>{item.description || ''}</td>
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

        {/* Totals Section */}
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
              <span>TOTAL DUE</span>
              <span>{formatCurrency(Number(invoice.total), invoice.currency)}</span>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        {(invoice.notes || branding?.bank_name || branding?.bank_iban) && (
          <div className="footer-section no-break">
            {invoice.notes && (
              <div style={{ marginBottom: '15px' }}>
                <strong>Notes:</strong>
                <div style={{ marginTop: '5px' }}>{invoice.notes}</div>
              </div>
            )}
            {(branding?.bank_name || branding?.bank_account_number || branding?.bank_iban) && (
              <div>
                <strong>Payment Information:</strong>
                <div style={{ marginTop: '5px' }}>
                  {branding.bank_name && <div>Bank: {branding.bank_name}</div>}
                  {branding.bank_account_number && (
                    <div>Account: {branding.bank_account_number}</div>
                  )}
                  {branding.bank_sort_code && <div>Sort Code: {branding.bank_sort_code}</div>}
                  {branding.bank_iban && <div>IBAN: {branding.bank_iban}</div>}
                  {branding.bank_bic && <div>BIC: {branding.bank_bic}</div>}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
