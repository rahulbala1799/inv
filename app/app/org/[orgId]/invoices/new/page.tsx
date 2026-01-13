import { createClient } from '@/lib/supabase/server'
import { verifyOrgMembership } from '@/lib/utils-server'
import { redirect } from 'next/navigation'
import { createDraftInvoice } from './actions'

export default async function NewInvoicePage({
  params,
}: {
  params: Promise<{ orgId: string }>
}) {
  const { orgId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const isMember = await verifyOrgMembership(orgId)
  if (!isMember) {
    redirect('/app')
  }

  // Create a draft invoice immediately and redirect to edit page with WYSIWYG editor
  const invoiceId = await createDraftInvoice(orgId)
  if (invoiceId) {
    redirect(`/app/org/${orgId}/invoices/${invoiceId}`)
  } else {
    redirect(`/app/org/${orgId}/invoices?error=${encodeURIComponent('Failed to create invoice')}`)
  }
}
