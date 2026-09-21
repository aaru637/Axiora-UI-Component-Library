import { spacing } from "@axiora-ui/ui-tokens";
import type { CSSProperties, FocusEvent } from "react";

// AI-ASSISTED: Cursor
// PROMPT: Form layout styles; theme colors moved to CSS classes
// ACCEPTED-BY: dhinesh

export const fieldWrapperStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: spacing[1],
  width: "100%",
};

export const inputFocusHandlers = {
  onFocus: (e: FocusEvent<HTMLElement>, hasError?: boolean) => {
    if (hasError) return;
    e.currentTarget.style.borderColor = "var(--color-primary)";
    e.currentTarget.style.boxShadow =
      "0 0 0 2px color-mix(in srgb, var(--color-primary) 25%, transparent)";
  },
  onBlur: (e: FocusEvent<HTMLElement>, hasError?: boolean) => {
    e.currentTarget.style.borderColor = hasError
      ? "var(--color-danger)"
      : "var(--color-border)";
    e.currentTarget.style.boxShadow = "none";
  },
};
