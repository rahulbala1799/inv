export const LuxuryGold = () => {
  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-amber-50 to-yellow-50 p-12 shadow-2xl">
      <div className="bg-white p-12 border-4 border-amber-400">
        {/* Ornamental Header */}
        <div className="text-center mb-10 border-b-2 border-amber-400 pb-8">
          <div className="text-amber-600 text-4xl mb-2">✦</div>
          <h1 className="text-5xl font-bold text-amber-900 mb-3" style={{ fontFamily: 'serif' }}>INVOICE</h1>
          <div className="text-amber-700 font-semibold text-xl tracking-wider">INV-2024-001</div>
          <div className="text-amber-600 text-4xl mt-2">✦</div>
        </div>

        {/* Company & Client */}
        <div className="grid grid-cols-2 gap-8 mb-10">
          <div className="border-2 border-amber-200 p-6 bg-amber-50">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-0.5 bg-amber-500"></div>
              <h3 className="font-bold text-amber-900 uppercase tracking-wider text-sm">From</h3>
              <div className="w-8 h-0.5 bg-amber-500"></div>
            </div>
            <p className="font-bold text-2xl text-amber-900 mb-2" style={{ fontFamily: 'serif' }}>Creative Studio</p>
            <p className="text-gray-700">456 Design Avenue</p>
            <p className="text-gray-700">New York, NY 10001</p>
            <p className="text-amber-700 font-semibold mt-2">hello@creativestudio.com</p>
            <p className="text-gray-700">+1 (555) 123-4567</p>
          </div>
          <div className="border-2 border-amber-200 p-6 bg-amber-50">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-0.5 bg-amber-500"></div>
              <h3 className="font-bold text-amber-900 uppercase tracking-wider text-sm">To</h3>
              <div className="w-8 h-0.5 bg-amber-500"></div>
            </div>
            <p className="font-bold text-2xl text-amber-900 mb-2" style={{ fontFamily: 'serif' }}>Acme Corporation</p>
            <p className="text-gray-700">John Smith</p>
            <p className="text-gray-700">789 Business Street</p>
            <p className="text-gray-700">Los Angeles, CA 90001</p>
          </div>
        </div>

        {/* Date Information */}
        <div className="flex justify-center gap-12 mb-10 bg-gradient-to-r from-amber-50 to-yellow-50 p-6 border-y-2 border-amber-300">
          <div className="text-center">
            <div className="text-xs text-amber-700 uppercase tracking-wider mb-1">Issue Date</div>
            <div className="font-bold text-amber-900">January 14, 2024</div>
          </div>
          <div className="w-0.5 bg-amber-300"></div>
          <div className="text-center">
            <div className="text-xs text-amber-700 uppercase tracking-wider mb-1">Due Date</div>
            <div className="font-bold text-amber-900">February 14, 2024</div>
          </div>
          <div className="w-0.5 bg-amber-300"></div>
          <div className="text-center">
            <div className="text-xs text-amber-700 uppercase tracking-wider mb-1">Terms</div>
            <div className="font-bold text-amber-900">Net 30</div>
          </div>
        </div>

        {/* Items */}
        <table className="w-full mb-8">
          <thead>
            <tr className="bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50">
              <th className="text-left p-4 font-bold uppercase tracking-wide text-sm">Description</th>
              <th className="text-center p-4 font-bold uppercase tracking-wide text-sm w-20">Qty</th>
              <th className="text-right p-4 font-bold uppercase tracking-wide text-sm w-32">Rate</th>
              <th className="text-right p-4 font-bold uppercase tracking-wide text-sm w-32">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b-2 border-amber-100">
              <td className="p-4 text-gray-800">Website Design & Development</td>
              <td className="text-center p-4">1</td>
              <td className="text-right p-4">$3,500.00</td>
              <td className="text-right p-4 font-bold text-amber-900">$3,500.00</td>
            </tr>
            <tr className="border-b-2 border-amber-100">
              <td className="p-4 text-gray-800">Brand Identity Package</td>
              <td className="text-center p-4">1</td>
              <td className="text-right p-4">$1,800.00</td>
              <td className="text-right p-4 font-bold text-amber-900">$1,800.00</td>
            </tr>
            <tr className="border-b-2 border-amber-100">
              <td className="p-4 text-gray-800">UI/UX Consultation (8 hours)</td>
              <td className="text-center p-4">8</td>
              <td className="text-right p-4">$150.00</td>
              <td className="text-right p-4 font-bold text-amber-900">$1,200.00</td>
            </tr>
            <tr className="border-b-2 border-amber-100">
              <td className="p-4 text-gray-800">Content Writing & SEO</td>
              <td className="text-center p-4">1</td>
              <td className="text-right p-4">$800.00</td>
              <td className="text-right p-4 font-bold text-amber-900">$800.00</td>
            </tr>
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-10">
          <div className="w-96">
            <div className="bg-amber-50 p-6 border-2 border-amber-200">
              <div className="flex justify-between py-2 text-gray-700">
                <span>Subtotal</span>
                <span className="font-semibold">$7,300.00</span>
              </div>
              <div className="flex justify-between py-2 border-b-2 border-amber-200">
                <span>Tax (10%)</span>
                <span className="font-semibold">$730.00</span>
              </div>
              <div className="bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 p-6 mt-4 -mx-6 -mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold uppercase tracking-wider" style={{ fontFamily: 'serif' }}>Total Due</span>
                  <span className="text-3xl font-bold" style={{ fontFamily: 'serif' }}>$8,030.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="border-2 border-amber-200 p-6 bg-gradient-to-r from-amber-50 to-yellow-50">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-0.5 bg-amber-500"></div>
            <h3 className="font-bold text-amber-900 uppercase tracking-wider text-sm">Payment Details</h3>
            <div className="flex-1 h-0.5 bg-amber-500"></div>
          </div>
          <p className="text-gray-700 text-sm mb-3">Payment is due within 30 days. Please include invoice number with your payment.</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-amber-700 mb-1">Bank Name</p>
              <p className="font-semibold">Chase Bank</p>
            </div>
            <div>
              <p className="text-xs text-amber-700 mb-1">Account</p>
              <p className="font-semibold">****4567</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center border-t-2 border-amber-400 pt-6">
          <div className="text-amber-600 text-2xl mb-2">✦</div>
          <p className="text-amber-900 font-bold text-lg" style={{ fontFamily: 'serif' }}>Thank You For Your Business</p>
          <p className="text-amber-700 text-sm mt-2">www.creativestudio.com</p>
          <div className="text-amber-600 text-2xl mt-2">✦</div>
        </div>
      </div>
    </div>
  );
};
