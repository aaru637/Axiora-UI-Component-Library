import type { CSSProperties } from "react";

export function mergeStyles(
  ...styles: (CSSProperties | undefined | false)[]
): CSSProperties {
  return Object.assign({}, ...styles.filter(Boolean));
}
