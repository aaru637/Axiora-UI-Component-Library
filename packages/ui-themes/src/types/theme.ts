import { Scale } from "@axiora-ui/ui-tokens";

export interface ThemeColors {
  primary: string;
  primaryHover?: string;
  secondary: string;
  secondaryHover?: string;
  backgroud: string;
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

export const ThemeMode = {
  Light: "light",
  Dark: "dark",
} as const;

export type ThemeMode = (typeof ThemeMode)[keyof typeof ThemeMode];

export interface ThemeConfig {
  name?: string;
  mode?: ThemeMode;
  colors?: Partial<ThemeColors>;
  radius?: Scale | number | keyof Scale;
  fontFamily?: string;
}
