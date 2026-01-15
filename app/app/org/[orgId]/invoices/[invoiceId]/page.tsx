import { createClient } from '@/lib/supabase/server'
import { verifyOrgMembership } from '@/lib/utils-server'
import { redirect } from 'next/navigation'
import WYSIWYGInvoiceEditor from '@/components/invoices/WYSIWYGInvoiceEditor'

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

  // Get customers for dropdown
  const { data: customers } = await supabase
    .from('customers')
    .select('*')
    .eq('org_id', orgId)
    .order('name')

  // Get org branding
  const { data: branding } = await supabase
    .from('org_branding')
    .select('*')
    .eq('org_id', orgId)
    .single()

  // Get print-ready templates (Classic, Modern Minimal, Professional Classic, Bold Contemporary)
  const { data: allTemplates } = await supabase
    .from('invoice_templates')
    .select('*')
    .or(`org_id.is.null,org_id.eq.${orgId}`)
    .order('is_default', { ascending: false })
    .order('name')
  
  // Filter to only print-ready templates
  const templates = (allTemplates || []).filter(t => {
    const name = t.name?.toLowerCase() || ''
    const layout = t.config_json?.layout?.toLowerCase() || ''
    return (
      name.includes('classic') ||
      name.includes('modern minimal') ||
      name.includes('professional classic') ||
      name.includes('bold contemporary') ||
      layout === 'professional-classic' ||
      layout === 'modern-minimal' ||
      layout === 'bold-contemporary'
    )
  })

  return (
    <WYSIWYGInvoiceEditor
      invoice={invoice}
      items={items || []}
      customers={customers || []}
      orgId={orgId}
      branding={branding}
      templates={templates || []}
    />
  )
}
