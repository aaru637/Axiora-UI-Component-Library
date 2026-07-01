/**
 * Animation/transition duration scale, from `instant` to `slower`. Use for
 * `transition-duration` / `animation-duration`.
 *
 * @example
 * ```ts
 * { transitionDuration: duration.base } // "200ms"
 * ```
 */
export const duration = {
  instant: "0ms",
  fast: "100ms",
  base: "200ms",
  slow: "300ms",
  slower: "500ms",
} as const;

/**
 * Easing curves for transitions/animations. Pair with {@link duration}.
 *
 * @example
 * ```ts
 * { transitionTimingFunction: easing.easeOut }
 * ```
 */
export const easing = {
  linear: "linear",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

/** The shape of the `duration` scale. */
export type Duration = typeof duration;

/** The shape of the `easing` map. */
export type Easing = typeof easing;
