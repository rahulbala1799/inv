export const CreativeBold = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl flex">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-emerald-600 to-emerald-800 text-white p-8 flex-shrink-0">
        <div className="mb-12">
          <h1 className="text-2xl font-bold mb-8 leading-tight">CREATIVE STUDIO</h1>
          <div className="text-emerald-100 text-sm space-y-1">
            <p>456 Design Avenue</p>
            <p>New York, NY 10001</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-3">Contact</h3>
          <div className="text-emerald-100 text-sm space-y-1">
            <p>+1 (555) 123-4567</p>
            <p>hello@creativestudio.com</p>
            <p>www.creativestudio.com</p>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider mb-3">Tax ID</h3>
          <p className="text-emerald-100 text-sm">US123456789</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12">
        <div className="mb-8">
          <h2 className="text-5xl font-bold text-emerald-600 mb-2">INVOICE</h2>
          <p className="text-gray-600">Professional Services Rendered</p>
        </div>

        {/* Invoice Details */}
        <div className="bg-emerald-50 p-6 mb-8 border-l-4 border-emerald-600 grid grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-gray-500 uppercase mb-1">Invoice Number</div>
            <div className="font-bold text-lg">INV-2024-001</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase mb-1">Date Issued</div>
            <div className="font-bold text-lg">Jan 14, 2024</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase mb-1">Payment Due</div>
            <div className="font-bold text-lg">Feb 14, 2024</div>
          </div>
        </div>

        {/* Bill To */}
        <div className="mb-8 bg-gray-50 p-6">
          <div className="text-emerald-600 font-bold text-sm uppercase mb-3">Bill To</div>
          <p className="font-bold text-xl mb-2">Acme Corporation</p>
          <p className="text-gray-600">John Smith</p>
          <p className="text-gray-600">789 Business Street</p>
          <p className="text-gray-600">Los Angeles, CA 90001</p>
        </div>

        {/* Items */}
        <table className="w-full mb-8">
          <thead>
            <tr className="bg-emerald-600 text-white">
              <th className="text-left p-3 text-xs uppercase">Description</th>
              <th className="text-center p-3 text-xs uppercase w-16">Qty</th>
              <th className="text-right p-3 text-xs uppercase w-28">Rate</th>
              <th className="text-right p-3 text-xs uppercase w-28">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="p-3">Website Design & Development</td>
              <td className="text-center p-3">1</td>
              <td className="text-right p-3">$3,500.00</td>
              <td className="text-right p-3 font-bold text-emerald-600">$3,500.00</td>
            </tr>
            <tr className="border-b border-gray-200 bg-emerald-50">
              <td className="p-3">Brand Identity Package</td>
              <td className="text-center p-3">1</td>
              <td className="text-right p-3">$1,800.00</td>
              <td className="text-right p-3 font-bold text-emerald-600">$1,800.00</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-3">UI/UX Consultation (8 hours)</td>
              <td className="text-center p-3">8</td>
              <td className="text-right p-3">$150.00</td>
              <td className="text-right p-3 font-bold text-emerald-600">$1,200.00</td>
            </tr>
            <tr className="border-b border-gray-200 bg-emerald-50">
              <td className="p-3">Content Writing & SEO</td>
              <td className="text-center p-3">1</td>
              <td className="text-right p-3">$800.00</td>
              <td className="text-right p-3 font-bold text-emerald-600">$800.00</td>
            </tr>
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-80">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">$7,300.00</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Tax (10%)</span>
              <span className="font-semibold">$730.00</span>
            </div>
            <div className="flex justify-between py-4 border-t-2 border-emerald-600 mt-2">
              <span className="text-xl font-bold text-emerald-600">TOTAL DUE</span>
              <span className="text-2xl font-bold text-emerald-600">$8,030.00</span>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-emerald-50 p-6 border-l-4 border-emerald-500">
          <h3 className="font-bold text-emerald-900 mb-2 text-sm uppercase">Payment Instructions</h3>
          <p className="text-gray-700 text-sm">Payment is due within 30 days. Please include invoice number with your payment.</p>
          <p className="text-gray-700 text-sm mt-2">Bank: Chase Bank | PayPal: payments@creativestudio.com</p>
        </div>
      </div>
    </div>
  );
};
