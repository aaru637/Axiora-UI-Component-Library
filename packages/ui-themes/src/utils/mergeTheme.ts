import { defaultTheme } from "../defaults/defaultTheme";
import { presets } from "../presets/presets";
import type {
  DeepPartialThemeColors,
  ThemeColors,
  ThemeConfig,
} from "../types/theme";

// AI-ASSISTED: Cursor
// PROMPT: Implement mergeTheme with deep merge for nested color groups
// ACCEPTED-BY: dhinesh

function mergeColors(
  base: ThemeColors,
  override?: DeepPartialThemeColors,
): ThemeColors {
  if (!override) return base;

  return {
    ...base,
    ...override,
    text: { ...base.text, ...override.text },
    menu: { ...base.menu, ...override.menu },
    feedback: { ...base.feedback, ...override.feedback },
  };
}

export function mergeTheme(input?: ThemeConfig) {
  const base = input?.mode === "dark" ? presets.dark : presets.light;

  return {
    name: input?.name ?? defaultTheme.name ?? "default",
    mode: input?.mode ?? defaultTheme.mode ?? "light",
    colors: mergeColors(base, input?.colors),
    radius: input?.radius ?? defaultTheme.radius ?? "md",
    fontFamily: input?.fontFamily ?? defaultTheme.fontFamily,
  } as const;
}

export type ResolvedTheme = ReturnType<typeof mergeTheme>;
