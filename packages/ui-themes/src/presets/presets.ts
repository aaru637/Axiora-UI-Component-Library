import { darkThemeColors } from "./darkTheme";
import { lightThemeColors } from "./lightTheme";

export { lightThemeColors, darkThemeColors };

export const presets = {
  light: lightThemeColors,
  dark: darkThemeColors,
} as const;
