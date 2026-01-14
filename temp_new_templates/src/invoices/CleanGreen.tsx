export const CleanGreen = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-12 shadow-2xl">
      {/* Header */}
      <div className="mb-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="inline-block bg-green-600 text-white px-6 py-2 rounded-full mb-4">
              <span className="font-bold text-lg">INVOICE</span>
            </div>
            <h1 className="text-4xl font-bold text-green-800 mb-2">CREATIVE STUDIO</h1>
            <p className="text-gray-600">Your Creative Partner</p>
          </div>
          <div className="text-right bg-green-50 p-6 rounded-lg border-2 border-green-200">
            <div className="text-sm text-green-700 mb-1">Invoice Number</div>
            <div className="text-2xl font-bold text-green-900">INV-2024-001</div>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-green-700 font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            FROM
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">456 Design Avenue</p>
            <p className="text-sm text-gray-600">New York, NY 10001</p>
            <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
            <p className="text-sm text-green-600 font-semibold">hello@creativestudio.com</p>
          </div>
        </div>
        <div>
          <h3 className="text-green-700 font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            TO
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-bold text-lg mb-1">Acme Corporation</p>
            <p className="text-sm text-gray-600">John Smith</p>
            <p className="text-sm text-gray-600">789 Business Street</p>
            <p className="text-sm text-gray-600">Los Angeles, CA 90001</p>
          </div>
        </div>
      </div>

      {/* Date Info */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <div className="text-xs text-green-700 uppercase mb-1">Issue Date</div>
          <div className="font-bold text-green-900">January 14, 2024</div>
        </div>
        <div className="flex-1 bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <div className="text-xs text-green-700 uppercase mb-1">Due Date</div>
          <div className="font-bold text-green-900">February 14, 2024</div>
        </div>
        <div className="flex-1 bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <div className="text-xs text-green-700 uppercase mb-1">Payment Terms</div>
          <div className="font-bold text-green-900">Net 30 Days</div>
        </div>
      </div>

      {/* Items */}
      <div className="mb-8">
        <h3 className="text-green-800 font-bold mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          SERVICES PROVIDED
        </h3>
        <table className="w-full">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="text-left p-4 rounded-tl-lg">Description</th>
              <th className="text-center p-4 w-20">Qty</th>
              <th className="text-right p-4 w-28">Rate</th>
              <th className="text-right p-4 w-32 rounded-tr-lg">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-green-100 hover:bg-green-50">
              <td className="p-4">Website Design & Development</td>
              <td className="text-center p-4">1</td>
              <td className="text-right p-4">$3,500.00</td>
              <td className="text-right p-4 font-bold text-green-700">$3,500.00</td>
            </tr>
            <tr className="border-b border-green-100 hover:bg-green-50">
              <td className="p-4">Brand Identity Package</td>
              <td className="text-center p-4">1</td>
              <td className="text-right p-4">$1,800.00</td>
              <td className="text-right p-4 font-bold text-green-700">$1,800.00</td>
            </tr>
            <tr className="border-b border-green-100 hover:bg-green-50">
              <td className="p-4">UI/UX Consultation (8 hours)</td>
              <td className="text-center p-4">8</td>
              <td className="text-right p-4">$150.00</td>
              <td className="text-right p-4 font-bold text-green-700">$1,200.00</td>
            </tr>
            <tr className="border-b border-green-100 hover:bg-green-50">
              <td className="p-4">Content Writing & SEO</td>
              <td className="text-center p-4">1</td>
              <td className="text-right p-4">$800.00</td>
              <td className="text-right p-4 font-bold text-green-700">$800.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-96">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span className="font-semibold">$7,300.00</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Tax (10%)</span>
              <span className="font-semibold">$730.00</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm opacity-90 mb-1">Total Amount Due</div>
                <div className="text-3xl font-bold">$8,030.00</div>
              </div>
              <div className="text-5xl">✓</div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
        <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Payment Instructions
        </h3>
        <p className="text-gray-700 text-sm mb-2">Payment is due within 30 days of invoice date. Please include invoice number with payment.</p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-xs text-green-700 mb-1">Bank Transfer</p>
            <p className="text-sm font-semibold">Chase Bank - ****4567</p>
          </div>
          <div>
            <p className="text-xs text-green-700 mb-1">PayPal</p>
            <p className="text-sm font-semibold">payments@creativestudio.com</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-500 mb-4"></div>
        <p className="text-green-600 font-semibold text-lg">Thank you for your business! 🌟</p>
        <p className="text-gray-500 text-sm mt-1">www.creativestudio.com</p>
      </div>
    </div>
  );
};
