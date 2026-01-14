export const Template02 = () => {
  return (
    <div className="max-w-5xl mx-auto bg-white p-12 shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 -mx-12 -mt-12 p-8 mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white rounded flex items-center justify-center">
              <span className="text-slate-800 font-bold text-2xl">CS</span>
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold mb-1">CREATIVE STUDIO</h1>
              <p className="text-slate-300 text-sm">www.creativestudio.com</p>
            </div>
          </div>
          <div className="text-right text-white">
            <h2 className="text-5xl font-bold mb-2">INVOICE</h2>
            <p className="text-slate-300">INV-2024-001</p>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <div className="mb-6">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Invoice From</h3>
            <p className="font-bold text-lg text-slate-900">Creative Studio</p>
            <p className="text-sm text-slate-600">456 Design Avenue</p>
            <p className="text-sm text-slate-600">New York, NY 10001, United States</p>
            <p className="text-sm text-slate-600 mt-2">Phone: +1 (555) 123-4567</p>
            <p className="text-sm text-slate-600">Email: hello@creativestudio.com</p>
            <p className="text-sm text-slate-600">Tax ID: US123456789</p>
          </div>
        </div>
        <div>
          <div className="mb-6">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Invoice To</h3>
            <p className="font-bold text-lg text-slate-900">Acme Corporation</p>
            <p className="text-sm text-slate-600">Attn: John Smith</p>
            <p className="text-sm text-slate-600">789 Business Street</p>
            <p className="text-sm text-slate-600">Los Angeles, CA 90001, United States</p>
            <p className="text-sm text-slate-600 mt-2">Email: john@acmecorp.com</p>
          </div>
        </div>
      </div>

      {/* Date Info Bar */}
      <div className="grid grid-cols-4 gap-4 mb-8 bg-slate-50 p-4 rounded">
        <div>
          <p className="text-xs text-slate-500 uppercase mb-1">Invoice Date</p>
          <p className="font-bold text-slate-900">January 14, 2024</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase mb-1">Due Date</p>
          <p className="font-bold text-slate-900">February 14, 2024</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase mb-1">Payment Terms</p>
          <p className="font-bold text-slate-900">Net 30 Days</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase mb-1">PO Number</p>
          <p className="font-bold text-slate-900">PO-45678</p>
        </div>
      </div>

      {/* Line Items */}
      <div className="mb-8">
        <div className="bg-slate-800 text-white px-4 py-3 grid grid-cols-12 gap-4 font-semibold text-sm">
          <div className="col-span-6">DESCRIPTION</div>
          <div className="col-span-2 text-center">QUANTITY</div>
          <div className="col-span-2 text-right">UNIT PRICE</div>
          <div className="col-span-2 text-right">AMOUNT</div>
        </div>
        
        <div className="border-x border-b border-slate-200">
          <div className="px-4 py-4 grid grid-cols-12 gap-4 items-center border-b border-slate-200">
            <div className="col-span-6">
              <p className="font-semibold text-slate-900">Website Design & Development</p>
              <p className="text-sm text-slate-500">Complete responsive website with modern UI</p>
            </div>
            <div className="col-span-2 text-center">1</div>
            <div className="col-span-2 text-right">$3,500.00</div>
            <div className="col-span-2 text-right font-bold">$3,500.00</div>
          </div>
          
          <div className="px-4 py-4 grid grid-cols-12 gap-4 items-center border-b border-slate-200 bg-slate-50">
            <div className="col-span-6">
              <p className="font-semibold text-slate-900">Brand Identity Package</p>
              <p className="text-sm text-slate-500">Logo, color palette, and brand guidelines</p>
            </div>
            <div className="col-span-2 text-center">1</div>
            <div className="col-span-2 text-right">$1,800.00</div>
            <div className="col-span-2 text-right font-bold">$1,800.00</div>
          </div>
          
          <div className="px-4 py-4 grid grid-cols-12 gap-4 items-center border-b border-slate-200">
            <div className="col-span-6">
              <p className="font-semibold text-slate-900">UI/UX Consultation</p>
              <p className="text-sm text-slate-500">Professional consultation services</p>
            </div>
            <div className="col-span-2 text-center">8 hrs</div>
            <div className="col-span-2 text-right">$150.00</div>
            <div className="col-span-2 text-right font-bold">$1,200.00</div>
          </div>
          
          <div className="px-4 py-4 grid grid-cols-12 gap-4 items-center bg-slate-50">
            <div className="col-span-6">
              <p className="font-semibold text-slate-900">Content Writing & SEO</p>
              <p className="text-sm text-slate-500">SEO-optimized content for all pages</p>
            </div>
            <div className="col-span-2 text-center">1</div>
            <div className="col-span-2 text-right">$800.00</div>
            <div className="col-span-2 text-right font-bold">$800.00</div>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-2 gap-8">
        {/* Bank Details */}
        <div className="border-2 border-slate-800 p-6 rounded">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-slate-800"></span>
            BANK DETAILS
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Bank Name:</span>
              <span className="font-semibold">Chase Bank, N.A.</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Account Name:</span>
              <span className="font-semibold">Creative Studio LLC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Account Number:</span>
              <span className="font-semibold">1234 5678 9012</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Routing Number:</span>
              <span className="font-semibold">021000021</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">SWIFT:</span>
              <span className="font-semibold">CHASUS33</span>
            </div>
          </div>
        </div>

        {/* Totals */}
        <div>
          <div className="space-y-3">
            <div className="flex justify-between text-lg py-3 border-b border-slate-200">
              <span className="text-slate-600">Subtotal:</span>
              <span className="font-bold">$7,300.00</span>
            </div>
            <div className="flex justify-between text-lg py-3 border-b border-slate-200">
              <span className="text-slate-600">Tax (10%):</span>
              <span className="font-bold">$730.00</span>
            </div>
            <div className="bg-slate-800 text-white p-6 rounded">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">TOTAL DUE (USD)</span>
                <span className="text-4xl font-bold">$8,030.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t-2 border-slate-200">
        <p className="text-sm text-slate-600 text-center">
          Thank you for your business. Please make payment by the due date to avoid any late fees.
        </p>
      </div>
    </div>
  );
};
