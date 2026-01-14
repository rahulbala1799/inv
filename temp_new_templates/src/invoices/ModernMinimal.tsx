export const ModernMinimal = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-12 shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-wider mb-6">CREATIVE STUDIO</h1>
          <p className="text-gray-500 text-sm">456 Design Avenue</p>
          <p className="text-gray-500 text-sm">New York, NY 10001</p>
          <p className="text-gray-500 text-sm">+1 (555) 123-4567</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400 uppercase tracking-widest mb-2">Invoice</div>
          <div className="text-3xl font-bold mb-4">INV-2024-001</div>
          <div className="text-sm text-gray-500">January 14, 2024</div>
          <div className="text-sm text-gray-500">Due: February 14, 2024</div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t-2 border-black mb-12"></div>

      {/* Bill To */}
      <div className="mb-12">
        <div className="text-xs text-gray-400 uppercase tracking-widest mb-3">Billed To</div>
        <div className="text-xl font-bold mb-2">Acme Corporation</div>
        <div className="text-gray-600">John Smith</div>
        <div className="text-gray-600">789 Business Street</div>
        <div className="text-gray-600">Los Angeles, CA 90001</div>
      </div>

      {/* Items */}
      <table className="w-full mb-12">
        <thead className="border-b-2 border-black">
          <tr className="text-xs uppercase tracking-wider">
            <th className="text-left pb-4 font-bold">Description</th>
            <th className="text-center pb-4 font-bold">Qty</th>
            <th className="text-right pb-4 font-bold">Rate</th>
            <th className="text-right pb-4 font-bold">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="py-4">
              <div className="font-medium">Website Design & Development</div>
            </td>
            <td className="text-center py-4 text-gray-600">1</td>
            <td className="text-right py-4 text-gray-600">$3,500.00</td>
            <td className="text-right py-4 font-semibold">$3,500.00</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="py-4">
              <div className="font-medium">Brand Identity Package</div>
            </td>
            <td className="text-center py-4 text-gray-600">1</td>
            <td className="text-right py-4 text-gray-600">$1,800.00</td>
            <td className="text-right py-4 font-semibold">$1,800.00</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="py-4">
              <div className="font-medium">UI/UX Consultation (8 hours)</div>
            </td>
            <td className="text-center py-4 text-gray-600">8</td>
            <td className="text-right py-4 text-gray-600">$150.00</td>
            <td className="text-right py-4 font-semibold">$1,200.00</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="py-4">
              <div className="font-medium">Content Writing & SEO</div>
            </td>
            <td className="text-center py-4 text-gray-600">1</td>
            <td className="text-right py-4 text-gray-600">$800.00</td>
            <td className="text-right py-4 font-semibold">$800.00</td>
          </tr>
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end mb-12">
        <div className="w-80">
          <div className="flex justify-between py-3 border-b border-gray-200">
            <span className="text-gray-600">Subtotal</span>
            <span>$7,300.00</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-200">
            <span className="text-gray-600">Tax (10%)</span>
            <span>$730.00</span>
          </div>
          <div className="flex justify-between py-4 border-t-2 border-black mt-4">
            <span className="text-xl font-bold">Total</span>
            <span className="text-2xl font-bold">$8,030.00</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="mb-8">
        <div className="text-xs text-gray-400 uppercase tracking-widest mb-3">Payment Details</div>
        <p className="text-gray-600 text-sm">Payment is due within 30 days. Please include invoice number with your payment.</p>
        <p className="text-gray-600 text-sm mt-2">Bank: Chase Bank • Account: ****4567</p>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-6 text-center text-gray-400 text-sm">
        www.creativestudio.com
      </div>
    </div>
  );
};
