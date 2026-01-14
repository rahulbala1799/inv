'use server'

import { createClient } from '@/lib/supabase/server'
import { verifyOrgMembership } from '@/lib/utils-server'
import { redirect } from 'next/navigation'

export async function updateBranding(formData: FormData) {
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

  // Check if branding exists
  const { data: existing } = await supabase
    .from('org_branding')
    .select('id')
    .eq('org_id', orgId)
    .single()

  const brandingData = {
    org_id: orgId,
    business_name: formData.get('business_name') as string || null,
    vat_number: formData.get('vat_number') as string || null,
    address_line1: formData.get('address_line1') as string || null,
    address_line2: formData.get('address_line2') as string || null,
    city: formData.get('city') as string || null,
    county: formData.get('county') as string || null,
    postcode: formData.get('postcode') as string || null,
    country: formData.get('country') as string || null,
    logo_storage_path: formData.get('logo_storage_path') as string || null,
    default_currency: formData.get('default_currency') as string || 'EUR',
    bank_name: formData.get('bank_name') as string || null,
    bank_account_number: formData.get('bank_account_number') as string || null,
    bank_sort_code: formData.get('bank_sort_code') as string || null,
    bank_iban: formData.get('bank_iban') as string || null,
    bank_bic: formData.get('bank_bic') as string || null,
  }

  if (existing) {
    const { error } = await supabase
      .from('org_branding')
      .update(brandingData)
      .eq('org_id', orgId)
    
    if (error) {
      redirect(`/app/org/${orgId}/settings?error=${encodeURIComponent(error.message)}`)
    }
  } else {
    const { error } = await supabase
      .from('org_branding')
      .insert(brandingData)
    
    if (error) {
      redirect(`/app/org/${orgId}/settings?error=${encodeURIComponent(error.message)}`)
    }
  }

  redirect(`/app/org/${orgId}/settings?success=Organization settings saved successfully`)
}
