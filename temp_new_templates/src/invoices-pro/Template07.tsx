export const Template07 = () => {
  return (
    <div className="max-w-5xl mx-auto bg-white p-12 shadow-2xl">
      {/* Angled Header Design */}
      <div className="relative mb-12">
        <div className="absolute top-0 right-0 w-96 h-48 bg-gradient-to-br from-teal-500 to-teal-700 transform skew-y-3"></div>
        <div className="relative z-10 flex justify-between items-start pt-8">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 bg-white border-4 border-teal-600 rounded-lg flex items-center justify-center shadow-xl">
              <span className="text-teal-600 font-bold text-3xl">CS</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">CREATIVE STUDIO</h1>
              <p className="text-teal-600 font-semibold text-lg">Design Agency</p>
            </div>
          </div>
          <div className="bg-white px-8 py-4 shadow-lg">
            <p className="text-sm text-gray-600 mb-1">Invoice Number</p>
            <p className="text-3xl font-bold text-teal-600">INV-2024-001</p>
          </div>
        </div>
      </div>

      {/* Company and Client Grid */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-lg">
          <h3 className="text-xs font-bold text-teal-700 uppercase mb-3">From</h3>
          <p className="font-semibold text-gray-900">Creative Studio</p>
          <p className="text-sm text-gray-700">456 Design Avenue</p>
          <p className="text-sm text-gray-700">New York, NY 10001</p>
          <p className="text-sm text-gray-700 mt-2">+1 (555) 123-4567</p>
          <p className="text-sm text-teal-600 font-semibold">hello@creativestudio.com</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-teal-600">
          <h3 className="text-xs font-bold text-gray-700 uppercase mb-3">Bill To</h3>
          <p className="font-bold text-xl text-gray-900">Acme Corporation</p>
          <p className="text-sm text-gray-700">John Smith</p>
          <p className="text-sm text-gray-700">789 Business Street</p>
          <p className="text-sm text-gray-700">Los Angeles, CA 90001</p>
        </div>
      </div>

      {/* Invoice Info Bar */}
      <div className="bg-teal-600 text-white p-6 rounded-lg mb-8 grid grid-cols-4 gap-6">
        <div>
          <p className="text-teal-200 text-xs uppercase mb-1">Issue Date</p>
          <p className="font-bold text-lg">Jan 14, 2024</p>
        </div>
        <div>
          <p className="text-teal-200 text-xs uppercase mb-1">Due Date</p>
          <p className="font-bold text-lg">Feb 14, 2024</p>
        </div>
        <div>
          <p className="text-teal-200 text-xs uppercase mb-1">Terms</p>
          <p className="font-bold text-lg">Net 30</p>
        </div>
        <div>
          <p className="text-teal-200 text-xs uppercase mb-1">PO Number</p>
          <p className="font-bold text-lg">PO-45678</p>
        </div>
      </div>

      {/* Items */}
      <div className="mb-8">
        <div className="grid grid-cols-12 gap-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-4 rounded-t-lg font-bold text-sm">
          <div className="col-span-6">SERVICE</div>
          <div className="col-span-2 text-center">QTY</div>
          <div className="col-span-2 text-right">RATE</div>
          <div className="col-span-2 text-right">TOTAL</div>
        </div>
        <div className="border-x-2 border-b-2 border-teal-200 rounded-b-lg">
          {[
            { name: 'Website Design & Development', desc: 'Complete responsive website', qty: 1, rate: 3500 },
            { name: 'Brand Identity Package', desc: 'Logo and brand guidelines', qty: 1, rate: 1800 },
            { name: 'UI/UX Consultation', desc: '8 hours of consultation', qty: 8, rate: 150 },
            { name: 'Content Writing & SEO', desc: 'SEO-optimized content', qty: 1, rate: 800 }
          ].map((item, i) => (
            <div key={i} className={`grid grid-cols-12 gap-4 p-4 ${i % 2 === 0 ? 'bg-teal-50' : 'bg-white'}`}>
              <div className="col-span-6">
                <p className="font-bold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
              <div className="col-span-2 text-center">{item.qty}</div>
              <div className="col-span-2 text-right">${item.rate.toFixed(2)}</div>
              <div className="col-span-2 text-right font-bold text-teal-700">${(item.qty * item.rate).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-8">
        {/* Bank Info */}
        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-lg border-2 border-teal-200">
          <h3 className="font-bold text-teal-900 mb-4 text-lg">Bank Transfer Information</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-teal-700 font-semibold">Bank Name</p>
              <p className="text-gray-900">Chase Bank, N.A.</p>
            </div>
            <div>
              <p className="text-teal-700 font-semibold">Beneficiary</p>
              <p className="text-gray-900">Creative Studio LLC</p>
            </div>
            <div>
              <p className="text-teal-700 font-semibold">Account Number</p>
              <p className="text-gray-900 font-mono">1234 5678 9012 3456</p>
            </div>
            <div>
              <p className="text-teal-700 font-semibold">Routing Number</p>
              <p className="text-gray-900 font-mono">021000021</p>
            </div>
            <div>
              <p className="text-teal-700 font-semibold">SWIFT Code</p>
              <p className="text-gray-900 font-mono">CHASUS33</p>
            </div>
          </div>
        </div>

        {/* Totals */}
        <div>
          <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
            <div className="space-y-4">
              <div className="flex justify-between text-lg">
                <span className="text-gray-700">Subtotal</span>
                <span className="font-bold">$7,300.00</span>
              </div>
              <div className="flex justify-between text-lg pb-4 border-b-2 border-gray-300">
                <span className="text-gray-700">Tax (10%)</span>
                <span className="font-bold">$730.00</span>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-6 rounded-lg -mx-6 -mb-6">
                <p className="text-sm opacity-90 mb-2">Total Amount Due</p>
                <p className="text-5xl font-bold">$8,030.00</p>
                <p className="text-sm opacity-90 mt-2">USD</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 p-6 bg-teal-50 rounded-lg border-l-4 border-teal-600">
        <p className="text-sm text-gray-700">
          <span className="font-bold text-teal-900">Payment Terms:</span> Payment is due within 30 days. Thank you for your business!
        </p>
      </div>
    </div>
  );
};
