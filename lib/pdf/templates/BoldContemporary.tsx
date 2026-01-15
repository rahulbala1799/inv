import React from 'react'
import { InvoiceTemplateProps, formatCurrency, formatDate } from './types'

export const BoldContemporary = ({ invoice, items, branding, template }: InvoiceTemplateProps) => {
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
          .header-banner {
            background: #667eea !important;
            print-color-adjust: economy;
            -webkit-print-color-adjust: economy;
          }
        }
        .invoice-container {
          width: 100%;
          max-width: 210mm;
          margin: 0 auto;
          padding: 10mm;
          font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
          font-size: 10pt;
          color: #1a1a1a;
        }
        .header-banner {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          padding: 20px 25px;
          margin: -10mm -10mm 25px -10mm;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .logo-container img {
          height: 70px;
          max-width: 180px;
          width: auto;
          object-fit: contain;
          background: #fff;
          padding: 8px;
          border-radius: 4px;
          display: block;
        }
        .logo-container img[src=""],
        .logo-container img:not([src]) {
          display: none;
        }
        .company-info-header {
          color: #fff;
        }
        .company-name-header {
          font-size: 22pt;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .company-details-header {
          font-size: 9pt;
          opacity: 0.95;
          line-height: 1.4;
        }
        .invoice-title-header {
          text-align: right;
        }
        .invoice-title-text {
          font-size: 36pt;
          font-weight: 900;
          letter-spacing: 3px;
          margin-bottom: 8px;
        }
        .invoice-number-header {
          font-size: 14pt;
          font-weight: 600;
          opacity: 0.95;
        }
        .header-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-bottom: 25px;
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 8px;
        }
        .detail-group {
          font-size: 10pt;
        }
        .detail-label {
          font-size: 8pt;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #666;
          margin-bottom: 4px;
          font-weight: 600;
        }
        .detail-value {
          font-size: 11pt;
          font-weight: 600;
          color: #1a1a1a;
        }
        .bill-to-compact {
          margin-bottom: 25px;
          padding: 15px 20px;
          background-color: #fff;
          border-left: 5px solid #667eea;
          border-radius: 4px;
        }
        .bill-to-title {
          font-size: 9pt;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #667eea;
          margin-bottom: 10px;
        }
        .bill-to-content {
          font-size: 10pt;
          line-height: 1.6;
        }
        .bill-to-content strong {
          font-size: 12pt;
          font-weight: 700;
          color: #1a1a1a;
        }
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 25px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .items-table thead {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
        }
        .items-table th {
          text-align: left;
          padding: 14px 12px;
          font-size: 9.5pt;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .items-table th:last-child,
        .items-table td:last-child {
          text-align: right;
        }
        .items-table td {
          padding: 12px;
          font-size: 10pt;
          border-bottom: 1px solid #e9ecef;
        }
        .items-table td:first-child {
          word-wrap: break-word;
          word-break: break-word;
          max-width: 320px;
          overflow-wrap: break-word;
        }
        .items-table tbody tr {
          transition: background-color 0.2s;
        }
        .items-table tbody tr:hover {
          background-color: #f8f9fa;
        }
        .items-table tbody tr:nth-child(even) {
          background-color: #fafbfc;
        }
        .totals-section {
          margin-top: 25px;
          margin-bottom: 30px;
        }
        .totals-container {
          width: 320px;
          margin-left: auto;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 8px;
          padding: 20px;
          color: #fff;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 10.5pt;
          border-bottom: 1px solid rgba(255,255,255,0.2);
        }
        .total-row:last-child {
          border-bottom: none;
        }
        .total-row.grand-total {
          margin-top: 10px;
          padding-top: 15px;
          border-top: 2px solid rgba(255,255,255,0.3);
          font-size: 18pt;
          font-weight: 700;
        }
        .footer-section {
          margin-top: 30px;
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 8px;
          font-size: 9.5pt;
          line-height: 1.7;
          color: #555;
        }
        .footer-section strong {
          color: #667eea;
          font-weight: 700;
        }
      `}</style>

      <div className="invoice-container">
        {/* Header Banner */}
        <div className="header-banner no-break">
          <div className="header-left">
            {branding?.logoUrl && (
              <div className="logo-container">
                <img src={branding.logoUrl} alt="Logo" />
              </div>
            )}
            <div className="company-info-header">
              <div className="company-name-header">
                {branding?.business_name || 'Company Name'}
              </div>
              <div className="company-details-header">
                {branding?.address_line1 && <div>{branding.address_line1}</div>}
                {(branding?.city || branding?.postcode) && (
                  <div>
                    {[branding.city, branding.postcode].filter(Boolean).join(', ')}
                    {branding?.country && `, ${branding.country}`}
                  </div>
                )}
                {branding?.vat_number && <div>VAT: {branding.vat_number}</div>}
              </div>
            </div>
          </div>
          <div className="invoice-title-header">
            <div className="invoice-title-text">INVOICE</div>
            <div className="invoice-number-header">#{invoice.invoice_number}</div>
          </div>
        </div>

        {/* Invoice Details Grid */}
        <div className="header-details no-break">
          <div className="detail-group">
            <div className="detail-label">Issue Date</div>
            <div className="detail-value">{formatDate(invoice.issue_date)}</div>
          </div>
          {invoice.due_date && (
            <div className="detail-group">
              <div className="detail-label">Due Date</div>
              <div className="detail-value">{formatDate(invoice.due_date)}</div>
            </div>
          )}
        </div>

        {/* Bill To Section - Compact */}
        <div className="bill-to-compact no-break">
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
                  <div style={{ marginTop: '6px' }}>VAT: {invoice.customers.vat_number}</div>
                )}
              </>
            ) : (
              <div style={{ color: '#999', fontStyle: 'italic' }}>
                {invoice.customers ? 'Customer information incomplete' : 'No customer selected'}
              </div>
            )}
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
