import { createClient } from '@/lib/supabase/server'
import { verifyOrgMembership } from '@/lib/utils-server'
import { NextResponse } from 'next/server'

// GET: Get all active products for organization
export async function GET(
  request: Request,
  { params }: { params: Promise<{ orgId: string }> }
) {
  const { orgId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const isMember = await verifyOrgMembership(orgId)
  if (!isMember) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const includeInactive = searchParams.get('includeInactive') === 'true'
  const search = searchParams.get('search')

  let query = supabase
    .from('products')
    .select(`
      *,
      vat_rates (
        id,
        name,
        rate
      )
    `)
    .eq('org_id', orgId)
    .order('created_at', { ascending: false })

  if (!includeInactive) {
    query = query.eq('is_active', true)
  }

  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
  }

  const { data: products, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ products: products || [] })
}

// POST: Create new product
export async function POST(
  request: Request,
  { params }: { params: Promise<{ orgId: string }> }
) {
  const { orgId } = await params
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
  const { name, description, unit_price, vat_rate_id, currency } = body

  // Validate required fields
  if (!name || name.trim().length === 0) {
    return NextResponse.json({ error: 'Product name is required' }, { status: 400 })
  }

  if (unit_price === undefined || unit_price === null) {
    return NextResponse.json({ error: 'Unit price is required' }, { status: 400 })
  }

  const priceNum = Number(unit_price)
  if (isNaN(priceNum) || priceNum < 0) {
    return NextResponse.json({ error: 'Unit price must be a positive number' }, { status: 400 })
  }

  // Check if product name already exists for this org
  const { data: existing } = await supabase
    .from('products')
    .select('id')
    .eq('org_id', orgId)
    .eq('name', name.trim())
    .eq('is_active', true)
    .maybeSingle()

  if (existing) {
    return NextResponse.json({ error: 'A product with this name already exists' }, { status: 400 })
  }

  // Verify VAT rate belongs to this org if provided
  if (vat_rate_id) {
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

  // Get default currency from org branding if not provided
  let productCurrency = currency || 'EUR'
  if (!currency) {
    const { data: branding } = await supabase
      .from('org_branding')
      .select('default_currency')
      .eq('org_id', orgId)
      .single()

    if (branding?.default_currency) {
      productCurrency = branding.default_currency
    }
  }

  // Insert new product
  const { data: product, error } = await supabase
    .from('products')
    .insert({
      org_id: orgId,
      name: name.trim(),
      description: description?.trim() || null,
      unit_price: priceNum,
      vat_rate_id: vat_rate_id || null,
      currency: productCurrency,
      is_active: true,
    })
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

  return NextResponse.json({ product })
}
