import { useState, forwardRef } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/components/ui/command";
import { Customer } from "@/app/types/invoice";
import { cn } from "@/app/components/ui/utils";

interface InlineCustomerSelectProps {
  customers: Customer[];
  selectedCustomer: Customer | null;
  onSelect: (customer: Customer) => void;
  className?: string;
  required?: boolean;
}

export const InlineCustomerSelect = forwardRef<HTMLDivElement, InlineCustomerSelectProps>(
  ({ customers, selectedCustomer, onSelect, className = "", required = false }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const isEmpty = !selectedCustomer;
    const showRequired = required && isEmpty;

    const handleSelect = (customerId: string) => {
      const customer = customers.find((c) => c.id === customerId);
      if (customer) {
        onSelect(customer);
        setIsOpen(false);
      }
    };

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div
            ref={ref}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`cursor-pointer transition-colors ${className} ${
              showRequired
                ? isHovered
                  ? "bg-amber-100/60"
                  : "bg-amber-50/40"
                : isHovered
                ? "bg-indigo-50/50"
                : ""
            } ${!selectedCustomer ? "text-gray-400 italic" : ""}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsOpen(true);
              }
            }}
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2">
                {selectedCustomer?.name || "Select customer..."}
                {showRequired && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                    Required
                  </span>
                )}
              </span>
              {isHovered && <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search customer..." />
            <CommandList>
              <CommandEmpty>No customer found.</CommandEmpty>
              <CommandGroup>
                {customers.map((customer) => (
                  <CommandItem
                    key={customer.id}
                    value={customer.id}
                    onSelect={handleSelect}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCustomer?.id === customer.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-xs text-gray-500">{customer.email}</div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

InlineCustomerSelect.displayName = "InlineCustomerSelect";