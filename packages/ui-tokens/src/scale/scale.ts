/**
 * Border-radius scale, from sharp corners (`none`) to fully rounded
 * (`full`). Use for buttons, cards, inputs, and other rounded surfaces.
 *
 * @example
 * ```ts
 * scale.md;   // "8px"
 * scale.full; // "9999px" — pill / circle
 * ```
 */
export const scale = {
  none: "0px",
  xs: "2px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "24px",
  full: "9999px",
} as const;

/** The shape of the `scale` (border-radius) map. */
export type Scale = typeof scale;
