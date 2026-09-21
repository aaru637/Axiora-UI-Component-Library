import { useEffect, useId, useState } from "react";
import { Calendar, formatDisplayDate } from "./Calendar";
import { ChevronDownIcon } from "./icons";
import { Label } from "./Label";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { fieldWrapperStyle } from "./styles/formStyles";
import { mergeStyles } from "./utils/mergeStyles";

export interface DatePickerProps {
  label?: string;
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function DatePicker({
  label,
  value: valueProp,
  defaultValue,
  onChange,
  placeholder = "Pick a date",
  error,
  helperText,
  required,
  disabled,
  className,
}: DatePickerProps) {
  const generatedId = useId();
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<Date | undefined>(
    defaultValue,
  );
  const [displayError, setDisplayError] = useState<string | undefined>(error);

  useEffect(() => {
    setDisplayError(error);
  }, [error]);

  const value = valueProp ?? internalValue;
  const hasError = Boolean(displayError);

  const setValue = (nextValue: Date | undefined) => {
    if (nextValue) {
      setDisplayError(undefined);
    }
    if (valueProp === undefined) {
      setInternalValue(nextValue);
    }
    onChange?.(nextValue);
    setOpen(false);
  };

  return (
    <div style={fieldWrapperStyle} className={className}>
      {label && (
        <Label htmlFor={generatedId} required={required} error={hasError}>
          {label}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <button
            id={generatedId}
            type="button"
            aria-invalid={hasError || undefined}
            data-invalid={hasError || undefined}
            disabled={disabled}
            className="ax-trigger"
            style={mergeStyles({ width: "100%" })}
          >
            <span>{value ? formatDisplayDate(value) : placeholder}</span>
            <ChevronDownIcon className="ax-trigger-icon" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" style={{ padding: 12, width: "auto" }}>
          <Calendar
            selected={value}
            onSelect={(date) => setValue(date)}
            month={value}
          />
        </PopoverContent>
      </Popover>
      {displayError && (
        <span
          id={`${generatedId}-error`}
          className="ax-error-text"
          role="alert"
        >
          {displayError}
        </span>
      )}
      {!displayError && helperText && (
        <span id={`${generatedId}-helper`} className="ax-helper-text">
          {helperText}
        </span>
      )}
    </div>
  );
}
