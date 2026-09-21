import { darkThemeColors } from "./darkTheme";
import { lightThemeColors } from "./lightTheme";

// AI-ASSISTED: Cursor
// PROMPT: Re-export light/dark theme colors from presets registry
// ACCEPTED-BY: dhinesh

export { lightThemeColors, darkThemeColors };

export const presets = {
  light: lightThemeColors,
  dark: darkThemeColors,
} as const;
