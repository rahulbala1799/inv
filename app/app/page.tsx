import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import CreateOrgForm from './CreateOrgForm'

export default async function AppPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { error: errorParam } = await searchParams

  // Get user's organizations
  const { data: orgs } = await supabase
    .from('org_members')
    .select(`
      org_id,
      role,
      organizations (
        id,
        name,
        created_at
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { foreignTable: 'organizations', ascending: false })

  const organizations = orgs?.map((om: any) => ({
    id: om.organizations.id,
    name: om.organizations.name,
    role: om.role,
  })) || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Organizations</h1>
          <p className="text-gray-600 mb-8">Select an organization to get started</p>

          {errorParam && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {decodeURIComponent(errorParam)}
            </div>
          )}

          {organizations.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <p className="text-gray-600 mb-6">You don&apos;t have any organizations yet.</p>
              <CreateOrgForm />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {organizations.map((org) => (
                <Link
                  key={org.id}
                  href={`/app/org/${org.id}/dashboard`}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{org.name}</h2>
                  <p className="text-sm text-gray-500">Role: {org.role}</p>
                </Link>
              ))}
            </div>
          )}

          {organizations.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Organization</h2>
              <CreateOrgForm />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

