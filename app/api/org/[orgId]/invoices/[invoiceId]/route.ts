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
  const { invoice, items } = body

  // Update invoice
  const { error: invoiceError } = await supabase
    .from('invoices')
    .update({
      customer_id: invoice.customer_id,
      issue_date: invoice.issue_date,
      due_date: invoice.due_date,
      status: invoice.status,
      subtotal: invoice.subtotal,
      tax_total: invoice.tax_total,
      total: invoice.total,
      notes: invoice.notes,
      template_id: invoice.template_id,
    })
    .eq('id', invoiceId)
    .eq('org_id', orgId)

  if (invoiceError) {
    return NextResponse.json({ error: invoiceError.message }, { status: 400 })
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

  return NextResponse.json({ success: true })
}
