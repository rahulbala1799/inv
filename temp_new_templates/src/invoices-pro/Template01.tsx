export const Template01 = () => {
  return (
    <div className="max-w-5xl mx-auto bg-white p-12 shadow-2xl">
      {/* Header with Logo */}
      <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-blue-600">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-3xl">CS</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">CREATIVE STUDIO</h1>
            <p className="text-gray-600">Professional Design Services</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-4xl font-bold text-blue-600 mb-2">INVOICE</h2>
          <div className="bg-blue-50 px-4 py-2 rounded">
            <span className="text-sm text-gray-600">Invoice #: </span>
            <span className="font-bold text-blue-900">INV-2024-001</span>
          </div>
        </div>
      </div>

      {/* Company and Client Info */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div>
          <h3 className="text-sm font-bold text-blue-600 uppercase mb-3">From</h3>
          <p className="text-sm text-gray-700">456 Design Avenue</p>
          <p className="text-sm text-gray-700">New York, NY 10001</p>
          <p className="text-sm text-gray-700">United States</p>
          <p className="text-sm text-gray-700 mt-2">+1 (555) 123-4567</p>
          <p className="text-sm text-blue-600 font-semibold">hello@creativestudio.com</p>
        </div>
        <div>
          <h3 className="text-sm font-bold text-blue-600 uppercase mb-3">Bill To</h3>
          <p className="font-bold text-gray-900">Acme Corporation</p>
          <p className="text-sm text-gray-700">John Smith</p>
          <p className="text-sm text-gray-700">789 Business Street</p>
          <p className="text-sm text-gray-700">Los Angeles, CA 90001</p>
          <p className="text-sm text-gray-700 mt-2">john@acmecorp.com</p>
        </div>
        <div>
          <h3 className="text-sm font-bold text-blue-600 uppercase mb-3">Invoice Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Date:</span>
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
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">PO Number:</span>
              <span className="font-semibold">PO-45678</span>
            </div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full mb-8">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="text-left p-4 text-sm font-semibold">#</th>
            <th className="text-left p-4 text-sm font-semibold">Description</th>
            <th className="text-center p-4 text-sm font-semibold w-24">Qty</th>
            <th className="text-right p-4 text-sm font-semibold w-32">Unit Price</th>
            <th className="text-right p-4 text-sm font-semibold w-32">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="p-4 text-gray-600">1</td>
            <td className="p-4">
              <div className="font-semibold text-gray-900">Website Design & Development</div>
              <div className="text-sm text-gray-500">Complete responsive website with modern UI</div>
            </td>
            <td className="text-center p-4">1</td>
            <td className="text-right p-4">$3,500.00</td>
            <td className="text-right p-4 font-semibold">$3,500.00</td>
          </tr>
          <tr className="border-b border-gray-200 bg-gray-50">
            <td className="p-4 text-gray-600">2</td>
            <td className="p-4">
              <div className="font-semibold text-gray-900">Brand Identity Package</div>
              <div className="text-sm text-gray-500">Logo, color palette, and brand guidelines</div>
            </td>
            <td className="text-center p-4">1</td>
            <td className="text-right p-4">$1,800.00</td>
            <td className="text-right p-4 font-semibold">$1,800.00</td>
          </tr>
          <tr className="border-b border-gray-200">
            <td className="p-4 text-gray-600">3</td>
            <td className="p-4">
              <div className="font-semibold text-gray-900">UI/UX Consultation</div>
              <div className="text-sm text-gray-500">Professional consultation services - 8 hours</div>
            </td>
            <td className="text-center p-4">8</td>
            <td className="text-right p-4">$150.00</td>
            <td className="text-right p-4 font-semibold">$1,200.00</td>
          </tr>
          <tr className="border-b border-gray-200 bg-gray-50">
            <td className="p-4 text-gray-600">4</td>
            <td className="p-4">
              <div className="font-semibold text-gray-900">Content Writing & SEO</div>
              <div className="text-sm text-gray-500">SEO-optimized content for all pages</div>
            </td>
            <td className="text-center p-4">1</td>
            <td className="text-right p-4">$800.00</td>
            <td className="text-right p-4 font-semibold">$800.00</td>
          </tr>
        </tbody>
      </table>

      {/* Totals Section with Bank Details */}
      <div className="grid grid-cols-2 gap-8">
        {/* Bank Details */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="font-bold text-blue-900 mb-4">Payment Information</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-600 text-xs uppercase mb-1">Bank Name</p>
              <p className="font-semibold text-gray-900">Chase Bank, N.A.</p>
            </div>
            <div>
              <p className="text-gray-600 text-xs uppercase mb-1">Account Name</p>
              <p className="font-semibold text-gray-900">Creative Studio LLC</p>
            </div>
            <div>
              <p className="text-gray-600 text-xs uppercase mb-1">Account Number</p>
              <p className="font-semibold text-gray-900">1234 5678 9012 3456</p>
            </div>
            <div>
              <p className="text-gray-600 text-xs uppercase mb-1">Routing Number</p>
              <p className="font-semibold text-gray-900">021000021</p>
            </div>
            <div>
              <p className="text-gray-600 text-xs uppercase mb-1">SWIFT Code</p>
              <p className="font-semibold text-gray-900">CHASUS33</p>
            </div>
          </div>
        </div>

        {/* Grand Total */}
        <div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between py-2 text-gray-700">
              <span>Subtotal</span>
              <span className="font-semibold">$7,300.00</span>
            </div>
            <div className="flex justify-between py-2 text-gray-700 border-b border-gray-300">
              <span>Tax (10%)</span>
              <span className="font-semibold">$730.00</span>
            </div>
            <div className="flex justify-between py-4 mt-2">
              <span className="text-xl font-bold text-gray-900">TOTAL DUE</span>
              <span className="text-3xl font-bold text-blue-600">$8,030.00</span>
            </div>
          </div>
          <div className="mt-4 p-4 bg-blue-600 text-white rounded-lg text-center">
            <p className="text-sm">Payment Due: <span className="font-bold">February 14, 2024</span></p>
          </div>
        </div>
      </div>

      {/* Footer Notes */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="font-bold text-gray-900 mb-2">Notes</h3>
        <p className="text-sm text-gray-600">
          Payment is due within 30 days from the invoice date. Please include the invoice number with your payment.
          Late payments may incur additional charges. Thank you for your business!
        </p>
      </div>
    </div>
  );
};
