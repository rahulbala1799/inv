'use client'

import { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface CustomerSetupStepProps {
  orgId: string
  chargesVat: boolean
  onSkip: () => void
  onComplete: () => void
}

export default function CustomerSetupStep({
  orgId,
  chargesVat,
  onSkip,
  onComplete,
}: CustomerSetupStepProps) {
  const [showForm, setShowForm] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [addressLine1, setAddressLine1] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [city, setCity] = useState('')
  const [postcode, setPostcode] = useState('')
  const [country, setCountry] = useState('')
  const [vatNumber, setVatNumber] = useState('')

  const handleAddCustomer = () => {
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('Customer name is required')
      return
    }

    if (name.trim().length < 2) {
      setError('Customer name must be at least 2 characters')
      return
    }

    startTransition(async () => {
      try {
        const response = await fetch(`/api/org/${orgId}/customers`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim() || null,
            phone: phone.trim() || null,
            address_line1: addressLine1.trim() || null,
            address_line2: addressLine2.trim() || null,
            city: city.trim() || null,
            postcode: postcode.trim() || null,
            country: country.trim() || null,
            vat_number: chargesVat ? (vatNumber.trim() || null) : null,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          setError(data.error || 'Failed to create customer')
          return
        }

        setSuccess(true)
        setTimeout(() => {
          onComplete()
        }, 1500)
      } catch (err) {
        setError('An unexpected error occurred. Please try again.')
        console.error('Error creating customer:', err)
      }
    })
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="bg-white shadow-xl rounded-2xl">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Customer Created!
            </h3>
            <p className="text-gray-600">Taking you to your dashboard...</p>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white shadow-xl rounded-2xl">
        <CardContent className="p-8">
          {!showForm ? (
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                Add Your First Customer
              </h3>
              <p className="text-gray-600">
                Would you like to add your first customer now? You can always add more later.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  onClick={handleAddCustomer}
                  size="lg"
                  className="px-8 h-12 text-base font-semibold"
                >
                  Yes, add a customer
                </Button>
                <Button
                  onClick={onSkip}
                  variant="ghost"
                  size="lg"
                  className="px-8 h-12 text-base"
                >
                  Skip for now
                </Button>
              </div>
            </div>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Customer Details
                  </h3>
                  <p className="text-sm text-gray-600">
                    Fill in the information for your first customer
                  </p>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="customer_name" className="text-sm font-medium text-gray-700">
                      Customer Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="customer_name"
                      placeholder="Enter customer name"
                      className="h-12 text-base"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customer_email" className="text-sm font-medium text-gray-700">
                        Email (Optional)
                      </Label>
                      <Input
                        id="customer_email"
                        type="email"
                        placeholder="customer@example.com"
                        className="h-12"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customer_phone" className="text-sm font-medium text-gray-700">
                        Phone (Optional)
                      </Label>
                      <Input
                        id="customer_phone"
                        type="tel"
                        placeholder="+1 234 567 8900"
                        className="h-12"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-gray-700">
                      Address (Optional)
                    </Label>
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
                        placeholder="Postcode"
                        className="h-12"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                      />
                    </div>
                    <Input
                      placeholder="Country"
                      className="h-12"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>

                  {chargesVat && (
                    <div className="space-y-2">
                      <Label htmlFor="customer_vat" className="text-sm font-medium text-gray-700">
                        VAT Number (Optional)
                      </Label>
                      <Input
                        id="customer_vat"
                        placeholder="Enter customer VAT number"
                        className="h-12"
                        value={vatNumber}
                        onChange={(e) => setVatNumber(e.target.value)}
                      />
                    </div>
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
                          Creating...
                        </>
                      ) : (
                        'Create Customer'
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowForm(false)}
                      size="lg"
                      className="px-6 h-12"
                      disabled={isPending}
                    >
                      Back
                    </Button>
                  </div>
                </form>
              </motion.div>
            </AnimatePresence>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
