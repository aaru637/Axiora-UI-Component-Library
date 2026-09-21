# @axiora-ui/ui-themes

Runtime theme layer for the Axiora design system. Maps primitive tokens from `@axiora-ui/ui-tokens` into semantic theme configs, injects **CSS custom properties** on `:root`, and powers automatic styling in `@axiora-ui/ui-core`.

**Status:** ✅ **Complete** — `ThemeProvider`, `mergeTheme`, `validateTheme`, light/dark presets, brand themes, Vitest coverage

---

## Table of Contents

- [Installation](#installation)
- [Quick start](#quick-start)
- [API reference](#api-reference)
- [Theme presets](#theme-presets)
- [Custom themes](#custom-themes)
- [CSS variables](#css-variables)
- [Storybook integration](#storybook-integration)
- [Build & test](#build--test)
- [Planned additions](#planned-additions)

---

## Installation

```json
"dependencies": {
  "@axiora-ui/ui-themes": "workspace:*",
  "@axiora-ui/ui-core": "workspace:*"
}
```

Pair with `@axiora-ui/ui-core/styles.css` so components consume the injected variables.

**Peer dependencies:** `react` and `react-dom` ^19.0.0

---

## Quick start

```tsx
import "@axiora-ui/ui-core/styles.css";
import { ThemeProvider } from "@axiora-ui/ui-themes";
import { Button, Input } from "@axiora-ui/ui-core";

export function App() {
  return (
    <ThemeProvider theme={{ mode: "dark" }}>
      <Button>Primary</Button>
      <Input label="Email" />
    </ThemeProvider>
  );
}
```

Brand override:

```tsx
<ThemeProvider
  theme={{
    name: "violet",
    mode: "light",
    colors: {
      primary: "#7c3aed",
      primaryHover: "#6d28d9",
    },
  }}
>
  <App />
</ThemeProvider>
```

---

## API reference

| Export                                             | Description                                           |
| -------------------------------------------------- | ----------------------------------------------------- |
| `ThemeProvider`                                    | Applies theme to `:root` and provides React context   |
| `useTheme()`                                       | Returns the resolved theme from context               |
| `mergeTheme(input?)`                               | Deep-merge partial config onto light/dark base preset |
| `validateTheme(input)`                             | Zod validation; throws on invalid hex/radius          |
| `themeToCSSVars(theme)`                            | Convert resolved theme → CSS variable map             |
| `defaultTheme`                                     | Default theme configuration                           |
| `presets` / `lightThemeColors` / `darkThemeColors` | Base color presets                                    |
| `sampleThemes` / `resolveSampleTheme`              | Storybook / demo theme keys                           |
| `sampleThemeOptions`                               | Toolbar label/value pairs for Storybook               |
| `isDarkSampleTheme(key)`                           | Whether a sample key uses dark base                   |

### Types

```ts
import type {
  ThemeConfig,
  ThemeColors,
  ThemeMode,
  ThemeRadius,
  ResolvedTheme,
  SampleThemeKey,
} from "@axiora-ui/ui-themes";
```

---

## Theme presets

| Key            | Mode  | Description                 |
| -------------- | ----- | --------------------------- |
| `default`      | light | Base light theme            |
| `dark`         | dark  | Base dark theme             |
| `violet`       | light | Violet brand primary        |
| `emerald`      | light | Emerald brand primary       |
| `violet-dark`  | dark  | Dark base + violet primary  |
| `emerald-dark` | dark  | dark base + emerald primary |

```ts
import { resolveSampleTheme, mergeTheme } from "@axiora-ui/ui-themes";

const resolved = mergeTheme(resolveSampleTheme("violet-dark"));
// resolved.colors.primary → "#8b5cf6"
// resolved.mode → "dark"
```

---

## Custom themes

Partial configs merge onto the appropriate base (light or dark):

```ts
import { mergeTheme, validateTheme } from "@axiora-ui/ui-themes";

const theme = validateTheme({
  name: "acme",
  mode: "light",
  colors: {
    primary: "#e11d48",
    primaryHover: "#be123c",
  },
  radius: "lg",
  fontFamily: "Inter, sans-serif",
});

const resolved = mergeTheme(theme);
```

Nested color groups (`text`, `menu`, `feedback`) support **partial** overrides — you don't need every field when overriding a subgroup.

---

## CSS variables

`ThemeProvider` writes these to `document.documentElement` (default `target="root"`):

| Variable                              | Maps to                     |
| ------------------------------------- | --------------------------- |
| `--color-primary`                     | `colors.primary`            |
| `--color-primary-hover`               | `colors.primaryHover`       |
| `--color-secondary`                   | `colors.secondary`          |
| `--color-background`                  | `colors.background`         |
| `--color-foreground`                  | `colors.foreground`         |
| `--color-surface`                     | `colors.surface`            |
| `--color-text-on-primary`             | `colors.text.onPrimary`     |
| `--color-border`                      | `colors.border`             |
| `--color-success/warning/danger/info` | `colors.feedback.*`         |
| `--color-menu-*`                      | `colors.menu.*`             |
| `--radius-base`                       | `radius` (from token scale) |
| `--font-family-base`                  | `fontFamily`                |

Components in `@axiora-ui/ui-core` reference these via classes in `components.css` (e.g. `.ax-button-primary`, `.ax-label`, `.ax-input`).

---

## Storybook integration

The root `.storybook/preview.tsx` wraps all stories in `ThemeProvider` and exposes an **axTheme** toolbar global with `sampleThemeOptions`. Per-story overrides:

```tsx
export const VioletBrand: Story = {
  globals: { axTheme: "violet" },
  render: () => <MyComponent />,
};
```

---

## Build & test

```bash
pnpm build --filter @axiora-ui/ui-themes
pnpm test --filter @axiora-ui/ui-themes
```

Tests cover `mergeTheme`, `validateTheme` (including partial nested colors), `themeToCSSVars`, `ThemeProvider`, and sample theme presets.

---

## Planned additions

- **`systemTheme`** — Follow `prefers-color-scheme` automatically
- **High-contrast preset** — Accessibility-focused variant
- **Persisted theme preference** — Optional localStorage integration helper

---

## Build

```bash
pnpm build --filter @axiora-ui/ui-themes
```

Output: `dist/index.js` (ESM) + `dist/index.d.ts`

> `@axiora-ui/ui-tokens` is externalized and not bundled.
