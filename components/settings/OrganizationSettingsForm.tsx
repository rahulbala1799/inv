'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
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
    bank_name?: string | null
    bank_account_number?: string | null
    bank_sort_code?: string | null
    bank_iban?: string | null
    bank_bic?: string | null
  } | null
  logoUrl: string | null
}

export default function OrganizationSettingsForm({
  orgId,
  branding,
  logoUrl,
}: OrganizationSettingsFormProps) {
  const [logoPath, setLogoPath] = useState(branding?.logo_storage_path || '')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        await updateBranding(formData)
        // Refresh the page to show updated data
        router.refresh()
      } catch (error) {
        console.error('Error updating branding:', error)
      }
    })
  }

  return (
    <form action={handleSubmit} className="space-y-6">
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

      {/* Bank Details Section */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Bank Details</h3>
        <p className="text-sm text-gray-600 mb-4">
          Bank information that will appear on invoices for payment
        </p>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="bank_name" className="block text-sm font-medium text-gray-700 mb-2">
              Bank Name
            </label>
            <input
              type="text"
              id="bank_name"
              name="bank_name"
              defaultValue={branding?.bank_name || ''}
              placeholder="Bank name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="bank_account_number" className="block text-sm font-medium text-gray-700 mb-2">
                Account Number
              </label>
              <input
                type="text"
                id="bank_account_number"
                name="bank_account_number"
                defaultValue={branding?.bank_account_number || ''}
                placeholder="Account number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="bank_sort_code" className="block text-sm font-medium text-gray-700 mb-2">
                Sort Code
              </label>
              <input
                type="text"
                id="bank_sort_code"
                name="bank_sort_code"
                defaultValue={branding?.bank_sort_code || ''}
                placeholder="Sort code"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="bank_iban" className="block text-sm font-medium text-gray-700 mb-2">
                IBAN
              </label>
              <input
                type="text"
                id="bank_iban"
                name="bank_iban"
                defaultValue={branding?.bank_iban || ''}
                placeholder="IBAN"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="bank_bic" className="block text-sm font-medium text-gray-700 mb-2">
                BIC / SWIFT Code
              </label>
              <input
                type="text"
                id="bank_bic"
                name="bank_bic"
                defaultValue={branding?.bank_bic || ''}
                placeholder="BIC / SWIFT"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <button
          type="submit"
          disabled={isPending}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Saving...' : 'Save Organization Settings'}
        </button>
        {isPending && (
          <p className="mt-2 text-sm text-gray-600">Saving your changes...</p>
        )}
      </div>
    </form>
  )
}
