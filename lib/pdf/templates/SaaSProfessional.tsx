import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const SaaSProfessional = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
  return (
    <>
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 8mm 10mm 20mm 10mm;
            @bottom-right {
              content: "Page " counter(page) " of " counter(pages);
              font-size: 8pt;
              color: #6B7280;
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
          padding: 0;
          font-family: 'Inter', 'Helvetica Neue', 'Helvetica', Arial, sans-serif;
          font-size: 10pt;
          color: #111827;
          background-color: #FFFFFF;
        }
        .header-bar {
          background: linear-gradient(135deg, #4F46E5 0%, #6366F1 100%);
          padding: 20px 30px;
          margin: 0 -10mm 30px -10mm;
          color: #FFFFFF;
        }
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo-section {
          flex: 0 0 auto;
        }
        .logo-container {
          display: inline-block;
        }
        .logo-container img {
          height: 50px;
          max-width: 180px;
          width: auto;
          object-fit: contain;
          display: block;
          filter: brightness(0) invert(1);
        }
        .logo-container img[src=""],
        .logo-container img:not([src]) {
          display: none;
        }
        .invoice-header-right {
          text-align: right;
        }
        .invoice-title {
          font-size: 28pt;
          font-weight: 600;
          color: #FFFFFF;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }
        .invoice-meta {
          font-size: 9pt;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.95);
        }
        .invoice-meta strong {
          font-weight: 600;
          color: #FFFFFF;
        }
        .content-section {
          padding: 0 10mm;
        }
        .parties-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 35px;
        }
        .party-block {
          display: flex;
          flex-direction: column;
        }
        .party-label {
          font-size: 8pt;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #6B7280;
          margin-bottom: 12px;
        }
        .party-content {
          font-size: 10pt;
          line-height: 1.7;
          color: #111827;
        }
        .company-name {
          font-size: 16pt;
          font-weight: 600;
          color: #111827;
          margin-bottom: 10px;
          letter-spacing: -0.3px;
        }
        .company-details {
          font-size: 9.5pt;
          color: #4B5563;
          line-height: 1.7;
        }
        .party-content strong {
          font-size: 11pt;
          font-weight: 600;
          color: #111827;
          display: block;
          margin-bottom: 4px;
        }
        .items-section {
          margin-bottom: 25px;
        }
        .items-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          margin-bottom: 0;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          overflow: hidden;
        }
        .items-table thead {
          background-color: #F9FAFB;
        }
        .items-table th {
          text-align: left;
          padding: 14px 16px;
          font-size: 9pt;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #6B7280;
          border-bottom: 2px solid #E5E7EB;
        }
        .items-table th:last-child,
        .items-table td:last-child {
          text-align: right;
        }
        .items-table td {
          padding: 16px;
          font-size: 10pt;
          border-bottom: 1px solid #F3F4F6;
          color: #111827;
          background-color: #FFFFFF;
        }
        .items-table td:first-child {
          word-wrap: break-word;
          word-break: break-word;
          max-width: 350px;
          overflow-wrap: break-word;
          font-weight: 500;
        }
        .items-table tbody tr:last-child td {
          border-bottom: none;
        }
        .items-table tbody tr:hover {
          background-color: #F9FAFB;
        }
        .totals-section {
          margin-top: 30px;
          margin-bottom: 30px;
        }
        .totals-container {
          width: 350px;
          margin-left: auto;
          background-color: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          padding: 20px 24px;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 10pt;
          color: #4B5563;
        }
        .total-row.grand-total {
          margin-top: 12px;
          padding-top: 16px;
          border-top: 2px solid #E5E7EB;
          font-size: 16pt;
          font-weight: 600;
          color: #111827;
        }
        .total-label {
          font-weight: 500;
        }
        .total-value {
          font-weight: 600;
          color: #111827;
        }
        .grand-total .total-label {
          font-size: 14pt;
          color: #111827;
        }
        .grand-total .total-value {
          font-size: 16pt;
          color: #4F46E5;
        }
        .footer-section {
          margin-top: 40px;
          padding: 24px 0;
          border-top: 1px solid #E5E7EB;
          font-size: 9pt;
          line-height: 1.7;
          color: #6B7280;
        }
        .footer-section strong {
          color: #111827;
          font-weight: 600;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }
        .footer-block {
          display: flex;
          flex-direction: column;
        }
        .footer-title {
          font-size: 8pt;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #9CA3AF;
          margin-bottom: 8px;
        }
        .footer-content {
          color: #4B5563;
          line-height: 1.6;
        }
      `}</style>

      <div className="invoice-container">
        {/* Header Bar with Logo and Invoice Info */}
        <div className="header-bar no-break">
          <div className="header-content">
            <div className="logo-section">
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
              {!branding?.logoUrl && (
                <div className="company-name" style={{ color: '#FFFFFF', fontSize: '20pt', fontWeight: 600 }}>
                  {branding?.business_name || 'Company Name'}
                </div>
              )}
            </div>
            <div className="invoice-header-right">
              <div className="invoice-title">INVOICE</div>
              <div className="invoice-meta">
                <div><strong>Invoice #:</strong> {invoice.invoice_number}</div>
                <div><strong>Issue Date:</strong> {formatDate(invoice.issue_date)}</div>
                {invoice.due_date && (
                  <div><strong>Due Date:</strong> {formatDate(invoice.due_date)}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="content-section">
          {/* Bill From and Bill To Section */}
          <div className="parties-section no-break">
            <div className="party-block">
              <div className="party-label">Bill From</div>
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
                  {branding?.email && (
                    <div style={{ marginTop: '8px' }}>{branding.email}</div>
                  )}
                  {branding?.vat_number && (
                    <div style={{ marginTop: '8px', fontWeight: 500 }}>
                      VAT: {branding.vat_number}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="party-block">
              <div className="party-label">Bill To</div>
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
                        VAT: {invoice.customers.vat_number}
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ color: '#9CA3AF', fontStyle: 'italic' }}>
                    {invoice.customers ? 'Customer information incomplete' : 'No customer selected'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="items-section">
            <table className="items-table">
              <thead className="table-header">
                <tr>
                  <th>Description</th>
                  <th style={{ textAlign: 'right', width: '70px' }}>Qty</th>
                  <th style={{ textAlign: 'right', width: '100px' }}>Unit Price</th>
                  <th style={{ textAlign: 'right', width: '80px' }}>Tax %</th>
                  <th style={{ textAlign: 'right', width: '110px' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {items && items.length > 0 ? (
                  items.map((item, index) => (
                    <tr key={item.id || index} className="table-row">
                      <td>{item.description || ''}</td>
                      <td style={{ textAlign: 'right', color: '#6B7280' }}>{item.quantity || 0}</td>
                      <td style={{ textAlign: 'right', color: '#6B7280' }}>
                        {formatCurrency(Number(item.unit_price || 0), invoice.currency)}
                      </td>
                      <td style={{ textAlign: 'right', color: '#6B7280' }}>{item.tax_rate || 0}%</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>
                        {formatCurrency(Number(item.line_total || 0), invoice.currency)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '30px', color: '#9CA3AF' }}>
                      No items
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Totals Section */}
          <div className="totals-section no-break">
            <div className="totals-container">
              <div className="total-row">
                <span className="total-label">Subtotal</span>
                <span className="total-value">{formatCurrency(Number(invoice.subtotal), invoice.currency)}</span>
              </div>
              {invoice.tax_total > 0 && (
                <div className="total-row">
                  <span className="total-label">Tax</span>
                  <span className="total-value">{formatCurrency(Number(invoice.tax_total), invoice.currency)}</span>
                </div>
              )}
              <div className="total-row grand-total">
                <span className="total-label">Total Due</span>
                <span className="total-value">{formatCurrency(Number(invoice.total), invoice.currency)}</span>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          {(invoice.notes || branding?.bank_name || branding?.bank_iban) && (
            <div className="footer-section no-break">
              <div className="footer-grid">
                {invoice.notes && (
                  <div className="footer-block">
                    <div className="footer-title">Payment Terms</div>
                    <div className="footer-content">{invoice.notes}</div>
                  </div>
                )}
                {(branding?.bank_name || branding?.bank_account_number || branding?.bank_iban) && (
                  <div className="footer-block">
                    <div className="footer-title">Banking Information</div>
                    <div className="footer-content">
                      {branding.bank_name && <div><strong>Bank:</strong> {branding.bank_name}</div>}
                      {branding.bank_account_number && (
                        <div><strong>Account:</strong> {branding.bank_account_number}</div>
                      )}
                      {branding.bank_sort_code && (
                        <div><strong>Sort Code:</strong> {branding.bank_sort_code}</div>
                      )}
                      {branding.bank_iban && <div><strong>IBAN:</strong> {branding.bank_iban}</div>}
                      {branding.bank_bic && <div><strong>BIC/SWIFT:</strong> {branding.bank_bic}</div>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
