import { createClient } from '@/lib/supabase/server'
import { verifyOrgMembership } from '@/lib/utils-server'
import { redirect } from 'next/navigation'
import InvoiceEditor from './InvoiceEditor'

export default async function InvoiceDetailPage({
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

  // Get customers and templates for dropdowns
  const { data: customers } = await supabase
    .from('customers')
    .select('id, name')
    .eq('org_id', orgId)
    .order('name')

  const { data: templates } = await supabase
    .from('invoice_templates')
    .select('id, name, is_default')
    .or(`org_id.is.null,org_id.eq.${orgId}`)
    .order('is_default', { ascending: false })

  return (
    <InvoiceEditor
      invoice={invoice}
      items={items || []}
      customers={customers || []}
      templates={templates || []}
      orgId={orgId}
    />
  )
}
