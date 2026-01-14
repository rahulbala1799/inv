export const ClassicBlue = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-12 shadow-2xl">
      {/* Header */}
      <div className="border-b-4 border-blue-600 pb-8 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-blue-600 mb-2">CREATIVE STUDIO</h1>
            <p className="text-gray-600">456 Design Avenue</p>
            <p className="text-gray-600">New York, NY 10001</p>
            <p className="text-gray-600">+1 (555) 123-4567</p>
            <p className="text-gray-600">hello@creativestudio.com</p>
          </div>
          <div className="text-right">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">INVOICE</h2>
            <p className="text-gray-600"><span className="font-semibold">Invoice #:</span> INV-2024-001</p>
            <p className="text-gray-600"><span className="font-semibold">Date:</span> January 14, 2024</p>
            <p className="text-gray-600"><span className="font-semibold">Due Date:</span> February 14, 2024</p>
          </div>
        </div>
      </div>

      {/* Bill To Section */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-blue-50 p-6 rounded">
          <h3 className="text-blue-600 font-bold text-sm uppercase mb-3">Bill To</h3>
          <p className="font-bold text-lg mb-1">Acme Corporation</p>
          <p className="text-gray-600">John Smith</p>
          <p className="text-gray-600">789 Business Street</p>
          <p className="text-gray-600">Los Angeles, CA 90001</p>
          <p className="text-gray-600">john@acmecorp.com</p>
        </div>
        <div className="bg-blue-50 p-6 rounded">
          <h3 className="text-blue-600 font-bold text-sm uppercase mb-3">Invoice Details</h3>
          <p className="text-gray-600 mb-1"><span className="font-semibold">PO Number:</span> PO-45678</p>
          <p className="text-gray-600 mb-1"><span className="font-semibold">Payment Terms:</span> Net 30</p>
          <p className="text-gray-600"><span className="font-semibold">VAT ID:</span> US123456789</p>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full mb-8">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="text-left p-3">Description</th>
            <th className="text-right p-3 w-24">Qty</th>
            <th className="text-right p-3 w-32">Rate</th>
            <th className="text-right p-3 w-32">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="p-3">Website Design & Development</td>
            <td className="text-right p-3">1</td>
            <td className="text-right p-3">$3,500.00</td>
            <td className="text-right p-3 font-semibold">$3,500.00</td>
          </tr>
          <tr className="border-b border-gray-200 bg-gray-50">
            <td className="p-3">Brand Identity Package</td>
            <td className="text-right p-3">1</td>
            <td className="text-right p-3">$1,800.00</td>
            <td className="text-right p-3 font-semibold">$1,800.00</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="p-3">UI/UX Consultation (8 hours)</td>
            <td className="text-right p-3">8</td>
            <td className="text-right p-3">$150.00</td>
            <td className="text-right p-3 font-semibold">$1,200.00</td>
          </tr>
          <tr className="border-b border-gray-200 bg-gray-50">
            <td className="p-3">Content Writing & SEO</td>
            <td className="text-right p-3">1</td>
            <td className="text-right p-3">$800.00</td>
            <td className="text-right p-3 font-semibold">$800.00</td>
          </tr>
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-80">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">$7,300.00</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Tax (10%)</span>
            <span className="font-semibold">$730.00</span>
          </div>
          <div className="flex justify-between py-3 bg-blue-600 text-white px-4 mt-2">
            <span className="text-lg font-bold">TOTAL DUE</span>
            <span className="text-xl font-bold">$8,030.00</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-blue-50 p-6 rounded border-l-4 border-blue-600 mb-8">
        <h3 className="font-bold mb-2">Payment Instructions</h3>
        <p className="text-gray-600 text-sm">Payment is due within 30 days. Please include invoice number with your payment.</p>
        <p className="text-gray-600 text-sm mt-2">Bank: Chase Bank | Account: ****4567 | Routing: 021000021</p>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-4 text-center text-gray-500 text-sm">
        <p>Thank you for your business!</p>
        <p>www.creativestudio.com</p>
      </div>
    </div>
  );
};
