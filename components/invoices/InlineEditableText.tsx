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
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    const isEmpty = !value || value.trim() === "";
    const showRequired = required && isEmpty;

    useEffect(() => {
      setEditValue(value);
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
      onChange(editValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setEditValue(value);
        setIsEditing(false);
      } else if (e.key === "Enter" && !multiline) {
        handleBlur();
      }
    };

    const displayValue = value || placeholder;

    if (isEditing) {
      const baseInputClass = `border-none outline-none bg-transparent w-full ${inputClassName} ${
        bold ? "font-semibold" : ""
      } ${showRequired ? "bg-amber-50" : ""}`;

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
          showRequired
            ? isHovered
              ? "bg-amber-100/60"
              : "bg-amber-50/40"
            : isHovered
            ? "bg-indigo-50/50"
            : ""
        } ${isEmpty ? "text-gray-400 italic" : ""} ${bold ? "font-semibold" : ""}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleClick();
          }
        }}
      >
        <span className="inline-flex items-center gap-2">
          {displayValue}
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

InlineEditableText.displayName = "InlineEditableText";
