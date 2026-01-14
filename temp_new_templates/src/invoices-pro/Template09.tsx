export const Template09 = () => {
  return (
    <div className="max-w-5xl mx-auto bg-white p-12 shadow-2xl">
      {/* Header with Logo */}
      <div className="flex justify-between items-start mb-10">
        <div className="flex gap-6">
          <div className="w-28 h-28 bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-xl">
            <span className="text-white font-bold text-4xl">CS</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">CREATIVE STUDIO</h1>
            <p className="text-violet-600 font-semibold mb-3">Professional Design Services</p>
            <div className="text-sm text-gray-600 space-y-1">
              <p>456 Design Avenue</p>
              <p>New York, NY 10001, United States</p>
              <p>Tel: +1 (555) 123-4567</p>
              <p>Email: hello@creativestudio.com</p>
              <p>Tax ID: US123456789</p>
            </div>
          </div>
        </div>
        <div>
          <div className="text-right mb-4">
            <h2 className="text-6xl font-bold text-violet-600">INVOICE</h2>
          </div>
          <div className="bg-violet-100 px-6 py-4 rounded-lg">
            <p className="text-sm text-violet-700 mb-1">Invoice Number</p>
            <p className="text-2xl font-bold text-violet-900">INV-2024-001</p>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="border-2 border-violet-200 rounded-lg p-6 bg-violet-50">
          <h3 className="text-xs font-bold text-violet-700 uppercase tracking-wider mb-4">Bill To</h3>
          <p className="font-bold text-2xl text-gray-900 mb-2">Acme Corporation</p>
          <p className="text-gray-700">Attn: John Smith</p>
          <p className="text-gray-700">789 Business Street</p>
          <p className="text-gray-700">Los Angeles, CA 90001</p>
          <p className="text-gray-700">United States</p>
          <p className="text-gray-700 mt-2">john@acmecorp.com</p>
        </div>
        <div className="border-2 border-violet-200 rounded-lg p-6 bg-violet-50">
          <h3 className="text-xs font-bold text-violet-700 uppercase tracking-wider mb-4">Invoice Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-violet-200">
              <span className="text-gray-600">Issue Date:</span>
              <span className="font-bold text-gray-900">January 14, 2024</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-violet-200">
              <span className="text-gray-600">Due Date:</span>
              <span className="font-bold text-gray-900">February 14, 2024</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-violet-200">
              <span className="text-gray-600">Payment Terms:</span>
              <span className="font-bold text-gray-900">Net 30 Days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">PO Number:</span>
              <span className="font-bold text-gray-900">PO-45678</span>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-violet-600">Services Provided</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-4 p-4 bg-violet-600 text-white rounded-t-lg font-semibold">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Description</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Rate</div>
            <div className="col-span-2 text-right">Amount</div>
          </div>

          {[
            { num: 1, name: 'Website Design & Development', desc: 'Complete responsive website with modern UI', qty: '1 unit', rate: 3500 },
            { num: 2, name: 'Brand Identity Package', desc: 'Logo, color palette, and brand guidelines', qty: '1 pkg', rate: 1800 },
            { num: 3, name: 'UI/UX Consultation', desc: 'Professional consultation services', qty: '8 hrs', rate: 150, total: 1200 },
            { num: 4, name: 'Content Writing & SEO', desc: 'SEO-optimized content for all pages', qty: '1 pkg', rate: 800 }
          ].map((item, i) => (
            <div key={i} className={`grid grid-cols-12 gap-4 p-4 border-b border-violet-100 ${i % 2 === 0 ? 'bg-white' : 'bg-violet-50'}`}>
              <div className="col-span-1 font-bold text-violet-600">{item.num}</div>
              <div className="col-span-5">
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
              <div className="col-span-2 text-center">{item.qty}</div>
              <div className="col-span-2 text-right">${item.rate.toFixed(2)}</div>
              <div className="col-span-2 text-right font-bold">${(item.total || item.rate).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-2 gap-8">
        {/* Bank Details */}
        <div>
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-6 rounded-lg border-2 border-violet-200">
            <h3 className="font-bold text-violet-900 text-lg mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-violet-600 rounded-full"></span>
              Payment Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-violet-700 uppercase font-bold mb-1">Bank Name</p>
                <p className="font-semibold text-gray-900">Chase Bank, N.A.</p>
              </div>
              <div>
                <p className="text-xs text-violet-700 uppercase font-bold mb-1">Account Holder</p>
                <p className="font-semibold text-gray-900">Creative Studio LLC</p>
              </div>
              <div>
                <p className="text-xs text-violet-700 uppercase font-bold mb-1">Account Number</p>
                <p className="font-semibold text-gray-900 font-mono">1234 5678 9012 3456</p>
              </div>
              <div>
                <p className="text-xs text-violet-700 uppercase font-bold mb-1">Routing Number</p>
                <p className="font-semibold text-gray-900 font-mono">021000021</p>
              </div>
              <div>
                <p className="text-xs text-violet-700 uppercase font-bold mb-1">SWIFT Code</p>
                <p className="font-semibold text-gray-900 font-mono">CHASUS33</p>
              </div>
            </div>
          </div>
        </div>

        {/* Totals */}
        <div>
          <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
            <div className="space-y-4">
              <div className="flex justify-between text-xl">
                <span className="text-gray-700">Subtotal</span>
                <span className="font-bold">$7,300.00</span>
              </div>
              <div className="flex justify-between text-xl pb-4 border-b-2 border-gray-300">
                <span className="text-gray-700">Tax (10%)</span>
                <span className="font-bold">$730.00</span>
              </div>
              <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-8 rounded-lg -mx-6 -mb-6">
                <p className="text-sm opacity-90 mb-2">Total Amount Due</p>
                <p className="text-5xl font-bold mb-2">$8,030.00</p>
                <p className="text-sm opacity-90">United States Dollars</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-10 bg-violet-50 border-l-4 border-violet-600 p-6 rounded">
        <h4 className="font-bold text-violet-900 mb-2">Terms & Conditions</h4>
        <p className="text-sm text-gray-700">
          Payment is due within 30 days of invoice date. Please include invoice number INV-2024-001 
          with your payment. Late payments may be subject to a 1.5% monthly finance charge. Thank you for your business!
        </p>
      </div>
    </div>
  );
};
