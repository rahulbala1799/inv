export const Template10 = () => {
  return (
    <div className="max-w-5xl mx-auto bg-white shadow-2xl">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 h-3"></div>
      
      <div className="p-12">
        {/* Header */}
        <div className="grid grid-cols-3 gap-8 mb-10">
          <div className="col-span-2 flex gap-6">
            <div className="w-24 h-24 border-4 border-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-cyan-600 font-bold text-3xl">CS</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">CREATIVE STUDIO</h1>
              <p className="text-cyan-600 font-semibold mb-3">Design & Development Services</p>
              <div className="text-sm text-gray-600">
                <p>456 Design Avenue, New York, NY 10001</p>
                <p>Phone: +1 (555) 123-4567 | Email: hello@creativestudio.com</p>
                <p>www.creativestudio.com | Tax ID: US123456789</p>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl border-2 border-cyan-200">
              <h2 className="text-5xl font-bold text-cyan-600 mb-4">INVOICE</h2>
              <div className="space-y-1 text-sm">
                <p className="text-gray-600"># INV-2024-001</p>
                <p className="text-gray-600">Date: Jan 14, 2024</p>
                <p className="text-gray-600">Due: Feb 14, 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bill To Section */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="col-span-2 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xs font-bold text-cyan-700 uppercase tracking-wider mb-3">Bill To</h3>
            <p className="font-bold text-2xl text-gray-900 mb-2">Acme Corporation</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-700">Contact: John Smith</p>
                <p className="text-gray-700">789 Business Street</p>
                <p className="text-gray-700">Los Angeles, CA 90001</p>
              </div>
              <div>
                <p className="text-gray-700">Email: john@acmecorp.com</p>
                <p className="text-gray-700">Phone: +1 (555) 987-6543</p>
                <p className="text-gray-700">PO#: PO-45678</p>
              </div>
            </div>
          </div>
          <div className="bg-cyan-50 p-6 rounded-lg border border-cyan-200">
            <h3 className="text-xs font-bold text-cyan-700 uppercase tracking-wider mb-3">Payment Terms</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700"><span className="font-semibold">Terms:</span> Net 30 Days</p>
              <p className="text-gray-700"><span className="font-semibold">Currency:</span> USD</p>
              <p className="text-gray-700"><span className="font-semibold">Status:</span> <span className="text-orange-600 font-bold">Unpaid</span></p>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-4 rounded-t-lg">
            <div className="grid grid-cols-12 gap-4 font-semibold">
              <div className="col-span-5">SERVICE DESCRIPTION</div>
              <div className="col-span-3">DETAILS</div>
              <div className="col-span-2 text-right">RATE</div>
              <div className="col-span-2 text-right">AMOUNT</div>
            </div>
          </div>
          <div className="border-x-2 border-b-2 border-cyan-200 rounded-b-lg">
            {[
              { name: 'Website Design & Development', detail: '1 × Complete Website', rate: 3500 },
              { name: 'Brand Identity Package', detail: '1 × Full Package', rate: 1800 },
              { name: 'UI/UX Consultation', detail: '8 × Hours @ $150/hr', rate: 1200 },
              { name: 'Content Writing & SEO', detail: '1 × SEO Package', rate: 800 }
            ].map((item, i) => (
              <div key={i} className={`grid grid-cols-12 gap-4 px-6 py-5 border-b border-cyan-100 ${i % 2 === 0 ? 'bg-white' : 'bg-cyan-50'}`}>
                <div className="col-span-5">
                  <p className="font-bold text-gray-900">{item.name}</p>
                </div>
                <div className="col-span-3 text-gray-600 text-sm">{item.detail}</div>
                <div className="col-span-2 text-right text-gray-700">${item.rate.toFixed(2)}</div>
                <div className="col-span-2 text-right font-bold text-cyan-700">${item.rate.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-8">
          {/* Payment Info */}
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-4 pb-2 border-b-2 border-cyan-600">Wire Transfer Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-cyan-700 font-bold uppercase mb-1">Bank Name</p>
                  <p className="font-semibold text-gray-900">Chase Bank, N.A.</p>
                </div>
                <div>
                  <p className="text-xs text-cyan-700 font-bold uppercase mb-1">Bank Address</p>
                  <p className="text-sm text-gray-700">New York, NY</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-cyan-700 font-bold uppercase mb-1">Beneficiary</p>
                  <p className="font-semibold text-gray-900">Creative Studio LLC</p>
                </div>
                <div>
                  <p className="text-xs text-cyan-700 font-bold uppercase mb-1">Account Type</p>
                  <p className="text-sm text-gray-700">Business Checking</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-cyan-700 font-bold uppercase mb-1">Account Number</p>
                <p className="font-semibold text-gray-900 font-mono text-lg">1234 5678 9012 3456</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-cyan-700 font-bold uppercase mb-1">Routing Number</p>
                  <p className="font-semibold text-gray-900 font-mono">021000021</p>
                </div>
                <div>
                  <p className="text-xs text-cyan-700 font-bold uppercase mb-1">SWIFT Code</p>
                  <p className="font-semibold text-gray-900 font-mono">CHASUS33</p>
                </div>
              </div>
            </div>
          </div>

          {/* Totals */}
          <div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="space-y-3">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="font-bold">$7,300.00</span>
                  </div>
                  <div className="flex justify-between text-lg border-b border-gray-300 pb-3">
                    <span className="text-gray-700">Tax (10%)</span>
                    <span className="font-bold">$730.00</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-2xl font-bold text-gray-900">TOTAL</span>
                    <div className="text-right">
                      <p className="text-5xl font-bold text-cyan-600">$8,030.00</p>
                      <p className="text-sm text-gray-500">USD</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-5 rounded-lg text-center">
                <p className="text-sm opacity-90 mb-1">Payment Due By</p>
                <p className="text-2xl font-bold">February 14, 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Notes</h4>
              <p className="text-sm text-gray-600">
                Thank you for your business. Please remit payment within 30 days. 
                Include invoice number with your payment.
              </p>
            </div>
            <div className="text-right">
              <h4 className="font-bold text-gray-900 mb-2">Questions?</h4>
              <p className="text-sm text-gray-600">Contact us at</p>
              <p className="text-sm text-cyan-600 font-semibold">hello@creativestudio.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 h-3"></div>
    </div>
  );
};
