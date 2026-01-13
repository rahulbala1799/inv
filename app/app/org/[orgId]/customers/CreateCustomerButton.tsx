'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import CreateCustomerModal from '@/components/invoices/CreateCustomerModal'

interface CreateCustomerButtonProps {
  orgId: string
}

export default function CreateCustomerButton({ orgId }: CreateCustomerButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleCustomerCreated = (customer: any) => {
    // Refresh the page to show the new customer in the list
    router.refresh()
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
      >
        + New Customer
      </button>
      <CreateCustomerModal
        orgId={orgId}
        open={isOpen}
        onOpenChange={setIsOpen}
        onCustomerCreated={handleCustomerCreated}
      />
    </>
  )
}
