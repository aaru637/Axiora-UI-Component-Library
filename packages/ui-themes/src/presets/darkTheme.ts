import { colorPrimitive } from "@axiora-ui/ui-tokens";
import type { ThemeColors } from "../types/theme";

// AI-ASSISTED: Cursor
// PROMPT: Fix dark theme preset — background typo
// ACCEPTED-BY: dhinesh

export const darkThemeColors: ThemeColors = {
  primary: colorPrimitive.blue[500],
  primaryHover: colorPrimitive.blue[400],
  secondary: colorPrimitive.gray[400],
  secondaryHover: colorPrimitive.gray[300],

  background: colorPrimitive.gray[900],
  foreground: colorPrimitive.gray[50],
  surface: colorPrimitive.gray[800],

  text: {
    onPrimary: "#ffffff",
    onSecondary: "#ffffff",
  },

  border: colorPrimitive.gray[700],

  menu: {
    background: colorPrimitive.gray[900],
    text: colorPrimitive.gray[300],
    textActive: "#ffffff",
    itemHoverBackground: colorPrimitive.gray[800],
  },

  feedback: {
    success: colorPrimitive.green[600],
    warning: colorPrimitive.yellow[600],
    danger: colorPrimitive.red[600],
    info: colorPrimitive.blue[600],
  },
};
