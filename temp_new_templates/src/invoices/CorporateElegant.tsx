export const CorporateElegant = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-12 shadow-2xl">
      {/* Header with background */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white p-8 -mx-12 -mt-12 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-4">CREATIVE STUDIO</h1>
            <p className="text-purple-200 text-sm">456 Design Avenue</p>
            <p className="text-purple-200 text-sm">New York, NY 10001</p>
            <p className="text-purple-200 text-sm">hello@creativestudio.com</p>
          </div>
          <div className="bg-white text-purple-900 px-6 py-4 rounded shadow-lg">
            <div className="text-xs text-purple-600 mb-1">Invoice Number</div>
            <div className="text-2xl font-bold">INV-2024-001</div>
          </div>
        </div>
      </div>

      {/* Invoice Info */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-purple-900 font-bold mb-3 text-sm uppercase">Client Information</h3>
            <p className="font-bold text-lg mb-2">Acme Corporation</p>
            <p className="text-gray-600 text-sm">John Smith</p>
            <p className="text-gray-600 text-sm">789 Business Street</p>
            <p className="text-gray-600 text-sm">Los Angeles, CA 90001</p>
            <p className="text-gray-600 text-sm">john@acmecorp.com</p>
          </div>
        </div>
        <div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-purple-900 font-bold mb-3 text-sm uppercase">Invoice Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Date Issued:</span>
                <span className="font-semibold">January 14, 2024</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Due Date:</span>
                <span className="font-semibold">February 14, 2024</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Terms:</span>
                <span className="font-semibold">Net 30</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr className="bg-purple-100 text-purple-900">
              <th className="text-left p-4 rounded-tl-lg">Service Description</th>
              <th className="text-center p-4 w-20">Qty</th>
              <th className="text-right p-4 w-32">Rate</th>
              <th className="text-right p-4 w-32 rounded-tr-lg">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="p-4">Website Design & Development</td>
              <td className="text-center p-4">1</td>
              <td className="text-right p-4">$3,500.00</td>
              <td className="text-right p-4 font-semibold text-purple-900">$3,500.00</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-4">Brand Identity Package</td>
              <td className="text-center p-4">1</td>
              <td className="text-right p-4">$1,800.00</td>
              <td className="text-right p-4 font-semibold text-purple-900">$1,800.00</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-4">UI/UX Consultation (8 hours)</td>
              <td className="text-center p-4">8</td>
              <td className="text-right p-4">$150.00</td>
              <td className="text-right p-4 font-semibold text-purple-900">$1,200.00</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-4">Content Writing & SEO</td>
              <td className="text-center p-4">1</td>
              <td className="text-right p-4">$800.00</td>
              <td className="text-right p-4 font-semibold text-purple-900">$800.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-96">
          <div className="bg-purple-50 p-6 rounded-lg">
            <div className="flex justify-between py-2">
              <span className="text-gray-700">Subtotal</span>
              <span className="font-semibold">$7,300.00</span>
            </div>
            <div className="flex justify-between py-2 border-b border-purple-200">
              <span className="text-gray-700">Tax (10%)</span>
              <span className="font-semibold">$730.00</span>
            </div>
            <div className="flex justify-between py-4 mt-2">
              <span className="text-xl font-bold text-purple-900">Total Amount Due</span>
              <span className="text-2xl font-bold text-purple-900">$8,030.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Info */}
      <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-700">
        <h3 className="font-bold text-purple-900 mb-3">Payment Information</h3>
        <p className="text-gray-700 text-sm mb-2">Payment is due within 30 days. Please include invoice number with your payment.</p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Bank Name</p>
            <p className="font-semibold text-sm">Chase Bank</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Account Number</p>
            <p className="font-semibold text-sm">****4567</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-gray-500 text-sm">Thank you for your business!</p>
        <p className="text-purple-700 font-semibold text-sm mt-1">www.creativestudio.com</p>
      </div>
    </div>
  );
};
