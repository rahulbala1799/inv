export const ProfessionalGray = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-12 shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-start mb-12 pb-8 border-b-4 border-gray-800">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">CREATIVE STUDIO</h1>
          <div className="text-gray-600 space-y-1">
            <p>456 Design Avenue, New York, NY 10001</p>
            <p>Phone: +1 (555) 123-4567 | Email: hello@creativestudio.com</p>
          </div>
        </div>
        <div className="text-right">
          <div className="bg-gray-800 text-white px-6 py-3 rounded mb-3">
            <div className="text-sm opacity-80">Invoice</div>
            <div className="text-2xl font-bold">INV-2024-001</div>
          </div>
          <div className="text-sm text-gray-600">
            <p>Date: January 14, 2024</p>
            <p>Due: February 14, 2024</p>
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-8">
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-sm font-bold text-gray-700 uppercase mb-3">Bill To</h3>
          <p className="font-bold text-xl text-gray-900">Acme Corporation</p>
          <p className="text-gray-600">John Smith</p>
          <p className="text-gray-600">789 Business Street, Los Angeles, CA 90001</p>
          <p className="text-gray-600">john@acmecorp.com</p>
        </div>
      </div>

      {/* Items */}
      <table className="w-full mb-8">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="text-left p-4">Description</th>
            <th className="text-center p-4 w-20">Qty</th>
            <th className="text-right p-4 w-28">Rate</th>
            <th className="text-right p-4 w-32">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200 hover:bg-gray-50">
            <td className="p-4">Website Design & Development</td>
            <td className="text-center p-4">1</td>
            <td className="text-right p-4">$3,500.00</td>
            <td className="text-right p-4 font-bold">$3,500.00</td>
          </tr>
          <tr className="border-b border-gray-200 hover:bg-gray-50">
            <td className="p-4">Brand Identity Package</td>
            <td className="text-center p-4">1</td>
            <td className="text-right p-4">$1,800.00</td>
            <td className="text-right p-4 font-bold">$1,800.00</td>
          </tr>
          <tr className="border-b border-gray-200 hover:bg-gray-50">
            <td className="p-4">UI/UX Consultation (8 hours)</td>
            <td className="text-center p-4">8</td>
            <td className="text-right p-4">$150.00</td>
            <td className="text-right p-4 font-bold">$1,200.00</td>
          </tr>
          <tr className="border-b border-gray-200 hover:bg-gray-50">
            <td className="p-4">Content Writing & SEO</td>
            <td className="text-center p-4">1</td>
            <td className="text-right p-4">$800.00</td>
            <td className="text-right p-4 font-bold">$800.00</td>
          </tr>
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-96 bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between py-2 text-gray-700">
            <span>Subtotal</span>
            <span className="font-semibold">$7,300.00</span>
          </div>
          <div className="flex justify-between py-2 text-gray-700 border-b border-gray-300">
            <span>Tax (10%)</span>
            <span className="font-semibold">$730.00</span>
          </div>
          <div className="flex justify-between py-4 mt-2">
            <span className="text-xl font-bold text-gray-900">Total Amount</span>
            <span className="text-2xl font-bold text-gray-900">$8,030.00</span>
          </div>
        </div>
      </div>

      {/* Payment Terms */}
      <div className="bg-gray-100 p-6 rounded-lg border-l-4 border-gray-800">
        <h3 className="font-bold text-gray-900 mb-2">Payment Terms</h3>
        <p className="text-gray-700 text-sm">Payment is due within 30 days from the invoice date. Please include the invoice number with your payment.</p>
        <div className="mt-3 text-sm text-gray-600">
          <p>Bank: Chase Bank | Account: ****4567 | Routing: 021000021</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>Thank you for your business!</p>
      </div>
    </div>
  );
};
