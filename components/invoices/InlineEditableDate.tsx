import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";

interface InlineEditableDateProps {
  value: Date | string;
  onChange: (value: Date) => void;
  className?: string;
}

export function InlineEditableDate({
  value,
  onChange,
  className = "",
}: InlineEditableDateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const dateValue = typeof value === "string" ? new Date(value) : value;

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      onChange(date);
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`cursor-pointer transition-colors inline-flex items-center gap-1 ${className} ${
            isHovered ? "bg-indigo-50/50" : ""
          }`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setIsOpen(true);
            }
          }}
        >
          {format(dateValue, "MMM dd, yyyy")}
          {isHovered && <CalendarIcon className="w-3 h-3 text-gray-400" />}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={dateValue}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
