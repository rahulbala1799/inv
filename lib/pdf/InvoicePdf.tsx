import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: 100,
    fontWeight: 'bold',
  },
  table: {
    marginTop: 20,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1pt solid #e5e7eb',
    paddingVertical: 8,
  },
  tableHeader: {
    backgroundColor: '#f3f4f6',
    fontWeight: 'bold',
  },
  tableCol1: { width: '40%' },
  tableCol2: { width: '15%', textAlign: 'right' },
  tableCol3: { width: '15%', textAlign: 'right' },
  tableCol4: { width: '15%', textAlign: 'right' },
  tableCol5: { width: '15%', textAlign: 'right' },
  totals: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  totalRow: {
    flexDirection: 'row',
    width: 200,
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTop: '1pt solid #e5e7eb',
    fontSize: 10,
    color: '#6b7280',
  },
})

interface InvoicePDFProps {
  invoice: any
  items: any[]
  branding: any
  template: any
}

export default function InvoicePDF({ invoice, items, branding, template }: InvoicePDFProps) {
  const formatCurrency = (amount: number, currency: string = 'EUR') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>INVOICE</Text>
          <Text>Invoice #{invoice.invoice_number}</Text>
        </View>

        <View style={styles.section}>
          {branding && (
            <View>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
                {branding.business_name || 'Your Business'}
              </Text>
              {branding.address_line1 && <Text>{branding.address_line1}</Text>}
              {branding.address_line2 && <Text>{branding.address_line2}</Text>}
              {(branding.city || branding.postcode) && (
                <Text>
                  {branding.city} {branding.postcode}
                </Text>
              )}
              {branding.country && <Text>{branding.country}</Text>}
              {branding.vat_number && <Text style={{ marginTop: 5 }}>VAT: {branding.vat_number}</Text>}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Bill To:</Text>
          {invoice.customers && (
            <View>
              <Text>{invoice.customers.name}</Text>
              {invoice.customers.email && <Text>{invoice.customers.email}</Text>}
              {invoice.customers.address_line1 && <Text>{invoice.customers.address_line1}</Text>}
              {invoice.customers.city && (
                <Text>
                  {invoice.customers.city} {invoice.customers.postcode}
                </Text>
              )}
            </View>
          )}
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Issue Date:</Text>
          <Text>{formatDate(invoice.issue_date)}</Text>
        </View>
        {invoice.due_date && (
          <View style={styles.row}>
            <Text style={styles.label}>Due Date:</Text>
            <Text>{formatDate(invoice.due_date)}</Text>
          </View>
        )}

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCol1}>Description</Text>
            <Text style={styles.tableCol2}>Qty</Text>
            <Text style={styles.tableCol3}>Unit Price</Text>
            <Text style={styles.tableCol4}>Tax %</Text>
            <Text style={styles.tableCol5}>Total</Text>
          </View>
          {items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCol1}>{item.description}</Text>
              <Text style={styles.tableCol2}>{item.quantity}</Text>
              <Text style={styles.tableCol3}>{formatCurrency(Number(item.unit_price), invoice.currency)}</Text>
              <Text style={styles.tableCol4}>{item.tax_rate}%</Text>
              <Text style={styles.tableCol5}>{formatCurrency(Number(item.line_total), invoice.currency)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text>{formatCurrency(Number(invoice.subtotal), invoice.currency)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax:</Text>
            <Text>{formatCurrency(Number(invoice.tax_total), invoice.currency)}</Text>
          </View>
          <View style={[styles.totalRow, { borderTop: '1pt solid #000', paddingTop: 5, marginTop: 5 }]}>
            <Text style={[styles.totalLabel, { fontSize: 14 }]}>Total:</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
              {formatCurrency(Number(invoice.total), invoice.currency)}
            </Text>
          </View>
        </View>

        {invoice.notes && (
          <View style={styles.footer}>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Notes:</Text>
            <Text>{invoice.notes}</Text>
          </View>
        )}
      </Page>
    </Document>
  )
}
