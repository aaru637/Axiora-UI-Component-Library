import { colors, spacing, typography } from "@axiora-ui/ui-tokens";

export const lightTheme = {
  name: "light",
  colors: {
    ...colors,
    background: colors.neutral[50],
    foreground: colors.neutral[900],
    surface: "#ffffff",
  },
  spacing,
  typography,
} as const;

export const darkTheme = {
  name: "dark",
  colors: {
    ...colors,
    background: colors.neutral[900],
    foreground: colors.neutral[50],
    surface: "#1e293b",
  },
  spacing,
  typography,
} as const;

export type Theme = typeof lightTheme | typeof darkTheme;
