import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'

// Helper function to get logo URL from storage path
function getLogoUrl(branding: any, supabase: any): string | null {
  if (!branding?.logo_storage_path) return null
  try {
    const { data: { publicUrl } } = supabase.storage
      .from('logos')
      .getPublicUrl(branding.logo_storage_path)
    return publicUrl
  } catch {
    return null
  }
}

// Template style generator
function getTemplateStyles(template: any) {
  const config = template?.config_json || {}
  const layout = config.layout || 'classic'
  
  // Base colors
  const primaryColor = config.primaryColor || '#000000'
  const secondaryColor = config.secondaryColor || '#666666'
  const backgroundColor = config.backgroundColor || '#FFFFFF'
  const textColor = config.textColor || '#000000'
  const accentColor = config.accentColor || primaryColor

  // Layout-specific base styles
  const baseStyles: any = {
    page: {
      padding: config.pagePadding || 40,
      fontSize: config.fontSize || 12,
      fontFamily: config.fontFamily || 'Helvetica',
      backgroundColor: backgroundColor,
      color: textColor,
    },
  }

  // Template-specific style variations
  switch (layout) {
    case 'minimal':
      return {
        ...baseStyles,
        header: {
          marginBottom: 25,
          marginTop: 0,
          paddingBottom: 15,
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb',
          borderBottomStyle: 'solid',
        },
        title: {
          fontSize: 28,
          fontWeight: 'normal',
          color: textColor,
          letterSpacing: 2,
        },
        companyName: {
          fontSize: 14,
          fontWeight: 'normal',
          color: textColor,
          letterSpacing: 1,
        },
        tableHeader: {
          backgroundColor: 'transparent',
          fontWeight: 'bold',
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb',
          borderBottomStyle: 'solid',
          paddingVertical: 6,
          minHeight: 24,
        },
        tableRow: {
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb',
          borderBottomStyle: 'solid',
          paddingVertical: 5,
          minHeight: 20,
        },
        totalSection: {
          marginTop: 15,
          marginBottom: 12,
          alignItems: 'flex-end',
        },
      }
    
    case 'modern':
      return {
        ...baseStyles,
        header: {
          marginBottom: 25,
          marginTop: 0,
          padding: 20,
          backgroundColor: config.headerBackground || '#ECFDF5',
          borderBottomWidth: 3,
          borderBottomColor: accentColor,
          borderBottomStyle: 'solid',
        },
        title: {
          fontSize: 32,
          fontWeight: 'bold',
          color: accentColor,
        },
        companyName: {
          fontSize: 16,
          fontWeight: 'bold',
          color: textColor,
        },
        tableHeader: {
          backgroundColor: config.tableHeaderBackground || '#F0FDF4',
          fontWeight: 'bold',
          borderBottomWidth: 2,
          borderBottomColor: accentColor,
          borderBottomStyle: 'solid',
          paddingVertical: 8,
          minHeight: 26,
        },
        tableRow: {
          borderBottomWidth: 1,
          borderBottomColor: '#D1FAE5',
          borderBottomStyle: 'solid',
          paddingVertical: 6,
          backgroundColor: 'transparent',
          minHeight: 22,
        },
        totalSection: {
          marginTop: 15,
          marginBottom: 12,
          padding: 12,
          backgroundColor: '#F9FAFB',
          borderTopWidth: 2,
          borderTopColor: accentColor,
          borderTopStyle: 'solid',
        },
      }
    
    case 'professional':
      return {
        ...baseStyles,
        header: {
          marginBottom: 25,
          marginTop: 0,
          paddingBottom: 20,
          borderBottomWidth: 2,
          borderBottomColor: primaryColor,
          borderBottomStyle: 'solid',
        },
        title: {
          fontSize: 24,
          fontWeight: 'bold',
          color: primaryColor,
        },
        companyName: {
          fontSize: 14,
          fontWeight: 'bold',
          color: textColor,
        },
        tableHeader: {
          backgroundColor: '#F3F4F6',
          fontWeight: 'bold',
          borderBottomWidth: 1,
          borderBottomColor: primaryColor,
          borderBottomStyle: 'solid',
          paddingVertical: 6,
          minHeight: 24,
        },
        tableRow: {
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb',
          borderBottomStyle: 'solid',
          paddingVertical: 6,
          minHeight: 22,
        },
        totalSection: {
          marginTop: 15,
          marginBottom: 12,
          padding: 10,
          backgroundColor: '#F9FAFB',
          borderTopWidth: 2,
          borderTopColor: primaryColor,
          borderTopStyle: 'solid',
        },
      }
    
    case 'elegant':
      return {
        ...baseStyles,
        header: {
          marginBottom: 25,
          marginTop: 0,
        },
        title: {
          fontSize: 26,
          fontWeight: 'normal',
          color: textColor,
          fontStyle: 'italic',
        },
        companyName: {
          fontSize: 13,
          fontWeight: 'normal',
          color: secondaryColor,
        },
        tableHeader: {
          backgroundColor: 'transparent',
          fontWeight: 'bold',
          borderBottomWidth: 1,
          borderBottomColor: secondaryColor,
          borderBottomStyle: 'solid',
          paddingVertical: 6,
          minHeight: 24,
        },
        tableRow: {
          borderBottomWidth: 0.5,
          borderBottomColor: '#e5e7eb',
          borderBottomStyle: 'solid',
          paddingVertical: 5,
          minHeight: 20,
        },
        totalSection: {
          marginTop: 15,
          marginBottom: 12,
          alignItems: 'flex-end',
          borderTopWidth: 1,
          borderTopColor: secondaryColor,
          borderTopStyle: 'solid',
          paddingTop: 8,
        },
      }
    
    case 'bold':
      return {
        ...baseStyles,
        header: {
          marginBottom: 25,
          marginTop: 0,
          padding: 15,
          backgroundColor: primaryColor,
        },
        title: {
          fontSize: 30,
          fontWeight: 'bold',
          color: '#FFFFFF',
        },
        companyName: {
          fontSize: 14,
          fontWeight: 'bold',
          color: '#FFFFFF',
        },
        tableHeader: {
          backgroundColor: primaryColor,
          fontWeight: 'bold',
          color: '#FFFFFF',
          paddingVertical: 8,
          minHeight: 26,
        },
        tableRow: {
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb',
          borderBottomStyle: 'solid',
          paddingVertical: 6,
          minHeight: 22,
        },
        totalSection: {
          marginTop: 15,
          marginBottom: 12,
          padding: 12,
          backgroundColor: '#F3F4F6',
          borderWidth: 2,
          borderColor: primaryColor,
          borderStyle: 'solid',
        },
      }
    
    case 'clean':
      return {
        ...baseStyles,
        header: {
          marginBottom: 25,
          marginTop: 0,
        },
        title: {
          fontSize: 22,
          fontWeight: 'normal',
          color: textColor,
        },
        companyName: {
          fontSize: 13,
          fontWeight: 'normal',
          color: textColor,
        },
        tableHeader: {
          backgroundColor: '#FAFAFA',
          fontWeight: 'bold',
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb',
          borderBottomStyle: 'solid',
          paddingVertical: 6,
          minHeight: 24,
        },
        tableRow: {
          borderBottomWidth: 1,
          borderBottomColor: '#f0f0f0',
          borderBottomStyle: 'solid',
          paddingVertical: 6,
          minHeight: 22,
        },
        totalSection: {
          marginTop: 15,
          marginBottom: 12,
          alignItems: 'flex-end',
        },
      }
    
    default: // classic
      return {
        ...baseStyles,
        header: {
          marginBottom: 25,
          marginTop: 0,
          paddingBottom: 15,
          ...(config.headerBackground !== '#000000' && {
            borderBottomWidth: 2,
            borderBottomColor: '#e5e7eb',
            borderBottomStyle: 'solid',
          }),
          backgroundColor: config.headerBackground || 'transparent',
        },
        title: {
          fontSize: 24,
          fontWeight: 'bold',
          color: config.headerBackground === '#000000' ? '#FFFFFF' : primaryColor,
        },
        companyName: {
          fontSize: 14,
          fontWeight: 'bold',
          color: config.headerBackground === '#000000' ? '#FFFFFF' : textColor,
        },
        tableHeader: {
          backgroundColor: config.tableHeaderBackground || '#F3F4F6',
          fontWeight: 'bold',
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb',
          borderBottomStyle: 'solid',
          paddingVertical: 10,
          minHeight: 30,
          color: config.tableHeaderTextColor || textColor,
        },
        tableRow: {
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb',
          borderBottomStyle: 'solid',
          paddingVertical: 6,
          minHeight: 22,
        },
        totalSection: {
          marginTop: 15,
          marginBottom: 12,
          padding: 10,
          backgroundColor: '#F9FAFB',
          borderTopWidth: 2,
          borderTopColor: '#000',
          borderTopStyle: 'solid',
        },
      }
  }
}

