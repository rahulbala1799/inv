import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { sampleInvoiceData } from '@/lib/invoice-data';

const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontFamily: 'Helvetica',
    fontSize: 10,
    backgroundColor: '#ffffff',
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 180,
    backgroundColor: '#059669',
    padding: 30,
  },
  sidebarContent: {
    marginTop: 60,
  },
  companyName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    lineHeight: 1.2,
  },
  sidebarText: {
    fontSize: 9,
    color: '#D1FAE5',
    lineHeight: 1.6,
    marginBottom: 3,
  },
  sidebarSection: {
    marginTop: 30,
  },
  sidebarTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 1,
  },
  contentArea: {
    marginLeft: 180,
    padding: 40,
  },
  invoiceTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 10,
  },
  invoiceSubtitle: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 30,
  },
  invoiceDetails: {
    flexDirection: 'row',
    marginBottom: 30,
    backgroundColor: '#ECFDF5',
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
  },
  detailColumn: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 8,
    color: '#6B7280',
    textTransform: 'uppercase',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 11,
    color: '#111827',
    fontWeight: 'bold',
  },
  clientSection: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  clientLabel: {
    fontSize: 9,
    color: '#059669',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 1,
  },
  clientName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 5,
  },
  clientDetails: {
    fontSize: 9,
    color: '#6B7280',
    lineHeight: 1.5,
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#059669',
    padding: 12,
    color: '#ffffff',
  },
  tableHeaderText: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tableRowHighlight: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#F0FDF4',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  col1: { flex: 3, fontSize: 9, color: '#111827' },
  col2: { flex: 1, textAlign: 'center', fontSize: 9, color: '#6B7280' },
  col3: { flex: 1, textAlign: 'right', fontSize: 9, color: '#6B7280' },
  col4: { flex: 1, textAlign: 'right', fontSize: 10, color: '#059669', fontWeight: 'bold' },
  totalsSection: {
    marginTop: 30,
    alignItems: 'flex-end',
  },
  totalsBox: {
    width: '45%',
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    fontSize: 9,
  },
  totalsLabel: {
    color: '#6B7280',
  },
  totalsValue: {
    color: '#111827',
    fontWeight: 'bold',
  },
  totalFinal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 2,
    borderTopColor: '#059669',
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#059669',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
  },
  notesSection: {
    marginTop: 40,
    padding: 20,
    backgroundColor: '#ECFDF5',
    borderLeftWidth: 3,
    borderLeftColor: '#10B981',
  },
  notesTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  notesText: {
    fontSize: 8,
    color: '#374151',
    lineHeight: 1.6,
  },
});

const CreativeInvoice = () => {
  const data = sampleInvoiceData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <View style={styles.sidebarContent}>
            <Text style={styles.companyName}>{data.company.name}</Text>
            <Text style={styles.sidebarText}>{data.company.address}</Text>
            <Text style={styles.sidebarText}>{data.company.city}</Text>
            
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Contact</Text>
              <Text style={styles.sidebarText}>{data.company.phone}</Text>
              <Text style={styles.sidebarText}>{data.company.email}</Text>
              <Text style={styles.sidebarText}>{data.company.website}</Text>
            </View>

            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Tax ID</Text>
              <Text style={styles.sidebarText}>{data.company.vat}</Text>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.contentArea}>
          <Text style={styles.invoiceTitle}>INVOICE</Text>
          <Text style={styles.invoiceSubtitle}>Professional Services Rendered</Text>

          {/* Invoice Details */}
          <View style={styles.invoiceDetails}>
            <View style={styles.detailColumn}>
              <Text style={styles.detailLabel}>Invoice Number</Text>
              <Text style={styles.detailValue}>{data.invoice.number}</Text>
            </View>
            <View style={styles.detailColumn}>
              <Text style={styles.detailLabel}>Date Issued</Text>
              <Text style={styles.detailValue}>{data.invoice.date}</Text>
            </View>
            <View style={styles.detailColumn}>
              <Text style={styles.detailLabel}>Payment Due</Text>
              <Text style={styles.detailValue}>{data.invoice.dueDate}</Text>
            </View>
          </View>

          {/* Client Info */}
          <View style={styles.clientSection}>
            <Text style={styles.clientLabel}>Bill To</Text>
            <Text style={styles.clientName}>{data.client.name}</Text>
            <Text style={styles.clientDetails}>{data.client.contact}</Text>
            <Text style={styles.clientDetails}>{data.client.address}</Text>
            <Text style={styles.clientDetails}>{data.client.city}</Text>
            <Text style={styles.clientDetails}>{data.client.email}</Text>
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
              <View key={index} style={index % 2 === 0 ? styles.tableRow : styles.tableRowHighlight}>
                <Text style={styles.col1}>{item.description}</Text>
                <Text style={styles.col2}>{item.quantity}</Text>
                <Text style={styles.col3}>${item.rate.toFixed(2)}</Text>
                <Text style={styles.col4}>${item.amount.toFixed(2)}</Text>
              </View>
            ))}
          </View>

          {/* Totals */}
          <View style={styles.totalsSection}>
            <View style={styles.totalsBox}>
              <View style={styles.totalsRow}>
                <Text style={styles.totalsLabel}>Subtotal</Text>
                <Text style={styles.totalsValue}>${data.subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.totalsRow}>
                <Text style={styles.totalsLabel}>Tax (10%)</Text>
                <Text style={styles.totalsValue}>${data.tax.toFixed(2)}</Text>
              </View>
              <View style={styles.totalFinal}>
                <Text style={styles.totalLabel}>TOTAL DUE</Text>
                <Text style={styles.totalValue}>${data.total.toFixed(2)}</Text>
              </View>
            </View>
          </View>

          {/* Notes */}
          <View style={styles.notesSection}>
            <Text style={styles.notesTitle}>Payment Instructions</Text>
            <Text style={styles.notesText}>{data.notes}</Text>
            <Text style={[styles.notesText, { marginTop: 6 }]}>
              Bank: {data.paymentMethods.bank} | PayPal: {data.paymentMethods.paypal}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CreativeInvoice;
