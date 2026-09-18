import { presets } from "../presets/presets";
import { ThemeConfig, ThemeMode } from "../types/theme";

export const defaultTheme: ThemeConfig = {
  name: "default",
  mode: ThemeMode.Light,
  colors: presets.light,
  radius: "md",
};
