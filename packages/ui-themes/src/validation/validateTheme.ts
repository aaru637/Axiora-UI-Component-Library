import { scale } from "@axiora-ui/ui-tokens";
import { z } from "zod";
import type { ThemeConfig } from "../types/theme";

const hexColor = z
  .string()
  .regex(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, "must be a valid hex color");

const themeColorsSchema = z
  .object({
    primary: hexColor,
    primaryHover: hexColor.optional(),
    secondary: hexColor,
    secondaryHover: hexColor.optional(),
    background: hexColor,
    foreground: hexColor,
    surface: hexColor,
    text: z
      .object({
        onPrimary: hexColor,
        onSecondary: hexColor,
      })
      .partial()
      .optional(),
    border: hexColor,
    menu: z
      .object({
        background: hexColor,
        text: hexColor,
        textActive: hexColor.optional(),
        itemHoverBackground: hexColor.optional(),
      })
      .partial()
      .optional(),
    feedback: z
      .object({
        success: hexColor,
        warning: hexColor,
        danger: hexColor,
        info: hexColor,
      })
      .partial()
      .optional(),
  })
  .partial();

const radiusKeys = Object.keys(scale) as [string, ...string[]];

export const themeConfigSchema = z.object({
  name: z.string().optional(),
  mode: z.enum(["light", "dark"]).optional(),
  colors: themeColorsSchema.optional(),
  radius: z.enum(radiusKeys).optional(),
  fontFamily: z.string().optional(),
});

export function validateTheme(input: unknown): ThemeConfig {
  const result = themeConfigSchema.safeParse(input);

  if (!result.success) {
    throw new Error(
      `Invalid theme config: ${result.error.issues.map((i) => i.message).join(", ")}`,
    );
  }

  return result.data as ThemeConfig;
}
