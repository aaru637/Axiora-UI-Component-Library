import type { LabelHTMLAttributes } from "react";
import { mergeStyles } from "./utils/mergeStyles";

// AI-ASSISTED: Cursor
// PROMPT: Remove unused CSSProperties import (eslint)
// ACCEPTED-BY: dhinesh

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  error?: boolean;
}

export function Label({
  required,
  error,
  className,
  style,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      className={["ax-label", error && "ax-label-error", className]
        .filter(Boolean)
        .join(" ")}
      style={mergeStyles(undefined, style)}
      {...props}
    >
      {children}
      {required && (
        <span aria-hidden="true" className="ax-required-mark">
          {" "}
          *
        </span>
      )}
    </label>
  );
}
