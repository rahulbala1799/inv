import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { checkOnboardingStatus } from './actions'
import OnboardingClient from './OnboardingClient'

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ orgId?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { orgId: orgIdParam } = await searchParams

  let orgId: string | null = null

  // If orgId is provided in query params, use it (for newly created orgs)
  if (orgIdParam) {
    // Verify user is a member of this org
    const { data: membership } = await supabase
      .from('org_members')
      .select('org_id')
      .eq('user_id', user.id)
      .eq('org_id', orgIdParam)
      .single()

    if (membership) {
      orgId = orgIdParam
    }
  }

  // If no orgId from params, find the newest organization without business_name
  if (!orgId) {
    const { data: orgs } = await supabase
      .from('org_members')
      .select(`
        org_id,
        organizations (
          id,
          name,
          created_at
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { foreignTable: 'organizations', ascending: false })

    if (!orgs || orgs.length === 0) {
      // No organization yet, redirect to create one
      redirect('/app')
    }

    // Find the first org without business_name (needs onboarding)
    for (const orgMember of orgs) {
      const currentOrgId = (orgMember as any).organizations.id
      const { data: branding } = await supabase
        .from('org_branding')
        .select('business_name')
        .eq('org_id', currentOrgId)
        .single()

      if (!branding?.business_name) {
        orgId = currentOrgId
        break
      }
    }

    // If all orgs have business_name, use the first one (for existing users)
    if (!orgId) {
      orgId = (orgs[0] as any).organizations.id
    }
  }

  // Ensure we have an orgId
  if (!orgId) {
    redirect('/app')
  }

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
