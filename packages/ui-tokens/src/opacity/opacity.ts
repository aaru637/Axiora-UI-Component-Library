/**
 * Opacity scale from `0` (fully transparent) to `100` (fully opaque),
 * plus semantic stops for common cases (`disabled`, `overlay`).
 *
 * @example
 * ```ts
 * { opacity: opacity.disabled } // 0.5
 * ```
 */
export const opacity = {
  0: 0,
  10: 0.1,
  20: 0.2,
  40: 0.4,
  disabled: 0.5,
  60: 0.6,
  overlay: 0.7,
  80: 0.8,
  100: 1,
} as const;

/** The shape of the `opacity` scale. */
export type Opacity = typeof opacity;
