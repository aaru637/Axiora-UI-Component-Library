import type { scale } from "@axiora-ui/ui-tokens";

export interface ThemeColors {
  primary: string;
  primaryHover?: string;
  secondary: string;
  secondaryHover?: string;
  background: string;
  foreground: string;
  surface: string;

  text: {
    onPrimary: string;
    onSecondary: string;
  };

  border: string;

  menu: {
    background: string;
    text: string;
    textActive?: string;
    itemHoverBackground?: string;
  };

  feedback: {
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
}

export type ThemeMode = "light" | "dark";

export type ThemeRadius = keyof typeof scale;

/** Allows nested partial overrides (e.g. `{ menu: { background: '#111' } }`). */
export type DeepPartialThemeColors = {
  [K in keyof ThemeColors]?: ThemeColors[K] extends object
    ? Partial<ThemeColors[K]>
    : ThemeColors[K];
};

export interface ThemeConfig {
  name?: string;
  mode?: ThemeMode;
  colors?: DeepPartialThemeColors;
  radius?: ThemeRadius;
  fontFamily?: string;
}
