import { useState, forwardRef, useEffect, useCallback } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/components/ui/utils";
import CreateCustomerModal from "./CreateCustomerModal";

interface Customer {
  id: string;
  name: string;
  email?: string | null;
  address_line1?: string | null;
  address_line2?: string | null;
  city?: string | null;
  postcode?: string | null;
  country?: string | null;
}

interface InlineCustomerSelectProps {
  customers: Customer[];
  selectedCustomer: Customer | null;
  onSelect: (customer: Customer) => void;
  className?: string;
  required?: boolean;
  orgId: string;
}

export const InlineCustomerSelect = forwardRef<HTMLDivElement, InlineCustomerSelectProps>(
  ({ customers, selectedCustomer, onSelect, className = "", required = false, orgId }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Customer[]>(customers);
    const [isCreating, setIsCreating] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const isEmpty = !selectedCustomer;
    const showCreateOption = searchQuery.trim().length > 0;

    // Search customers as user types
    useEffect(() => {
      if (!isOpen) return;

      const searchCustomers = async () => {
        if (searchQuery.trim().length === 0) {
          setSearchResults(customers);
          return;
        }

        setIsSearching(true);
        try {
          const response = await fetch(
            `/api/org/${orgId}/customers?search=${encodeURIComponent(searchQuery)}`
          );
          const data = await response.json();
          setSearchResults(data.customers || []);
        } catch (error) {
          console.error("Error searching customers:", error);
          setSearchResults(customers);
        } finally {
          setIsSearching(false);
        }
      };

      const timeoutId = setTimeout(searchCustomers, 300);
      return () => clearTimeout(timeoutId);
    }, [searchQuery, isOpen, orgId, customers]);

    const handleSelect = (value: string) => {
      if (value === "__create_new__") {
        setIsCreating(true);
        return;
      }

      const customer = searchResults.find((c) => c.id === value);
      if (customer) {
        onSelect(customer);
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    const handleCustomerCreated = (newCustomer: Customer) => {
      onSelect(newCustomer);
      setIsOpen(false);
      setSearchQuery("");
    };

    return (
      <>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <div
              ref={ref}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`cursor-pointer transition-colors ${className} ${
                isHovered ? "bg-gray-50/50" : ""
              }`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setIsOpen(true);
                }
              }}
            >
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-2 ${!selectedCustomer ? "text-amber-500 italic" : ""}`}>
                  {selectedCustomer?.name || "Select customer..."}
                </span>
                {isHovered && <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0" align="start">
            <Command shouldFilter={false}>
              <CommandInput
                placeholder="Search or type to create new customer..."
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
              <CommandList>
                {isSearching ? (
                  <div className="py-6 text-center text-sm text-gray-500">Searching...</div>
                ) : (
                  <>
                    {searchResults.length === 0 && searchQuery.trim().length > 0 ? (
                      <CommandEmpty>No customer found.</CommandEmpty>
                    ) : (
                      <CommandGroup>
                        {searchResults.map((customer) => (
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
                            <div className="flex-1">
                              <div className="font-medium">{customer.name}</div>
                              {customer.email && (
                                <div className="text-xs text-gray-500">{customer.email}</div>
                              )}
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                    {showCreateOption && (
                      <CommandGroup>
                        <CommandItem
                          value="__create_new__"
                          onSelect={handleSelect}
                          className="text-indigo-600"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          <div>
                            <div className="font-medium">Create &quot;{searchQuery}&quot;</div>
                            <div className="text-xs text-gray-500">Add as new customer</div>
                          </div>
                        </CommandItem>
                      </CommandGroup>
                    )}
                  </>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <CreateCustomerModal
          orgId={orgId}
          initialName={searchQuery}
          onCustomerCreated={handleCustomerCreated}
          open={isCreating}
          onOpenChange={setIsCreating}
        />
      </>
    );
  }
);

InlineCustomerSelect.displayName = "InlineCustomerSelect";
