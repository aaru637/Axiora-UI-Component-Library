import type { ButtonHTMLAttributes, CSSProperties } from "react";

import { colors, spacing, typography } from "@axon/ui-tokens";

export type ButtonVariant = "primary" | "secondary" | "danger";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, CSSProperties> = {
  primary: {
    backgroundColor: colors.primary,
    color: "#ffffff",
  },
  secondary: {
    backgroundColor: colors.neutral[100],
    color: colors.neutral[900],
  },
  danger: {
    backgroundColor: colors.danger,
    color: "#ffffff",
  },
};

const baseStyle: CSSProperties = {
  border: "none",
  borderRadius: spacing.sm,
  cursor: "pointer",
  fontFamily: typography.fontFamily.sans,
  fontSize: typography.fontSize.md,
  fontWeight: typography.fontWeight.medium,
  padding: `${spacing.sm} ${spacing.md}`,
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
