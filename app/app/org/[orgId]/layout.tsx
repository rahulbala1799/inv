import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { verifyOrgMembership } from '@/lib/utils-server'
import Link from 'next/link'

export default async function OrgLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ orgId: string }>
}) {
  const { orgId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Verify org membership
  const isMember = await verifyOrgMembership(orgId)
  if (!isMember) {
    redirect('/app')
  }

  // Check if organization needs onboarding (for newly created orgs)
  // Only redirect if business_name is not set (new orgs going forward)
  const { data: branding } = await supabase
    .from('org_branding')
    .select('business_name')
    .eq('org_id', orgId)
    .single()

  // If org doesn't have business_name, redirect to onboarding
  if (!branding?.business_name) {
    redirect(`/onboarding?orgId=${orgId}`)
  }

  // Get org name
  const { data: org } = await supabase
    .from('organizations')
    .select('name')
    .eq('id', orgId)
    .single()

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href={`/app/org/${orgId}/dashboard`} className="text-xl font-bold text-gray-900">
                Invoice App
              </Link>
              <div className="flex gap-4">
                <Link
                  href={`/app/org/${orgId}/dashboard`}
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href={`/app/org/${orgId}/customers`}
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Customers
                </Link>
                <Link
                  href={`/app/org/${orgId}/invoices`}
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Invoices
                </Link>
                <Link
                  href={`/app/org/${orgId}/settings`}
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Settings
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{org?.name}</span>
              <Link
                href="/app"
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Switch Org
              </Link>
              <form action={signOut}>
                <button
                  type="submit"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}

async function signOut() {
  'use server'
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
