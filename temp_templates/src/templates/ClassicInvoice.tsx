import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { sampleInvoiceData } from '@/lib/invoice-data';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    paddingBottom: 20,
    borderBottomWidth: 3,
    borderBottomColor: '#2563EB',
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 8,
  },
  companyDetails: {
    fontSize: 9,
    color: '#64748B',
    lineHeight: 1.4,
  },
  invoiceTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'right',
    marginBottom: 10,
  },
  invoiceDetails: {
    textAlign: 'right',
    fontSize: 9,
    color: '#64748B',
    lineHeight: 1.6,
  },
  section: {
    marginBottom: 25,
  },
  billToSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  billToBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 15,
    borderRadius: 4,
    marginRight: 10,
  },
  invoiceInfoBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 15,
    borderRadius: 4,
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  text: {
    fontSize: 9,
    color: '#334155',
    lineHeight: 1.5,
  },
  textBold: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2563EB',
    padding: 10,
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 9,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    padding: 10,
    fontSize: 9,
  },
  tableRowAlt: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    padding: 10,
    fontSize: 9,
  },
  col1: { flex: 3 },
  col2: { flex: 1, textAlign: 'right' },
  col3: { flex: 1, textAlign: 'right' },
  col4: { flex: 1, textAlign: 'right' },
  totalsSection: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  totalsBox: {
    width: '45%',
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    fontSize: 9,
  },
  totalsFinal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#2563EB',
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
  notesSection: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#F8FAFC',
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  notesTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 6,
  },
  notesText: {
    fontSize: 9,
    color: '#64748B',
    lineHeight: 1.5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 8,
    color: '#94A3B8',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
});

const ClassicInvoice = () => {
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
            <Text style={styles.companyDetails}>{data.company.email}</Text>
          </View>
          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceDetails}>Invoice #: {data.invoice.number}</Text>
            <Text style={styles.invoiceDetails}>Date: {data.invoice.date}</Text>
            <Text style={styles.invoiceDetails}>Due Date: {data.invoice.dueDate}</Text>
          </View>
        </View>

        {/* Bill To Section */}
        <View style={styles.billToSection}>
          <View style={styles.billToBox}>
            <Text style={styles.sectionTitle}>Bill To</Text>
            <Text style={styles.textBold}>{data.client.name}</Text>
            <Text style={styles.text}>{data.client.contact}</Text>
            <Text style={styles.text}>{data.client.address}</Text>
            <Text style={styles.text}>{data.client.city}</Text>
            <Text style={styles.text}>{data.client.email}</Text>
          </View>
          <View style={styles.invoiceInfoBox}>
            <Text style={styles.sectionTitle}>Invoice Details</Text>
            <Text style={styles.text}>PO Number: {data.invoice.poNumber}</Text>
            <Text style={styles.text}>Terms: Net 30</Text>
            <Text style={styles.text}>VAT ID: {data.company.vat}</Text>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.col1}>DESCRIPTION</Text>
            <Text style={styles.col2}>QTY</Text>
            <Text style={styles.col3}>RATE</Text>
            <Text style={styles.col4}>AMOUNT</Text>
          </View>
          {data.items.map((item, index) => (
            <View key={index} style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
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
              <Text>Subtotal</Text>
              <Text>${data.subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.totalsRow}>
              <Text>Tax (10%)</Text>
              <Text>${data.tax.toFixed(2)}</Text>
            </View>
            <View style={styles.totalsFinal}>
              <Text>TOTAL DUE</Text>
              <Text>${data.total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Notes */}
        <View style={styles.notesSection}>
          <Text style={styles.notesTitle}>Payment Instructions</Text>
          <Text style={styles.notesText}>{data.notes}</Text>
          <Text style={styles.notesText}>Bank: {data.paymentMethods.bank} | Account: {data.paymentMethods.account}</Text>
          <Text style={styles.notesText}>PayPal: {data.paymentMethods.paypal}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Thank you for your business!</Text>
          <Text>{data.company.website}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ClassicInvoice;
