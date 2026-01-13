import { createClient } from '@/lib/supabase/server'
import { verifyOrgMembership } from '@/lib/utils-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createCustomer, deleteCustomer } from './actions'

export default async function CustomersPage({
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

  const { data: customers } = await supabase
    .from('customers')
    .select('*')
    .eq('org_id', orgId)
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Customers</h1>
          <p className="text-gray-600">Manage your customer database</p>
        </div>
        <CreateCustomerModal orgId={orgId} />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers && customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {customer.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.email || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.phone || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.city || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link
                      href={`/app/org/${orgId}/customers/${customer.id}`}
                      className="text-indigo-600 hover:text-indigo-700 mr-4"
                    >
                      Edit
                    </Link>
                    <form action={deleteCustomer} className="inline">
                      <input type="hidden" name="customerId" value={customer.id} />
                      <input type="hidden" name="orgId" value={orgId} />
                      <button
                        type="submit"
                        className="text-red-600 hover:text-red-700"
                        onClick={(e) => {
                          if (!confirm('Are you sure you want to delete this customer?')) {
                            e.preventDefault()
                          }
                        }}
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No customers yet. Create your first customer above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function CreateCustomerModal({ orgId }: { orgId: string }) {
  return (
    <form action={createCustomer} className="inline-block">
      <input type="hidden" name="orgId" value={orgId} />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
      >
        + New Customer
      </button>
    </form>
  )
}
