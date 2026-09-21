import { useId, type InputHTMLAttributes } from "react";
import { Label } from "./Label";
import { fieldWrapperStyle, inputFocusHandlers } from "./styles/formStyles";
import { mergeStyles } from "./utils/mergeStyles";

// AI-ASSISTED: Cursor
// PROMPT: Use CSS classes for theme-aware input in light/dark mode
// ACCEPTED-BY: dhinesh

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export function Input({
  label,
  error,
  helperText,
  required,
  id: idProp,
  disabled,
  className,
  style,
  ...props
}: InputProps) {
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
      <input
        id={id}
        className={["ax-input", className].filter(Boolean).join(" ")}
        aria-invalid={hasError || undefined}
        data-invalid={hasError || undefined}
        aria-describedby={
          error ? `${id}-error` : helperText ? `${id}-helper` : undefined
        }
        disabled={disabled}
        required={required}
        style={mergeStyles(undefined, style)}
        onFocus={(e) => inputFocusHandlers.onFocus(e, hasError)}
        onBlur={(e) => inputFocusHandlers.onBlur(e, hasError)}
        {...props}
      />
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
