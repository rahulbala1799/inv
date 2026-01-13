'use client'

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { InlineEditableText } from "@/components/invoices/InlineEditableText";
import { InlineEditableNumber } from "@/components/invoices/InlineEditableNumber";
import { InlineEditableMoney } from "@/components/invoices/InlineEditableMoney";
import { InlineEditableDate } from "@/components/invoices/InlineEditableDate";
import { InlineCustomerSelect } from "@/components/invoices/InlineCustomerSelect";
import { MissingFieldsSummary, MissingField } from "@/components/invoices/MissingFieldsSummary";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Plus, X } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface InvoiceItem {
  id?: string;
  description: string;
  quantity: number;
  unit_price: number;
  tax_rate: number;
  line_total: number;
  sort_order: number;
}

interface Invoice {
  id: string;
  invoice_number: string;
  status: string;
  issue_date: string;
  due_date: string | null;
  customer_id: string;
  currency: string;
  subtotal: number;
  tax_total: number;
  total: number;
  notes: string | null;
  template_id: string | null;
  customers?: { 
    name: string;
    email?: string | null;
    address_line1?: string | null;
    address_line2?: string | null;
    city?: string | null;
    postcode?: string | null;
    country?: string | null;
  };
}

interface Customer {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  address_line1?: string | null;
  address_line2?: string | null;
  city?: string | null;
  postcode?: string | null;
  country?: string | null;
  vat_number?: string | null;
}

interface OrgBranding {
  business_name?: string | null;
  vat_number?: string | null;
  address_line1?: string | null;
  address_line2?: string | null;
  city?: string | null;
  postcode?: string | null;
  country?: string | null;
  default_currency?: string | null;
}

type SaveStatus = "idle" | "saving" | "saved";

interface WYSIWYGInvoiceEditorProps {
  invoice: Invoice;
  items: InvoiceItem[];
  customers: Customer[];
  orgId: string;
  branding?: OrgBranding | null;
}

