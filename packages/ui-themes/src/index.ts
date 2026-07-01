import { colorPrimitive, spacing, typography } from "@axiora-ui/ui-tokens";

const semanticColors = {
  primary: colorPrimitive.blue[600],
  secondary: colorPrimitive.gray[500],
  success: colorPrimitive.green[600],
  danger: colorPrimitive.red[600],
  neutral: {
    50: colorPrimitive.gray[50],
    100: colorPrimitive.gray[100],
    900: colorPrimitive.gray[900],
  },
} as const;

export const lightTheme = {
  name: "light",
  colors: {
    ...semanticColors,
    background: semanticColors.neutral[50],
    foreground: semanticColors.neutral[900],
    surface: "#ffffff",
  },
  spacing,
  typography,
} as const;

export const darkTheme = {
  name: "dark",
  colors: {
    ...semanticColors,
    background: semanticColors.neutral[900],
    foreground: semanticColors.neutral[50],
    surface: "#1e293b",
  },
  spacing,
  typography,
} as const;

export type Theme = typeof lightTheme | typeof darkTheme;
