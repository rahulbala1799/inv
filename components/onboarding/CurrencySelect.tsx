'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { CURRENCIES, type Currency } from '@/lib/constants/currencies'
import { cn } from '@/components/ui/utils'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

interface CurrencySelectProps {
  value?: string
  onValueChange: (value: string) => void
  disabled?: boolean
}

export default function CurrencySelect({
  value,
  onValueChange,
  disabled,
}: CurrencySelectProps) {
  const [open, setOpen] = React.useState(false)
  const selectedCurrency = CURRENCIES.find(c => c.code === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full h-12 justify-between text-left font-normal"
          disabled={disabled}
        >
          <span>
            {selectedCurrency
              ? `${selectedCurrency.code} - ${selectedCurrency.name}`
              : 'Select currency...'}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search currency..." />
          <CommandList>
            <CommandEmpty>No currency found.</CommandEmpty>
            <CommandGroup>
              {CURRENCIES.map((currency) => (
                <CommandItem
                  key={currency.code}
                  value={`${currency.code} ${currency.name}`}
                  onSelect={() => {
                    onValueChange(currency.code)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedCurrency?.code === currency.code
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{currency.code}</span>
                    <span className="text-gray-500">-</span>
                    <span>{currency.name}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
