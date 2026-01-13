import { createClient } from '@/lib/supabase/server'
import { verifyOrgMembership } from '@/lib/utils-server'
import { NextResponse } from 'next/server'

// PUT - Update customer
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ orgId: string; customerId: string }> }
) {
  const { orgId, customerId } = await params
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
    .update({
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
    .eq('id', customerId)
    .eq('org_id', orgId)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ customer })
}