// Get table column configuration based on template
function getTableColumns(config: any) {
  const columns = config.tableColumns || ['DESCRIPTION', 'QTY', 'PRICE', 'TAX %', 'TOTAL']
  
  // Map column names to data fields
  const columnMap: any = {
    'DESCRIPTION': 'description',
    'QTY': 'quantity',
    'QUANTITY': 'quantity',
    'PRICE': 'unit_price',
    'UNIT PRICE': 'unit_price',
    'RATE': 'unit_price',
    'HOURS': 'quantity',
    'TAX %': 'tax_rate',
    'TAX': 'tax_rate',
    'TOTAL': 'line_total',
    'AMOUNT': 'line_total',
  }
  
  // Map columns and filter out any that don't have valid field mappings
  return columns
    .map((col: string) => {
      const normalizedCol = col.toUpperCase()
      const field = columnMap[normalizedCol]
      
      // Only include columns with valid field mappings
      if (!field) {
        console.warn(`Unknown table column: ${col}`)
        return null
      }
      
      return {
        label: col,
        field: field,
      }
    })
    .filter((col: any) => col !== null)
}

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
    if (!date) return ''
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Get template styles
  const templateStyles = getTemplateStyles(template)
  const config = template?.config_json || {}
  const layout = config.layout || 'classic'
  const logoPosition = config.logoPosition || 'top-left'
  const textColor = config.textColor || '#000000'

  // Get logo URL from branding (set by API route)
  const logoUrl = branding?.logoUrl || null

  // Dynamic styles based on template
  const styles = StyleSheet.create({
    page: templateStyles.page,
    header: templateStyles.header,
    title: templateStyles.title,
    companyName: templateStyles.companyName,
    section: {
      marginBottom: 12,
      marginTop: 5,
    },
    row: {
      flexDirection: 'row',
      marginBottom: 3,
    },
    label: {
      width: 100,
      fontWeight: 'bold',
    },
    table: {
      marginTop: 15,
      marginBottom: 15,
      width: '100%',
    },
    tableRow: {
      ...templateStyles.tableRow,
      flexDirection: 'row',
      width: '100%',
    },
    tableHeader: {
      ...templateStyles.tableHeader,
      flexDirection: 'row',
      width: '100%',
    },
    tableCol1: { flex: 2, paddingRight: 5 },
    tableCol2: { flex: 1, textAlign: 'right', paddingHorizontal: 5 },
    tableCol3: { flex: 1, textAlign: 'right', paddingHorizontal: 5 },
    tableCol4: { flex: 1, textAlign: 'right', paddingHorizontal: 5 },
    tableCol5: { flex: 1, textAlign: 'right', paddingLeft: 5 },
    totals: {
      ...templateStyles.totalSection,
      width: '100%',
      alignItems: 'flex-end',
      marginTop: 15,
      marginBottom: 12,
    },
    totalRow: {
      flexDirection: 'row',
      width: 250,
      justifyContent: 'space-between',
      marginBottom: 5,
      paddingHorizontal: 5,
    },
    totalLabel: {
      fontWeight: 'bold',
    },
    footer: {
      marginTop: 15,
      marginBottom: 10,
      paddingTop: 10,
      paddingBottom: 8,
      borderTopWidth: 1,
      borderTopColor: '#e5e7eb',
      borderTopStyle: 'solid',
      fontSize: 10,
      color: '#6b7280',
    },
    logoContainer: {
      width: 80,
      height: 80,
      marginBottom: 10,
    },
    logo: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
    headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    headerLeft: {
      flex: 1,
    },
    headerRight: {
      flex: 1,
      alignItems: 'flex-end',
    },
    companyInfo: {
      marginBottom: 12,
      marginTop: 5,
    },
    customerInfo: {
      marginBottom: 12,
      marginTop: 5,
    },
    bankDetails: {
      marginTop: 15,
      marginBottom: 10,
      padding: 10,
      backgroundColor: '#F9FAFB',
      fontSize: 10,
    },
  })

  // Render header based on logo position
  const renderHeader = () => {
    const hasLogo = logoUrl !== null
    const headerTextColor = config.headerBackground === '#000000' || config.tableHeaderBackground === '#000000' 
      ? '#FFFFFF' 
      : (styles.title?.color || '#000000')
    
    if (logoPosition === 'top-center') {
      return (
        <View style={styles.header}>
          {hasLogo && (
            <View style={{ alignItems: 'center', marginBottom: 15 }}>
              <Image src={logoUrl!} style={styles.logo} />
            </View>
          )}
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.title, { color: headerTextColor, lineHeight: 1.3 }]}>INVOICE</Text>
            <Text style={{ fontSize: 10, marginTop: 6, color: headerTextColor, lineHeight: 1.4 }}>
              Invoice #{invoice.invoice_number}
            </Text>
          </View>
        </View>
      )
    }

    if (logoPosition === 'top-right') {
      return (
        <View style={[styles.header, styles.headerContent]}>
          <View style={styles.headerLeft}>
            <Text style={[styles.title, { color: headerTextColor, lineHeight: 1.3 }]}>INVOICE</Text>
            <Text style={{ fontSize: 10, marginTop: 6, color: headerTextColor, lineHeight: 1.4 }}>
              Invoice #{invoice.invoice_number}
            </Text>
          </View>
          {hasLogo && (
            <View style={[styles.headerRight, { marginLeft: 20 }]}>
              <Image src={logoUrl!} style={styles.logo} />
            </View>
          )}
        </View>
      )
    }

    // Default: top-left
    return (
      <View style={styles.header}>
        <View style={styles.headerContent}>
          {hasLogo && (
            <View style={styles.logoContainer}>
              <Image src={logoUrl!} style={styles.logo} />
            </View>
          )}
          <View style={{ flex: 1, marginLeft: hasLogo ? 20 : 0 }}>
            <Text style={[styles.title, { color: headerTextColor, lineHeight: 1.3 }]}>INVOICE</Text>
            <Text style={{ fontSize: 10, marginTop: 6, color: headerTextColor, lineHeight: 1.4 }}>
              Invoice #{invoice.invoice_number}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {renderHeader()}

        {/* Company Information */}
        <View style={[styles.section, { marginTop: 8 }]}>
          {branding ? (
            <View style={styles.companyInfo}>
              <Text style={[styles.companyName, { lineHeight: 1.3 }]}>
                {branding.business_name || 'Your Business'}
              </Text>
              {branding.address_line1 && <Text style={{ marginTop: 2, lineHeight: 1.3 }}>{branding.address_line1}</Text>}
              {branding.address_line2 && <Text style={{ marginTop: 2, lineHeight: 1.3 }}>{branding.address_line2}</Text>}
              {(branding.city || branding.postcode) && (
                <Text style={{ marginTop: 2, lineHeight: 1.3 }}>
                  {[branding.city, branding.postcode].filter(Boolean).join(' ')}
                </Text>
              )}
              {branding.country && <Text style={{ marginTop: 2, lineHeight: 1.3 }}>{branding.country}</Text>}
              {branding.vat_number && (
                <Text style={{ marginTop: 4, lineHeight: 1.3 }}>VAT: {branding.vat_number}</Text>
              )}
            </View>
          ) : (
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>Your Business</Text>
              <Text style={{ fontSize: 10, color: '#666', marginTop: 2 }}>Please configure organization settings</Text>
            </View>
          )}
        </View>

        {/* Invoice Details and Customer Info Side by Side */}
        <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 15, width: '100%' }}>
          <View style={{ flex: 1, marginRight: 20 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Bill To:</Text>
            {invoice.customers ? (
              <View>
                <Text style={{ marginBottom: 2, lineHeight: 1.3 }}>{invoice.customers.name || 'No customer name'}</Text>
                {invoice.customers.email && <Text style={{ marginBottom: 2, lineHeight: 1.3 }}>{invoice.customers.email}</Text>}
                {invoice.customers.address_line1 && (
                  <Text style={{ marginBottom: 2, lineHeight: 1.3 }}>{invoice.customers.address_line1}</Text>
                )}
                {invoice.customers.address_line2 && (
                  <Text style={{ marginBottom: 2, lineHeight: 1.3 }}>{invoice.customers.address_line2}</Text>
                )}
                {(invoice.customers.city || invoice.customers.postcode) && (
                  <Text style={{ marginBottom: 2, lineHeight: 1.3 }}>
                    {[invoice.customers.city, invoice.customers.postcode].filter(Boolean).join(' ')}
                  </Text>
                )}
                {invoice.customers.country && <Text style={{ marginBottom: 2, lineHeight: 1.3 }}>{invoice.customers.country}</Text>}
                {invoice.customers.vat_number && (
                  <Text style={{ marginTop: 4, lineHeight: 1.3 }}>VAT: {invoice.customers.vat_number}</Text>
                )}
              </View>
            ) : (
              <Text style={{ fontStyle: 'italic', color: '#666', lineHeight: 1.3 }}>No customer selected</Text>
            )}
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
              <Text style={[styles.label, { lineHeight: 1.3 }]}>Issue Date:</Text>
              <Text style={{ lineHeight: 1.3 }}>{formatDate(invoice.issue_date)}</Text>
            </View>
            {invoice.due_date && (
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.label, { lineHeight: 1.3 }]}>Due Date:</Text>
                <Text style={{ lineHeight: 1.3 }}>{formatDate(invoice.due_date)}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          {(() => {
            const tableColumns = getTableColumns(config)
            // Use flex values: description gets more space (flex: 2), others get equal (flex: 1)
            const colFlex = [2, 1, 1, 1, 1]
            
            return (
              <>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  {tableColumns.map((col: any, idx: number) => (
                    <View key={idx} style={{ flex: colFlex[idx] || 1, paddingHorizontal: idx === 0 ? 5 : 5, justifyContent: 'center' }}>
                      <Text
                        style={{
                          textAlign: idx === 0 ? 'left' : 'right',
                          fontWeight: 'bold',
                          color: config.tableHeaderTextColor || config.textColor || '#000000',
                          lineHeight: 1.4,
                        }}
                      >
                        {col.label}
                      </Text>
                    </View>
                  ))}
                </View>
                {items && items.length > 0 ? (
                  items.map((item: any, index: number) => (
                    <View key={index} style={styles.tableRow}>
                      {tableColumns.map((col: any, idx: number) => {
                        let value: string = ''
                        if (col.field === 'description') {
                          value = item.description || ''
                        } else if (col.field === 'quantity') {
                          value = item.quantity ? item.quantity.toString() : '0'
                        } else if (col.field === 'unit_price') {
                          value = formatCurrency(Number(item.unit_price || 0), invoice.currency)
                        } else if (col.field === 'tax_rate') {
                          value = `${item.tax_rate || 0}%`
                        } else if (col.field === 'line_total') {
                          value = formatCurrency(Number(item.line_total || 0), invoice.currency)
                        }
                        
                        return (
                          <View key={idx} style={{ flex: colFlex[idx] || 1, paddingHorizontal: 5, justifyContent: 'center' }}>
                            <Text
                              style={{
                                textAlign: idx === 0 ? 'left' : 'right',
                                lineHeight: 1.4,
                              }}
                            >
                              {value}
                            </Text>
                          </View>
                        )
                      })}
                    </View>
                  ))
                ) : (
                  <View style={styles.tableRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontStyle: 'italic', color: '#666' }}>No items</Text>
                    </View>
                  </View>
                )}
              </>
            )
          })()}
        </View>

        {/* Totals */}
        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { lineHeight: 1.5 }]}>Subtotal:</Text>
            <Text style={{ lineHeight: 1.5 }}>{formatCurrency(Number(invoice.subtotal), invoice.currency)}</Text>
          </View>
          {config.showTaxBreakdown !== false && (
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { lineHeight: 1.5 }]}>Tax:</Text>
              <Text style={{ lineHeight: 1.5 }}>{formatCurrency(Number(invoice.tax_total), invoice.currency)}</Text>
            </View>
          )}
          <View
            style={[
              styles.totalRow,
              { borderTopWidth: 1, borderTopColor: '#000', borderTopStyle: 'solid', paddingTop: 8, marginTop: 8 },
            ]}
          >
            <Text style={[styles.totalLabel, { fontSize: 14, lineHeight: 1.5 }]}>Total:</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', lineHeight: 1.5 }}>
              {formatCurrency(Number(invoice.total), invoice.currency)}
            </Text>
          </View>
        </View>

        {/* Bank Details and Contact Info - Two Column Layout if specified */}
        {config.footerLayout === 'two-column' && branding && (
          <View style={{ marginTop: 40, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <View style={{ flex: 1, marginRight: 30, paddingRight: 10 }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 11 }}>Contact Info:</Text>
              {branding.email && <Text style={{ fontSize: 10, marginBottom: 4 }}>Email: {branding.email}</Text>}
              {branding.phone && <Text style={{ fontSize: 10, marginBottom: 4 }}>Phone: {branding.phone}</Text>}
              {branding.website && <Text style={{ fontSize: 10, marginBottom: 4 }}>Website: {branding.website}</Text>}
            </View>
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 11 }}>Payment Info:</Text>
              {branding.bank_name && <Text style={{ fontSize: 10, marginBottom: 4 }}>Bank Name: {branding.bank_name}</Text>}
              {branding.bank_account_number && (
                <Text style={{ fontSize: 10, marginBottom: 4 }}>Account No: {branding.bank_account_number}</Text>
              )}
              {branding.bank_sort_code && (
                <Text style={{ fontSize: 10, marginBottom: 4 }}>Sort Code: {branding.bank_sort_code}</Text>
              )}
              {branding.bank_iban && <Text style={{ fontSize: 10, marginBottom: 4 }}>IBAN: {branding.bank_iban}</Text>}
              {branding.bank_bic && <Text style={{ fontSize: 10, marginBottom: 4 }}>BIC/SWIFT: {branding.bank_bic}</Text>}
            </View>
          </View>
        )}
        
        {/* Single Column Bank Details */}
        {config.footerLayout !== 'two-column' && config.showBankDetails !== false && branding && (
          (branding.bank_name || branding.bank_account_number || branding.bank_iban) && (
            <View style={styles.bankDetails}>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Payment Details:</Text>
              {branding.bank_name && <Text>Bank: {branding.bank_name}</Text>}
              {branding.bank_account_number && (
                <Text>Account: {branding.bank_account_number}</Text>
              )}
              {branding.bank_sort_code && <Text>Sort Code: {branding.bank_sort_code}</Text>}
              {branding.bank_iban && <Text>IBAN: {branding.bank_iban}</Text>}
              {branding.bank_bic && <Text>BIC/SWIFT: {branding.bank_bic}</Text>}
            </View>
          )
        )}
        
        {/* Signature Line */}
        {config.showSignatureLine && (
          <View style={{ marginTop: 50, marginBottom: 25 }}>
            <View style={{ borderTopWidth: 1, borderTopColor: '#000', borderTopStyle: 'solid', width: 200, marginBottom: 8 }} />
            <Text style={{ fontSize: 10, lineHeight: 1.4 }}>Signature</Text>
          </View>
        )}

        {/* Notes */}
        {invoice.notes && (
          <View style={styles.footer}>
            <Text style={{ fontWeight: 'bold', marginBottom: 8, lineHeight: 1.4 }}>Notes:</Text>
            <Text style={{ lineHeight: 1.5 }}>{invoice.notes}</Text>
          </View>
        )}
      </Page>
    </Document>
  )
}
