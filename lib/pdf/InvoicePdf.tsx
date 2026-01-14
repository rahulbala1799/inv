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
      padding: config.pagePadding || 30,
      fontSize: config.fontSize || 11,
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
          paddingVertical: 5,
          minHeight: 22,
        },
        tableRow: {
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb',
          borderBottomStyle: 'solid',
          paddingVertical: 4,
          minHeight: 18,
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
          paddingVertical: 5,
          minHeight: 22,
        },
        tableRow: {
          borderBottomWidth: 1,
          borderBottomColor: '#D1FAE5',
          borderBottomStyle: 'solid',
          paddingVertical: 4,
          backgroundColor: 'transparent',
          minHeight: 18,
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
          paddingVertical: 5,
          minHeight: 22,
        },
        tableRow: {
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb',
          borderBottomStyle: 'solid',
          paddingVertical: 4,
          minHeight: 18,
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
          paddingVertical: 5,
          minHeight: 22,
        },
        tableRow: {
          borderBottomWidth: 0.5,
          borderBottomColor: '#e5e7eb',
          borderBottomStyle: 'solid',
          paddingVertical: 4,
          minHeight: 18,
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
          paddingVertical: 5,
          minHeight: 22,
        },
        tableRow: {
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb',
          borderBottomStyle: 'solid',
          paddingVertical: 4,
          minHeight: 18,
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
          paddingVertical: 5,
          minHeight: 22,
        },
        tableRow: {
          borderBottomWidth: 1,
          borderBottomColor: '#f0f0f0',
          borderBottomStyle: 'solid',
          paddingVertical: 4,
          minHeight: 18,
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
          paddingVertical: 5,
          minHeight: 22,
          color: config.tableHeaderTextColor || textColor,
        },
        tableRow: {
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb',
          borderBottomStyle: 'solid',
          paddingVertical: 4,
          minHeight: 18,
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
      marginTop: 8,
      marginBottom: 8,
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
      width: 180,
      justifyContent: 'space-between',
      marginBottom: 2,
      paddingHorizontal: 0,
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

  // Render header with logo left and organization details right
  const renderHeader = () => {
    const hasLogo = logoUrl !== null
    const headerTextColor = config.headerBackground === '#000000' || config.tableHeaderBackground === '#000000' 
      ? '#FFFFFF' 
      : (styles.title?.color || '#000000')
    
    // New compact layout: Logo left, Invoice title + Organization details right
    return (
      <View style={[styles.header, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }]}>
        {/* Left: Logo */}
        <View style={{ width: 70, marginRight: 15 }}>
          {hasLogo && (
            <Image src={logoUrl!} style={{ width: 60, height: 60, objectFit: 'contain' }} />
          )}
        </View>
        
        {/* Right: Invoice Title + Organization Details */}
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <View style={{ alignItems: 'flex-end', marginBottom: 6 }}>
            <Text style={[styles.title, { color: headerTextColor, lineHeight: 1.2, marginBottom: 2, fontSize: 20 }]}>INVOICE</Text>
            <Text style={{ fontSize: 8, color: headerTextColor, lineHeight: 1.2 }}>
              #{invoice.invoice_number}
            </Text>
          </View>
          
          {/* Organization Details on Right - Compact */}
          {branding && (
            <View style={{ alignItems: 'flex-end' }}>
              {branding.business_name && (
                <Text style={{ fontSize: 8, fontWeight: 'bold', lineHeight: 1.2, marginBottom: 1 }}>
                  {branding.business_name}
                </Text>
              )}
              {branding.address_line1 && (
                <Text style={{ fontSize: 8, lineHeight: 1.2, marginBottom: 0.5 }}>
                  {branding.address_line1}
                </Text>
              )}
              {branding.address_line2 && (
                <Text style={{ fontSize: 8, lineHeight: 1.2, marginBottom: 0.5 }}>
                  {branding.address_line2}
                </Text>
              )}
              {(branding.city || branding.postcode) && (
                <Text style={{ fontSize: 8, lineHeight: 1.2, marginBottom: 0.5 }}>
                  {[branding.city, branding.postcode].filter(Boolean).join(' ')}
                </Text>
              )}
              {branding.country && (
                <Text style={{ fontSize: 8, lineHeight: 1.2, marginBottom: 0.5 }}>
                  {branding.country}
                </Text>
              )}
              {branding.vat_number && (
                <Text style={{ fontSize: 8, lineHeight: 1.2, marginTop: 2 }}>
                  VAT: {branding.vat_number}
                </Text>
              )}
            </View>
          )}
        </View>
      </View>
    )
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {renderHeader()}

        {/* Customer Info and Invoice Dates - Compact Side by Side */}
        <View style={{ flexDirection: 'row', marginTop: 8, marginBottom: 12, width: '100%' }}>
          {/* Left: Bill To */}
          <View style={{ flex: 1, marginRight: 30 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 9, marginBottom: 2 }}>BILL TO:</Text>
            {invoice.customers ? (
              <View>
                <Text style={{ fontSize: 8, marginBottom: 0.5, lineHeight: 1.2, fontWeight: 'bold' }}>
                  {invoice.customers.name || 'No customer name'}
                </Text>
                {invoice.customers.email && (
                  <Text style={{ fontSize: 8, marginBottom: 0.5, lineHeight: 1.2 }}>{invoice.customers.email}</Text>
                )}
                {invoice.customers.address_line1 && (
                  <Text style={{ fontSize: 8, marginBottom: 0.5, lineHeight: 1.2 }}>{invoice.customers.address_line1}</Text>
                )}
                {invoice.customers.address_line2 && (
                  <Text style={{ fontSize: 8, marginBottom: 0.5, lineHeight: 1.2 }}>{invoice.customers.address_line2}</Text>
                )}
                {(invoice.customers.city || invoice.customers.postcode) && (
                  <Text style={{ fontSize: 8, marginBottom: 0.5, lineHeight: 1.2 }}>
                    {[invoice.customers.city, invoice.customers.postcode].filter(Boolean).join(' ')}
                  </Text>
                )}
                {invoice.customers.country && (
                  <Text style={{ fontSize: 8, marginBottom: 0.5, lineHeight: 1.2 }}>{invoice.customers.country}</Text>
                )}
                {invoice.customers.vat_number && (
                  <Text style={{ fontSize: 8, marginTop: 1, lineHeight: 1.2 }}>VAT: {invoice.customers.vat_number}</Text>
                )}
              </View>
            ) : (
              <Text style={{ fontStyle: 'italic', color: '#666', fontSize: 8, lineHeight: 1.2 }}>No customer selected</Text>
            )}
          </View>
          
          {/* Right: Invoice Dates */}
          <View style={{ width: 140, alignItems: 'flex-end' }}>
            <View style={{ flexDirection: 'row', marginBottom: 2, justifyContent: 'flex-end' }}>
              <Text style={{ fontSize: 8, fontWeight: 'bold', marginRight: 4 }}>Issue:</Text>
              <Text style={{ fontSize: 8, lineHeight: 1.2 }}>{formatDate(invoice.issue_date)}</Text>
            </View>
            {invoice.due_date && (
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text style={{ fontSize: 8, fontWeight: 'bold', marginRight: 4 }}>Due:</Text>
                <Text style={{ fontSize: 8, lineHeight: 1.2 }}>{formatDate(invoice.due_date)}</Text>
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
                          fontSize: 9,
                          color: config.tableHeaderTextColor || config.textColor || '#000000',
                          lineHeight: 1.3,
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
                                fontSize: 9,
                                lineHeight: 1.3,
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

        {/* Totals with Bank Details on Left */}
        <View style={{ flexDirection: 'row', marginTop: 8, marginBottom: 8 }}>
          {/* Left: Bank Details */}
          <View style={{ flex: 1, marginRight: 25 }}>
            {branding && (branding.bank_name || branding.bank_account_number || branding.bank_iban) && (
              <View>
                <Text style={{ fontSize: 8, fontWeight: 'bold', marginBottom: 2 }}>PAYMENT DETAILS:</Text>
                {branding.bank_name && (
                  <Text style={{ fontSize: 8, lineHeight: 1.2, marginBottom: 0.5 }}>Bank: {branding.bank_name}</Text>
                )}
                {branding.bank_account_number && (
                  <Text style={{ fontSize: 8, lineHeight: 1.2, marginBottom: 0.5 }}>
                    Account: {branding.bank_account_number}
                  </Text>
                )}
                {branding.bank_sort_code && (
                  <Text style={{ fontSize: 8, lineHeight: 1.2, marginBottom: 0.5 }}>
                    Sort: {branding.bank_sort_code}
                  </Text>
                )}
                {branding.bank_iban && (
                  <Text style={{ fontSize: 8, lineHeight: 1.2, marginBottom: 0.5 }}>IBAN: {branding.bank_iban}</Text>
                )}
                {branding.bank_bic && (
                  <Text style={{ fontSize: 8, lineHeight: 1.2 }}>BIC: {branding.bank_bic}</Text>
                )}
              </View>
            )}
          </View>
          
          {/* Right: Totals */}
          <View style={{ width: 180, alignItems: 'flex-end' }}>
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { fontSize: 9, lineHeight: 1.2 }]}>Subtotal:</Text>
              <Text style={{ fontSize: 9, lineHeight: 1.2 }}>{formatCurrency(Number(invoice.subtotal), invoice.currency)}</Text>
            </View>
            {config.showTaxBreakdown !== false && (
              <View style={styles.totalRow}>
                <Text style={[styles.totalLabel, { fontSize: 9, lineHeight: 1.2 }]}>Tax:</Text>
                <Text style={{ fontSize: 9, lineHeight: 1.2 }}>{formatCurrency(Number(invoice.tax_total), invoice.currency)}</Text>
              </View>
            )}
            <View
              style={[
                styles.totalRow,
                { borderTopWidth: 1, borderTopColor: '#000', borderTopStyle: 'solid', paddingTop: 3, marginTop: 3 },
              ]}
            >
              <Text style={[styles.totalLabel, { fontSize: 11, lineHeight: 1.2 }]}>Total:</Text>
              <Text style={{ fontSize: 11, fontWeight: 'bold', lineHeight: 1.2 }}>
                {formatCurrency(Number(invoice.total), invoice.currency)}
              </Text>
            </View>
          </View>
        </View>

        {/* Contact Info (if not in header and footerLayout is two-column) */}
        {config.footerLayout === 'two-column' && branding && (branding.email || branding.phone || branding.website) && (
          <View style={{ marginTop: 12, marginBottom: 8, flexDirection: 'row', width: '100%' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 3, fontSize: 9 }}>CONTACT:</Text>
              {branding.email && <Text style={{ fontSize: 9, marginBottom: 1, lineHeight: 1.3 }}>Email: {branding.email}</Text>}
              {branding.phone && <Text style={{ fontSize: 9, marginBottom: 1, lineHeight: 1.3 }}>Phone: {branding.phone}</Text>}
              {branding.website && <Text style={{ fontSize: 9, lineHeight: 1.3 }}>Website: {branding.website}</Text>}
            </View>
          </View>
        )}
        
        {/* Signature Line */}
        {config.showSignatureLine && (
          <View style={{ marginTop: 15, marginBottom: 10 }}>
            <View style={{ borderTopWidth: 1, borderTopColor: '#000', borderTopStyle: 'solid', width: 200, marginBottom: 5 }} />
            <Text style={{ fontSize: 9, lineHeight: 1.3 }}>Signature</Text>
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
