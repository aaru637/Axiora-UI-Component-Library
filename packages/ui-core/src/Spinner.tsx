import type { HTMLAttributes } from "react";
import { themeVars } from "./styles/themeVars";
import { mergeStyles } from "./utils/mergeStyles";

// AI-ASSISTED: Cursor
// PROMPT: Remove unused CSSProperties import (eslint)
// ACCEPTED-BY: dhinesh

export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
}

const sizeMap: Record<SpinnerSize, number> = {
  sm: 16,
  md: 24,
  lg: 32,
};

export function Spinner({
  size = "md",
  className,
  style,
  ...props
}: SpinnerProps) {
  const dimension = sizeMap[size];

  return (
    <div
      role="status"
      aria-label="Loading"
      className={className}
      style={mergeStyles(
        {
          width: dimension,
          height: dimension,
          border: `2px solid color-mix(in srgb, ${themeVars.color.primary} 20%, transparent)`,
          borderTopColor: themeVars.color.primary,
          borderRadius: "50%",
          animation: "ax-spin 0.6s linear infinite",
        },
        style,
      )}
      {...props}
    />
  );
}
