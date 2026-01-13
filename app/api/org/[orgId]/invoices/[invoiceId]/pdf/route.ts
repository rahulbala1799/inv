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

  // Fetch template if specified
  let template = null
  if (invoice.template_id) {
    const { data: templateData } = await supabase
      .from('invoice_templates')
      .select('*')
      .eq('id', invoice.template_id)
      .single()
    template = templateData
  }

  // Generate PDF
  try {
    const pdfStream = await renderToStream(
      InvoicePDF({
        invoice,
        items: items || [],
        branding: branding || null,
        template: template || null,
      })
    )

    const chunks: Buffer[] = []
    for await (const chunk of pdfStream) {
      chunks.push(Buffer.from(chunk))
    }

    const pdfBuffer = Buffer.concat(chunks)

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="invoice-${invoice.invoice_number}.pdf"`,
      },
    })
  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}
