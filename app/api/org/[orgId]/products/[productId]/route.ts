import { createClient } from '@/lib/supabase/server'
import { verifyOrgMembership } from '@/lib/utils-server'
import { NextResponse } from 'next/server'

// PUT: Update product
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ orgId: string; productId: string }> }
) {
  const { orgId, productId } = await params
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
  const { name, description, unit_price, vat_rate_id, currency, is_active } = body

  // Build update object
  const updateData: any = {}

  if (name !== undefined) {
    if (!name || name.trim().length === 0) {
      return NextResponse.json({ error: 'Product name cannot be empty' }, { status: 400 })
    }

    // Check if new name already exists (excluding current record)
    const { data: existing } = await supabase
      .from('products')
      .select('id')
      .eq('org_id', orgId)
      .eq('name', name.trim())
      .eq('is_active', true)
      .neq('id', productId)
      .maybeSingle()

    if (existing) {
      return NextResponse.json({ error: 'A product with this name already exists' }, { status: 400 })
    }

    updateData.name = name.trim()
  }

  if (description !== undefined) {
    updateData.description = description?.trim() || null
  }

  if (unit_price !== undefined) {
    const priceNum = Number(unit_price)
    if (isNaN(priceNum) || priceNum < 0) {
      return NextResponse.json({ error: 'Unit price must be a positive number' }, { status: 400 })
    }
    updateData.unit_price = priceNum
  }

  if (vat_rate_id !== undefined) {
    if (vat_rate_id) {
      // Verify VAT rate belongs to this org
      const { data: vatRate } = await supabase
        .from('vat_rates')
        .select('id')
        .eq('id', vat_rate_id)
        .eq('org_id', orgId)
        .eq('is_active', true)
        .single()

      if (!vatRate) {
        return NextResponse.json({ error: 'Invalid VAT rate' }, { status: 400 })
      }
    }
    updateData.vat_rate_id = vat_rate_id || null
  }

  if (currency !== undefined) {
    updateData.currency = currency
  }

  if (is_active !== undefined) {
    updateData.is_active = is_active
  }

  const { data: product, error } = await supabase
    .from('products')
    .update(updateData)
    .eq('id', productId)
    .eq('org_id', orgId)
    .select(`
      *,
      vat_rates (
        id,
        name,
        rate
      )
    `)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }

  return NextResponse.json({ product })
}

// DELETE: Soft delete product
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ orgId: string; productId: string }> }
) {
  const { orgId, productId } = await params
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
    .from('products')
    .update({ is_active: false })
    .eq('id', productId)
    .eq('org_id', orgId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
