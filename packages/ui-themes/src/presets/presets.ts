import { darkThemeColors } from "./darkTheme";
import { lightThemeColors } from "./lightTheme";

export const presets = {
  light: lightThemeColors,
  dark: darkThemeColors,
} as const;
