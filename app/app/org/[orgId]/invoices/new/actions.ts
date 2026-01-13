'use server'

import { createClient } from '@/lib/supabase/server'
import { verifyOrgMembership } from '@/lib/utils-server'

export async function createDraftInvoice(orgId: string): Promise<string | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const isMember = await verifyOrgMembership(orgId)
  if (!isMember) {
    return null
  }

  // Get default currency from org branding
  const { data: branding } = await supabase
    .from('org_branding')
    .select('default_currency')
    .eq('org_id', orgId)
    .single()

  const currency = branding?.default_currency || 'EUR'

  // Allocate invoice number
  const { data: invoiceNumber, error: numError } = await supabase
    .rpc('allocate_invoice_number', { p_org_id: orgId })

  if (numError) {
    console.error('Error allocating invoice number:', numError)
    throw new Error(`Failed to allocate invoice number: ${numError.message}`)
  }

  if (!invoiceNumber) {
    console.error('No invoice number returned from RPC')
    throw new Error('Failed to allocate invoice number: No number returned')
  }

  // Create draft invoice
  const { data: invoice, error } = await supabase
    .from('invoices')
    .insert({
      org_id: orgId,
      invoice_number: invoiceNumber.toString(),
      customer_id: null, // Will be set in WYSIWYG editor
      issue_date: new Date().toISOString().split('T')[0],
      due_date: null, // Will be set in WYSIWYG editor
      currency: currency,
      template_id: null,
      notes: null,
      status: 'DRAFT',
      subtotal: 0,
      tax_total: 0,
      total: 0,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating draft invoice:', error)
    throw new Error(`Failed to create invoice: ${error.message}`)
  }

  if (!invoice) {
    console.error('No invoice returned from insert')
    throw new Error('Failed to create invoice: No invoice returned')
  }

  return invoice.id
}
