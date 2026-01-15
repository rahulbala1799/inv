import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const ProfessionalClassic = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
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
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 10pt;
          color: #2c2c2c;
        }
        .header-section {
          margin-bottom: 25px;
          padding-bottom: 20px;
          border-bottom: 3px solid #2c2c2c;
        }
        .logo-row {
          margin-bottom: 20px;
        }
        .logo-container {
          display: inline-block;
        }
        .logo-container img {
          height: 100px;
          max-width: 200px;
          width: auto;
          object-fit: contain;
          display: block;
        }
        .logo-container img[src=""],
        .logo-container img:not([src]) {
          display: none;
        }
        .bill-from-to-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 20px;
          padding: 20px;
          background-color: #fafafa;
          border-left: 4px solid #2c2c2c;
        }
        .bill-from-section {
          display: flex;
          flex-direction: column;
        }
        .bill-from-title {
          font-size: 11pt;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 10px;
          color: #2c2c2c;
        }
        .bill-from-content {
          font-size: 10pt;
          line-height: 1.6;
        }
        .bill-from-content .company-name {
          font-size: 16pt;
          font-weight: 700;
          color: #2c2c2c;
          margin-bottom: 6px;
          letter-spacing: 0.5px;
        }
        .bill-from-content .company-details {
          font-size: 9.5pt;
          color: #555;
          line-height: 1.5;
        }
        .invoice-details-box {
          background-color: #f5f5f5;
          padding: 15px 20px;
          border: 2px solid #2c2c2c;
          text-align: right;
          margin-top: -60px;
        }
        .invoice-title {
          font-size: 28pt;
          font-weight: 700;
          color: #2c2c2c;
          margin-bottom: 10px;
        }
        .invoice-meta {
          font-size: 10pt;
          line-height: 1.8;
        }
        .invoice-meta strong {
          font-weight: 700;
        }
        .bill-to-section {
          display: flex;
          flex-direction: column;
        }
        .section-title {
          font-size: 11pt;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 10px;
          color: #2c2c2c;
        }
        .section-content {
          font-size: 10pt;
          line-height: 1.6;
        }
        .section-content strong {
          font-weight: 700;
          font-size: 11pt;
        }
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 25px;
          border: 1px solid #2c2c2c;
        }
        .items-table thead {
          background-color: #2c2c2c;
          color: #fff;
        }
        .items-table th {
          text-align: left;
          padding: 12px 10px;
          font-size: 10pt;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .items-table th:last-child,
        .items-table td:last-child {
          text-align: right;
        }
        .items-table td {
          padding: 12px 10px;
          font-size: 10pt;
          border-bottom: 1px solid #ddd;
        }
        .items-table td:first-child {
          word-wrap: break-word;
          word-break: break-word;
          max-width: 350px;
          overflow-wrap: break-word;
        }
        .items-table tbody tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .totals-section {
          margin-top: 25px;
          margin-bottom: 30px;
        }
        .totals-container {
          width: 300px;
          margin-left: auto;
          border: 2px solid #2c2c2c;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 15px;
          font-size: 10.5pt;
          border-bottom: 1px solid #ddd;
        }
        .total-row:last-child {
          border-bottom: none;
        }
        .total-row.grand-total {
          background-color: #2c2c2c;
          color: #fff;
          font-size: 14pt;
          font-weight: 700;
        }
        .footer-section {
          margin-top: 30px;
          padding: 20px;
          background-color: #f5f5f5;
          border-top: 2px solid #2c2c2c;
          font-size: 9.5pt;
          line-height: 1.7;
        }
      `}</style>

      <div className="invoice-container">
        {/* Header Section */}
        <div className="header-section no-break">
          {/* Logo Row */}
          <div className="logo-row">
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
                    <div style={{ marginTop: '6px', fontWeight: 600 }}>
                      VAT Number: {branding.vat_number}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="bill-to-section">
              <div className="section-title">Bill To</div>
              <div className="section-content">
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
                      <div style={{ marginTop: '6px' }}>
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

          {/* Invoice Details - Right aligned */}
          <div className="invoice-details-box">
            <div className="invoice-title">INVOICE</div>
            <div className="invoice-meta">
              <div><strong>Invoice #:</strong> {invoice.invoice_number}</div>
              <div><strong>Date:</strong> {formatDate(invoice.issue_date)}</div>
              {invoice.due_date && (
                <div><strong>Due Date:</strong> {formatDate(invoice.due_date)}</div>
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
                <strong>Payment Terms & Notes:</strong>
                <div style={{ marginTop: '5px' }}>{invoice.notes}</div>
              </div>
            )}
            {(branding?.bank_name || branding?.bank_account_number || branding?.bank_iban) && (
              <div>
                <strong>Banking Information:</strong>
                <div style={{ marginTop: '5px' }}>
                  {branding.bank_name && <div>Bank: {branding.bank_name}</div>}
                  {branding.bank_account_number && (
                    <div>Account Number: {branding.bank_account_number}</div>
                  )}
                  {branding.bank_sort_code && <div>Sort Code: {branding.bank_sort_code}</div>}
                  {branding.bank_iban && <div>IBAN: {branding.bank_iban}</div>}
                  {branding.bank_bic && <div>BIC/SWIFT: {branding.bank_bic}</div>}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
