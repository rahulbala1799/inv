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
  headerBand: {
    backgroundColor: '#0F172A',
    padding: 40,
    paddingBottom: 60,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  companyName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#06B6D4',
    marginBottom: 10,
  },
  companyDetails: {
    fontSize: 9,
    color: '#94A3B8',
    lineHeight: 1.5,
  },
  invoiceTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'right',
  },
  contentArea: {
    padding: 40,
    paddingTop: 0,
  },
  invoiceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -40,
    marginBottom: 40,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    flex: 1,
    margin: 5,
  },
  cardTitle: {
    fontSize: 8,
    textTransform: 'uppercase',
    color: '#64748B',
    marginBottom: 8,
    letterSpacing: 1,
  },
  cardText: {
    fontSize: 9,
    color: '#1E293B',
    lineHeight: 1.5,
  },
  cardTextBold: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
  },
  invoiceDate: {
    fontSize: 11,
    color: '#06B6D4',
    fontWeight: 'bold',
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    padding: 12,
    fontSize: 8,
    fontWeight: 'bold',
    color: '#0F172A',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 12,
    fontSize: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  col1: { flex: 3, color: '#334155' },
  col2: { flex: 1, textAlign: 'center', color: '#64748B' },
  col3: { flex: 1, textAlign: 'right', color: '#64748B' },
  col4: { flex: 1, textAlign: 'right', color: '#0F172A', fontWeight: 'bold' },
  summarySection: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notesBox: {
    flex: 1,
    marginRight: 20,
  },
  notesTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 8,
  },
  notesText: {
    fontSize: 8,
    color: '#64748B',
    lineHeight: 1.6,
  },
  totalsBox: {
    width: '35%',
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    fontSize: 9,
    color: '#64748B',
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    fontSize: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#0F172A',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  amountDue: {
    fontSize: 18,
    color: '#06B6D4',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0F172A',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 8,
    color: '#94A3B8',
  },
  footerAccent: {
    fontSize: 8,
    color: '#06B6D4',
  },
});

const ModernInvoice = () => {
  const data = sampleInvoiceData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Band */}
        <View style={styles.headerBand}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.companyName}>{data.company.name}</Text>
              <Text style={styles.companyDetails}>{data.company.address}</Text>
              <Text style={styles.companyDetails}>{data.company.city}</Text>
              <Text style={styles.companyDetails}>{data.company.email}</Text>
            </View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
          </View>
        </View>

        {/* Content Area */}
        <View style={styles.contentArea}>
          {/* Info Cards */}
          <View style={styles.invoiceInfo}>
            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>Billed To</Text>
              <Text style={styles.cardTextBold}>{data.client.name}</Text>
              <Text style={styles.cardText}>{data.client.contact}</Text>
              <Text style={styles.cardText}>{data.client.address}</Text>
              <Text style={styles.cardText}>{data.client.city}</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>Invoice Number</Text>
              <Text style={styles.invoiceDate}>{data.invoice.number}</Text>
              <Text style={styles.cardTitle} style={{ marginTop: 10 }}>Date Issued</Text>
              <Text style={styles.cardText}>{data.invoice.date}</Text>
              <Text style={styles.cardTitle} style={{ marginTop: 10 }}>Due Date</Text>
              <Text style={styles.cardText}>{data.invoice.dueDate}</Text>
            </View>
          </View>

          {/* Items Table */}
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.col1}>Description</Text>
              <Text style={styles.col2}>Qty</Text>
              <Text style={styles.col3}>Rate</Text>
              <Text style={styles.col4}>Amount</Text>
            </View>
            {data.items.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.col1}>{item.description}</Text>
                <Text style={styles.col2}>{item.quantity}</Text>
                <Text style={styles.col3}>${item.rate.toFixed(2)}</Text>
                <Text style={styles.col4}>${item.amount.toFixed(2)}</Text>
              </View>
            ))}
          </View>

          {/* Summary Section */}
          <View style={styles.summarySection}>
            <View style={styles.notesBox}>
              <Text style={styles.notesTitle}>Payment Information</Text>
              <Text style={styles.notesText}>{data.notes}</Text>
              <Text style={styles.notesText} style={{ marginTop: 8 }}>
                Bank Transfer: {data.paymentMethods.bank}
              </Text>
              <Text style={styles.notesText}>
                Account: {data.paymentMethods.account}
              </Text>
              <Text style={styles.notesText}>
                PayPal: {data.paymentMethods.paypal}
              </Text>
            </View>
            <View style={styles.totalsBox}>
              <View style={styles.subtotalRow}>
                <Text>Subtotal</Text>
                <Text>${data.subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.totalsRow}>
                <Text>Tax (10%)</Text>
                <Text>${data.tax.toFixed(2)}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text>TOTAL</Text>
                <Text style={styles.amountDue}>${data.total.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Thank you for your business</Text>
          <Text style={styles.footerAccent}>{data.company.website}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ModernInvoice;
