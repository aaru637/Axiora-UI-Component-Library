import { useId, type InputHTMLAttributes } from "react";
import { spacing } from "@axiora-ui/ui-tokens";
import { fieldWrapperStyle } from "./styles/formStyles";
import { mergeStyles } from "./utils/mergeStyles";
import type { CSSProperties } from "react";

// AI-ASSISTED: Cursor
// PROMPT: Use CSS classes for theme-aware checkbox in light/dark mode
// ACCEPTED-BY: dhinesh

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> {
  label?: string;
  error?: string;
  helperText?: string;
}

const rowStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: spacing[2],
};

export function Checkbox({
  label,
  error,
  helperText,
  id: idProp,
  disabled,
  className,
  style,
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const hasError = Boolean(error);

  return (
    <div style={fieldWrapperStyle}>
      <div style={rowStyle}>
        <input
          type="checkbox"
          id={id}
          className={["ax-checkbox", className].filter(Boolean).join(" ")}
          aria-invalid={hasError || undefined}
          aria-describedby={
            error ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
          disabled={disabled}
          style={mergeStyles(undefined, style)}
          {...props}
        />
        {label && (
          <label htmlFor={id} className="ax-choice-label">
            {label}
          </label>
        )}
      </div>
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
