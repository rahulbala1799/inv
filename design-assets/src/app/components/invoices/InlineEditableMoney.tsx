import { useState, useRef, useEffect, forwardRef } from "react";

interface InlineEditableMoneyProps {
  value: number;
  onChange: (value: number) => void;
  currency?: string;
  className?: string;
  required?: boolean;
}

export const InlineEditableMoney = forwardRef<HTMLDivElement, InlineEditableMoneyProps>(
  ({ value, onChange, currency = "$", className = "", required = false }, ref) => {
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
      if (!isNaN(numValue)) {
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

    const formatMoney = (amount: number) => {
      return `${currency}${amount.toFixed(2)}`;
    };

    if (isEditing) {
      return (
        <div className="flex items-center justify-end">
          <span className="text-gray-600 mr-1">{currency}</span>
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
          showRequired
            ? isHovered
              ? "bg-amber-100/60"
              : "bg-amber-50/40"
            : isHovered
            ? "bg-indigo-50/50"
            : ""
        }`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleClick();
          }
        }}
      >
        <span className="inline-flex items-center gap-2 justify-end">
          {formatMoney(value)}
          {showRequired && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
              Required
            </span>
          )}
        </span>
      </div>
    );
  }
);

InlineEditableMoney.displayName = "InlineEditableMoney";