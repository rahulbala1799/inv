import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { InvoiceDraft, InvoiceItem, BillToInfo, Customer } from "@/app/types/invoice";
import { mockCustomers } from "@/app/data/mockCustomers";
import { InlineEditableText } from "@/app/components/invoices/InlineEditableText";
import { InlineEditableNumber } from "@/app/components/invoices/InlineEditableNumber";
import { InlineEditableMoney } from "@/app/components/invoices/InlineEditableMoney";
import { InlineEditableDate } from "@/app/components/invoices/InlineEditableDate";
import { InlineCustomerSelect } from "@/app/components/invoices/InlineCustomerSelect";
import { MissingFieldsSummary, MissingField } from "@/app/components/invoices/MissingFieldsSummary";
import { Button } from "@/app/components/ui/button";
import { ArrowLeft, Download, Plus, X } from "lucide-react";

type SaveStatus = "idle" | "saving" | "saved";

const initialInvoice: InvoiceDraft = {
  invoiceNumber: "",
  issueDate: new Date(),
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  company: {
    name: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    country: "",
    vatNumber: "",
  },
  billTo: {
    customerId: null,
    name: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    country: "",
    email: "",
  },
  items: [
    {
      id: crypto.randomUUID(),
      description: "",
      qty: 1,
      unitPrice: 0,
      taxRate: 10,
    },
  ],
  notes: "",
};

