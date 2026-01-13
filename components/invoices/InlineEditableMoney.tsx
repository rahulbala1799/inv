import { useState, useRef, useEffect, forwardRef } from "react";
import { formatCurrency } from "@/lib/utils";

interface InlineEditableMoneyProps {
  value: number;
  onChange: (value: number) => void;
  currency?: string;
  className?: string;
  required?: boolean;
}

export const InlineEditableMoney = forwardRef<HTMLDivElement, InlineEditableMoneyProps>(
  ({ value, onChange, currency = "EUR", className = "", required = false }, ref) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value.toString());
    const [isHovered, setIsHovered] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const isEmpty = value === 0;
    const showRequired = required && isEmpty;

    useEffect(() => {
      setEditValue(value.toString());
    }, [value]);

    useEffect(() => {
      if (isEditing && inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, [isEditing]);

    const handleClick = () => {
      setIsEditing(true);
    };

    const handleBlur = () => {
      setIsEditing(false);
      const numValue = parseFloat(editValue);
      if (!isNaN(numValue) && numValue >= 0) {
        onChange(numValue);
      } else {
        setEditValue(value.toString());
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setEditValue(value.toString());
        setIsEditing(false);
      } else if (e.key === "Enter") {
        handleBlur();
      }
    };

    if (isEditing) {
      return (
        <div className="flex items-center justify-end">
          <span className="text-gray-600 mr-1">{currency === "EUR" ? "€" : currency === "USD" ? "$" : currency}</span>
          <input
            ref={inputRef}
            type="number"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            step="0.01"
            min="0"
            className="border-none outline-none bg-transparent w-24 text-right font-mono"
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`cursor-pointer transition-colors text-right font-mono ${className} ${
          isHovered ? "bg-gray-50/50" : ""
        }`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleClick();
          }
        }}
      >
        <span className={`inline-flex items-center gap-2 justify-end ${isEmpty ? "text-amber-500" : ""}`}>
          {isEmpty ? "0.00" : formatCurrency(value, currency)}
        </span>
      </div>
    );
  }
);

InlineEditableMoney.displayName = "InlineEditableMoney";
