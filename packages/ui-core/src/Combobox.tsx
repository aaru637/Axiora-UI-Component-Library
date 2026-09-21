import { useEffect, useId, useMemo, useState } from "react";
import { CheckIcon, ChevronDownIcon } from "./icons";
import { Label } from "./Label";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { fieldWrapperStyle } from "./styles/formStyles";
import { mergeStyles } from "./utils/mergeStyles";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  emptyMessage?: string;
  className?: string;
}

export function Combobox({
  label,
  placeholder = "Select option…",
  searchPlaceholder = "Search…",
  options,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  error,
  helperText,
  required,
  disabled,
  emptyMessage = "No results found.",
  className,
}: ComboboxProps) {
  const generatedId = useId();
  const listboxId = `${generatedId}-listbox`;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [displayError, setDisplayError] = useState<string | undefined>(error);

  useEffect(() => {
    setDisplayError(error);
  }, [error]);

  const value = valueProp ?? internalValue;
  const hasError = Boolean(displayError);
  const selectedOption = options.find((option) => option.value === value);

  const filteredOptions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return options;
    }
    return options.filter((option) =>
      option.label.toLowerCase().includes(normalized),
    );
  }, [options, query]);

  const setValue = (nextValue: string) => {
    if (nextValue) {
      setDisplayError(undefined);
    }
    if (valueProp === undefined) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
    setOpen(false);
    setQuery("");
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
            role="combobox"
            aria-expanded={open}
            aria-controls={listboxId}
            aria-invalid={hasError || undefined}
            data-invalid={hasError || undefined}
            disabled={disabled}
            className="ax-trigger"
            style={mergeStyles({ width: "100%" })}
          >
            <span
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {selectedOption?.label ?? placeholder}
            </span>
            <ChevronDownIcon className="ax-trigger-icon" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          style={{ padding: 8, width: "var(--radix-popover-trigger-width)" }}
        >
          <input
            className="ax-combobox-search"
            value={query}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ul
            id={listboxId}
            role="listbox"
            className="ax-combobox-list"
            aria-label={label ?? "Options"}
          >
            {filteredOptions.length === 0 && (
              <li className="ax-combobox-empty">{emptyMessage}</li>
            )}
            {filteredOptions.map((option) => {
              const isSelected = option.value === value;
              return (
                <li key={option.value} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    disabled={option.disabled}
                    className={[
                      "ax-combobox-item",
                      isSelected ? "ax-combobox-item-selected" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => setValue(option.value)}
                  >
                    <span>{option.label}</span>
                    {isSelected && <CheckIcon width={14} height={14} />}
                  </button>
                </li>
              );
            })}
          </ul>
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
