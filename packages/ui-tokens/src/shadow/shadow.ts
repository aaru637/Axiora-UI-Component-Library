/**
 * Box-shadow elevation scale, from `none` to `2xl`, plus an `inner` inset
 * shadow. Higher elevations imply the surface sits further above the page.
 *
 * @example
 * ```ts
 * shadow.md;    // card / dropdown elevation
 * shadow.inner; // pressed / recessed surface
 * ```
 */
export const shadow = {
  none: "none",
  xs: "0 1px 2px rgba(0, 0, 0, 0.05)",
  sm: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px rgba(0, 0, 0, 0.08), 0 4px 6px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px rgba(0, 0, 0, 0.1), 0 8px 10px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px rgba(0, 0, 0, 0.18)",
  inner: "inset 0 2px 4px rgba(0, 0, 0, 0.06)",
} as const;

/** The shape of the `shadow` elevation map. */
export type Shadow = typeof shadow;
