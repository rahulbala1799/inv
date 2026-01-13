export interface CompanyInfo {
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
  vatNumber: string;
}

export interface BillToInfo {
  customerId: string | null;
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
  email: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  qty: number;
  unitPrice: number;
  taxRate: number;
}

export interface InvoiceDraft {
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  company: CompanyInfo;
  billTo: BillToInfo;
  items: InvoiceItem[];
  notes: string;
}

export interface Customer {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
  email: string;
}
