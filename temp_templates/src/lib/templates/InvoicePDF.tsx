import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { TemplateConfig } from './templateConfigs';

// Invoice data types
export interface InvoiceData {
  invoiceNumber: string;
  issueDate: string;
  dueDate?: string;
  status: 'DRAFT' | 'SENT' | 'PAID' | 'VOID';
  currency: string;
  subtotal: number;
  taxTotal: number;
  total: number;
  notes?: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  lineTotal: number;
}

export interface Customer {
  name: string;
  email?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  postcode?: string;
  country?: string;
  vatNumber?: string;
}

export interface Organization {
  businessName?: string;
  vatNumber?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  county?: string;
  postcode?: string;
  country?: string;
  bankName?: string;
  bankAccountNumber?: string;
  bankSortCode?: string;
  bankIban?: string;
  bankBic?: string;
}

interface InvoicePDFProps {
  invoice: InvoiceData;
  items: InvoiceItem[];
  customer: Customer;
  organization: Organization;
  template: TemplateConfig;
}

// Create styles factory based on template
const createStyles = (template: TemplateConfig) =>
  StyleSheet.create({
    page: {
      fontFamily: template.typography.fontFamily,
      fontSize: template.typography.bodySize,
      paddingTop: template.spacing.margin,
      paddingBottom: template.spacing.margin,
      paddingHorizontal: template.spacing.margin,
      color: template.colors.text,
      backgroundColor: template.colors.background,
    },
    header: {
      flexDirection: 'row',
      marginBottom: 30,
      paddingBottom: 20,
      borderBottomWidth: 2,
      borderBottomColor: template.colors.primary,
      backgroundColor: template.styling.headerBackground,
      padding: template.styling.headerBackground ? template.spacing.padding : 0,
    },
    headerLeft: {
      flex: 1,
    },
    headerRight: {
      flex: 1,
      alignItems: 'flex-end',
    },
    headerCenter: {
      flex: 1,
      alignItems: 'center',
    },
    companyName: {
      fontSize: template.typography.headerSize,
      fontWeight: 'bold',
      color: template.colors.primary,
      marginBottom: 5,
    },
    invoiceTitle: {
      fontSize: template.typography.headerSize,
      fontWeight: 'bold',
      color: template.colors.primary,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: template.typography.bodySize + 1,
      color: template.colors.secondary,
      marginBottom: 3,
    },
    section: {
      margin: `${template.spacing.gap}px 0`,
    },
    sectionTitle: {
      fontSize: template.typography.bodySize + 2,
      fontWeight: 'bold',
      color: template.colors.primary,
      marginBottom: 8,
      textTransform: 'uppercase',
    },
    billTo: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    billToLeft: {
      flex: 1,
    },
    billToRight: {
      flex: 1,
    },
    addressBlock: {
      marginBottom: 10,
    },
    addressTitle: {
      fontSize: template.typography.bodySize + 1,
      fontWeight: 'bold',
      color: template.colors.primary,
      marginBottom: 5,
    },
    addressLine: {
      fontSize: template.typography.bodySize,
      color: template.colors.text,
      marginBottom: 2,
    },
    table: {
      marginTop: 20,
      marginBottom: 20,
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: template.styling.tableHeaderBackground || template.colors.primary,
      padding: template.spacing.padding / 2,
      fontWeight: 'bold',
      color: template.styling.tableHeaderBackground ? template.colors.text : '#FFFFFF',
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: template.styling.borderColor,
      padding: template.spacing.padding / 2,
    },
    tableRowAlt: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: template.styling.borderColor,
      backgroundColor: template.styling.rowAlternating ? '#F9FAFB' : 'transparent',
      padding: template.spacing.padding / 2,
    },
    colDesc: {
      flex: 3,
    },
    colQty: {
      flex: 1,
      textAlign: 'right',
    },
    colPrice: {
      flex: 1,
      textAlign: 'right',
    },
    colTax: {
      flex: 1,
      textAlign: 'right',
    },
    colTotal: {
      flex: 1,
      textAlign: 'right',
    },
    totalsSection: {
      marginTop: 20,
      alignItems: 'flex-end',
    },
    totalsBox: {
      width: '40%',
      backgroundColor: template.styling.totalsBackground,
      padding: template.spacing.padding,
      borderTopWidth: 2,
      borderTopColor: template.colors.primary,
    },
    totalsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    totalsLabel: {
      fontSize: template.typography.bodySize,
      color: template.colors.secondary,
    },
    totalsValue: {
      fontSize: template.typography.bodySize,
      fontWeight: 'bold',
      color: template.colors.text,
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: template.styling.borderColor,
    },
    totalLabel: {
      fontSize: template.typography.bodySize + 2,
      fontWeight: 'bold',
      color: template.colors.primary,
    },
    totalValue: {
      fontSize: template.typography.bodySize + 2,
      fontWeight: 'bold',
      color: template.colors.primary,
    },
    notesSection: {
      marginTop: 30,
      padding: template.spacing.padding,
      backgroundColor: '#F9FAFB',
      borderLeftWidth: 3,
      borderLeftColor: template.colors.accent,
    },
    notesTitle: {
      fontSize: template.typography.bodySize + 1,
      fontWeight: 'bold',
      marginBottom: 5,
      color: template.colors.primary,
    },
    notesText: {
      fontSize: template.typography.bodySize,
      color: template.colors.text,
      lineHeight: 1.5,
    },
    bankDetailsSection: {
      marginTop: 20,
      padding: template.spacing.padding,
      backgroundColor: '#F9FAFB',
    },
    bankDetailsTitle: {
      fontSize: template.typography.bodySize + 1,
      fontWeight: 'bold',
      marginBottom: 8,
      color: template.colors.primary,
    },
    bankDetailRow: {
      flexDirection: 'row',
      marginBottom: 4,
    },
    bankDetailLabel: {
      width: '30%',
      fontSize: template.typography.bodySize,
      color: template.colors.secondary,
    },
    bankDetailValue: {
      flex: 1,
      fontSize: template.typography.bodySize,
      color: template.colors.text,
    },
    footer: {
      position: 'absolute',
      bottom: template.spacing.margin,
      left: template.spacing.margin,
      right: template.spacing.margin,
      textAlign: 'center',
      fontSize: template.typography.bodySize - 1,
      color: template.colors.secondary,
      borderTopWidth: 1,
      borderTopColor: template.styling.borderColor,
      paddingTop: 10,
    },
  });

