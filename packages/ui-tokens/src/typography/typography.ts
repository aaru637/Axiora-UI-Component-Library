/**
 * Font family, size, weight, line-height, and letter-spacing scales.
 *
 * @example
 * ```ts
 * typography.fontFamily.sans;   // "'Inter', -apple-system, ..."
 * typography.fontSize.base;    // "16px"
 * typography.fontWeight.bold;  // 700
 * ```
 */
export const typography = {
  fontFamily: {
    sans: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    serif: `'Georgia', 'Times New Roman', serif`,
    mono: `'JetBrains Mono', 'SFMono-Regular', Consolas, monospace`,
  },

  fontSize: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "60px",
  },

  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.2,
    snug: 1.35,
    normal: 1.5,
    relaxed: 1.65,
    loose: 1.8,
  },

  letterSpacing: {
    tight: "-0.02em",
    normal: "0em",
    wide: "0.02em",
    wider: "0.04em",
  },
} as const;

/**
 * Composed text styles — the tokens components should actually consume,
 * rather than assembling `fontSize` / `fontWeight` / etc. by hand.
 *
 * @example
 * ```ts
 * const headingCss = textStyle["heading-lg"];
 * // { fontSize: "30px", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em" }
 * ```
 */
export const textStyle = {
  "heading-xl": {
    fontSize: typography.fontSize["5xl"],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.tight,
  },
  "heading-lg": {
    fontSize: typography.fontSize["3xl"],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.tight,
  },
  "heading-md": {
    fontSize: typography.fontSize["2xl"],
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.snug,
    letterSpacing: typography.letterSpacing.normal,
  },
  "body-lg": {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.normal,
    letterSpacing: typography.letterSpacing.normal,
  },
  "body-md": {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.normal,
    letterSpacing: typography.letterSpacing.normal,
  },
  "body-sm": {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.normal,
    letterSpacing: typography.letterSpacing.normal,
  },
  caption: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.snug,
    letterSpacing: typography.letterSpacing.wide,
  },
} as const;

/** The shape of the `typography` scale. */
export type Typography = typeof typography;

/** The shape of the `textStyle` map. */
export type TextStyle = typeof textStyle;
