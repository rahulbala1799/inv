import { useState, useRef, useEffect, forwardRef } from "react";

interface InlineEditableTextProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  multiline?: boolean;
  bold?: boolean;
  required?: boolean;
  fieldLabel?: string;
}

export const InlineEditableText = forwardRef<HTMLDivElement, InlineEditableTextProps>(
  (
    {
      value,
      onChange,
      placeholder = "Click to edit",
      className = "",
      inputClassName = "",
      multiline = false,
      bold = false,
      required = false,
      fieldLabel = "",
    },
    ref
  ) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);
    const [isHovered, setIsHovered] = useState(false);
    const [pendingValue, setPendingValue] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    // Use pendingValue if set, otherwise use value from props
    const displayValue = pendingValue !== null ? pendingValue : (value || "");
    const isEmpty = !displayValue || displayValue.trim() === "";

    useEffect(() => {
      // If value prop changes and matches our pending value, clear pending
      if (pendingValue !== null && value === pendingValue) {
        setPendingValue(null);
        setEditValue(value);
      } else if (pendingValue === null) {
        // Only update editValue if we're not waiting for a pending update
        setEditValue(value);
      }
    }, [value, pendingValue]);

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
      // Keep the value visible while parent updates
      setPendingValue(editValue);
      onChange(editValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setEditValue(value);
        setPendingValue(null);
        setIsEditing(false);
      } else if (e.key === "Enter" && !multiline) {
        handleBlur();
      }
    };

    const displayText = isEmpty ? placeholder : displayValue;

    if (isEditing) {
      const baseInputClass = `border-none outline-none bg-transparent w-full ${inputClassName} ${
        bold ? "font-semibold" : ""
      }`;

      if (multiline) {
        return (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`${baseInputClass} resize-none min-h-[60px]`}
            rows={3}
          />
        );
      }

      return (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={baseInputClass}
        />
      );
    }

    return (
      <div
        ref={ref}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`cursor-pointer transition-colors relative ${className} ${
          isHovered ? "bg-gray-50/50" : ""
        } ${bold ? "font-semibold" : ""}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleClick();
          }
        }}
      >
        <span className={`inline-flex items-center gap-2 ${isEmpty ? "text-amber-500 italic" : ""}`}>
          {displayText}
        </span>
      </div>
    );
  }
);

InlineEditableText.displayName = "InlineEditableText";
