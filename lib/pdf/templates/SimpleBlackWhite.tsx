export const SimpleBlackWhite = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-16 shadow-2xl">
      <div className="border-4 border-black p-12">
        {/* Header */}
        <div className="text-center mb-12 border-b-2 border-black pb-8">
          <h1 className="text-5xl font-bold mb-4">INVOICE</h1>
          <div className="text-2xl font-bold">INV-2024-001</div>
        </div>

        {/* Company & Client */}
        <div className="grid grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="font-bold text-xl mb-4 uppercase">From</h3>
            <p className="font-bold text-lg">Creative Studio</p>
            <p>456 Design Avenue</p>
            <p>New York, NY 10001</p>
            <p>+1 (555) 123-4567</p>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-4 uppercase">To</h3>
            <p className="font-bold text-lg">Acme Corporation</p>
            <p>John Smith</p>
            <p>789 Business Street</p>
            <p>Los Angeles, CA 90001</p>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-12 mb-12 border-y-2 border-black py-6">
          <div>
            <span className="font-bold">Issue Date:</span> January 14, 2024
          </div>
          <div>
            <span className="font-bold">Due Date:</span> February 14, 2024
          </div>
        </div>

        {/* Items */}
        <table className="w-full mb-12">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="text-left py-4 font-bold">DESCRIPTION</th>
              <th className="text-right py-4 font-bold w-32">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-300">
              <td className="py-4">Website Design & Development</td>
              <td className="text-right py-4 font-semibold">$3,500.00</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="py-4">Brand Identity Package</td>
              <td className="text-right py-4 font-semibold">$1,800.00</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="py-4">UI/UX Consultation (8 hours)</td>
              <td className="text-right py-4 font-semibold">$1,200.00</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="py-4">Content Writing & SEO</td>
              <td className="text-right py-4 font-semibold">$800.00</td>
            </tr>
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-12">
          <div className="w-96">
            <div className="flex justify-between py-3 border-b border-gray-300">
              <span className="font-bold">SUBTOTAL</span>
              <span>$7,300.00</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-300">
              <span className="font-bold">TAX (10%)</span>
              <span>$730.00</span>
            </div>
            <div className="flex justify-between py-4 bg-black text-white px-4 mt-4">
              <span className="font-bold text-xl">TOTAL</span>
              <span className="font-bold text-2xl">$8,030.00</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center border-t-2 border-black pt-6">
          <p className="font-bold">Payment Due: February 14, 2024</p>
          <p className="mt-2">Thank you for your business</p>
        </div>
      </div>
    </div>
  );
};
