// AI-ASSISTED: Cursor
// PROMPT: Export resolveSampleTheme and sampleThemeOptions
// ACCEPTED-BY: dhinesh

export { ThemeProvider } from "./context/ThemeProvider";
export type { ThemeProviderProps } from "./context/ThemeProvider";
export { useTheme } from "./context/useTheme";
export { mergeTheme } from "./utils/mergeTheme";
export type { ResolvedTheme } from "./utils/mergeTheme";
export { validateTheme, themeConfigSchema } from "./validation/validateTheme";
export { themeToCSSVars } from "./css/apply-theme-vars";
export { defaultTheme } from "./defaults/defaultTheme";
export { presets, lightThemeColors, darkThemeColors } from "./presets/presets";
export {
  sampleThemes,
  sampleThemeOptions,
  resolveSampleTheme,
  isDarkSampleTheme,
} from "./presets/sampleThemes";
export type { SampleThemeKey } from "./presets/sampleThemes";
export type {
  ThemeConfig,
  ThemeColors,
  ThemeMode,
  ThemeRadius,
} from "./types/theme";
