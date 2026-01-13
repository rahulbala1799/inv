import { createClient } from '@/lib/supabase/server'
import { verifyOrgMembership } from '@/lib/utils-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

export default async function InvoicesPage({
  params,
  searchParams,
}: {
  params: Promise<{ orgId: string }>
  searchParams: Promise<{ status?: string }>
}) {
  const { orgId } = await params
  const { status } = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const isMember = await verifyOrgMembership(orgId)
  if (!isMember) {
    redirect('/app')
  }

  let query = supabase
    .from('invoices')
    .select('id, invoice_number, status, total, currency, issue_date, customers(name)')
    .eq('org_id', orgId)

  if (status && status !== 'ALL') {
    query = query.eq('status', status)
  }

  const { data: invoices } = await query.order('created_at', { ascending: false })

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Invoices</h1>
          <p className="text-gray-600">Manage and track your invoices</p>
        </div>
        <Link
          href={`/app/org/${orgId}/invoices/new`}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          + New Invoice
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2">
        <Link
          href={`/app/org/${orgId}/invoices`}
          className={`px-4 py-2 rounded-lg font-medium ${
            !status || status === 'ALL'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All
        </Link>
        <Link
          href={`/app/org/${orgId}/invoices?status=DRAFT`}
          className={`px-4 py-2 rounded-lg font-medium ${
            status === 'DRAFT'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Draft
        </Link>
        <Link
          href={`/app/org/${orgId}/invoices?status=SENT`}
          className={`px-4 py-2 rounded-lg font-medium ${
            status === 'SENT'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Sent
        </Link>
        <Link
          href={`/app/org/${orgId}/invoices?status=PAID`}
          className={`px-4 py-2 rounded-lg font-medium ${
            status === 'PAID'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Paid
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice #</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoices && invoices.length > 0 ? (
              invoices.map((invoice: any) => (
                <tr key={invoice.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.invoice_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.customers?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(invoice.issue_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      invoice.status === 'PAID' ? 'bg-green-100 text-green-800' :
                      invoice.status === 'SENT' ? 'bg-yellow-100 text-yellow-800' :
                      invoice.status === 'DRAFT' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(Number(invoice.total), invoice.currency)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link
                      href={`/app/org/${orgId}/invoices/${invoice.id}`}
                      className="text-indigo-600 hover:text-indigo-700 mr-4"
                    >
                      View
                    </Link>
                    <Link
                      href={`/api/org/${orgId}/invoices/${invoice.id}/pdf`}
                      target="_blank"
                      className="text-indigo-600 hover:text-indigo-700"
                    >
                      PDF
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No invoices yet. <Link href={`/app/org/${orgId}/invoices/new`} className="text-indigo-600 hover:text-indigo-700">Create your first invoice</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
