'use server'

import { createClient } from '@/lib/supabase/server'
import { verifyOrgMembership } from '@/lib/utils-server'
import { redirect } from 'next/navigation'

export async function updateCustomer(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const customerId = formData.get('customerId') as string
  const orgId = formData.get('orgId') as string

  const isMember = await verifyOrgMembership(orgId)
  if (!isMember) {
    redirect('/app')
  }

  const { error } = await supabase
    .from('customers')
    .update({
      name: formData.get('name') as string,
      email: formData.get('email') as string || null,
      phone: formData.get('phone') as string || null,
      address_line1: formData.get('address_line1') as string || null,
      address_line2: formData.get('address_line2') as string || null,
      city: formData.get('city') as string || null,
      postcode: formData.get('postcode') as string || null,
      country: formData.get('country') as string || null,
    })
    .eq('id', customerId)
    .eq('org_id', orgId)

  if (error) {
    redirect(`/app/org/${orgId}/customers?error=${encodeURIComponent(error.message)}`)
  }

  redirect(`/app/org/${orgId}/customers`)
}