export default function WYSIWYGInvoiceEditor({
  invoice: initialInvoice,
  items: initialItems,
  customers,
  orgId,
  branding,
}: WYSIWYGInvoiceEditorProps) {
  const router = useRouter();
  const [invoice, setInvoice] = useState(initialInvoice);
  const [items, setItems] = useState<InvoiceItem[]>(
    initialItems.length > 0
      ? initialItems
      : [
          {
            description: "",
            quantity: 1,
            unit_price: 0,
            tax_rate: 0,
            line_total: 0,
            sort_order: 0,
          },
        ]
  );
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveTimeoutId, setSaveTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [customersList, setCustomersList] = useState<Customer[]>(customers);
  const [selectedCustomerData, setSelectedCustomerData] = useState<Customer | null>(
    customers.find((c) => c.id === invoice.customer_id) || null
  );

  // Refs for fields
  const companyNameRef = useRef<HTMLDivElement>(null);
  const companyAddressRef = useRef<HTMLDivElement>(null);
  const companyCityRef = useRef<HTMLDivElement>(null);
  const companyVatRef = useRef<HTMLDivElement>(null);
  const invoiceNumberRef = useRef<HTMLDivElement>(null);
  const customerRef = useRef<HTMLButtonElement>(null);
  const billToEmailRef = useRef<HTMLDivElement>(null);
  const firstItemDescRef = useRef<HTMLDivElement>(null);
  const firstItemPriceRef = useRef<HTMLDivElement>(null);

  // Get selected customer
  const selectedCustomer = selectedCustomerData || customersList.find((c) => c.id === invoice.customer_id) || null;

  // Company info from branding
  const companyName = branding?.business_name || "";
  const companyAddress = branding?.address_line1 || "";
  const companyAddress2 = branding?.address_line2 || "";
  const companyCity = branding?.city || "";
  const companyPostcode = branding?.postcode || "";
  const companyCountry = branding?.country || "";
  const companyVat = branding?.vat_number || "";

  // Customer info - use selectedCustomerData if available, otherwise fall back to invoice.customers or selectedCustomer
  const customerName = selectedCustomerData?.name || invoice.customers?.name || "";
  const customerEmail = selectedCustomerData?.email || invoice.customers?.email || "";
  const customerAddress = selectedCustomerData?.address_line1 || invoice.customers?.address_line1 || "";
  const customerAddress2 = selectedCustomerData?.address_line2 || invoice.customers?.address_line2 || "";
  const customerCity = selectedCustomerData?.city || invoice.customers?.city || "";
  const customerPostcode = selectedCustomerData?.postcode || invoice.customers?.postcode || "";
  const customerCountry = selectedCustomerData?.country || invoice.customers?.country || "";
  const customerVat = selectedCustomerData?.vat_number || invoice.customers?.vat_number || "";

  // Auto-save function
  const triggerAutoSave = useCallback(() => {
    if (saveTimeoutId) {
      clearTimeout(saveTimeoutId);
    }

    const timeout = setTimeout(async () => {
      setSaveStatus("saving");
      try {
        const response = await fetch(`/api/org/${orgId}/invoices/${invoice.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ invoice, items }),
        });

        if (response.ok) {
          setSaveStatus("saved");
          setTimeout(() => setSaveStatus("idle"), 2000);
        } else {
          setSaveStatus("idle");
        }
      } catch (error) {
        setSaveStatus("idle");
      }
    }, 500);

    setSaveTimeoutId(timeout);
  }, [saveTimeoutId, invoice, items, orgId]);

  useEffect(() => {
    return () => {
      if (saveTimeoutId) {
        clearTimeout(saveTimeoutId);
      }
    };
  }, [saveTimeoutId]);

  // Update handlers
  const updateInvoice = (updates: Partial<Invoice>) => {
    setInvoice((prev) => ({ ...prev, ...updates }));
    calculateTotals();
    triggerAutoSave();
    // Force re-render to update missing fields
  };

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomerData(customer);
    setInvoice((prev) => ({
      ...prev,
      customer_id: customer.id,
    }));
    calculateTotals();
    triggerAutoSave();
  };

  const handleCustomerCreated = async (newCustomer: Customer) => {
    // Add new customer to the list
    setCustomersList((prev) => [...prev, newCustomer]);
    // Select the new customer
    handleCustomerSelect(newCustomer);
    // Refresh the page to get updated customer list
    router.refresh();
  };

  const updateCustomerField = async (field: keyof Customer, value: string) => {
    if (!selectedCustomerData) return;

    const updatedCustomer = { ...selectedCustomerData, [field]: value };
    setSelectedCustomerData(updatedCustomer);

    // Update customer in database
    try {
      const response = await fetch(`/api/org/${orgId}/customers/${selectedCustomerData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: updatedCustomer.name,
          email: updatedCustomer.email || null,
          phone: updatedCustomer.phone || null,
          address_line1: updatedCustomer.address_line1 || null,
          address_line2: updatedCustomer.address_line2 || null,
          city: updatedCustomer.city || null,
          postcode: updatedCustomer.postcode || null,
          country: updatedCustomer.country || null,
          vat_number: updatedCustomer.vat_number || null,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Update customers list with the returned customer data
        setCustomersList((prev) =>
          prev.map((c) => (c.id === selectedCustomerData.id ? data.customer : c))
        );
        setSelectedCustomerData(data.customer);
      }
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    setItems((prev) => {
      const newItems = [...prev];
      newItems[index] = { ...newItems[index], [field]: value };
      return newItems;
    });
    calculateTotals();
    triggerAutoSave();
    // Force re-render to update missing fields
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        description: "",
        quantity: 1,
        unit_price: 0,
        tax_rate: 0,
        line_total: 0,
        sort_order: prev.length,
      },
    ]);
    triggerAutoSave();
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index).map((item, i) => ({ ...item, sort_order: i })));
    calculateTotals();
    triggerAutoSave();
  };

  // Calculations
  const calculateLineTotal = (item: InvoiceItem) => {
    const subtotal = item.quantity * item.unit_price;
    const tax = subtotal * (item.tax_rate / 100);
    return subtotal + tax;
  };

  const calculateTotals = () => {
    let subtotal = 0;
    let taxTotal = 0;

    items.forEach((item) => {
      const lineSubtotal = item.quantity * item.unit_price;
      const lineTax = lineSubtotal * (item.tax_rate / 100);
      item.line_total = lineSubtotal + lineTax;
      subtotal += lineSubtotal;
      taxTotal += lineTax;
    });

    const total = subtotal + taxTotal;

    setInvoice((prev) => ({
      ...prev,
      subtotal: Number(subtotal.toFixed(2)),
      tax_total: Number(taxTotal.toFixed(2)),
      total: Number(total.toFixed(2)),
    }));
  };

  useEffect(() => {
    calculateTotals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.unit_price, 0);
  };

  const calculateTaxTotal = () => {
    return items.reduce(
      (sum, item) => sum + item.quantity * item.unit_price * (item.tax_rate / 100),
      0
    );
  };

  const calculateGrandTotal = () => {
    return calculateSubtotal() + calculateTaxTotal();
  };

  // Missing fields tracking
  const missingFields = useMemo<MissingField[]>(() => {
    const fields: MissingField[] = [];

    if (!invoice.invoice_number || invoice.invoice_number.trim() === "") {
      fields.push({
        id: "invoiceNumber",
        label: "Invoice number",
        onFocus: () => {
          invoiceNumberRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
          invoiceNumberRef.current?.click();
        },
      });
    }

    if (!companyName || companyName.trim() === "") {
      fields.push({
        id: "companyName",
        label: "Company name",
        onFocus: () => {
          companyNameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
          companyNameRef.current?.click();
        },
      });
    }

    if (!companyAddress || companyAddress.trim() === "") {
      fields.push({
        id: "companyAddress",
        label: "Company address",
        onFocus: () => {
          companyAddressRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
          companyAddressRef.current?.click();
        },
      });
    }

    if (!companyCity || companyCity.trim() === "") {
      fields.push({
        id: "companyCity",
        label: "Company city/region",
        onFocus: () => {
          companyCityRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
          companyCityRef.current?.click();
        },
      });
    }

    if (!invoice.customer_id || !customerName || customerName.trim() === "") {
      fields.push({
        id: "customer",
        label: "Customer name",
        onFocus: () => {
          customerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
          customerRef.current?.click();
        },
      });
    }

    const firstItem = items[0];
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

    if (firstItem && firstItem.unit_price === 0) {
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
  }, [
    invoice.invoice_number,
    invoice.customer_id,
    companyName,
    companyAddress,
    companyCity,
    customerName,
    items.length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    items.length > 0 ? items[0]?.description : undefined,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    items.length > 0 ? items[0]?.unit_price : undefined,
  ]);

  const currency = invoice.currency || branding?.default_currency || "EUR";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/app/org/${orgId}/invoices`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <MissingFieldsSummary missingFields={missingFields} />
            <div className="h-6 w-px bg-gray-300" />
            <div className="text-sm text-gray-600">
              {saveStatus === "saving" && "Saving..."}
              {saveStatus === "saved" && <span className="text-green-600">Saved</span>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/api/org/${orgId}/invoices/${invoice.id}/pdf`}
              target="_blank"
            >
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </Link>
            <select
              value={invoice.status}
              onChange={(e) => updateInvoice({ status: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
            >
              <option value="DRAFT">Draft</option>
              <option value="SENT">Sent</option>
              <option value="PAID">Paid</option>
              <option value="VOID">Void</option>
            </select>
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
                value={companyName}
                onChange={(value) => {
                  // Note: Company info should be updated in org_branding, not here
                  // For now, we'll just show it as read-only or handle separately
                }}
                placeholder="Click to add company name"
                className="text-xl font-semibold"
                bold
                required
              />
              <InlineEditableText
                ref={companyAddressRef}
                value={companyAddress}
                onChange={() => {}}
                placeholder="Click to add street address"
                className="text-sm text-gray-600"
                required
              />
              {companyAddress2 && (
                <InlineEditableText
                  value={companyAddress2}
                  onChange={() => {}}
                  placeholder="Suite, unit, etc. (optional)"
                  className="text-sm text-gray-600"
                />
              )}
              <InlineEditableText
                ref={companyCityRef}
                value={`${companyCity}${companyPostcode ? `, ${companyPostcode}` : ""}${companyCountry ? `, ${companyCountry}` : ""}`}
                onChange={() => {}}
                placeholder="Click to add city, state, postal code"
                className="text-sm text-gray-600"
                required
              />
              <InlineEditableText
                ref={companyVatRef}
                value={companyVat}
                onChange={() => {}}
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
                  value={invoice.invoice_number}
                  onChange={(value) => updateInvoice({ invoice_number: value })}
                  placeholder="Click to add invoice number"
                  className="font-mono"
                  required
                />
              </div>
              <div className="flex items-center justify-end gap-2 text-sm">
                <span className="text-gray-600">Issue Date:</span>
                <InlineEditableDate
                  value={invoice.issue_date}
                  onChange={(value) => updateInvoice({ issue_date: value.toISOString().split('T')[0] })}
                />
              </div>
              <div className="flex items-center justify-end gap-2 text-sm">
                <span className="text-gray-600">Due Date:</span>
                <InlineEditableDate
                  value={invoice.due_date || new Date()}
                  onChange={(value) => updateInvoice({ due_date: value.toISOString().split('T')[0] })}
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
                customers={customersList}
                selectedCustomer={selectedCustomer}
                onSelect={handleCustomerSelect}
                className="font-semibold"
                required
                orgId={orgId}
              />
              {selectedCustomer && (
                <>
                  <InlineEditableText
                    value={customerAddress}
                    onChange={(value) => updateCustomerField('address_line1', value)}
                    placeholder="Click to add street address"
                    className="text-sm text-gray-600"
                  />
                  <InlineEditableText
                    value={customerAddress2}
                    onChange={(value) => updateCustomerField('address_line2', value)}
                    placeholder="Click to add address line 2 (optional)"
                    className="text-sm text-gray-600"
                  />
                  <div className="flex items-center gap-1 flex-wrap">
                    <InlineEditableText
                      value={customerCity}
                      onChange={(value) => updateCustomerField('city', value)}
                      placeholder="City"
                      className="text-sm text-gray-600"
                    />
                    {customerPostcode && <span className="text-sm text-gray-600">,</span>}
                    <InlineEditableText
                      value={customerPostcode}
                      onChange={(value) => updateCustomerField('postcode', value)}
                      placeholder="Postcode"
                      className="text-sm text-gray-600"
                    />
                    {customerCountry && <span className="text-sm text-gray-600">,</span>}
                    <InlineEditableText
                      value={customerCountry}
                      onChange={(value) => updateCustomerField('country', value)}
                      placeholder="Country"
                      className="text-sm text-gray-600"
                    />
                  </div>
                  <InlineEditableText
                    ref={billToEmailRef}
                    value={customerEmail}
                    onChange={(value) => updateCustomerField('email', value)}
                    placeholder="Click to add customer email"
                    className="text-sm text-gray-600"
                  />
                  <InlineEditableText
                    value={customerVat}
                    onChange={(value) => updateCustomerField('vat_number', value)}
                    placeholder="Click to add VAT number (optional)"
                    className="text-sm text-gray-600"
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
                {items.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 group hover:bg-gray-50"
                  >
                    <td className="py-3 px-2">
                      <InlineEditableText
                        ref={index === 0 ? firstItemDescRef : undefined}
                        value={item.description}
                        onChange={(value) => updateItem(index, "description", value)}
                        placeholder="Click to add item description"
                        className="text-sm"
                        required={index === 0}
                      />
                    </td>
                    <td className="py-3 px-2">
                      <InlineEditableNumber
                        value={item.quantity}
                        onChange={(value) => updateItem(index, "quantity", value)}
                        className="text-sm"
                        min={0}
                        step={1}
                      />
                    </td>
                    <td className="py-3 px-2">
                      <InlineEditableMoney
                        ref={index === 0 ? firstItemPriceRef : undefined}
                        value={item.unit_price}
                        onChange={(value) => updateItem(index, "unit_price", value)}
                        currency={currency}
                        className="text-sm"
                        required={index === 0}
                      />
                    </td>
                    <td className="py-3 px-2">
                      <InlineEditableNumber
                        value={item.tax_rate}
                        onChange={(value) => updateItem(index, "tax_rate", value)}
                        className="text-sm"
                        min={0}
                        max={100}
                        step={0.1}
                      />
                    </td>
                    <td className="py-3 px-2 text-right text-sm font-mono">
                      {formatCurrency(calculateLineTotal(item), currency)}
                    </td>
                    <td className="py-3 px-2">
                      {items.length > 1 && (
                        <button
                          onClick={() => removeItem(index)}
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
                <span className="font-mono">{formatCurrency(calculateSubtotal(), currency)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax:</span>
                <span className="font-mono">{formatCurrency(calculateTaxTotal(), currency)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t-2 border-gray-300 pt-2">
                <span>Total:</span>
                <span className="font-mono">{formatCurrency(calculateGrandTotal(), currency)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="border-t border-gray-200 pt-6">
            <div className="text-sm font-semibold text-gray-600 mb-2">Notes:</div>
            <InlineEditableText
              value={invoice.notes || ""}
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
