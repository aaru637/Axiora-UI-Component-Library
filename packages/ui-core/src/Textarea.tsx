import { useId, type TextareaHTMLAttributes } from "react";
import { Label } from "./Label";
import { fieldWrapperStyle, inputFocusHandlers } from "./styles/formStyles";
import { mergeStyles } from "./utils/mergeStyles";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export function Textarea({
  label,
  error,
  helperText,
  required,
  id: idProp,
  disabled,
  className,
  style,
  rows = 4,
  ...props
}: TextareaProps) {
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
      <textarea
        id={id}
        rows={rows}
        className={["ax-input", "ax-textarea", className]
          .filter(Boolean)
          .join(" ")}
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
