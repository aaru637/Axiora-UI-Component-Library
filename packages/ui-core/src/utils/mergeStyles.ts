import type { CSSProperties } from "react";

// AI-ASSISTED: Cursor
// PROMPT: Utility to merge CSSProperties objects
// ACCEPTED-BY: dhinesh

export function mergeStyles(
  ...styles: (CSSProperties | undefined | false)[]
): CSSProperties {
  return Object.assign({}, ...styles.filter(Boolean));
}
