export const Template04 = () => {
  return (
    <div className="max-w-5xl mx-auto bg-white p-12 shadow-2xl">
      {/* Decorative Header */}
      <div className="border-t-8 border-emerald-600 -mx-12 -mt-12 mb-8"></div>
      
      <div className="flex justify-between items-start mb-8">
        {/* Logo and Company */}
        <div className="flex items-start gap-4">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-3xl">CS</span>
          </div>
          <div className="pt-2">
            <h1 className="text-3xl font-bold text-gray-900">CREATIVE STUDIO</h1>
            <p className="text-emerald-600 font-semibold">Design & Development Agency</p>
            <div className="mt-3 text-sm text-gray-600 space-y-1">
              <p>456 Design Avenue, New York, NY 10001</p>
              <p>Phone: +1 (555) 123-4567 | Email: hello@creativestudio.com</p>
            </div>
          </div>
        </div>

        {/* Invoice Number Badge */}
        <div className="text-right">
          <div className="inline-block bg-emerald-600 text-white px-8 py-4 rounded-lg shadow-lg">
            <p className="text-sm font-semibold mb-1">INVOICE</p>
            <p className="text-2xl font-bold">INV-2024-001</p>
          </div>
        </div>
      </div>

      {/* Info Boxes */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-emerald-50 p-5 rounded-lg border-l-4 border-emerald-600">
          <p className="text-xs text-emerald-700 font-bold uppercase mb-2">Invoice Date</p>
          <p className="text-lg font-bold text-gray-900">January 14, 2024</p>
        </div>
        <div className="bg-emerald-50 p-5 rounded-lg border-l-4 border-emerald-600">
          <p className="text-xs text-emerald-700 font-bold uppercase mb-2">Due Date</p>
          <p className="text-lg font-bold text-gray-900">February 14, 2024</p>
        </div>
        <div className="bg-emerald-50 p-5 rounded-lg border-l-4 border-emerald-600">
          <p className="text-xs text-emerald-700 font-bold uppercase mb-2">PO Number</p>
          <p className="text-lg font-bold text-gray-900">PO-45678</p>
        </div>
      </div>

      {/* Bill To */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
        <h3 className="text-sm font-bold text-emerald-700 uppercase mb-3">Bill To</h3>
        <div className="grid grid-cols-2">
          <div>
            <p className="font-bold text-xl text-gray-900 mb-2">Acme Corporation</p>
            <p className="text-gray-700">John Smith, Purchasing Manager</p>
            <p className="text-gray-700">789 Business Street</p>
            <p className="text-gray-700">Los Angeles, CA 90001</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">Email</p>
            <p className="font-semibold text-gray-900">john@acmecorp.com</p>
            <p className="text-sm text-gray-600 mt-3 mb-1">Phone</p>
            <p className="font-semibold text-gray-900">+1 (555) 987-6543</p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
              <th className="text-left p-4 font-semibold">#</th>
              <th className="text-left p-4 font-semibold">Description</th>
              <th className="text-center p-4 font-semibold">Qty</th>
              <th className="text-right p-4 font-semibold">Unit Price</th>
              <th className="text-right p-4 font-semibold">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-emerald-50">
              <td className="p-4 font-semibold text-gray-600">01</td>
              <td className="p-4">
                <p className="font-bold text-gray-900">Website Design & Development</p>
                <p className="text-sm text-gray-500">Complete responsive website with modern UI design</p>
              </td>
              <td className="p-4 text-center">1</td>
              <td className="p-4 text-right">$3,500.00</td>
              <td className="p-4 text-right font-bold text-emerald-700">$3,500.00</td>
            </tr>
            <tr className="hover:bg-emerald-50">
              <td className="p-4 font-semibold text-gray-600">02</td>
              <td className="p-4">
                <p className="font-bold text-gray-900">Brand Identity Package</p>
                <p className="text-sm text-gray-500">Logo design, color palette, and brand guidelines</p>
              </td>
              <td className="p-4 text-center">1</td>
              <td className="p-4 text-right">$1,800.00</td>
              <td className="p-4 text-right font-bold text-emerald-700">$1,800.00</td>
            </tr>
            <tr className="hover:bg-emerald-50">
              <td className="p-4 font-semibold text-gray-600">03</td>
              <td className="p-4">
                <p className="font-bold text-gray-900">UI/UX Consultation</p>
                <p className="text-sm text-gray-500">Professional consultation services - 8 hours</p>
              </td>
              <td className="p-4 text-center">8</td>
              <td className="p-4 text-right">$150.00</td>
              <td className="p-4 text-right font-bold text-emerald-700">$1,200.00</td>
            </tr>
            <tr className="hover:bg-emerald-50">
              <td className="p-4 font-semibold text-gray-600">04</td>
              <td className="p-4">
                <p className="font-bold text-gray-900">Content Writing & SEO</p>
                <p className="text-sm text-gray-500">SEO-optimized content for all website pages</p>
              </td>
              <td className="p-4 text-center">1</td>
              <td className="p-4 text-right">$800.00</td>
              <td className="p-4 text-right font-bold text-emerald-700">$800.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-8">
        {/* Bank Details */}
        <div className="space-y-4">
          <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
            <h3 className="font-bold text-emerald-900 mb-4 text-lg">Bank Transfer Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-emerald-200 pb-2">
                <span className="text-gray-600">Bank Name:</span>
                <span className="font-semibold text-gray-900">Chase Bank, N.A.</span>
              </div>
              <div className="flex justify-between border-b border-emerald-200 pb-2">
                <span className="text-gray-600">Account Name:</span>
                <span className="font-semibold text-gray-900">Creative Studio LLC</span>
              </div>
              <div className="flex justify-between border-b border-emerald-200 pb-2">
                <span className="text-gray-600">Account Number:</span>
                <span className="font-semibold text-gray-900">1234 5678 9012 3456</span>
              </div>
              <div className="flex justify-between border-b border-emerald-200 pb-2">
                <span className="text-gray-600">Routing Number:</span>
                <span className="font-semibold text-gray-900">021000021</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">SWIFT Code:</span>
                <span className="font-semibold text-gray-900">CHASUS33</span>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <p className="text-sm text-yellow-900">
              <span className="font-bold">Note:</span> Payment is due within 30 days from invoice date.
            </p>
          </div>
        </div>

        {/* Totals */}
        <div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="space-y-3">
              <div className="flex justify-between text-lg pb-3 border-b border-gray-300">
                <span className="text-gray-700">Subtotal</span>
                <span className="font-bold">$7,300.00</span>
              </div>
              <div className="flex justify-between text-lg pb-3 border-b border-gray-300">
                <span className="text-gray-700">Tax (10%)</span>
                <span className="font-bold">$730.00</span>
              </div>
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-6 rounded-lg -mx-6 -mb-6 mt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Total Amount Due</p>
                    <p className="text-4xl font-bold">$8,030.00</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-90">Currency</p>
                    <p className="text-2xl font-bold">USD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t-2 border-emerald-200 text-center">
        <p className="text-gray-600 text-sm">Thank you for your business! | www.creativestudio.com</p>
      </div>
    </div>
  );
};
