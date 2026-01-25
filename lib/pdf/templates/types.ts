/**
 * Shared types for invoice templates
 */

export interface InvoiceTemplateProps {
  invoice: {
    id: string
    invoice_number: string
    issue_date: string
    due_date: string | null
    currency: string
    subtotal: number
    tax_total: number
    total: number
    notes: string | null
    customers?: {
      name: string
      email?: string | null
      address_line1?: string | null
      address_line2?: string | null
      city?: string | null
      postcode?: string | null
      country?: string | null
      vat_number?: string | null
    } | null
  }
  items: Array<{
    id?: string
    description: string
    quantity: number
    unit_price: number
    tax_rate: number
    line_total: number
    product_description?: string | null
  }>
  branding: {
    business_name?: string | null
    address_line1?: string | null
    address_line2?: string | null
    city?: string | null
    postcode?: string | null
    country?: string | null
    vat_number?: string | null
    email?: string | null
    phone?: string | null
    website?: string | null
    logoUrl?: string | null
    bank_name?: string | null
    bank_account_number?: string | null
    bank_sort_code?: string | null
    bank_iban?: string | null
    bank_bic?: string | null
  } | null
  template: {
    id: string
    name: string
    config_json: any
  } | null
  customization?: {
    fontStyle?: 'normal' | 'classic' | 'round'
    fontSize?: 'small' | 'normal' | 'medium'
    colors?: {
      primary?: string
      secondary?: string
      background?: string
      neutral?: string
      heading?: string
      body?: string
    }
  }
}

/**
 * Helper function to format currency
 */
export function formatCurrency(amount: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

/**
 * Helper function to format date
 */
export function formatDate(date: string | null): string {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
