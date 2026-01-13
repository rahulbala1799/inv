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
  vat_number?: string | null;
}

interface InlineCustomerSelectProps {
  customers: Customer[];
  selectedCustomer: Customer | null;
  onSelect: (customer: Customer) => void;
  className?: string;
  required?: boolean;
  orgId: string;
}

export const InlineCustomerSelect = forwardRef<HTMLButtonElement, InlineCustomerSelectProps>(
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
      // Check if it's the create new option - if value matches searchQuery, it's the create option
      if (value === searchQuery && searchQuery.trim().length > 0) {
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

    const handleCreateClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsCreating(true);
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
            <button
              type="button"
              ref={ref}
              className={`w-full text-left cursor-pointer transition-colors border border-gray-300 rounded-lg bg-white px-4 py-2.5 flex items-center justify-between hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${className} ${
                !selectedCustomer ? "text-gray-400" : "text-gray-900"
              }`}
            >
              <span className="truncate">
                {selectedCustomer?.name || "Select customer..."}
              </span>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </button>
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
                          value={searchQuery}
                          keywords={[searchQuery, "create", "new", "customer"]}
                          onSelect={handleSelect}
                          className="text-indigo-600 cursor-pointer hover:bg-indigo-50"
                          onMouseDown={(e) => {
                            // Prevent the command from closing
                            e.preventDefault();
                          }}
                          onClick={handleCreateClick}
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
