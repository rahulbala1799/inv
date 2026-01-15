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

  // Get the 3 print-ready templates (Modern Minimal, Professional Classic, Bold Contemporary)
  // Query by name OR layout to ensure all templates are found
  const { data: allTemplates } = await supabase
    .from('invoice_templates')
    .select('*')
    .or(`org_id.is.null,org_id.eq.${orgId}`)
    .order('name')
  
  // Filter to show only the 3 print-ready templates
  const templates = allTemplates?.filter(template => {
    const name = template.name?.toLowerCase() || ''
    const layout = template.config_json?.layout?.toLowerCase() || ''
    return (
      name.includes('modern minimal') || layout === 'modern-minimal' ||
      name.includes('professional classic') || layout === 'professional-classic' ||
      name.includes('bold contemporary') || layout === 'bold-contemporary'
    )
  }) || []

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
