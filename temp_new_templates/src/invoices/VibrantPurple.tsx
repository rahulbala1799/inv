export const VibrantPurple = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-12 shadow-2xl">
      {/* Decorative top bar */}
      <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 mb-8"></div>

      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-5xl font-bold text-purple-600 mb-3">INVOICE</h1>
          <div className="text-3xl font-bold text-gray-800">INV-2024-001</div>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold text-purple-900 mb-2">CREATIVE STUDIO</h2>
          <p className="text-gray-600 text-sm">456 Design Avenue</p>
          <p className="text-gray-600 text-sm">New York, NY 10001</p>
          <p className="text-purple-600 font-semibold text-sm">hello@creativestudio.com</p>
        </div>
      </div>

      {/* Invoice Details Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-purple-100 p-4 rounded-lg border-l-4 border-purple-600">
          <div className="text-xs text-purple-700 font-bold uppercase mb-1">Issue Date</div>
          <div className="text-lg font-bold text-purple-900">Jan 14, 2024</div>
        </div>
        <div className="bg-pink-100 p-4 rounded-lg border-l-4 border-pink-600">
          <div className="text-xs text-pink-700 font-bold uppercase mb-1">Due Date</div>
          <div className="text-lg font-bold text-pink-900">Feb 14, 2024</div>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg border-l-4 border-purple-600">
          <div className="text-xs text-purple-700 font-bold uppercase mb-1">Terms</div>
          <div className="text-lg font-bold text-purple-900">Net 30</div>
        </div>
      </div>

      {/* Client Info */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg mb-8">
        <h3 className="text-purple-900 font-bold mb-3 flex items-center gap-2">
          <span className="bg-purple-600 text-white px-3 py-1 rounded text-sm">BILLED TO</span>
        </h3>
        <p className="font-bold text-2xl text-purple-900 mb-1">Acme Corporation</p>
        <p className="text-gray-700">John Smith</p>
        <p className="text-gray-700">789 Business Street</p>
        <p className="text-gray-700">Los Angeles, CA 90001</p>
      </div>

      {/* Items */}
      <table className="w-full mb-8">
        <thead>
          <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <th className="text-left p-4 rounded-tl-lg">Service Description</th>
            <th className="text-center p-4 w-20">Qty</th>
            <th className="text-right p-4 w-32">Rate</th>
            <th className="text-right p-4 w-32 rounded-tr-lg">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b-2 border-purple-100">
            <td className="p-4 font-medium">Website Design & Development</td>
            <td className="text-center p-4">1</td>
            <td className="text-right p-4">$3,500.00</td>
            <td className="text-right p-4 font-bold text-purple-900">$3,500.00</td>
          </tr>
          <tr className="border-b-2 border-purple-100">
            <td className="p-4 font-medium">Brand Identity Package</td>
            <td className="text-center p-4">1</td>
            <td className="text-right p-4">$1,800.00</td>
            <td className="text-right p-4 font-bold text-purple-900">$1,800.00</td>
          </tr>
          <tr className="border-b-2 border-purple-100">
            <td className="p-4 font-medium">UI/UX Consultation (8 hours)</td>
            <td className="text-center p-4">8</td>
            <td className="text-right p-4">$150.00</td>
            <td className="text-right p-4 font-bold text-purple-900">$1,200.00</td>
          </tr>
          <tr className="border-b-2 border-purple-100">
            <td className="p-4 font-medium">Content Writing & SEO</td>
            <td className="text-center p-4">1</td>
            <td className="text-right p-4">$800.00</td>
            <td className="text-right p-4 font-bold text-purple-900">$800.00</td>
          </tr>
        </tbody>
      </table>

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
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-5 rounded-lg mt-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">AMOUNT DUE</span>
                <span className="text-3xl font-bold">$8,030.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Info */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg border-l-4 border-purple-600">
        <h3 className="font-bold text-purple-900 mb-3">💳 Payment Information</h3>
        <p className="text-gray-700 text-sm mb-2">Payment is due within 30 days. Please reference invoice number INV-2024-001.</p>
        <p className="text-gray-700 text-sm">Bank: Chase Bank | Account: ****4567 | PayPal: payments@creativestudio.com</p>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 mb-4"></div>
        <p className="text-purple-600 font-semibold">Thank you for your business!</p>
        <p className="text-gray-500 text-sm">www.creativestudio.com</p>
      </div>
    </div>
  );
};
