import type { HTMLAttributes } from "react";
import { mergeStyles } from "./utils/mergeStyles";

// AI-ASSISTED: Cursor
// PROMPT: Remove unused CSSProperties import (eslint)
// ACCEPTED-BY: dhinesh

export type BadgeVariant = "default" | "secondary" | "outline" | "destructive";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClass: Record<BadgeVariant, string> = {
  default: "ax-badge-default",
  secondary: "ax-badge-secondary",
  outline: "ax-badge-outline",
  destructive: "ax-badge-destructive",
};

export function Badge({
  variant = "default",
  className,
  style,
  ...props
}: BadgeProps) {
  return (
    <span
      className={["ax-badge", variantClass[variant], className]
        .filter(Boolean)
        .join(" ")}
      style={mergeStyles(undefined, style)}
      {...props}
    />
  );
}
