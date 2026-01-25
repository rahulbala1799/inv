import { createClient } from '@/lib/supabase/server'
import { verifyOrgMembership } from '@/lib/utils-server'
import { redirect } from 'next/navigation'
import OrganizationSettingsForm from '@/components/settings/OrganizationSettingsForm'
import VatRatesManager from '@/components/settings/VatRatesManager'

export default async function SettingsPage({
  params,
  searchParams,
}: {
  params: Promise<{ orgId: string }>
  searchParams: Promise<{ error?: string; success?: string }>
}) {
  const { orgId } = await params
  const { error: errorParam, success: successParam } = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const isMember = await verifyOrgMembership(orgId)
  if (!isMember) {
    redirect('/app')
  }

  // Get branding
  const { data: branding } = await supabase
    .from('org_branding')
    .select('*')
    .eq('org_id', orgId)
    .single()

  // Get logo URL if exists
  let logoUrl: string | null = null
  if (branding?.logo_storage_path) {
    try {
      const { data: { publicUrl } } = supabase.storage
        .from('logos')
        .getPublicUrl(branding.logo_storage_path)
      logoUrl = publicUrl
    } catch (error) {
      console.error('Error getting logo URL:', error)
    }
  }

  // Get templates
  const { data: templates } = await supabase
    .from('invoice_templates')
    .select('*')
    .or(`org_id.is.null,org_id.eq.${orgId}`)
    .order('is_default', { ascending: false })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your organization settings and preferences</p>
      </div>

      {/* Success/Error Messages */}
      {successParam && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">{successParam}</p>
        </div>
      )}
      {errorParam && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">Error: {errorParam}</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Organization Settings Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Organization Settings</h2>
          <p className="text-sm text-gray-600 mb-6">
            Configure your company information that will appear on invoices
          </p>
          <OrganizationSettingsForm orgId={orgId} branding={branding} logoUrl={logoUrl} />
        </div>

        {/* VAT Rates Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <VatRatesManager orgId={orgId} />
        </div>

        {/* Templates Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Invoice Templates</h2>
          <div className="space-y-2">
            {templates && templates.length > 0 ? (
              templates.map((template) => (
                <div
                  key={template.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div>
                    <span className="font-medium">{template.name}</span>
                    {template.is_default && (
                      <span className="ml-2 text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                    {!template.org_id && (
                      <span className="ml-2 text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        Global
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No templates available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
