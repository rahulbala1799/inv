'use client'

import { useState } from 'react'
import { createOrg } from './actions'

export default function CreateOrgForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setError(null)
    setLoading(true)
    
    try {
      const result = await createOrg(null, formData)
      if (result?.error) {
        setError(result.error)
        setLoading(false)
      }
      // If no error, redirect should happen
    } catch (err: any) {
      // Redirect throws NEXT_REDIRECT, which is expected
      if (err?.digest !== 'NEXT_REDIRECT') {
        setError(err?.message || 'Failed to create organization')
        setLoading(false)
      }
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Organization Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          disabled={loading}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="My Company"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Creating...' : 'Create Organization'}
      </button>
    </form>
  )
}
