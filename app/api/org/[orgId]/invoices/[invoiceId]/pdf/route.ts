import { createClient } from '@/lib/supabase/server'
import { verifyOrgMembership } from '@/lib/utils-server'
import { NextResponse } from 'next/server'
import { generatePdfFromHtml } from '@/lib/pdf/generatePdfFromHtml'

// Set max duration for PDF generation (30 seconds)
export const maxDuration = 30

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
    // Ensure items is an array
    const invoiceItems = items && Array.isArray(items) ? items : []
    
    // Log for debugging (remove in production if needed)
    console.log('PDF Generation (HTML-to-PDF):', {
      invoiceId,
      itemsCount: invoiceItems.length,
      hasBranding: !!branding,
      hasTemplate: !!template,
      hasCustomer: !!invoice.customers,
      templateLayout: template?.config_json?.layout || 'classic-blue',
    })

    // Dynamically import React and rendering utilities (only at runtime)
    const React = (await import('react')).default
    const { renderToStaticMarkup } = await import('react-dom/server')
    const InvoiceHTMLTemplate = (await import('@/lib/pdf/InvoiceHtmlTemplate')).default
    
    // Render React component to HTML string (server-only, runtime only)
    const htmlString = '<!DOCTYPE html>' + renderToStaticMarkup(
      React.createElement(InvoiceHTMLTemplate, {
        invoice,
        items: invoiceItems,
        branding: branding ? { ...branding, logoUrl } : null,
        template: template || null,
      })
    )

    // Generate PDF from HTML using Puppeteer
    const pdfBuffer = await generatePdfFromHtml(htmlString)

    // Check if download is explicitly requested
    const { searchParams } = new URL(request.url)
    const isDownload = searchParams.get('download') === 'true'

    return new NextResponse(pdfBuffer as any, {
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
    return NextResponse.json({ 
      error: 'Failed to generate PDF',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
