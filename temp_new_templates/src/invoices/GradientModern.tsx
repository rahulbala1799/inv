export const GradientModern = () => {
  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 p-12 shadow-2xl">
      <div className="bg-white rounded-2xl p-12 shadow-xl">
        {/* Header */}
        <div className="relative mb-12">
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full blur-3xl opacity-30"></div>
          <div className="relative">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              INVOICE
            </h1>
            <p className="text-gray-600">INV-2024-001</p>
          </div>
        </div>

        {/* Company Info */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl">
            <h3 className="text-sm font-bold text-cyan-900 mb-3">FROM</h3>
            <p className="font-bold text-lg">Creative Studio</p>
            <p className="text-gray-600 text-sm">456 Design Avenue</p>
            <p className="text-gray-600 text-sm">New York, NY 10001</p>
            <p className="text-gray-600 text-sm">hello@creativestudio.com</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
            <h3 className="text-sm font-bold text-purple-900 mb-3">TO</h3>
            <p className="font-bold text-lg">Acme Corporation</p>
            <p className="text-gray-600 text-sm">John Smith</p>
            <p className="text-gray-600 text-sm">789 Business Street</p>
            <p className="text-gray-600 text-sm">Los Angeles, CA 90001</p>
          </div>
        </div>

        {/* Dates */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-lg">
            <div className="text-xs opacity-80 mb-1">Issue Date</div>
            <div className="font-bold">January 14, 2024</div>
          </div>
          <div className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 rounded-lg">
            <div className="text-xs opacity-80 mb-1">Due Date</div>
            <div className="font-bold">February 14, 2024</div>
          </div>
        </div>

        {/* Items */}
        <table className="w-full mb-8">
          <thead>
            <tr className="bg-gradient-to-r from-cyan-100 to-purple-100">
              <th className="text-left p-4 rounded-tl-lg">Description</th>
              <th className="text-right p-4 w-32">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="p-4">Website Design & Development</td>
              <td className="text-right p-4 font-semibold">$3,500.00</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="p-4">Brand Identity Package</td>
              <td className="text-right p-4 font-semibold">$1,800.00</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="p-4">UI/UX Consultation (8 hours)</td>
              <td className="text-right p-4 font-semibold">$1,200.00</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="p-4">Content Writing & SEO</td>
              <td className="text-right p-4 font-semibold">$800.00</td>
            </tr>
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-96">
            <div className="flex justify-between py-3">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">$7,300.00</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Tax (10%)</span>
              <span className="font-semibold">$730.00</span>
            </div>
            <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white p-6 rounded-xl mt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">TOTAL DUE</span>
                <span className="text-3xl font-bold">$8,030.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-gradient-to-r from-cyan-50 to-purple-50 p-6 rounded-xl">
          <p className="text-gray-700 text-sm">Payment is due within 30 days. Thank you for your business!</p>
        </div>
      </div>
    </div>
  );
};
