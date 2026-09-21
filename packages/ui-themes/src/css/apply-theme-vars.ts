import { scale } from "@axiora-ui/ui-tokens";
import type { ResolvedTheme } from "../utils/mergeTheme";

export const themeCssVarKeys = [
  "--color-primary",
  "--color-primary-hover",
  "--color-secondary",
  "--color-secondary-hover",
  "--color-muted-foreground",
  "--color-background",
  "--color-foreground",
  "--color-surface",
  "--color-text-on-primary",
  "--color-text-on-secondary",
  "--color-border",
  "--color-menu-background",
  "--color-menu-text",
  "--color-menu-text-active",
  "--color-menu-item-hover",
  "--color-success",
  "--color-warning",
  "--color-danger",
  "--color-info",
  "--radius-base",
  "--font-family-base",
] as const;

export function themeToCSSVars(theme: ResolvedTheme): Record<string, string> {
  const radiusKey = theme.radius as keyof typeof scale;

  return {
    "--color-primary": theme.colors.primary,
    "--color-primary-hover": theme.colors.primaryHover ?? theme.colors.primary,
    "--color-secondary": theme.colors.secondary,
    "--color-secondary-hover":
      theme.colors.secondaryHover ?? theme.colors.secondary,
    "--color-muted-foreground": theme.colors.secondary,
    "--color-background": theme.colors.background,
    "--color-foreground": theme.colors.foreground,
    "--color-surface": theme.colors.surface,
    "--color-text-on-primary": theme.colors.text.onPrimary,
    "--color-text-on-secondary": theme.colors.text.onSecondary,
    "--color-border": theme.colors.border,
    "--color-menu-background": theme.colors.menu.background,
    "--color-menu-text": theme.colors.menu.text,
    "--color-menu-text-active":
      theme.colors.menu.textActive ?? theme.colors.menu.text,
    "--color-menu-item-hover":
      theme.colors.menu.itemHoverBackground ?? theme.colors.menu.background,
    "--color-success": theme.colors.feedback.success,
    "--color-warning": theme.colors.feedback.warning,
    "--color-danger": theme.colors.feedback.danger,
    "--color-info": theme.colors.feedback.info,
    "--radius-base": scale[radiusKey] ?? scale.md,
    "--font-family-base": theme.fontFamily ?? "",
  };
}