export default function InvoiceEditor() {
  const [invoice, setInvoice] = useState<InvoiceDraft>(initialInvoice);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveTimeoutId, setSaveTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // Refs for fields
  const companyNameRef = useRef<HTMLDivElement>(null);
  const companyAddressRef = useRef<HTMLDivElement>(null);
  const companyCityRef = useRef<HTMLDivElement>(null);
  const companyVatRef = useRef<HTMLDivElement>(null);
  const invoiceNumberRef = useRef<HTMLDivElement>(null);
  const customerRef = useRef<HTMLDivElement>(null);
  const billToEmailRef = useRef<HTMLDivElement>(null);
  const firstItemDescRef = useRef<HTMLDivElement>(null);
  const firstItemPriceRef = useRef<HTMLDivElement>(null);

  // Auto-save simulation
  const triggerAutoSave = useCallback(() => {
    if (saveTimeoutId) {
      clearTimeout(saveTimeoutId);
    }

    const timeout = setTimeout(() => {
      setSaveStatus("saving");
      // Simulate API call
      setTimeout(() => {
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2000);
      }, 300);
    }, 500);

    setSaveTimeoutId(timeout);
  }, [saveTimeoutId]);

  useEffect(() => {
    return () => {
      if (saveTimeoutId) {
        clearTimeout(saveTimeoutId);
      }
    };
  }, [saveTimeoutId]);

  // Update handlers
  const updateInvoice = (updates: Partial<InvoiceDraft>) => {
    setInvoice((prev) => ({ ...prev, ...updates }));
    triggerAutoSave();
  };

  const updateCompany = (field: keyof InvoiceDraft["company"], value: string) => {
    setInvoice((prev) => ({
      ...prev,
      company: { ...prev.company, [field]: value },
    }));
    triggerAutoSave();
  };

  const updateBillTo = (field: keyof BillToInfo, value: string) => {
    setInvoice((prev) => ({
      ...prev,
      billTo: { ...prev.billTo, [field]: value },
    }));
    triggerAutoSave();
  };

  const handleCustomerSelect = (customer: Customer) => {
    setInvoice((prev) => ({
      ...prev,
      billTo: {
        customerId: customer.id,
        name: customer.name,
        addressLine1: customer.addressLine1,
        addressLine2: customer.addressLine2,
        city: customer.city,
        postalCode: customer.postalCode,
        country: customer.country,
        email: customer.email,
      },
    }));
    triggerAutoSave();
  };

  const updateItem = (itemId: string, field: keyof InvoiceItem, value: string | number) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item
      ),
    }));
    triggerAutoSave();
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: crypto.randomUUID(),
      description: "",
      qty: 1,
      unitPrice: 0,
      taxRate: 10,
    };
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
    triggerAutoSave();
  };

  const removeItem = (itemId: string) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== itemId),
    }));
    triggerAutoSave();
  };

  // Calculations
  const calculateLineTotal = (item: InvoiceItem) => {
    return item.qty * item.unitPrice * (1 + item.taxRate / 100);
  };

  const calculateSubtotal = () => {
    return invoice.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
  };

  const calculateTaxTotal = () => {
    return invoice.items.reduce(
      (sum, item) => sum + item.qty * item.unitPrice * (item.taxRate / 100),
      0
    );
  };

  const calculateGrandTotal = () => {
    return calculateSubtotal() + calculateTaxTotal();
  };

  const selectedCustomer = mockCustomers.find((c) => c.id === invoice.billTo.customerId) || null;

  // Missing fields tracking
  const missingFields = useMemo<MissingField[]>(() => {
    const fields: MissingField[] = [];

    if (!invoice.invoiceNumber || invoice.invoiceNumber.trim() === "") {
      fields.push({
        id: "invoiceNumber",
        label: "Invoice number",
        onFocus: () => {
          invoiceNumberRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
          invoiceNumberRef.current?.click();
        },
      });
    }

    if (!invoice.company.name || invoice.company.name.trim() === "") {
      fields.push({
        id: "companyName",
        label: "Company name",
        onFocus: () => {
          companyNameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
          companyNameRef.current?.click();
        },
      });
    }

    if (!invoice.company.addressLine1 || invoice.company.addressLine1.trim() === "") {
      fields.push({
        id: "companyAddress",
        label: "Company address",
        onFocus: () => {
          companyAddressRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
          companyAddressRef.current?.click();
        },
      });
    }

    if (!invoice.company.city || invoice.company.city.trim() === "") {
      fields.push({
        id: "companyCity",
        label: "Company city/region",
        onFocus: () => {
          companyCityRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
          companyCityRef.current?.click();
        },
      });
    }

    if (!invoice.company.vatNumber || invoice.company.vatNumber.trim() === "") {
      fields.push({
        id: "companyVat",
        label: "Company VAT/Tax ID",
        onFocus: () => {
          companyVatRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
          companyVatRef.current?.click();
        },
      });
    }

    if (!invoice.billTo.name || invoice.billTo.name.trim() === "") {
      fields.push({
        id: "customer",
        label: "Customer name",
        onFocus: () => {
          customerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
          customerRef.current?.click();
        },
      });
    }

    if (!invoice.billTo.email || invoice.billTo.email.trim() === "") {
      fields.push({
        id: "billToEmail",
        label: "Customer email",
        onFocus: () => {
          billToEmailRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
          billToEmailRef.current?.click();
        },
      });
    }

    const firstItem = invoice.items[0];
    if (firstItem && (!firstItem.description || firstItem.description.trim() === "")) {
      fields.push({
        id: "itemDescription",
        label: "First item description",
        onFocus: () => {
          firstItemDescRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
          firstItemDescRef.current?.click();
        },
      });
    }

    if (firstItem && firstItem.unitPrice === 0) {
      fields.push({
        id: "itemPrice",
        label: "First item price",
        onFocus: () => {
          firstItemPriceRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
          firstItemPriceRef.current?.click();
        },
      });
    }

    return fields;
  }, [invoice]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="h-6 w-px bg-gray-300" />
            <MissingFieldsSummary missingFields={missingFields} />
            <div className="h-6 w-px bg-gray-300" />
            <div className="text-sm text-gray-600">
              {saveStatus === "saving" && "Saving..."}
              {saveStatus === "saved" && <span className="text-green-600">Saved</span>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm">
              Mark as Paid
            </Button>
          </div>
        </div>
      </div>

      {/* Invoice Paper */}
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="bg-white rounded-lg shadow-lg p-16">
          {/* Header Section */}
          <div className="flex justify-between mb-12">
            {/* Company Info */}
            <div className="space-y-1">
              <InlineEditableText
                ref={companyNameRef}
                value={invoice.company.name}
                onChange={(value) => updateCompany("name", value)}
                placeholder="Click to add company name"
                className="text-xl font-semibold"
                bold
                required
              />
              <InlineEditableText
                ref={companyAddressRef}
                value={invoice.company.addressLine1}
                onChange={(value) => updateCompany("addressLine1", value)}
                placeholder="Click to add street address"
                className="text-sm text-gray-600"
                required
              />
              <InlineEditableText
                value={invoice.company.addressLine2}
                onChange={(value) => updateCompany("addressLine2", value)}
                placeholder="Suite, unit, etc. (optional)"
                className="text-sm text-gray-600"
              />
              <InlineEditableText
                ref={companyCityRef}
                value={invoice.company.city}
                onChange={(value) => updateCompany("city", value)}
                placeholder="Click to add city, state, postal code"
                className="text-sm text-gray-600"
                required
              />
              <InlineEditableText
                ref={companyVatRef}
                value={invoice.company.vatNumber}
                onChange={(value) => updateCompany("vatNumber", value)}
                placeholder="Click to add VAT/Tax ID"
                className="text-sm text-gray-600"
                required
              />
            </div>

            {/* Invoice Details */}
            <div className="text-right space-y-2">
              <div className="text-4xl font-bold text-gray-900 mb-4">INVOICE</div>
              <div className="flex items-center justify-end gap-2 text-sm">
                <span className="text-gray-600">Invoice #:</span>
                <InlineEditableText
                  ref={invoiceNumberRef}
                  value={invoice.invoiceNumber}
                  onChange={(value) => updateInvoice({ invoiceNumber: value })}
                  placeholder="Click to add invoice number"
                  className="font-mono"
                  required
                />
              </div>
              <div className="flex items-center justify-end gap-2 text-sm">
                <span className="text-gray-600">Issue Date:</span>
                <InlineEditableDate
                  value={invoice.issueDate}
                  onChange={(value) => updateInvoice({ issueDate: value })}
                />
              </div>
              <div className="flex items-center justify-end gap-2 text-sm">
                <span className="text-gray-600">Due Date:</span>
                <InlineEditableDate
                  value={invoice.dueDate}
                  onChange={(value) => updateInvoice({ dueDate: value })}
                />
              </div>
            </div>
          </div>

          {/* Bill To Section */}
          <div className="mb-12">
            <div className="text-sm font-semibold text-gray-600 mb-2">Bill To:</div>
            <div className="space-y-1">
              <InlineCustomerSelect
                ref={customerRef}
                customers={mockCustomers}
                selectedCustomer={selectedCustomer}
                onSelect={handleCustomerSelect}
                className="font-semibold"
                required
              />
              {invoice.billTo.name && (
                <>
                  <InlineEditableText
                    value={invoice.billTo.addressLine1}
                    onChange={(value) => updateBillTo("addressLine1", value)}
                    className="text-sm text-gray-600"
                  />
                  {invoice.billTo.addressLine2 && (
                    <InlineEditableText
                      value={invoice.billTo.addressLine2}
                      onChange={(value) => updateBillTo("addressLine2", value)}
                      className="text-sm text-gray-600"
                    />
                  )}
                  <InlineEditableText
                    value={`${invoice.billTo.city}, ${invoice.billTo.postalCode}`}
                    onChange={(value) => updateBillTo("city", value)}
                    className="text-sm text-gray-600"
                  />
                  <InlineEditableText
                    ref={billToEmailRef}
                    value={invoice.billTo.email}
                    onChange={(value) => updateBillTo("email", value)}
                    placeholder="Click to add customer email"
                    className="text-sm text-gray-600"
                    required
                  />
                </>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700 w-20">
                    Qty
                  </th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700 w-28">
                    Unit Price
                  </th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700 w-20">
                    Tax %
                  </th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700 w-28">
                    Total
                  </th>
                  <th className="w-8"></th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 group hover:bg-gray-50"
                  >
                    <td className="py-3 px-2">
                      <InlineEditableText
                        ref={index === 0 ? firstItemDescRef : undefined}
                        value={item.description}
                        onChange={(value) => updateItem(item.id, "description", value)}
                        placeholder="Click to add item description"
                        className="text-sm"
                        required={index === 0}
                      />
                    </td>
                    <td className="py-3 px-2">
                      <InlineEditableNumber
                        value={item.qty}
                        onChange={(value) => updateItem(item.id, "qty", value)}
                        className="text-sm"
                        min={0}
                        step={1}
                      />
                    </td>
                    <td className="py-3 px-2">
                      <InlineEditableMoney
                        ref={index === 0 ? firstItemPriceRef : undefined}
                        value={item.unitPrice}
                        onChange={(value) => updateItem(item.id, "unitPrice", value)}
                        className="text-sm"
                        required={index === 0}
                      />
                    </td>
                    <td className="py-3 px-2">
                      <InlineEditableNumber
                        value={item.taxRate}
                        onChange={(value) => updateItem(item.id, "taxRate", value)}
                        className="text-sm"
                        min={0}
                        max={100}
                        step={0.1}
                      />
                    </td>
                    <td className="py-3 px-2 text-right text-sm font-mono">
                      ${calculateLineTotal(item).toFixed(2)}
                    </td>
                    <td className="py-3 px-2">
                      {invoice.items.length > 1 && (
                        <button
                          onClick={() => removeItem(item.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={6} className="py-2">
                    <button
                      onClick={addItem}
                      className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add item
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-12">
            <div className="w-80 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-mono">${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax:</span>
                <span className="font-mono">${calculateTaxTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t-2 border-gray-300 pt-2">
                <span>Total:</span>
                <span className="font-mono">${calculateGrandTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="border-t border-gray-200 pt-6">
            <div className="text-sm font-semibold text-gray-600 mb-2">Notes:</div>
            <InlineEditableText
              value={invoice.notes}
              onChange={(value) => updateInvoice({ notes: value })}
              placeholder="Click to add payment terms, thank you message, or other notes..."
              className="text-sm text-gray-600"
              multiline
            />
          </div>
        </div>
      </div>
    </div>
  );
}