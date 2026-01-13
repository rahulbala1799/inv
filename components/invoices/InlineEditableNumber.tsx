import { useState, useRef, useEffect } from "react";

interface InlineEditableNumberProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
}

export function InlineEditableNumber({
  value,
  onChange,
  placeholder = "0",
  className = "",
  min,
  max,
  step = 1,
}: InlineEditableNumberProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value.toString());
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
      const clampedValue = min !== undefined && numValue < min ? min : 
                          max !== undefined && numValue > max ? max : numValue;
      onChange(clampedValue);
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
      <input
        ref={inputRef}
        type="number"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        min={min}
        max={max}
        step={step}
        className="border-none outline-none bg-transparent w-full text-right"
      />
    );
  }

  const isEmpty = value === 0 || value === null || value === undefined;

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`cursor-pointer transition-colors text-right ${className} ${
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
      <span className={isEmpty ? "text-amber-500" : ""}>
        {value || placeholder}
      </span>
    </div>
  );
}
