'use client'

import { useState, useTransition } from 'react'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { X } from 'lucide-react'

interface CreateCustomerModalProps {
  orgId: string
  initialName?: string
  onCustomerCreated: (customer: any) => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateCustomerModal({
  orgId,
  initialName = '',
  onCustomerCreated,
  open,
  onOpenChange,
}: CreateCustomerModalProps) {
  const [name, setName] = useState(initialName)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address_line1, setAddressLine1] = useState('')
  const [address_line2, setAddressLine2] = useState('')
  const [city, setCity] = useState('')
  const [postcode, setPostcode] = useState('')
  const [country, setCountry] = useState('')
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  // Update name when modal opens or initialName changes
  React.useEffect(() => {
    if (open && initialName) {
      setName(initialName)
    }
  }, [open, initialName])

  // Reset form when modal closes
  React.useEffect(() => {
    if (!open) {
      setName('')
      setEmail('')
      setPhone('')
      setAddressLine1('')
      setAddressLine2('')
      setCity('')
      setPostcode('')
      setCountry('')
      setError(null)
    }
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('Customer name is required')
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
            address_line1: address_line1.trim() || null,
            address_line2: address_line2.trim() || null,
            city: city.trim() || null,
            postcode: postcode.trim() || null,
            country: country.trim() || null,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          setError(data.error || 'Failed to create customer')
          return
        }

        onCustomerCreated(data.customer)
        onOpenChange(false)
        // Reset form
        setName('')
        setEmail('')
        setPhone('')
        setAddressLine1('')
        setAddressLine2('')
        setCity('')
        setPostcode('')
        setCountry('')
      } catch (err) {
        setError('Failed to create customer')
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Customer</DialogTitle>
          <DialogDescription>
            Add a new customer with essential information needed for invoice creation. Name is required; other fields are optional but recommended.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Customer name"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="customer@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="+1 234 567 8900"
              />
            </div>
          </div>

          <div>
            <label htmlFor="address_line1" className="block text-sm font-medium text-gray-700 mb-2">
              Address Line 1
            </label>
            <input
              type="text"
              id="address_line1"
              value={address_line1}
              onChange={(e) => setAddressLine1(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Street address"
            />
          </div>

          <div>
            <label htmlFor="address_line2" className="block text-sm font-medium text-gray-700 mb-2">
              Address Line 2
            </label>
            <input
              type="text"
              id="address_line2"
              value={address_line2}
              onChange={(e) => setAddressLine2(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Suite, unit, etc."
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="City"
              />
            </div>

            <div>
              <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-2">
                Postcode
              </label>
              <input
                type="text"
                id="postcode"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="12345"
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Country"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create Customer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
