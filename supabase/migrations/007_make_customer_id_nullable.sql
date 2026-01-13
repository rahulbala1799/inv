-- Make customer_id nullable in invoices table to allow draft invoices without a customer
ALTER TABLE invoices 
  ALTER COLUMN customer_id DROP NOT NULL;
