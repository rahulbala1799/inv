'use client'

import { useState } from 'react'
import LogoUpload from './LogoUpload'
'use client'

import { useState } from 'react'
import LogoUpload from './LogoUpload'
import { updateBranding } from '@/app/app/org/[orgId]/settings/actions'

interface OrganizationSettingsFormProps {
  orgId: string
  branding: {
    business_name?: string | null
    vat_number?: string | null
    address_line1?: string | null
    address_line2?: string | null
    city?: string | null
    county?: string | null
    postcode?: string | null
    country?: string | null
    logo_storage_path?: string | null
    default_currency?: string | null
  } | null
  logoUrl: string | null
}

export default function OrganizationSettingsForm({
  orgId,
  branding,
  logoUrl,
}: OrganizationSettingsFormProps) {
  const [logoPath, setLogoPath] = useState(branding?.logo_storage_path || '')

  return (
    <form action={updateBranding} className="space-y-6">
      <input type="hidden" name="orgId" value={orgId} />
      <input type="hidden" name="logo_storage_path" id="logo_storage_path" value={logoPath} />

      {/* Logo Upload */}
      <LogoUpload
        orgId={orgId}
        currentLogoUrl={logoUrl}
        logoPathInputId="logo_storage_path"
        onUploadComplete={(path) => {
          setLogoPath(path)
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
  )
}
