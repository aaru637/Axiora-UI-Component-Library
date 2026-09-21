import type { ButtonHTMLAttributes } from "react";
import { mergeStyles } from "./utils/mergeStyles";

export type ButtonVariant = "primary" | "secondary" | "danger";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: "ax-button-primary",
  secondary: "ax-button-secondary",
  danger: "ax-button-danger",
};

export function Button({
  variant = "primary",
  disabled,
  className,
  style,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      data-variant={variant}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      className={["ax-button", variantClass[variant], className]
        .filter(Boolean)
        .join(" ")}
      style={mergeStyles(undefined, style)}
      {...props}
    >
      {children}
    </button>
  );
}
