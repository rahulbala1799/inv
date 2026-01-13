import { createClient } from '@/lib/supabase/server'
import { verifyOrgMembership } from '@/lib/utils-server'
import { NextResponse } from 'next/server'

// GET - Search customers
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
  const search = searchParams.get('search') || ''

  let query = supabase
    .from('customers')
    .select('*')
    .eq('org_id', orgId)

  if (search) {
    query = query.ilike('name', `%${search}%`)
  }

  const { data: customers, error } = await query.order('name').limit(20)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ customers: customers || [] })
}

// POST - Create new customer
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
  const { name, email, phone, address_line1, address_line2, city, postcode, country, vat_number } = body

  if (!name || name.trim() === '') {
    return NextResponse.json({ error: 'Customer name is required' }, { status: 400 })
  }

  const { data: customer, error } = await supabase
    .from('customers')
    .insert({
      org_id: orgId,
      name: name.trim(),
      email: email?.trim() || null,
      phone: phone?.trim() || null,
      address_line1: address_line1?.trim() || null,
      address_line2: address_line2?.trim() || null,
      city: city?.trim() || null,
      postcode: postcode?.trim() || null,
      country: country?.trim() || null,
      vat_number: vat_number?.trim() || null,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ customer })
}
