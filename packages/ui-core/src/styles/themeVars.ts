import { colorPrimitive, scale, typography } from "@axiora-ui/ui-tokens";

/** CSS custom property references — components pick up ThemeProvider vars automatically. */
export const themeVars = {
  color: {
    primary: `var(--color-primary, ${colorPrimitive.blue[600]})`,
    primaryHover: `var(--color-primary-hover, ${colorPrimitive.blue[700]})`,
    secondary: `var(--color-secondary, ${colorPrimitive.gray[500]})`,
    secondaryHover: `var(--color-secondary-hover, ${colorPrimitive.gray[600]})`,
    mutedForeground: `var(--color-muted-foreground, ${colorPrimitive.gray[500]})`,
    background: `var(--color-background, ${colorPrimitive.gray[50]})`,
    foreground: `var(--color-foreground, ${colorPrimitive.gray[900]})`,
    surface: `var(--color-surface, #ffffff)`,
    textOnPrimary: `var(--color-text-on-primary, #ffffff)`,
    textOnSecondary: `var(--color-text-on-secondary, #ffffff)`,
    border: `var(--color-border, ${colorPrimitive.gray[200]})`,
    danger: `var(--color-danger, ${colorPrimitive.red[600]})`,
    success: `var(--color-success, ${colorPrimitive.green[600]})`,
    warning: `var(--color-warning, ${colorPrimitive.yellow[600]})`,
    info: `var(--color-info, ${colorPrimitive.blue[600]})`,
  },
  radius: `var(--radius-base, ${scale.md})`,
  fontFamily: `var(--font-family-base, ${typography.fontFamily.sans})`,
} as const;
