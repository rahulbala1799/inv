import { createClient } from '@/lib/supabase/server'
import { verifyOrgMembership } from '@/lib/utils-server'
import { redirect } from 'next/navigation'
import { updateBranding } from './actions'

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
        <p className="text-gray-600">Manage your organization branding and templates</p>
      </div>

      <div className="space-y-6">
        {/* Branding Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Organization Branding</h2>
          <form action={updateBranding} className="space-y-4">
            <input type="hidden" name="orgId" value={orgId} />

            <div>
              <label htmlFor="business_name" className="block text-sm font-medium text-gray-700 mb-2">
                Business Name
              </label>
              <input
                type="text"
                id="business_name"
                name="business_name"
                defaultValue={branding?.business_name || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="vat_number" className="block text-sm font-medium text-gray-700 mb-2">
                VAT Number
              </label>
              <input
                type="text"
                id="vat_number"
                name="vat_number"
                defaultValue={branding?.vat_number || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="address_line1" className="block text-sm font-medium text-gray-700 mb-2">
                  Address Line 1
                </label>
                <input
                  type="text"
                  id="address_line1"
                  name="address_line1"
                  defaultValue={branding?.address_line1 || ''}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="address_line2" className="block text-sm font-medium text-gray-700 mb-2">
                  Address Line 2
                </label>
                <input
                  type="text"
                  id="address_line2"
                  name="address_line2"
                  defaultValue={branding?.address_line2 || ''}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  defaultValue={branding?.city || ''}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-2">
                  Postcode
                </label>
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  defaultValue={branding?.postcode || ''}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
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

            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Save Branding
            </button>
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
