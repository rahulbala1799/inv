export const Template06 = () => {
  return (
    <div className="max-w-5xl mx-auto bg-white p-12 shadow-2xl border-8 border-double border-gray-300">
      {/* Logo and Header */}
      <div className="text-center mb-8 pb-6 border-b-2 border-gray-800">
        <div className="inline-block w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mb-4">
          <span className="text-white font-bold text-3xl">CS</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">CREATIVE STUDIO</h1>
        <p className="text-gray-600">456 Design Avenue • New York, NY 10001 • +1 (555) 123-4567</p>
        <p className="text-gray-600">hello@creativestudio.com • www.creativestudio.com</p>
      </div>

      {/* Invoice Title and Number */}
      <div className="text-center mb-8">
        <h2 className="text-6xl font-bold text-gray-900 mb-3">INVOICE</h2>
        <div className="inline-block bg-gray-900 text-white px-8 py-3 text-2xl font-bold">
          INV-2024-001
        </div>
      </div>

      {/* Client and Dates */}
      <div className="grid grid-cols-3 gap-6 mb-8 text-center">
        <div className="border-2 border-gray-800 p-5">
          <p className="text-xs font-bold uppercase mb-2">Invoice To</p>
          <p className="font-bold text-lg">Acme Corporation</p>
          <p className="text-sm">John Smith</p>
        </div>
        <div className="border-2 border-gray-800 p-5">
          <p className="text-xs font-bold uppercase mb-2">Invoice Date</p>
          <p className="font-bold text-lg">January 14, 2024</p>
        </div>
        <div className="border-2 border-gray-800 p-5">
          <p className="text-xs font-bold uppercase mb-2">Due Date</p>
          <p className="font-bold text-lg">February 14, 2024</p>
        </div>
      </div>

      {/* Items */}
      <table className="w-full mb-8 border-2 border-gray-800">
        <thead>
          <tr className="bg-gray-900 text-white">
            <th className="text-left p-4 border-r-2 border-white">DESCRIPTION</th>
            <th className="text-center p-4 border-r-2 border-white w-24">QTY</th>
            <th className="text-right p-4 border-r-2 border-white w-32">RATE</th>
            <th className="text-right p-4 w-32">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b-2 border-gray-300">
            <td className="p-4">Website Design & Development</td>
            <td className="text-center p-4">1</td>
            <td className="text-right p-4">$3,500.00</td>
            <td className="text-right p-4 font-bold">$3,500.00</td>
          </tr>
          <tr className="border-b-2 border-gray-300">
            <td className="p-4">Brand Identity Package</td>
            <td className="text-center p-4">1</td>
            <td className="text-right p-4">$1,800.00</td>
            <td className="text-right p-4 font-bold">$1,800.00</td>
          </tr>
          <tr className="border-b-2 border-gray-300">
            <td className="p-4">UI/UX Consultation (8 hours)</td>
            <td className="text-center p-4">8</td>
            <td className="text-right p-4">$150.00</td>
            <td className="text-right p-4 font-bold">$1,200.00</td>
          </tr>
          <tr>
            <td className="p-4">Content Writing & SEO</td>
            <td className="text-center p-4">1</td>
            <td className="text-right p-4">$800.00</td>
            <td className="text-right p-4 font-bold">$800.00</td>
          </tr>
        </tbody>
      </table>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-8">
        <div className="border-2 border-gray-800 p-6">
          <h3 className="font-bold text-lg mb-4 text-center">PAYMENT DETAILS</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-gray-300 pb-2">
              <span>Bank:</span>
              <span className="font-bold">Chase Bank</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-2">
              <span>Account:</span>
              <span className="font-bold">Creative Studio LLC</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-2">
              <span>Number:</span>
              <span className="font-bold">1234 5678 9012</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-2">
              <span>Routing:</span>
              <span className="font-bold">021000021</span>
            </div>
            <div className="flex justify-between">
              <span>SWIFT:</span>
              <span className="font-bold">CHASUS33</span>
            </div>
          </div>
        </div>

        <div className="border-2 border-gray-800 p-6">
          <div className="space-y-3">
            <div className="flex justify-between text-lg">
              <span>SUBTOTAL</span>
              <span className="font-bold">$7,300.00</span>
            </div>
            <div className="flex justify-between text-lg border-b-2 border-gray-300 pb-3">
              <span>TAX (10%)</span>
              <span className="font-bold">$730.00</span>
            </div>
            <div className="bg-gray-900 text-white p-6 -mx-6 -mb-6 flex justify-between items-center">
              <span className="text-2xl font-bold">TOTAL</span>
              <span className="text-4xl font-bold">$8,030.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t-2 border-gray-800 text-center">
        <p className="font-bold text-lg">THANK YOU FOR YOUR BUSINESS</p>
      </div>
    </div>
  );
};
