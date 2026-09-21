import { typography } from "@axiora-ui/ui-tokens";
import { presets } from "../presets/presets";
import type { ThemeConfig } from "../types/theme";

// AI-ASSISTED: Cursor
// PROMPT: Update default theme with fontFamily and corrected types
// ACCEPTED-BY: dhinesh

export const defaultTheme: ThemeConfig = {
  name: "default",
  mode: "light",
  colors: presets.light,
  radius: "md",
  fontFamily: typography.fontFamily.sans,
};
