import { createClient } from '@/lib/supabase/server'
import { verifyOrgMembership } from '@/lib/utils-server'
import { redirect } from 'next/navigation'
import GenerateInvoicePage from '@/components/invoices/GenerateInvoicePage'

export default async function GenerateInvoicePageRoute({
  params,
}: {
  params: Promise<{ orgId: string; invoiceId: string }>
}) {
  const { orgId, invoiceId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const isMember = await verifyOrgMembership(orgId)
  if (!isMember) {
    redirect('/app')
  }

  // Get invoice with customer
  const { data: invoice } = await supabase
    .from('invoices')
    .select(`
      *,
      customers (*)
    `)
    .eq('id', invoiceId)
    .eq('org_id', orgId)
    .single()

  if (!invoice) {
    redirect(`/app/org/${orgId}/invoices`)
  }

  // Get invoice items
  const { data: items } = await supabase
    .from('invoice_items')
    .select('*')
    .eq('invoice_id', invoiceId)
    .eq('org_id', orgId)
    .order('sort_order')

  // Get org branding
  const { data: branding } = await supabase
    .from('org_branding')
    .select('*')
    .eq('org_id', orgId)
    .single()

  // Get available templates (global templates + org-specific templates)
  const { data: templates } = await supabase
    .from('invoice_templates')
    .select('*')
    .or(`org_id.is.null,org_id.eq.${orgId}`)
    .order('is_default', { ascending: false })
    .order('name')

  // Get organization details
  const { data: org } = await supabase
    .from('organizations')
    .select('name')
    .eq('id', orgId)
    .single()

  return (
    <GenerateInvoicePage
      invoice={invoice}
      items={items || []}
      templates={templates || []}
      branding={branding}
      orgId={orgId}
      invoiceId={invoiceId}
      orgName={org?.name || 'Organization'}
    />
  )
}
