/**
 * Stacking-order scale for layered UI, from `base` (page content) up
 * through `tooltip` (always on top). Each layer is spaced 100 apart so new
 * layers can be inserted between existing ones without a full renumber.
 *
 * @example
 * ```ts
 * { zIndex: zIndex.modal }
 * ```
 */
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  toast: 1600,
  tooltip: 1700,
} as const;

/** The shape of the `zIndex` stacking map. */
export type ZIndex = typeof zIndex;
