/**
 * Responsive breakpoint scale as CSS length strings, for use in media
 * queries. See {@link breakpointsPx} for the numeric equivalents.
 *
 * @example
 * ```ts
 * `@media (min-width: ${breakpoints.md})`;
 * ```
 */
export const breakpoints = {
  xs: "480px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

/**
 * Numeric (px) versions of {@link breakpoints} — handy for JS-side
 * `matchMedia` logic where a CSS length string can't be used directly.
 *
 * @example
 * ```ts
 * window.matchMedia(`(min-width: ${breakpointsPx.md}px)`);
 * ```
 */
export const breakpointsPx = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

/** The shape of the `breakpoints` map. */
export type Breakpoints = typeof breakpoints;
