// Sample invoice data for template showcase
export const sampleInvoiceData = {
  company: {
    name: "CREATIVE STUDIO",
    address: "456 Design Avenue",
    city: "New York, NY 10001",
    country: "United States",
    phone: "+1 (555) 123-4567",
    email: "hello@creativestudio.com",
    website: "www.creativestudio.com",
    vat: "US123456789",
  },
  client: {
    name: "Acme Corporation",
    contact: "John Smith",
    address: "789 Business Street",
    city: "Los Angeles, CA 90001",
    country: "United States",
    email: "john@acmecorp.com",
  },
  invoice: {
    number: "INV-2024-001",
    date: "January 14, 2024",
    dueDate: "February 14, 2024",
    poNumber: "PO-45678",
  },
  items: [
    {
      description: "Website Design & Development",
      quantity: 1,
      rate: 3500.0,
      amount: 3500.0,
    },
    {
      description: "Brand Identity Package",
      quantity: 1,
      rate: 1800.0,
      amount: 1800.0,
    },
    {
      description: "UI/UX Consultation (8 hours)",
      quantity: 8,
      rate: 150.0,
      amount: 1200.0,
    },
    {
      description: "Content Writing & SEO",
      quantity: 1,
      rate: 800.0,
      amount: 800.0,
    },
  ],
  subtotal: 7300.0,
  tax: 730.0,
  total: 8030.0,
  notes: "Payment is due within 30 days. Please include invoice number with your payment.",
  paymentMethods: {
    bank: "Chase Bank",
    account: "****4567",
    routing: "021000021",
    paypal: "payments@creativestudio.com",
  },
};
