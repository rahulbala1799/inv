import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Button } from '@/app/components/ui/button';
import { Trash2, Plus } from 'lucide-react';
import type { InvoiceData, InvoiceItem, Customer, Organization } from '@/lib/templates/InvoicePDF';

interface InvoiceEditorProps {
  invoice: InvoiceData;
  items: InvoiceItem[];
  customer: Customer;
  organization: Organization;
  onInvoiceChange: (invoice: InvoiceData) => void;
  onItemsChange: (items: InvoiceItem[]) => void;
  onCustomerChange: (customer: Customer) => void;
  onOrganizationChange: (organization: Organization) => void;
}

export const InvoiceEditor: React.FC<InvoiceEditorProps> = ({
  invoice,
  items,
  customer,
  organization,
  onInvoiceChange,
  onItemsChange,
  onCustomerChange,
  onOrganizationChange,
}) => {
  const calculateItemTotal = (item: Partial<InvoiceItem>) => {
    const quantity = item.quantity || 0;
    const unitPrice = item.unitPrice || 0;
    const taxRate = item.taxRate || 0;
    const subtotal = quantity * unitPrice;
    const tax = (subtotal * taxRate) / 100;
    return subtotal + tax;
  };

  const recalculateTotals = (updatedItems: InvoiceItem[]) => {
    const subtotal = updatedItems.reduce((sum, item) => {
      const quantity = item.quantity || 0;
      const unitPrice = item.unitPrice || 0;
      return sum + quantity * unitPrice;
    }, 0);

    const taxTotal = updatedItems.reduce((sum, item) => {
      const quantity = item.quantity || 0;
      const unitPrice = item.unitPrice || 0;
      const taxRate = item.taxRate || 0;
      const itemSubtotal = quantity * unitPrice;
      return sum + (itemSubtotal * taxRate) / 100;
    }, 0);

    const total = subtotal + taxTotal;

    onInvoiceChange({
      ...invoice,
      subtotal,
      taxTotal,
      total,
    });
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };

    if (['quantity', 'unitPrice', 'taxRate'].includes(field)) {
      updatedItems[index].lineTotal = calculateItemTotal(updatedItems[index]);
    }

    onItemsChange(updatedItems);
    recalculateTotals(updatedItems);
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      description: '',
      quantity: 1,
      unitPrice: 0,
      taxRate: 20,
      lineTotal: 0,
    };
    const updatedItems = [...items, newItem];
    onItemsChange(updatedItems);
  };

  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    onItemsChange(updatedItems);
    recalculateTotals(updatedItems);
  };

  return (
    <div className="space-y-6">
      {/* Organization Details */}
      <Card>
        <CardHeader>
          <CardTitle>Your Business Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={organization.businessName || ''}
                onChange={(e) =>
                  onOrganizationChange({ ...organization, businessName: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="orgVat">VAT Number</Label>
              <Input
                id="orgVat"
                value={organization.vatNumber || ''}
                onChange={(e) =>
                  onOrganizationChange({ ...organization, vatNumber: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="orgAddress1">Address Line 1</Label>
              <Input
                id="orgAddress1"
                value={organization.addressLine1 || ''}
                onChange={(e) =>
                  onOrganizationChange({ ...organization, addressLine1: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="orgAddress2">Address Line 2</Label>
              <Input
                id="orgAddress2"
                value={organization.addressLine2 || ''}
                onChange={(e) =>
                  onOrganizationChange({ ...organization, addressLine2: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="orgCity">City</Label>
              <Input
                id="orgCity"
                value={organization.city || ''}
                onChange={(e) =>
                  onOrganizationChange({ ...organization, city: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="orgPostcode">Postcode</Label>
              <Input
                id="orgPostcode"
                value={organization.postcode || ''}
                onChange={(e) =>
                  onOrganizationChange({ ...organization, postcode: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="orgCountry">Country</Label>
              <Input
                id="orgCountry"
                value={organization.country || ''}
                onChange={(e) =>
                  onOrganizationChange({ ...organization, country: e.target.value })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Details */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                value={invoice.invoiceNumber}
                onChange={(e) =>
                  onInvoiceChange({ ...invoice, invoiceNumber: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="issueDate">Issue Date</Label>
              <Input
                id="issueDate"
                type="date"
                value={invoice.issueDate}
                onChange={(e) =>
                  onInvoiceChange({ ...invoice, issueDate: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={invoice.dueDate || ''}
                onChange={(e) =>
                  onInvoiceChange({ ...invoice, dueDate: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="currency">Currency</Label>
              <select
                id="currency"
                value={invoice.currency}
                onChange={(e) =>
                  onInvoiceChange({ ...invoice, currency: e.target.value })
                }
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={invoice.status}
                onChange={(e) =>
                  onInvoiceChange({
                    ...invoice,
                    status: e.target.value as InvoiceData['status'],
                  })
                }
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="DRAFT">Draft</option>
                <option value="SENT">Sent</option>
                <option value="PAID">Paid</option>
                <option value="VOID">Void</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Details */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={customer.name}
                onChange={(e) =>
                  onCustomerChange({ ...customer, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="customerVat">VAT Number</Label>
              <Input
                id="customerVat"
                value={customer.vatNumber || ''}
                onChange={(e) =>
                  onCustomerChange({ ...customer, vatNumber: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customerEmail">Email</Label>
              <Input
                id="customerEmail"
                type="email"
                value={customer.email || ''}
                onChange={(e) =>
                  onCustomerChange({ ...customer, email: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="customerPhone">Phone</Label>
              <Input
                id="customerPhone"
                value={customer.phone || ''}
                onChange={(e) =>
                  onCustomerChange({ ...customer, phone: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customerAddress1">Address Line 1</Label>
              <Input
                id="customerAddress1"
                value={customer.addressLine1 || ''}
                onChange={(e) =>
                  onCustomerChange({ ...customer, addressLine1: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="customerAddress2">Address Line 2</Label>
              <Input
                id="customerAddress2"
                value={customer.addressLine2 || ''}
                onChange={(e) =>
                  onCustomerChange({ ...customer, addressLine2: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="customerCity">City</Label>
              <Input
                id="customerCity"
                value={customer.city || ''}
                onChange={(e) =>
                  onCustomerChange({ ...customer, city: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="customerPostcode">Postcode</Label>
              <Input
                id="customerPostcode"
                value={customer.postcode || ''}
                onChange={(e) =>
                  onCustomerChange({ ...customer, postcode: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="customerCountry">Country</Label>
              <Input
                id="customerCountry"
                value={customer.country || ''}
                onChange={(e) =>
                  onCustomerChange({ ...customer, country: e.target.value })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Items */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Invoice Items</CardTitle>
          <Button onClick={addItem} size="sm">
            <Plus className="size-4 mr-2" />
            Add Item
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-4 p-4 border rounded-lg"
              >
                <div className="col-span-4">
                  <Label>Description</Label>
                  <Input
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    placeholder="Item description"
                  />
                </div>
                <div className="col-span-2">
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(index, 'quantity', parseFloat(e.target.value) || 0)
                    }
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="col-span-2">
                  <Label>Unit Price</Label>
                  <Input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) =>
                      updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)
                    }
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="col-span-1">
                  <Label>Tax %</Label>
                  <Input
                    type="number"
                    value={item.taxRate}
                    onChange={(e) =>
                      updateItem(index, 'taxRate', parseFloat(e.target.value) || 0)
                    }
                    min="0"
                    step="0.1"
                  />
                </div>
                <div className="col-span-2">
                  <Label>Total</Label>
                  <Input value={item.lineTotal.toFixed(2)} disabled />
                </div>
                <div className="col-span-1 flex items-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(index)}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={invoice.notes || ''}
            onChange={(e) =>
              onInvoiceChange({ ...invoice, notes: e.target.value })
            }
            placeholder="Add any additional notes or payment terms..."
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Bank Details */}
      <Card>
        <CardHeader>
          <CardTitle>Bank Details (Optional)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                value={organization.bankName || ''}
                onChange={(e) =>
                  onOrganizationChange({ ...organization, bankName: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="bankAccountNumber">Account Number</Label>
              <Input
                id="bankAccountNumber"
                value={organization.bankAccountNumber || ''}
                onChange={(e) =>
                  onOrganizationChange({
                    ...organization,
                    bankAccountNumber: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="bankSortCode">Sort Code</Label>
              <Input
                id="bankSortCode"
                value={organization.bankSortCode || ''}
                onChange={(e) =>
                  onOrganizationChange({ ...organization, bankSortCode: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="bankIban">IBAN</Label>
              <Input
                id="bankIban"
                value={organization.bankIban || ''}
                onChange={(e) =>
                  onOrganizationChange({ ...organization, bankIban: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="bankBic">BIC/SWIFT</Label>
              <Input
                id="bankBic"
                value={organization.bankBic || ''}
                onChange={(e) =>
                  onOrganizationChange({ ...organization, bankBic: e.target.value })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Totals Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Totals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal:</span>
              <span className="font-medium">{invoice.currency} {invoice.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax:</span>
              <span className="font-medium">{invoice.currency} {invoice.taxTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total:</span>
              <span>{invoice.currency} {invoice.total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
