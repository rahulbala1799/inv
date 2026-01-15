# Invoice Templates - Complete Code

This document contains the complete code for all 3 A4 print-ready invoice templates.

---

## Template 1: Modern Minimal

```tsx
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
```

---

## Template 2: Professional Classic

```tsx
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
        .invoice-title-top {
          font-size: 28pt;
          font-weight: 700;
          color: #2c2c2c;
          text-align: right;
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
          margin-top: 10px;
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
```

---

## Template 3: Bold Contemporary

```tsx
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
        .invoice-title-top {
          font-size: 36pt;
          font-weight: 900;
          letter-spacing: 3px;
          color: #fff;
          text-align: right;
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
        .bill-from-to-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-bottom: 25px;
          padding: 15px 20px;
          background-color: #fff;
          border-left: 5px solid #667eea;
          border-radius: 4px;
        }
        .bill-from-section {
          display: flex;
          flex-direction: column;
        }
        .bill-from-title {
          font-size: 9pt;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #667eea;
          margin-bottom: 10px;
        }
        .bill-from-content {
          font-size: 10pt;
          line-height: 1.6;
        }
        .bill-from-content .company-name {
          font-size: 16pt;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 4px;
        }
        .bill-from-content .company-details {
          font-size: 9pt;
          color: #666;
          line-height: 1.4;
        }
        .bill-to-compact {
          display: flex;
          flex-direction: column;
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
        .invoice-number-header {
          font-size: 14pt;
          font-weight: 600;
          opacity: 0.95;
        }
      `}</style>

      <div className="invoice-container">
        {/* Header Banner */}
        <div className="header-banner no-break">
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
          <div style={{ textAlign: 'right' }}>
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

        {/* Bill From and Bill To Section */}
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
                {branding?.vat_number && <div>VAT: {branding.vat_number}</div>}
              </div>
            </div>
          </div>
          <div className="bill-to-compact">
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
```

---

## Notes

- All templates are A4 print-ready with 10mm margins
- Table headers repeat on every page for multi-page invoices
- Page numbers are automatically added at the bottom
- All templates support 10+ line items per page
- Logo error handling included in all templates
- Long descriptions are word-wrapped properly
