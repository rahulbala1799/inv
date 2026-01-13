'use client'

import { useTransition } from 'react'
import { deleteCustomer } from './actions'

export default function DeleteButton({ customerId, orgId }: { customerId: string; orgId: string }) {
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!confirm('Are you sure you want to delete this customer?')) {
      return
    }

    startTransition(async () => {
      const formData = new FormData(e.currentTarget)
      await deleteCustomer(formData)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="inline">
      <input type="hidden" name="customerId" value={customerId} />
      <input type="hidden" name="orgId" value={orgId} />
      <button
        type="submit"
        disabled={isPending}
        className="text-red-600 hover:text-red-700 disabled:opacity-50"
      >
        Delete
      </button>
    </form>
  )
}
