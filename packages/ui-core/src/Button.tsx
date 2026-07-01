import type { ButtonHTMLAttributes, CSSProperties } from "react";

import { colorPrimitive, spacing, typography } from "@axiora-ui/ui-tokens";

export type ButtonVariant = "primary" | "secondary" | "danger";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, CSSProperties> = {
  primary: {
    backgroundColor: colorPrimitive.blue[600],
    color: "#ffffff",
  },
  secondary: {
    backgroundColor: colorPrimitive.gray[100],
    color: colorPrimitive.gray[900],
  },
  danger: {
    backgroundColor: colorPrimitive.red[600],
    color: "#ffffff",
  },
};

const baseStyle: CSSProperties = {
  border: "none",
  borderRadius: spacing[2],
  cursor: "pointer",
  fontFamily: typography.fontFamily.sans,
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.medium,
  padding: `${spacing[2]} ${spacing[4]}`,
};

export function Button({
  variant = "primary",
  style,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      data-variant={variant}
      style={{ ...baseStyle, ...variantStyles[variant], ...style }}
      {...props}
    >
      {children}
    </button>
  );
}
