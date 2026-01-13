'use server'

import { createClient } from '@/lib/supabase/server'
import { verifyOrgMembership } from '@/lib/utils-server'
import { redirect } from 'next/navigation'

export async function createInvoice(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const orgId = formData.get('orgId') as string
  const isMember = await verifyOrgMembership(orgId)
  if (!isMember) {
    redirect('/app')
  }

  // Allocate invoice number
  const { data: invoiceNumber, error: numError } = await supabase
    .rpc('allocate_invoice_number', { p_org_id: orgId })

  if (numError || !invoiceNumber) {
    redirect(`/app/org/${orgId}/invoices/new?error=${encodeURIComponent(numError?.message || 'Failed to allocate invoice number')}`)
  }

  // Create invoice
  const { data: invoice, error } = await supabase
    .from('invoices')
    .insert({
      org_id: orgId,
      invoice_number: invoiceNumber.toString(),
      customer_id: formData.get('customer_id') as string,
      issue_date: formData.get('issue_date') as string,
      due_date: formData.get('due_date') as string || null,
      currency: formData.get('currency') as string || 'EUR',
      template_id: formData.get('template_id') as string || null,
      notes: formData.get('notes') as string || null,
      status: 'DRAFT',
      subtotal: 0,
      tax_total: 0,
      total: 0,
    })
    .select()
    .single()

  if (error) {
    redirect(`/app/org/${orgId}/invoices/new?error=${encodeURIComponent(error.message)}`)
  }

  redirect(`/app/org/${orgId}/invoices/${invoice.id}`)
}
