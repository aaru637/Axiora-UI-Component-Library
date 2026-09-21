import { typography } from "@axiora-ui/ui-tokens";
import { presets } from "../presets/presets";
import type { ThemeConfig } from "../types/theme";

export const defaultTheme: ThemeConfig = {
  name: "default",
  mode: "light",
  colors: presets.light,
  radius: "md",
  fontFamily: typography.fontFamily.sans,
};
