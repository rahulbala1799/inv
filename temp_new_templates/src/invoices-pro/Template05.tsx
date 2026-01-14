export const Template05 = () => {
  return (
    <div className="max-w-5xl mx-auto bg-gradient-to-br from-gray-50 to-white p-12 shadow-2xl">
      <div className="bg-white p-10 rounded-lg shadow-lg border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-start mb-10 pb-8 border-b-4 border-orange-500">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">CS</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">CREATIVE STUDIO</h1>
                <p className="text-orange-600 font-medium">Professional Services</p>
              </div>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>456 Design Avenue | New York, NY 10001</p>
              <p>+1 (555) 123-4567 | hello@creativestudio.com</p>
              <p>www.creativestudio.com | Tax ID: US123456789</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-5xl font-bold text-orange-600 mb-2">INVOICE</h2>
            <div className="bg-orange-100 px-6 py-2 rounded-full inline-block">
              <span className="font-bold text-orange-900">INV-2024-001</span>
            </div>
          </div>
        </div>

        {/* Client and Date Info */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
              <h3 className="text-xs font-bold text-orange-700 uppercase tracking-wide mb-3">Billed To</h3>
              <p className="font-bold text-xl text-gray-900 mb-2">Acme Corporation</p>
              <p className="text-gray-700">Attention: John Smith</p>
              <p className="text-gray-700">789 Business Street</p>
              <p className="text-gray-700">Los Angeles, CA 90001</p>
              <p className="text-gray-700">United States</p>
              <p className="text-gray-700 mt-2">john@acmecorp.com</p>
            </div>
          </div>
          <div>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-400">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">Invoice Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Date Issued:</span>
                  <span className="font-bold text-gray-900">January 14, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Due Date:</span>
                  <span className="font-bold text-gray-900">February 14, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Payment Terms:</span>
                  <span className="font-bold text-gray-900">Net 30 Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">PO Number:</span>
                  <span className="font-bold text-gray-900">PO-45678</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Table */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-orange-500"></span>
            Services Provided
          </h3>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <tr>
                  <th className="text-left p-4 font-semibold text-sm">ITEM</th>
                  <th className="text-left p-4 font-semibold text-sm">DESCRIPTION</th>
                  <th className="text-center p-4 font-semibold text-sm w-20">QTY</th>
                  <th className="text-right p-4 font-semibold text-sm w-28">RATE</th>
                  <th className="text-right p-4 font-semibold text-sm w-32">AMOUNT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-orange-50">
                  <td className="p-4 font-bold text-orange-600">001</td>
                  <td className="p-4">
                    <p className="font-semibold text-gray-900">Website Design & Development</p>
                    <p className="text-sm text-gray-500">Complete responsive website with modern UI</p>
                  </td>
                  <td className="p-4 text-center">1</td>
                  <td className="p-4 text-right">$3,500.00</td>
                  <td className="p-4 text-right font-bold">$3,500.00</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="p-4 font-bold text-orange-600">002</td>
                  <td className="p-4">
                    <p className="font-semibold text-gray-900">Brand Identity Package</p>
                    <p className="text-sm text-gray-500">Logo, color palette, and brand guidelines</p>
                  </td>
                  <td className="p-4 text-center">1</td>
                  <td className="p-4 text-right">$1,800.00</td>
                  <td className="p-4 text-right font-bold">$1,800.00</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="p-4 font-bold text-orange-600">003</td>
                  <td className="p-4">
                    <p className="font-semibold text-gray-900">UI/UX Consultation</p>
                    <p className="text-sm text-gray-500">Professional consultation - 8 hours</p>
                  </td>
                  <td className="p-4 text-center">8</td>
                  <td className="p-4 text-right">$150.00</td>
                  <td className="p-4 text-right font-bold">$1,200.00</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="p-4 font-bold text-orange-600">004</td>
                  <td className="p-4">
                    <p className="font-semibold text-gray-900">Content Writing & SEO</p>
                    <p className="text-sm text-gray-500">SEO-optimized content for all pages</p>
                  </td>
                  <td className="p-4 text-center">1</td>
                  <td className="p-4 text-right">$800.00</td>
                  <td className="p-4 text-right font-bold">$800.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-2 gap-8">
          {/* Bank Details */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
              <h3 className="font-bold text-orange-900 mb-4 text-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Bank Account Details
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-orange-700 font-semibold mb-1">Bank Name</p>
                  <p className="text-gray-900">Chase Bank, N.A.</p>
                </div>
                <div>
                  <p className="text-orange-700 font-semibold mb-1">Account Holder</p>
                  <p className="text-gray-900">Creative Studio LLC</p>
                </div>
                <div>
                  <p className="text-orange-700 font-semibold mb-1">Account Number</p>
                  <p className="text-gray-900 font-mono">1234 5678 9012 3456</p>
                </div>
                <div>
                  <p className="text-orange-700 font-semibold mb-1">Routing Number</p>
                  <p className="text-gray-900 font-mono">021000021</p>
                </div>
                <div>
                  <p className="text-orange-700 font-semibold mb-1">SWIFT/BIC</p>
                  <p className="text-gray-900 font-mono">CHASUS33</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="text-sm text-blue-900">
                <span className="font-bold">Payment Terms:</span> Payment due within 30 days. Please reference invoice number.
              </p>
            </div>
          </div>

          {/* Total */}
          <div>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-bold">$7,300.00</span>
                </div>
                <div className="flex justify-between text-lg border-b border-gray-300 pb-4">
                  <span className="text-gray-700">Tax (10%)</span>
                  <span className="font-bold">$730.00</span>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-6 -mx-6 -mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm opacity-90 mb-1">Amount Due (USD)</p>
                      <p className="text-4xl font-bold">$8,030.00</p>
                    </div>
                    <div className="text-6xl opacity-20">$</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm">
            Thank you for choosing Creative Studio. We appreciate your business!
          </p>
          <p className="text-gray-500 text-xs mt-2">
            For questions about this invoice, please contact us at hello@creativestudio.com
          </p>
        </div>
      </div>
    </div>
  );
};
