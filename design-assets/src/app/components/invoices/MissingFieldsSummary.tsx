import { AlertCircle } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";

export interface MissingField {
  id: string;
  label: string;
  onFocus: () => void;
}

interface MissingFieldsSummaryProps {
  missingFields: MissingField[];
}

export function MissingFieldsSummary({ missingFields }: MissingFieldsSummaryProps) {
  if (missingFields.length === 0) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100 hover:text-amber-900"
        >
          <AlertCircle className="w-4 h-4" />
          {missingFields.length} missing field{missingFields.length > 1 ? "s" : ""}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm">Required fields missing</h4>
              <p className="text-xs text-gray-600 mt-1">
                Complete these fields to finalize your invoice
              </p>
            </div>
          </div>
          <div className="space-y-1">
            {missingFields.map((field) => (
              <button
                key={field.id}
                onClick={field.onFocus}
                className="w-full text-left px-3 py-2 text-sm rounded hover:bg-amber-50 transition-colors flex items-center justify-between group"
              >
                <span className="text-gray-700">{field.label}</span>
                <span className="text-xs text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to edit
                </span>
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
