export const Template03 = () => {
  return (
    <div className="max-w-5xl mx-auto bg-white shadow-2xl">
      {/* Sidebar Layout */}
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-72 bg-indigo-900 text-white p-8 flex-shrink-0">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mb-4">
              <span className="text-indigo-900 font-bold text-2xl">CS</span>
            </div>
            <h1 className="text-xl font-bold">CREATIVE STUDIO</h1>
          </div>

          {/* Company Info */}
          <div className="mb-8">
            <h3 className="text-indigo-300 text-xs uppercase font-bold mb-3">Contact Info</h3>
            <p className="text-sm text-indigo-100 mb-2">456 Design Avenue</p>
            <p className="text-sm text-indigo-100 mb-2">New York, NY 10001</p>
            <p className="text-sm text-indigo-100 mb-2">United States</p>
            <p className="text-sm text-indigo-100 mt-4">+1 (555) 123-4567</p>
            <p className="text-sm text-indigo-100">hello@creativestudio.com</p>
            <p className="text-sm text-indigo-100 mt-4">Tax ID: US123456789</p>
          </div>

          {/* Invoice Details */}
          <div className="mb-8 pt-8 border-t border-indigo-700">
            <h3 className="text-indigo-300 text-xs uppercase font-bold mb-3">Invoice Details</h3>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-indigo-300">Invoice Number</p>
                <p className="font-bold">INV-2024-001</p>
              </div>
              <div>
                <p className="text-xs text-indigo-300">Issue Date</p>
                <p className="font-semibold">January 14, 2024</p>
              </div>
              <div>
                <p className="text-xs text-indigo-300">Due Date</p>
                <p className="font-semibold">February 14, 2024</p>
              </div>
              <div>
                <p className="text-xs text-indigo-300">Terms</p>
                <p className="font-semibold">Net 30</p>
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="pt-8 border-t border-indigo-700">
            <h3 className="text-indigo-300 text-xs uppercase font-bold mb-3">Payment Details</h3>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-xs text-indigo-300">Bank</p>
                <p className="text-indigo-100">Chase Bank, N.A.</p>
              </div>
              <div>
                <p className="text-xs text-indigo-300">Account</p>
                <p className="text-indigo-100">1234 5678 9012</p>
              </div>
              <div>
                <p className="text-xs text-indigo-300">Routing</p>
                <p className="text-indigo-100">021000021</p>
              </div>
              <div>
                <p className="text-xs text-indigo-300">SWIFT</p>
                <p className="text-indigo-100">CHASUS33</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-12">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-5xl font-bold text-indigo-900 mb-4">INVOICE</h2>
            <div className="h-1 w-24 bg-indigo-600"></div>
          </div>

          {/* Bill To */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-indigo-600 uppercase mb-3">Bill To</h3>
            <p className="font-bold text-xl text-gray-900 mb-1">Acme Corporation</p>
            <p className="text-gray-600">John Smith</p>
            <p className="text-gray-600">789 Business Street</p>
            <p className="text-gray-600">Los Angeles, CA 90001</p>
            <p className="text-gray-600">john@acmecorp.com</p>
          </div>

          {/* Items */}
          <table className="w-full mb-8">
            <thead>
              <tr className="border-b-2 border-indigo-900">
                <th className="text-left py-3 text-sm font-bold text-indigo-900">ITEM</th>
                <th className="text-center py-3 text-sm font-bold text-indigo-900 w-24">QTY</th>
                <th className="text-right py-3 text-sm font-bold text-indigo-900 w-32">RATE</th>
                <th className="text-right py-3 text-sm font-bold text-indigo-900 w-32">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-4">
                  <p className="font-semibold text-gray-900">Website Design & Development</p>
                  <p className="text-sm text-gray-500">Complete responsive website</p>
                </td>
                <td className="text-center py-4">1</td>
                <td className="text-right py-4">$3,500.00</td>
                <td className="text-right py-4 font-bold">$3,500.00</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-4">
                  <p className="font-semibold text-gray-900">Brand Identity Package</p>
                  <p className="text-sm text-gray-500">Logo and brand guidelines</p>
                </td>
                <td className="text-center py-4">1</td>
                <td className="text-right py-4">$1,800.00</td>
                <td className="text-right py-4 font-bold">$1,800.00</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-4">
                  <p className="font-semibold text-gray-900">UI/UX Consultation</p>
                  <p className="text-sm text-gray-500">8 hours of consultation</p>
                </td>
                <td className="text-center py-4">8</td>
                <td className="text-right py-4">$150.00</td>
                <td className="text-right py-4 font-bold">$1,200.00</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-4">
                  <p className="font-semibold text-gray-900">Content Writing & SEO</p>
                  <p className="text-sm text-gray-500">SEO-optimized content</p>
                </td>
                <td className="text-center py-4">1</td>
                <td className="text-right py-4">$800.00</td>
                <td className="text-right py-4 font-bold">$800.00</td>
              </tr>
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-80">
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">$7,300.00</span>
              </div>
              <div className="flex justify-between py-3 border-b-2 border-gray-300">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="font-semibold">$730.00</span>
              </div>
              <div className="bg-indigo-900 text-white p-6 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">TOTAL DUE</span>
                  <span className="text-3xl font-bold">$8,030.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <span className="font-bold">Notes:</span> Payment is due within 30 days. Please reference invoice number when making payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
