'use server'

import { createClient } from '@/lib/supabase/server'
import { verifyOrgMembership } from '@/lib/utils-server'
import { redirect } from 'next/navigation'

export async function createCustomer(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const orgId = formData.get('orgId') as string
  const isMember = await verifyOrgMembership(orgId)
  if (!isMember) {
    redirect('/app')
  }

  const { error } = await supabase
    .from('customers')
    .insert({
      org_id: orgId,
      name: 'New Customer',
    })

  if (error) {
    redirect(`/app/org/${orgId}/customers?error=${encodeURIComponent(error.message)}`)
  }

  redirect(`/app/org/${orgId}/customers`)
}

export async function deleteCustomer(formData: FormData) {
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
    .delete()
    .eq('id', customerId)
    .eq('org_id', orgId)

  if (error) {
    redirect(`/app/org/${orgId}/customers?error=${encodeURIComponent(error.message)}`)
  }

  redirect(`/app/org/${orgId}/customers`)
}
