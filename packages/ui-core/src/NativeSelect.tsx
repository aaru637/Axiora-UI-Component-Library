import { useId, type SelectHTMLAttributes } from "react";
import { Label } from "./Label";
import { fieldWrapperStyle, inputFocusHandlers } from "./styles/formStyles";
import { mergeStyles } from "./utils/mergeStyles";

// AI-ASSISTED: Cursor
// PROMPT: Use CSS classes for theme-aware native select in light/dark mode
// ACCEPTED-BY: dhinesh

export interface NativeSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface NativeSelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  options?: NativeSelectOption[];
  placeholder?: string;
}

export function NativeSelect({
  label,
  error,
  helperText,
  required,
  options = [],
  placeholder,
  id: idProp,
  disabled,
  className,
  style,
  children,
  ...props
}: NativeSelectProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const hasError = Boolean(error);

  return (
    <div style={fieldWrapperStyle}>
      {label && (
        <Label htmlFor={id} required={required} error={hasError}>
          {label}
        </Label>
      )}
      <select
        id={id}
        className={["ax-input", className].filter(Boolean).join(" ")}
        aria-invalid={hasError || undefined}
        data-invalid={hasError || undefined}
        disabled={disabled}
        required={required}
        style={mergeStyles(undefined, style)}
        onFocus={(e) => inputFocusHandlers.onFocus(e, hasError)}
        onBlur={(e) => inputFocusHandlers.onBlur(e, hasError)}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
        {children}
      </select>
      {error && (
        <span id={`${id}-error`} role="alert" className="ax-error-text">
          {error}
        </span>
      )}
      {!error && helperText && (
        <span id={`${id}-helper`} className="ax-helper-text">
          {helperText}
        </span>
      )}
    </div>
  );
}
