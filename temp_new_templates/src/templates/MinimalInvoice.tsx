import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { sampleInvoiceData } from '@/lib/invoice-data';

const styles = StyleSheet.create({
  page: {
    padding: 60,
    fontFamily: 'Helvetica',
    fontSize: 10,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 50,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15,
    letterSpacing: 2,
  },
  companyDetails: {
    fontSize: 9,
    color: '#6B7280',
    lineHeight: 1.6,
  },
  invoiceInfo: {
    textAlign: 'right',
  },
  invoiceNumber: {
    fontSize: 11,
    color: '#000000',
    marginBottom: 5,
  },
  invoiceDate: {
    fontSize: 9,
    color: '#6B7280',
    marginBottom: 3,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    marginVertical: 30,
  },
  clientSection: {
    marginBottom: 40,
  },
  sectionLabel: {
    fontSize: 8,
    textTransform: 'uppercase',
    color: '#9CA3AF',
    marginBottom: 8,
    letterSpacing: 1.5,
  },
  clientName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  clientDetails: {
    fontSize: 9,
    color: '#6B7280',
    lineHeight: 1.5,
  },
  table: {
    marginTop: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
    paddingBottom: 10,
    marginBottom: 15,
  },
  tableHeaderText: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#000000',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  col1: { flex: 4 },
  col2: { flex: 1, textAlign: 'center' },
  col3: { flex: 1, textAlign: 'right' },
  col4: { flex: 1, textAlign: 'right' },
  itemDescription: {
    fontSize: 10,
    color: '#111827',
    marginBottom: 2,
  },
  itemValue: {
    fontSize: 9,
    color: '#6B7280',
  },
  totalsSection: {
    marginTop: 40,
    alignItems: 'flex-end',
  },
  totalsContainer: {
    width: '40%',
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  totalsLabel: {
    fontSize: 9,
    color: '#6B7280',
  },
  totalsValue: {
    fontSize: 9,
    color: '#111827',
  },
  totalDivider: {
    borderTopWidth: 2,
    borderTopColor: '#000000',
    marginTop: 10,
    paddingTop: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  notesSection: {
    marginTop: 50,
  },
  notesTitle: {
    fontSize: 8,
    textTransform: 'uppercase',
    color: '#9CA3AF',
    marginBottom: 10,
    letterSpacing: 1.5,
  },
  notesText: {
    fontSize: 9,
    color: '#6B7280',
    lineHeight: 1.6,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 60,
    right: 60,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  footerText: {
    fontSize: 8,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

const MinimalInvoice = () => {
  const data = sampleInvoiceData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{data.company.name}</Text>
            <Text style={styles.companyDetails}>{data.company.address}</Text>
            <Text style={styles.companyDetails}>{data.company.city}</Text>
            <Text style={styles.companyDetails}>{data.company.phone}</Text>
          </View>
          <View style={styles.invoiceInfo}>
            <Text style={styles.invoiceNumber}>Invoice {data.invoice.number}</Text>
            <Text style={styles.invoiceDate}>Issued {data.invoice.date}</Text>
            <Text style={styles.invoiceDate}>Due {data.invoice.dueDate}</Text>
          </View>
        </View>

        {/* Client Section */}
        <View style={styles.clientSection}>
          <Text style={styles.sectionLabel}>Billed To</Text>
          <Text style={styles.clientName}>{data.client.name}</Text>
          <Text style={styles.clientDetails}>{data.client.contact}</Text>
          <Text style={styles.clientDetails}>{data.client.address}</Text>
          <Text style={styles.clientDetails}>{data.client.city}</Text>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.col1]}>Description</Text>
            <Text style={[styles.tableHeaderText, styles.col2]}>Qty</Text>
            <Text style={[styles.tableHeaderText, styles.col3]}>Rate</Text>
            <Text style={[styles.tableHeaderText, styles.col4]}>Amount</Text>
          </View>
          {data.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.col1}>
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
              <Text style={[styles.itemValue, styles.col2]}>{item.quantity}</Text>
              <Text style={[styles.itemValue, styles.col3]}>${item.rate.toFixed(2)}</Text>
              <Text style={[styles.itemDescription, styles.col4]}>${item.amount.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.totalsContainer}>
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>Subtotal</Text>
              <Text style={styles.totalsValue}>${data.subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>Tax (10%)</Text>
              <Text style={styles.totalsValue}>${data.tax.toFixed(2)}</Text>
            </View>
            <View style={styles.totalDivider}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${data.total.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Notes */}
        <View style={styles.notesSection}>
          <Text style={styles.notesTitle}>Payment Details</Text>
          <Text style={styles.notesText}>{data.notes}</Text>
          <Text style={[styles.notesText, { marginTop: 8 }]}>
            Bank: {data.paymentMethods.bank} • Account: {data.paymentMethods.account}
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>{data.company.website}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default MinimalInvoice;
