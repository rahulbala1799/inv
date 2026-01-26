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

  // Fetch invoice items WITH product data if product_id exists
  // Use left join (default) to include items even if they don't have products
  const { data: items, error: itemsError } = await supabase
    .from('invoice_items')
    .select(`
      *,
      products (
        id,
        name,
        description
      )
    `)
    .eq('invoice_id', invoiceId)
    .eq('org_id', orgId)
    .order('sort_order')
  
  // If query failed, log error but continue with empty array
  if (itemsError) {
    console.error('Error fetching invoice items:', itemsError)
  }
  
  // Use items from query (will be null/undefined if error, empty array if no items)
  const finalItems = items || []

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
  
  // Get customization parameters
  const fontStyle = searchParams.get('fontStyle') || 'normal'
  const fontSize = searchParams.get('fontSize') || 'normal'
  const customization = {
    fontStyle: fontStyle as 'normal' | 'classic' | 'round',
    fontSize: fontSize as 'small' | 'normal' | 'medium',
    colors: {
      primary: searchParams.get('color_primary') || undefined,
      secondary: searchParams.get('color_secondary') || undefined,
      background: searchParams.get('color_background') || undefined,
      neutral: searchParams.get('color_neutral') || undefined,
      heading: searchParams.get('color_heading') || undefined,
      body: searchParams.get('color_body') || undefined,
    },
  }
  
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
    // If no template specified, use organization's default template
    // Priority: org_branding.default_template_id > fallback to Modern Minimal
    let defaultTemplate = null
    
    if (branding?.default_template_id) {
      // Use the organization's default template
      const { data: orgDefaultTemplate } = await supabase
        .from('invoice_templates')
        .select('*')
        .eq('id', branding.default_template_id)
        .maybeSingle()
      
      if (orgDefaultTemplate) {
        defaultTemplate = orgDefaultTemplate
      }
    }
    
    // Fallback to Modern Minimal if no org default is set
    if (!defaultTemplate) {
      const { data: modernMinimalTemplate } = await supabase
        .from('invoice_templates')
        .select('*')
        .is('org_id', null)
        .ilike('name', 'Modern Minimal')
        .maybeSingle()
      
      if (modernMinimalTemplate) {
        defaultTemplate = modernMinimalTemplate
      } else {
        // Final fallback: try to find any of the print-ready templates
        const { data: printReadyTemplate } = await supabase
          .from('invoice_templates')
          .select('*')
          .is('org_id', null)
          .in('name', ['Modern Minimal', 'Professional Classic', 'Bold Contemporary', 'SaaS Professional', 'Editorial Magazine'])
          .limit(1)
          .maybeSingle()
        defaultTemplate = printReadyTemplate
      }
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

  // Ensure items is an array and enrich with product data if available
  const invoiceItems = finalItems && Array.isArray(finalItems) ? finalItems.map((item: any) => {
    // Handle product data - Supabase returns products as object (not array) for foreign key relationships
    // But handle both cases for safety
    let productData = null
    if (item.products) {
      productData = Array.isArray(item.products) ? item.products[0] : item.products
    }
    
    // If product_id exists and we have product data, use product name + description
    if (item.product_id && productData && productData.name) {
      return {
        ...item,
        description: productData.name,
        product_description: productData.description || null,
      }
    }
    // Otherwise, use the typed description as-is (fallback to item.description)
    return {
      ...item,
      description: item.description || '', // Ensure description is always a string
      product_description: null, // Ensure product_description is always set
    }
  }) : []

  // Dynamically import React and rendering utilities (only at runtime)
  const React = (await import('react')).default
  const { renderToStaticMarkup } = await import('react-dom/server')
  const InvoiceHTMLTemplate = (await import('@/lib/pdf/InvoiceHtmlTemplate')).default

  // Render HTML (used for both HTML preview and PDF)
  const htmlString = '<!DOCTYPE html>' + renderToStaticMarkup(
    React.createElement(InvoiceHTMLTemplate, {
      invoice,
      items: invoiceItems,
      branding: branding ? { ...branding, logoUrl } : null,
      template: template || null,
      customization,
    })
  )

  const formatHtml = searchParams.get('format') === 'html'
  const isDownload = searchParams.get('download') === 'true'

  // HTML preview: return HTML for iframe (no Chromium needed – works in serverless)
  if (formatHtml) {
    return new NextResponse(htmlString, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  }

  // Generate PDF (requires Chromium; set CHROMIUM_REMOTE_EXEC_PATH on Vercel)
  try {
    console.log('PDF Generation (HTML-to-PDF):', {
      invoiceId,
      itemsCount: invoiceItems.length,
      hasBranding: !!branding,
      hasTemplate: !!template,
    })

    const pdfBuffer = await generatePdfFromHtml(htmlString)

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
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 })
  }
}
