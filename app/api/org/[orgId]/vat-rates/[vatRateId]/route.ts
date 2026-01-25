import { createClient } from '@/lib/supabase/server'
import { verifyOrgMembership } from '@/lib/utils-server'
import { NextResponse } from 'next/server'

// PUT: Update VAT rate
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ orgId: string; vatRateId: string }> }
) {
  const { orgId, vatRateId } = await params
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
  const { rate, is_default, is_active } = body

  // Build update object
  const updateData: any = {}

  if (rate !== undefined) {
    const rateNum = Number(rate)
    if (isNaN(rateNum) || rateNum < 0 || rateNum > 100) {
      return NextResponse.json({ error: 'Rate must be between 0 and 100' }, { status: 400 })
    }

    // Check if new rate already exists (excluding current record)
    const { data: existing } = await supabase
      .from('vat_rates')
      .select('id')
      .eq('org_id', orgId)
      .eq('rate', rateNum)
      .eq('is_active', true)
      .neq('id', vatRateId)
      .maybeSingle()

    if (existing) {
      return NextResponse.json({ error: 'A VAT rate with this percentage already exists' }, { status: 400 })
    }

    updateData.rate = rateNum
  }

  if (is_default !== undefined) {
    updateData.is_default = is_default

    // If setting as default, unset other defaults
    if (is_default) {
      await supabase
        .from('vat_rates')
        .update({ is_default: false })
        .eq('org_id', orgId)
        .eq('is_default', true)
        .neq('id', vatRateId)
    }
  }

  if (is_active !== undefined) {
    updateData.is_active = is_active
  }

  const { data: vatRate, error } = await supabase
    .from('vat_rates')
    .update(updateData)
    .eq('id', vatRateId)
    .eq('org_id', orgId)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  if (!vatRate) {
    return NextResponse.json({ error: 'VAT rate not found' }, { status: 404 })
  }

  return NextResponse.json({ vatRate })
}

// DELETE: Soft delete VAT rate
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ orgId: string; vatRateId: string }> }
) {
  const { orgId, vatRateId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const isMember = await verifyOrgMembership(orgId)
  if (!isMember) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
  }

  // Soft delete by setting is_active = false
  const { error } = await supabase
    .from('vat_rates')
    .update({ is_active: false })
    .eq('id', vatRateId)
    .eq('org_id', orgId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
