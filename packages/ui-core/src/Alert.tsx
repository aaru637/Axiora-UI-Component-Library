import type { HTMLAttributes } from "react";
import { typography } from "@axiora-ui/ui-tokens";
import { themeVars } from "./styles/themeVars";
import { mergeStyles } from "./utils/mergeStyles";

// AI-ASSISTED: Cursor
// PROMPT: Remove unused CSSProperties import (eslint)
// ACCEPTED-BY: dhinesh

export type AlertVariant = "default" | "destructive";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}

const variantClass: Record<AlertVariant, string> = {
  default: "ax-alert-default",
  destructive: "ax-alert-destructive",
};

export function Alert({
  variant = "default",
  className,
  style,
  ...props
}: AlertProps) {
  return (
    <div
      role="alert"
      className={["ax-alert", variantClass[variant], className]
        .filter(Boolean)
        .join(" ")}
      style={mergeStyles(undefined, style)}
      {...props}
    />
  );
}

export function AlertTitle({
  style,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      style={mergeStyles(
        {
          margin: 0,
          fontFamily: themeVars.fontFamily,
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
          lineHeight: typography.lineHeight.snug,
        },
        style,
      )}
      {...props}
    />
  );
}

export function AlertDescription({
  style,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div
      style={mergeStyles(
        {
          fontFamily: themeVars.fontFamily,
          fontSize: typography.fontSize.sm,
          lineHeight: typography.lineHeight.normal,
        },
        style,
      )}
      {...props}
    />
  );
}
