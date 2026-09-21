import type { ThemeConfig } from "../types/theme";

export type SampleThemeKey =
  | "default"
  | "dark"
  | "violet"
  | "emerald"
  | "violet-dark"
  | "emerald-dark";

export const sampleThemeOptions: Array<{
  value: SampleThemeKey;
  title: string;
}> = [
  { value: "default", title: "Default (Light)" },
  { value: "dark", title: "Dark" },
  { value: "violet", title: "Violet Brand" },
  { value: "emerald", title: "Emerald Brand" },
  { value: "violet-dark", title: "Violet Dark" },
  { value: "emerald-dark", title: "Emerald Dark" },
];

export const sampleThemes: Record<SampleThemeKey, ThemeConfig | undefined> = {
  default: undefined,
  dark: { mode: "dark", name: "dark" },
  violet: {
    name: "violet",
    mode: "light",
    colors: {
      primary: "#7c3aed",
      primaryHover: "#6d28d9",
    },
  },
  emerald: {
    name: "emerald",
    mode: "light",
    colors: {
      primary: "#059669",
      primaryHover: "#047857",
    },
  },
  "violet-dark": {
    name: "violet-dark",
    mode: "dark",
    colors: {
      primary: "#8b5cf6",
      primaryHover: "#7c3aed",
    },
  },
  "emerald-dark": {
    name: "emerald-dark",
    mode: "dark",
    colors: {
      primary: "#10b981",
      primaryHover: "#059669",
    },
  },
};

export function resolveSampleTheme(
  key: string | undefined,
): ThemeConfig | undefined {
  if (!key || !(key in sampleThemes)) {
    return sampleThemes.default;
  }

  return sampleThemes[key as SampleThemeKey];
}

/** Whether the resolved theme key uses dark mode base preset. */
export function isDarkSampleTheme(key: string | undefined): boolean {
  const theme = resolveSampleTheme(key);
  return theme?.mode === "dark";
}
