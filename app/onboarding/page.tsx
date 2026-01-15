import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { checkOnboardingStatus } from './actions'
import OnboardingClient from './OnboardingClient'

export default async function OnboardingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get user's first organization
  const { data: orgs } = await supabase
    .from('org_members')
    .select(`
      org_id,
      organizations (
        id,
        name
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { foreignTable: 'organizations', ascending: true })
    .limit(1)

  if (!orgs || orgs.length === 0) {
    // No organization yet, redirect to create one
    redirect('/app')
  }

  const orgId = (orgs[0] as any).organizations.id

  // Check if onboarding is needed
  const { needsOnboarding, redirect: redirectTo } = await checkOnboardingStatus(orgId)

  if (redirectTo) {
    redirect(redirectTo)
  }

  if (!needsOnboarding) {
    // Already completed onboarding, redirect to dashboard
    redirect(`/app/org/${orgId}/dashboard`)
  }

  // Get current branding to check VAT status
  const { data: branding } = await supabase
    .from('org_branding')
    .select('charges_vat')
    .eq('org_id', orgId)
    .single()

  return (
    <OnboardingClient orgId={orgId} initialChargesVat={branding?.charges_vat || false} />
  )
}
