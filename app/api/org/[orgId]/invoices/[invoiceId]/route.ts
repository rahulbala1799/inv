import { createClient } from '@/lib/supabase/server'
import { verifyOrgMembership } from '@/lib/utils-server'
import { NextResponse } from 'next/server'

export async function PUT(
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

  const body = await request.json()
  const { invoice, items, template_id } = body

  // Determine template_id from either direct param or invoice object
  const templateIdToSet = template_id || invoice?.template_id

  // Prepare invoice update data
  const invoiceUpdateData: any = {}
  if (invoice) {
    invoiceUpdateData.invoice_number = invoice.invoice_number
    invoiceUpdateData.customer_id = invoice.customer_id
    invoiceUpdateData.issue_date = invoice.issue_date
    invoiceUpdateData.due_date = invoice.due_date
    invoiceUpdateData.status = invoice.status
    invoiceUpdateData.subtotal = invoice.subtotal
    invoiceUpdateData.tax_total = invoice.tax_total
    invoiceUpdateData.total = invoice.total
    invoiceUpdateData.notes = invoice.notes
    invoiceUpdateData.template_id = invoice.template_id
  }
  if (template_id !== undefined) {
    invoiceUpdateData.template_id = template_id
  }

  // Update invoice
  const { error: invoiceError } = await supabase
    .from('invoices')
    .update(invoiceUpdateData)
    .eq('id', invoiceId)
    .eq('org_id', orgId)

  if (invoiceError) {
    return NextResponse.json({ error: invoiceError.message }, { status: 400 })
  }

  // If a template was set, update the organization's default template
  if (templateIdToSet) {
    await supabase
      .from('org_branding')
      .update({ default_template_id: templateIdToSet })
      .eq('org_id', orgId)
  }

  // Delete existing items
  await supabase
    .from('invoice_items')
    .delete()
    .eq('invoice_id', invoiceId)
    .eq('org_id', orgId)

  // Insert new items
  if (items && items.length > 0) {
    const itemsToInsert = items.map((item: any, index: number) => ({
      org_id: orgId,
      invoice_id: invoiceId,
      description: item.description,
      quantity: item.quantity,
      unit_price: item.unit_price,
      tax_rate: item.tax_rate,
      line_total: item.line_total,
      sort_order: index,
    }))

    const { error: itemsError } = await supabase
      .from('invoice_items')
      .insert(itemsToInsert)

    if (itemsError) {
      return NextResponse.json({ error: itemsError.message }, { status: 400 })
    }
  }

  // Fetch updated invoice to return
  const { data: updatedInvoice } = await supabase
    .from('invoices')
    .select('*')
    .eq('id', invoiceId)
    .eq('org_id', orgId)
    .single()

  return NextResponse.json({ 
    success: true, 
    invoice: updatedInvoice 
  })
}