const InvoicePDF: React.FC<InvoicePDFProps> = ({
  invoice,
  items,
  customer,
  organization,
  template,
}) => {
  const styles = createStyles(template);

  const formatCurrency = (amount: number) => {
    const symbols: Record<string, string> = {
      EUR: '€',
      USD: '$',
      GBP: '£',
    };
    const symbol = symbols[invoice.currency] || invoice.currency;
    return `${symbol}${amount.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const renderHeader = () => {
    if (template.logoPosition === 'top-center') {
      return (
        <View style={styles.header}>
          <View style={styles.headerCenter}>
            <Text style={styles.companyName}>{organization.businessName}</Text>
            {organization.addressLine1 && (
              <Text style={styles.subtitle}>{organization.addressLine1}</Text>
            )}
            {organization.city && organization.postcode && (
              <Text style={styles.subtitle}>
                {organization.city}, {organization.postcode}
              </Text>
            )}
            {organization.vatNumber && (
              <Text style={styles.subtitle}>VAT: {organization.vatNumber}</Text>
            )}
          </View>
        </View>
      );
    }

    return (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {template.logoPosition === 'top-left' && (
            <>
              <Text style={styles.companyName}>{organization.businessName}</Text>
              {organization.addressLine1 && (
                <Text style={styles.subtitle}>{organization.addressLine1}</Text>
              )}
              {organization.city && organization.postcode && (
                <Text style={styles.subtitle}>
                  {organization.city}, {organization.postcode}
                </Text>
              )}
              {organization.vatNumber && (
                <Text style={styles.subtitle}>VAT: {organization.vatNumber}</Text>
              )}
            </>
          )}
        </View>
        <View style={styles.headerRight}>
          {template.logoPosition === 'top-right' && (
            <>
              <Text style={styles.companyName}>{organization.businessName}</Text>
              {organization.addressLine1 && (
                <Text style={styles.subtitle}>{organization.addressLine1}</Text>
              )}
              {organization.city && organization.postcode && (
                <Text style={styles.subtitle}>
                  {organization.city}, {organization.postcode}
                </Text>
              )}
              {organization.vatNumber && (
                <Text style={styles.subtitle}>VAT: {organization.vatNumber}</Text>
              )}
            </>
          )}
          {template.logoPosition === 'top-left' && (
            <>
              <Text style={styles.invoiceTitle}>INVOICE</Text>
              <Text style={styles.subtitle}>#{invoice.invoiceNumber}</Text>
              <Text style={styles.subtitle}>Issued: {formatDate(invoice.issueDate)}</Text>
              {invoice.dueDate && (
                <Text style={styles.subtitle}>Due: {formatDate(invoice.dueDate)}</Text>
              )}
            </>
          )}
        </View>
      </View>
    );
  };

  const renderBillTo = () => (
    <View style={styles.billTo}>
      <View style={styles.billToLeft}>
        <View style={styles.addressBlock}>
          <Text style={styles.addressTitle}>Bill To:</Text>
          <Text style={styles.addressLine}>{customer.name}</Text>
          {customer.addressLine1 && (
            <Text style={styles.addressLine}>{customer.addressLine1}</Text>
          )}
          {customer.addressLine2 && (
            <Text style={styles.addressLine}>{customer.addressLine2}</Text>
          )}
          {customer.city && customer.postcode && (
            <Text style={styles.addressLine}>
              {customer.city}, {customer.postcode}
            </Text>
          )}
          {customer.country && <Text style={styles.addressLine}>{customer.country}</Text>}
          {customer.email && <Text style={styles.addressLine}>{customer.email}</Text>}
          {customer.vatNumber && (
            <Text style={styles.addressLine}>VAT: {customer.vatNumber}</Text>
          )}
        </View>
      </View>
      {template.logoPosition !== 'top-left' && (
        <View style={styles.billToRight}>
          <Text style={styles.invoiceTitle}>INVOICE</Text>
          <Text style={styles.subtitle}>#{invoice.invoiceNumber}</Text>
          <Text style={styles.subtitle}>Issued: {formatDate(invoice.issueDate)}</Text>
          {invoice.dueDate && (
            <Text style={styles.subtitle}>Due: {formatDate(invoice.dueDate)}</Text>
          )}
          <Text style={styles.subtitle}>Status: {invoice.status}</Text>
        </View>
      )}
    </View>
  );

  const renderItemsTable = () => (
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <Text style={styles.colDesc}>Description</Text>
        <Text style={styles.colQty}>Qty</Text>
        <Text style={styles.colPrice}>Unit Price</Text>
        <Text style={styles.colTax}>Tax %</Text>
        <Text style={styles.colTotal}>Total</Text>
      </View>
      {items.map((item, index) => (
        <View
          key={index}
          style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}
        >
          <Text style={styles.colDesc}>{item.description}</Text>
          <Text style={styles.colQty}>{item.quantity}</Text>
          <Text style={styles.colPrice}>{formatCurrency(item.unitPrice)}</Text>
          <Text style={styles.colTax}>{item.taxRate}%</Text>
          <Text style={styles.colTotal}>{formatCurrency(item.lineTotal)}</Text>
        </View>
      ))}
    </View>
  );

  const renderTotals = () => (
    <View style={styles.totalsSection}>
      <View style={styles.totalsBox}>
        <View style={styles.totalsRow}>
          <Text style={styles.totalsLabel}>Subtotal:</Text>
          <Text style={styles.totalsValue}>{formatCurrency(invoice.subtotal)}</Text>
        </View>
        <View style={styles.totalsRow}>
          <Text style={styles.totalsLabel}>Tax:</Text>
          <Text style={styles.totalsValue}>{formatCurrency(invoice.taxTotal)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>{formatCurrency(invoice.total)}</Text>
        </View>
      </View>
    </View>
  );

  const renderNotes = () => {
    if (!template.features.showNotes || !invoice.notes) return null;

    return (
      <View style={styles.notesSection}>
        <Text style={styles.notesTitle}>Notes</Text>
        <Text style={styles.notesText}>{invoice.notes}</Text>
      </View>
    );
  };

  const renderBankDetails = () => {
    if (!template.features.showBankDetails) return null;

    const hasBankDetails =
      organization.bankName ||
      organization.bankAccountNumber ||
      organization.bankIban;

    if (!hasBankDetails) return null;

    return (
      <View style={styles.bankDetailsSection}>
        <Text style={styles.bankDetailsTitle}>Bank Details</Text>
        {organization.bankName && (
          <View style={styles.bankDetailRow}>
            <Text style={styles.bankDetailLabel}>Bank Name:</Text>
            <Text style={styles.bankDetailValue}>{organization.bankName}</Text>
          </View>
        )}
        {organization.bankAccountNumber && (
          <View style={styles.bankDetailRow}>
            <Text style={styles.bankDetailLabel}>Account Number:</Text>
            <Text style={styles.bankDetailValue}>{organization.bankAccountNumber}</Text>
          </View>
        )}
        {organization.bankSortCode && (
          <View style={styles.bankDetailRow}>
            <Text style={styles.bankDetailLabel}>Sort Code:</Text>
            <Text style={styles.bankDetailValue}>{organization.bankSortCode}</Text>
          </View>
        )}
        {organization.bankIban && (
          <View style={styles.bankDetailRow}>
            <Text style={styles.bankDetailLabel}>IBAN:</Text>
            <Text style={styles.bankDetailValue}>{organization.bankIban}</Text>
          </View>
        )}
        {organization.bankBic && (
          <View style={styles.bankDetailRow}>
            <Text style={styles.bankDetailLabel}>BIC/SWIFT:</Text>
            <Text style={styles.bankDetailValue}>{organization.bankBic}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {renderHeader()}
        {renderBillTo()}
        {renderItemsTable()}
        {renderTotals()}
        {renderNotes()}
        {renderBankDetails()}
        <View style={styles.footer}>
          <Text>Thank you for your business!</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
