import { colorPrimitive } from "@axiora-ui/ui-tokens";
import type { ThemeColors } from "../types/theme";

export const lightThemeColors: ThemeColors = {
  primary: colorPrimitive.blue[600],
  primaryHover: colorPrimitive.blue[700],
  secondary: colorPrimitive.gray[500],
  secondaryHover: colorPrimitive.gray[600],

  backgroud: colorPrimitive.gray[50],
  foreground: colorPrimitive.gray[900],
  surface: "#ffffff",

  text: {
    onPrimary: "#ffffff",
    onSecondary: "#ffffff",
  },

  border: colorPrimitive.gray[200],

  menu: {
    background: colorPrimitive.gray[900],
    text: colorPrimitive.yellow[600],
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
