export const Template08 = () => {
  const items = [
    { id: 1, name: 'Website Design & Development', desc: 'Complete responsive website with modern UI', qty: 1, price: 3500 },
    { id: 2, name: 'Brand Identity Package', desc: 'Logo, color palette, and brand guidelines', qty: 1, price: 1800 },
    { id: 3, name: 'UI/UX Consultation', desc: 'Professional consultation services', qty: 8, price: 150 },
    { id: 4, name: 'Content Writing & SEO', desc: 'SEO-optimized content', qty: 1, price: 800 }
  ];

  return (
    <div className="max-w-5xl mx-auto bg-white p-12 shadow-2xl">
      {/* Top Border */}
      <div className="h-2 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 -mx-12 -mt-12 mb-10"></div>

      {/* Header */}
      <div className="grid grid-cols-3 gap-8 mb-10">
        <div className="col-span-2">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">CS</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">CREATIVE STUDIO</h1>
              <p className="text-rose-600 font-medium">Creative Design Solutions</p>
            </div>
          </div>
          <div className="text-sm text-gray-600 space-y-1 ml-24">
            <p>456 Design Avenue, New York, NY 10001</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Email: hello@creativestudio.com</p>
            <p>Web: www.creativestudio.com</p>
            <p>Tax ID: US123456789</p>
          </div>
        </div>
        <div className="text-right">
          <div className="bg-rose-50 p-6 rounded-lg border-2 border-rose-200">
            <h2 className="text-4xl font-bold text-rose-600 mb-3">INVOICE</h2>
            <div className="text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Number:</span>
                <span className="font-bold">INV-2024-001</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Date:</span>
                <span className="font-bold">Jan 14, 2024</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Due:</span>
                <span className="font-bold">Feb 14, 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-lg mb-8 border-l-4 border-rose-500">
        <div className="grid grid-cols-2">
          <div>
            <h3 className="text-xs font-bold text-rose-700 uppercase mb-2">Invoice To</h3>
            <p className="font-bold text-xl text-gray-900">Acme Corporation</p>
            <p className="text-gray-700">John Smith, Purchasing Manager</p>
            <p className="text-gray-700">789 Business Street</p>
            <p className="text-gray-700">Los Angeles, CA 90001</p>
            <p className="text-gray-700">john@acmecorp.com</p>
          </div>
          <div className="text-right">
            <h3 className="text-xs font-bold text-rose-700 uppercase mb-2">Payment Terms</h3>
            <p className="text-gray-700">Net 30 Days</p>
            <p className="text-gray-700 mt-3">PO Number: <span className="font-bold">PO-45678</span></p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-rose-500 to-pink-500 text-white">
              <th className="text-left p-4 rounded-tl-lg">#</th>
              <th className="text-left p-4">Service Description</th>
              <th className="text-center p-4">Qty</th>
              <th className="text-right p-4">Unit Price</th>
              <th className="text-right p-4 rounded-tr-lg">Line Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-rose-50'}`}>
                <td className="p-4 font-bold text-rose-600">{String(item.id).padStart(2, '0')}</td>
                <td className="p-4">
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </td>
                <td className="p-4 text-center">{item.qty}</td>
                <td className="p-4 text-right">${item.price.toFixed(2)}</td>
                <td className="p-4 text-right font-bold text-gray-900">${(item.qty * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-2 gap-8">
        {/* Payment Info */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-rose-500"></span>
            Bank Account Information
          </h3>
          <div className="bg-rose-50 p-6 rounded-lg border border-rose-200">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-rose-200">
                  <td className="py-2 text-gray-600">Bank Name:</td>
                  <td className="py-2 text-right font-semibold">Chase Bank, N.A.</td>
                </tr>
                <tr className="border-b border-rose-200">
                  <td className="py-2 text-gray-600">Account Name:</td>
                  <td className="py-2 text-right font-semibold">Creative Studio LLC</td>
                </tr>
                <tr className="border-b border-rose-200">
                  <td className="py-2 text-gray-600">Account Number:</td>
                  <td className="py-2 text-right font-semibold font-mono">1234 5678 9012 3456</td>
                </tr>
                <tr className="border-b border-rose-200">
                  <td className="py-2 text-gray-600">Routing Number:</td>
                  <td className="py-2 text-right font-semibold font-mono">021000021</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">SWIFT Code:</td>
                  <td className="py-2 text-right font-semibold font-mono">CHASUS33</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Total */}
        <div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="space-y-3">
              <div className="flex justify-between text-lg">
                <span className="text-gray-700">Subtotal:</span>
                <span className="font-bold">$7,300.00</span>
              </div>
              <div className="flex justify-between text-lg pb-3 border-b-2 border-gray-300">
                <span className="text-gray-700">Tax (10%):</span>
                <span className="font-bold">$730.00</span>
              </div>
              <div className="pt-2">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xl font-bold text-gray-900">TOTAL DUE:</span>
                  <span className="text-4xl font-bold text-rose-600">$8,030.00</span>
                </div>
                <p className="text-right text-sm text-gray-500">USD</p>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-rose-500 text-white p-4 rounded-lg text-center">
            <p className="font-bold">Please pay by February 14, 2024</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 pt-6 border-t-2 border-rose-200">
        <div className="text-center">
          <p className="text-gray-700 font-semibold mb-2">Thank you for your business!</p>
          <p className="text-sm text-gray-600">For any questions regarding this invoice, please contact us at hello@creativestudio.com</p>
        </div>
      </div>
    </div>
  );
};
