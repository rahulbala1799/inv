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
  try {
    const invoiceId = await createDraftInvoice(orgId)
    redirect(`/app/org/${orgId}/invoices/${invoiceId}`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create invoice. Please try again.'
    redirect(`/app/org/${orgId}/invoices?error=${encodeURIComponent(errorMessage)}`)
  }
}
