import { useEffect, useId, useMemo, useState } from "react";
import { CheckIcon, ChevronDownIcon } from "./icons";
import { Label } from "./Label";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { fieldWrapperStyle } from "./styles/formStyles";
import { mergeStyles } from "./utils/mergeStyles";

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  emptyMessage?: string;
  maxDisplayLabels?: number;
  className?: string;
}

function formatSelectionLabel(
  selected: MultiSelectOption[],
  placeholder: string,
  maxDisplayLabels: number,
) {
  if (selected.length === 0) {
    return placeholder;
  }

  if (selected.length <= maxDisplayLabels) {
    return selected.map((option) => option.label).join(", ");
  }

  return `${selected.length} selected`;
}

export function MultiSelect({
  label,
  placeholder = "Select options…",
  searchPlaceholder = "Search…",
  options,
  value: valueProp,
  defaultValue = [],
  onValueChange,
  error,
  helperText,
  required,
  disabled,
  emptyMessage = "No results found.",
  maxDisplayLabels = 2,
  className,
}: MultiSelectProps) {
  const generatedId = useId();
  const listboxId = `${generatedId}-listbox`;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const [displayError, setDisplayError] = useState<string | undefined>(error);

  useEffect(() => {
    setDisplayError(error);
  }, [error]);

  const value = valueProp ?? internalValue;
  const hasError = Boolean(displayError);

  const filteredOptions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return options;
    }
    return options.filter((option) =>
      option.label.toLowerCase().includes(normalized),
    );
  }, [options, query]);

  const selectedOptions = options.filter((option) =>
    value.includes(option.value),
  );

  const toggleValue = (optionValue: string) => {
    const nextValue = value.includes(optionValue)
      ? value.filter((item) => item !== optionValue)
      : [...value, optionValue];

    if (nextValue.length > 0) {
      setDisplayError(undefined);
    }

    if (valueProp === undefined) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
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
              {formatSelectionLabel(
                selectedOptions,
                placeholder,
                maxDisplayLabels,
              )}
            </span>
            <ChevronDownIcon className="ax-trigger-icon" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          style={{ padding: 8, width: "var(--radix-popover-trigger-width)" }}
        >
          <input
            className="ax-multiselect-search"
            value={query}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ul
            id={listboxId}
            role="listbox"
            aria-multiselectable="true"
            className="ax-multiselect-list"
            aria-label={label ?? "Options"}
          >
            {filteredOptions.length === 0 && (
              <li className="ax-multiselect-empty">{emptyMessage}</li>
            )}
            {filteredOptions.map((option) => {
              const isSelected = value.includes(option.value);
              return (
                <li key={option.value} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    disabled={option.disabled}
                    className={[
                      "ax-multiselect-item",
                      isSelected ? "ax-multiselect-item-selected" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => toggleValue(option.value)}
                  >
                    <span
                      className={[
                        "ax-multiselect-check",
                        isSelected ? "ax-multiselect-check-selected" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      aria-hidden="true"
                    >
                      {isSelected && <CheckIcon width={12} height={12} />}
                    </span>
                    <span>{option.label}</span>
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
