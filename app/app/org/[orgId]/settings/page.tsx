import { createClient } from '@/lib/supabase/server'
import { verifyOrgMembership } from '@/lib/utils-server'
import { redirect } from 'next/navigation'
import { updateBranding } from './actions'
import LogoUpload from '@/components/settings/LogoUpload'

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ orgId: string }>
}) {
  const { orgId } = await params
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

      <div className="space-y-6">
        {/* Organization Settings Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Organization Settings</h2>
          <p className="text-sm text-gray-600 mb-6">
            Configure your company information that will appear on invoices
          </p>
          <form action={updateBranding} className="space-y-6">
            <input type="hidden" name="orgId" value={orgId} />
            <input type="hidden" name="logo_storage_path" id="logo_storage_path" value={branding?.logo_storage_path || ''} />

            {/* Logo Upload */}
            <LogoUpload
              orgId={orgId}
              currentLogoUrl={logoUrl}
              logoPathInputId="logo_storage_path"
              onUploadComplete={(logoPath) => {
                // This callback is handled internally by LogoUpload component
                // It updates the hidden input field automatically
              }}
            />

            <div>
              <label htmlFor="business_name" className="block text-sm font-medium text-gray-700 mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="business_name"
                name="business_name"
                defaultValue={branding?.business_name || ''}
                placeholder="Click to add company name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="address_line1" className="block text-sm font-medium text-gray-700 mb-2">
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="address_line1"
                name="address_line1"
                defaultValue={branding?.address_line1 || ''}
                placeholder="Click to add street address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="address_line2" className="block text-sm font-medium text-gray-700 mb-2">
                Address Line 2 <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <input
                type="text"
                id="address_line2"
                name="address_line2"
                defaultValue={branding?.address_line2 || ''}
                placeholder="Suite, unit, etc."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  defaultValue={branding?.city || ''}
                  placeholder="City"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="county" className="block text-sm font-medium text-gray-700 mb-2">
                  State/Province
                </label>
                <input
                  type="text"
                  id="county"
                  name="county"
                  defaultValue={branding?.county || ''}
                  placeholder="State"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-2">
                  Postal Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  defaultValue={branding?.postcode || ''}
                  placeholder="Postal code"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                defaultValue={branding?.country || ''}
                placeholder="Country"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="vat_number" className="block text-sm font-medium text-gray-700 mb-2">
                VAT/Tax ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="vat_number"
                name="vat_number"
                defaultValue={branding?.vat_number || ''}
                placeholder="Click to add VAT/Tax ID"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="default_currency" className="block text-sm font-medium text-gray-700 mb-2">
                Default Currency
              </label>
              <select
                id="default_currency"
                name="default_currency"
                defaultValue={branding?.default_currency || 'EUR'}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
              </select>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Save Organization Settings
              </button>
            </div>
          </form>
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
