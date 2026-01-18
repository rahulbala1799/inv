import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const EditorialMagazine = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
  return (
    <>
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 6mm 8mm 20mm 8mm;
            @bottom-right {
              content: "Page " counter(page) " of " counter(pages);
              font-size: 8pt;
              color: #94A3B8;
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
          font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
          font-size: 10pt;
          color: #0F172A;
          background-color: #FFFFFF;
          position: relative;
        }
        .vertical-accent {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 8px;
          background: linear-gradient(180deg, #F97316 0%, #FB923C 50%, #14B8A6 100%);
        }
        .header-section {
          padding: 25px 0 25px 30px;
          margin-left: 20px;
          border-bottom: 3px solid #F97316;
          margin-bottom: 30px;
        }
        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
        }
        .logo-section {
          flex: 0 0 auto;
        }
        .logo-container {
          display: inline-block;
        }
        .logo-container img {
          height: 65px;
          max-width: 200px;
          width: auto;
          object-fit: contain;
          display: block;
        }
        .logo-container img[src=""],
        .logo-container img:not([src]) {
          display: none;
        }
        .company-name-large {
          font-size: 32pt;
          font-weight: 700;
          color: #0F172A;
          letter-spacing: -1px;
          line-height: 1.1;
          margin-bottom: 8px;
        }
        .invoice-number-section {
          text-align: right;
        }
        .invoice-label {
          font-size: 9pt;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #64748B;
          margin-bottom: 5px;
        }
        .invoice-number {
          font-size: 24pt;
          font-weight: 700;
          color: #F97316;
          letter-spacing: -0.5px;
        }
        .date-info {
          display: flex;
          gap: 25px;
          margin-top: 12px;
          font-size: 9pt;
          color: #475569;
        }
        .date-item {
          display: flex;
          flex-direction: column;
        }
        .date-label {
          font-size: 7pt;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #94A3B8;
          margin-bottom: 3px;
        }
        .date-value {
          font-weight: 600;
          color: #0F172A;
        }
        .content-wrapper {
          padding: 0 30px 0 50px;
        }
        .parties-section {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 50px;
          margin-bottom: 40px;
          padding: 25px 0;
        }
        .party-block {
          position: relative;
        }
        .party-label {
          font-size: 7pt;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #14B8A6;
          margin-bottom: 15px;
          position: relative;
          padding-left: 15px;
        }
        .party-label::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 20px;
          background: linear-gradient(180deg, #F97316, #14B8A6);
        }
        .party-content {
          font-size: 10pt;
          line-height: 1.8;
          color: #0F172A;
        }
        .company-name {
          font-size: 20pt;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 12px;
          letter-spacing: -0.3px;
          line-height: 1.2;
        }
        .company-details {
          font-size: 9.5pt;
          color: #475569;
          line-height: 1.7;
        }
        .party-content strong {
          font-size: 14pt;
          font-weight: 700;
          color: #0F172A;
          display: block;
          margin-bottom: 6px;
          letter-spacing: -0.2px;
        }
        .items-section {
          margin-bottom: 30px;
        }
        .section-title {
          font-size: 11pt;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #F97316;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #FED7AA;
        }
        .items-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          margin-bottom: 0;
        }
        .items-table thead {
          background-color: transparent;
        }
        .items-table th {
          text-align: left;
          padding: 12px 0;
          font-size: 8pt;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #64748B;
          border-bottom: 2px solid #E2E8F0;
          font-family: 'Helvetica Neue', Arial, sans-serif;
        }
        .items-table th:last-child,
        .items-table td:last-child {
          text-align: right;
        }
        .items-table td {
          padding: 18px 0;
          font-size: 10pt;
          border-bottom: 1px solid #F1F5F9;
          color: #0F172A;
          background-color: #FFFFFF;
          font-family: 'Helvetica Neue', Arial, sans-serif;
        }
        .items-table td:first-child {
          word-wrap: break-word;
          word-break: break-word;
          max-width: 400px;
          overflow-wrap: break-word;
          font-weight: 500;
          font-size: 11pt;
        }
        .items-table tbody tr:last-child td {
          border-bottom: none;
        }
        .items-table tbody tr:hover {
          background-color: #F8FAFC;
        }
        .quantity-cell, .price-cell, .tax-cell {
          color: #64748B;
          font-size: 9.5pt;
        }
        .total-cell {
          font-weight: 700;
          color: #0F172A;
          font-size: 11pt;
        }
        .totals-section {
          margin-top: 35px;
          margin-bottom: 35px;
        }
        .totals-container {
          width: 380px;
          margin-left: auto;
          background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
          border-left: 6px solid #F97316;
          padding: 25px 30px;
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.1);
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          font-size: 10pt;
          color: #0F172A;
        }
        .total-row.grand-total {
          margin-top: 15px;
          padding-top: 20px;
          border-top: 3px solid #F97316;
          font-size: 20pt;
          font-weight: 700;
        }
        .total-label {
          font-weight: 600;
          color: #475569;
        }
        .total-value {
          font-weight: 700;
          color: #0F172A;
        }
        .grand-total .total-label {
          font-size: 16pt;
          color: #0F172A;
        }
        .grand-total .total-value {
          font-size: 20pt;
          color: #F97316;
        }
        .footer-section {
          margin-top: 45px;
          padding: 30px 0;
          border-top: 2px solid #E2E8F0;
          font-size: 9pt;
          line-height: 1.8;
          color: #475569;
        }
        .footer-section strong {
          color: #0F172A;
          font-weight: 700;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 40px;
        }
        .footer-block {
          display: flex;
          flex-direction: column;
        }
        .footer-title {
          font-size: 7pt;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #14B8A6;
          margin-bottom: 12px;
          position: relative;
          padding-left: 12px;
        }
        .footer-title::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 15px;
          background: #14B8A6;
        }
        .footer-content {
          color: #475569;
          line-height: 1.7;
        }
        .accent-line {
          height: 2px;
          background: linear-gradient(90deg, #F97316, #14B8A6);
          margin: 20px 0;
        }
      `}</style>

      <div className="invoice-container">
        <div className="vertical-accent"></div>
        
        {/* Header Section */}
        <div className="header-section no-break">
          <div className="header-top">
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
                <div className="company-name-large">
                  {branding?.business_name || 'COMPANY NAME'}
                </div>
              )}
            </div>
            <div className="invoice-number-section">
              <div className="invoice-label">Invoice</div>
              <div className="invoice-number">#{invoice.invoice_number}</div>
              <div className="date-info">
                <div className="date-item">
                  <div className="date-label">Issued</div>
                  <div className="date-value">{formatDate(invoice.issue_date)}</div>
                </div>
                {invoice.due_date && (
                  <div className="date-item">
                    <div className="date-label">Due</div>
                    <div className="date-value">{formatDate(invoice.due_date)}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="content-wrapper">
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
                    <div style={{ marginTop: '10px', color: '#14B8A6', fontWeight: 500 }}>
                      {branding.email}
                    </div>
                  )}
                  {branding?.vat_number && (
                    <div style={{ marginTop: '10px', fontWeight: 600 }}>
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
                      <div style={{ marginTop: '10px' }}>
                        VAT: {invoice.customers.vat_number}
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ color: '#94A3B8', fontStyle: 'italic' }}>
                    {invoice.customers ? 'Customer information incomplete' : 'No customer selected'}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="accent-line"></div>

          {/* Line Items Table */}
          <div className="items-section">
            <div className="section-title">Line Items</div>
            <table className="items-table">
              <thead className="table-header">
                <tr>
                  <th>Description</th>
                  <th style={{ textAlign: 'right', width: '70px' }}>Qty</th>
                  <th style={{ textAlign: 'right', width: '110px' }}>Unit Price</th>
                  <th style={{ textAlign: 'right', width: '80px' }}>Tax %</th>
                  <th style={{ textAlign: 'right', width: '120px' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {items && items.length > 0 ? (
                  items.map((item, index) => (
                    <tr key={item.id || index} className="table-row">
                      <td>{item.description || ''}</td>
                      <td style={{ textAlign: 'right' }} className="quantity-cell">{item.quantity || 0}</td>
                      <td style={{ textAlign: 'right' }} className="price-cell">
                        {formatCurrency(Number(item.unit_price || 0), invoice.currency)}
                      </td>
                      <td style={{ textAlign: 'right' }} className="tax-cell">{item.tax_rate || 0}%</td>
                      <td style={{ textAlign: 'right' }} className="total-cell">
                        {formatCurrency(Number(item.line_total || 0), invoice.currency)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: '#94A3B8', fontStyle: 'italic' }}>
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
