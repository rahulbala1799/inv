'use client'

import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { Loader2, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import CurrencySelect from './CurrencySelect'
import { DEFAULT_CURRENCY } from '@/lib/constants/currencies'

interface OrganizationSetupStepProps {
  orgId: string
  onComplete: (data: {
    business_name: string
    address_line1?: string
    address_line2?: string
    city?: string
    county?: string
    postcode?: string
    country?: string
    default_currency: string
    charges_vat: boolean
    vat_number?: string
  }) => void
}

export default function OrganizationSetupStep({
  orgId,
  onComplete,
}: OrganizationSetupStepProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  
  const [businessName, setBusinessName] = useState('')
  const [addressLine1, setAddressLine1] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [city, setCity] = useState('')
  const [county, setCounty] = useState('')
  const [postcode, setPostcode] = useState('')
  const [country, setCountry] = useState('')
  const [defaultCurrency, setDefaultCurrency] = useState(DEFAULT_CURRENCY)
  const [chargesVat, setChargesVat] = useState<string>('')
  const [vatNumber, setVatNumber] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!businessName.trim()) {
      setError('Business name is required')
      return
    }

    if (businessName.trim().length < 2) {
      setError('Business name must be at least 2 characters')
      return
    }

    if (!chargesVat) {
      setError('Please select whether you charge VAT')
      return
    }

    if (!defaultCurrency) {
      setError('Please select a default currency')
      return
    }

    startTransition(async () => {
      try {
        const formData = new FormData()
        formData.append('orgId', orgId)
        formData.append('business_name', businessName.trim())
        formData.append('address_line1', addressLine1.trim() || '')
        formData.append('address_line2', addressLine2.trim() || '')
        formData.append('city', city.trim() || '')
        formData.append('county', county.trim() || '')
        formData.append('postcode', postcode.trim() || '')
        formData.append('country', country.trim() || '')
        formData.append('default_currency', defaultCurrency)
        formData.append('charges_vat', chargesVat === 'yes' ? 'true' : 'false')
        formData.append('vat_number', chargesVat === 'yes' ? (vatNumber.trim() || '') : '')

        const response = await fetch('/api/onboarding/organization', {
          method: 'POST',
          body: formData,
        })

        const result = await response.json()

        if (!response.ok) {
          setError(result.error || 'Failed to save organization settings')
          return
        }

        onComplete({
          business_name: businessName.trim(),
          address_line1: addressLine1.trim() || undefined,
          address_line2: addressLine2.trim() || undefined,
          city: city.trim() || undefined,
          county: county.trim() || undefined,
          postcode: postcode.trim() || undefined,
          country: country.trim() || undefined,
          default_currency: defaultCurrency,
          charges_vat: chargesVat === 'yes',
          vat_number: chargesVat === 'yes' ? (vatNumber.trim() || undefined) : undefined,
        })
      } catch (err) {
        setError('An unexpected error occurred. Please try again.')
        console.error('Error saving organization settings:', err)
      }
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white shadow-xl rounded-2xl">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-semibold">Organization Details</CardTitle>
          <CardDescription>Tell us about your business</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="business_name" className="text-sm font-medium text-gray-700">
                Business Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="business_name"
                name="business_name"
                placeholder="Enter your business name"
                className="h-12 text-base"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="default_currency" className="text-sm font-medium text-gray-700">
                Default Currency <span className="text-red-500">*</span>
              </Label>
              <CurrencySelect
                value={defaultCurrency}
                onValueChange={setDefaultCurrency}
                disabled={isPending}
              />
            </div>

            <div className="space-y-4">
              <Label className="text-sm font-medium text-gray-700">
                Address (Optional)
              </Label>
              <div className="space-y-4">
                <Input
                  placeholder="Address Line 1"
                  className="h-12"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                />
                <Input
                  placeholder="Address Line 2"
                  className="h-12"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="City"
                    className="h-12"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <Input
                    placeholder="County/State"
                    className="h-12"
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Postcode"
                    className="h-12"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                  />
                  <Input
                    placeholder="Country"
                    className="h-12"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-sm font-medium text-gray-700">
                Do you charge VAT? <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                value={chargesVat}
                onValueChange={setChargesVat}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-300 transition-colors cursor-pointer">
                  <RadioGroupItem value="yes" id="vat-yes" />
                  <Label htmlFor="vat-yes" className="flex-1 cursor-pointer font-medium">
                    Yes, I charge VAT
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-300 transition-colors cursor-pointer">
                  <RadioGroupItem value="no" id="vat-no" />
                  <Label htmlFor="vat-no" className="flex-1 cursor-pointer font-medium">
                    No, I don&apos;t charge VAT
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {chargesVat === 'yes' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="vat_number" className="text-sm font-medium text-gray-700">
                  VAT Number (Optional)
                </Label>
                <Input
                  id="vat_number"
                  name="vat_number"
                  placeholder="Enter your VAT number (you can add this later)"
                  className="h-12 text-base"
                  value={vatNumber}
                  onChange={(e) => setVatNumber(e.target.value)}
                />
                <p className="text-sm text-gray-500">
                  You can add this later in settings if you don&apos;t have it now.
                </p>
              </motion.div>
            )}

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                size="lg"
                className="flex-1 md:flex-none px-8 h-12 text-base font-semibold"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Continue'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
