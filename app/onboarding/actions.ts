'use server'

import { createClient } from '@/lib/supabase/server'
import { verifyOrgMembership } from '@/lib/utils-server'
import { redirect } from 'next/navigation'

export async function saveOrganizationSettings(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const orgId = formData.get('orgId') as string
  if (!orgId) {
    return { error: 'Organization ID is required' }
  }

  const isMember = await verifyOrgMembership(orgId)
  if (!isMember) {
    return { error: 'Not authorized' }
  }

  // Check if branding exists
  const { data: existing } = await supabase
    .from('org_branding')
    .select('id')
    .eq('org_id', orgId)
    .single()

  const chargesVat = formData.get('charges_vat') === 'true'
  const vatNumber = chargesVat ? (formData.get('vat_number') as string || null) : null

  const brandingData = {
    org_id: orgId,
    business_name: formData.get('business_name') as string || null,
    address_line1: formData.get('address_line1') as string || null,
    address_line2: formData.get('address_line2') as string || null,
    city: formData.get('city') as string || null,
    county: formData.get('county') as string || null,
    postcode: formData.get('postcode') as string || null,
    country: formData.get('country') as string || null,
    default_currency: formData.get('default_currency') as string || 'EUR',
    charges_vat: chargesVat,
    vat_number: vatNumber,
  }

  if (existing) {
    const { error } = await supabase
      .from('org_branding')
      .update(brandingData)
      .eq('org_id', orgId)

    if (error) {
      console.error('Error updating branding:', error)
      return { error: error.message || 'Failed to update organization settings' }
    }
  } else {
    const { error } = await supabase
      .from('org_branding')
      .insert(brandingData)

    if (error) {
      console.error('Error creating branding:', error)
      return { error: error.message || 'Failed to create organization settings' }
    }
  }

  return { success: true }
}

export async function checkOnboardingStatus(orgId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { needsOnboarding: false, redirect: '/login' }
  }

  const isMember = await verifyOrgMembership(orgId)
  if (!isMember) {
    return { needsOnboarding: false, redirect: '/app' }
  }

  // Check if organization has completed onboarding
  // Onboarding is complete if business_name is set
  const { data: branding } = await supabase
    .from('org_branding')
    .select('business_name')
    .eq('org_id', orgId)
    .single()

  const needsOnboarding = !branding?.business_name

  return { needsOnboarding, orgId }
}
