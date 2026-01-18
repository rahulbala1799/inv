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

  // Get all print-ready templates
  // Query by name OR layout to ensure all templates are found
  const { data: allTemplates } = await supabase
    .from('invoice_templates')
    .select('*')
    .or(`org_id.is.null,org_id.eq.${orgId}`)
    .order('name')
  
  // Filter to show print-ready templates (Modern Minimal, Professional Classic, Bold Contemporary, SaaS Professional, Editorial Magazine)
  const templates = allTemplates?.filter(template => {
    const name = template.name?.toLowerCase() || ''
    const layout = template.config_json?.layout?.toLowerCase() || ''
    return (
      name.includes('modern minimal') || layout === 'modern-minimal' ||
      name.includes('professional classic') || layout === 'professional-classic' ||
      name.includes('bold contemporary') || layout === 'bold-contemporary' ||
      name.includes('saas professional') || layout === 'saas-professional' ||
      name.includes('editorial magazine') || layout === 'editorial-magazine' ||
      layout === 'template-4' || layout === 'template-5'
    )
  }) || []

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
