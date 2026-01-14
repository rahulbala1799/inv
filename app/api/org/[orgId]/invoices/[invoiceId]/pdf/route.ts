import { createClient } from '@/lib/supabase/server'
import { verifyOrgMembership } from '@/lib/utils-server'
import { NextResponse } from 'next/server'
import { renderToStream } from '@react-pdf/renderer'
import InvoicePDF from '@/lib/pdf/InvoicePdf'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orgId: string; invoiceId: string }> }
) {
  const { orgId, invoiceId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const isMember = await verifyOrgMembership(orgId)
  if (!isMember) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
  }

  // Fetch invoice with customer
  const { data: invoice, error: invoiceError } = await supabase
    .from('invoices')
    .select(`
      *,
      customers (*)
    `)
    .eq('id', invoiceId)
    .eq('org_id', orgId)
    .single()

  if (invoiceError || !invoice) {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
  }

  // Fetch invoice items
  const { data: items } = await supabase
    .from('invoice_items')
    .select('*')
    .eq('invoice_id', invoiceId)
    .eq('org_id', orgId)
    .order('sort_order')

  // Fetch org branding
  const { data: branding } = await supabase
    .from('org_branding')
    .select('*')
    .eq('org_id', orgId)
    .single()

  // Fetch template if specified (check both invoice.template_id and query param)
  const { searchParams } = new URL(request.url)
  const templateIdFromQuery = searchParams.get('template')
  const templateId = templateIdFromQuery || invoice.template_id
  
  let template = null
  if (templateId) {
    const { data: templateData } = await supabase
      .from('invoice_templates')
      .select('*')
      .eq('id', templateId)
      .single()
    template = templateData
    
    // If template was passed via query param but not saved to invoice, save it
    if (templateData && templateIdFromQuery && !invoice.template_id) {
      await supabase
        .from('invoices')
        .update({ template_id: templateId })
        .eq('id', invoiceId)
    }
  } else {
    // If no template specified, use default template
    // First try org-specific default
    let { data: defaultTemplate } = await supabase
      .from('invoice_templates')
      .select('*')
      .eq('org_id', orgId)
      .eq('is_default', true)
      .maybeSingle()

    // If no org-specific default, use global default
    if (!defaultTemplate) {
      const { data: globalTemplate } = await supabase
        .from('invoice_templates')
        .select('*')
        .is('org_id', null)
        .eq('is_default', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()
      defaultTemplate = globalTemplate
    }
    template = defaultTemplate
  }

  // Get logo URL if available
  let logoUrl: string | null = null
  if (branding?.logo_storage_path) {
    const { data: { publicUrl } } = supabase.storage
      .from('logos')
      .getPublicUrl(branding.logo_storage_path)
    logoUrl = publicUrl
  }

  // Generate PDF
  try {
    const pdfStream = await renderToStream(
      InvoicePDF({
        invoice,
        items: items || [],
        branding: branding ? { ...branding, logoUrl } : null,
        template: template || null,
      })
    )

    const chunks: Buffer[] = []
    for await (const chunk of pdfStream) {
      chunks.push(Buffer.from(chunk))
    }

    const pdfBuffer = Buffer.concat(chunks)

    // Check if download is explicitly requested
    const { searchParams } = new URL(request.url)
    const isDownload = searchParams.get('download') === 'true'

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': isDownload 
          ? `attachment; filename="invoice-${invoice.invoice_number}.pdf"`
          : `inline; filename="invoice-${invoice.invoice_number}.pdf"`,
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}
