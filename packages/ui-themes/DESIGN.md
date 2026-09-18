# Design Document: `@axiora-ui/ui-themes`

Runtime theming (primary/secondary/menu/feedback colors, radius, font) across the Axiora UI component library.

**Status:** Design only — nothing in this document is implemented yet. It supersedes the "Planned Additions" section of the current [`packages/ui-themes/README.md`](./README.md), which already names this exact scope (`ThemeProvider`/`useTheme`, `createTheme(overrides)`, CSS variable injection, `systemTheme`, high-contrast theme).

---

## Table of Contents

1. [Where `ui-themes` Fits](#1-where-ui-themes-fits)
2. [Current State vs. Target State](#2-current-state-vs-target-state)
3. [The Core Idea](#3-the-core-idea)
4. [Possible Approaches](#4-possible-approaches)
5. [Package Structure](#5-package-structure)
6. [Designing the Theme Contract](#6-designing-the-theme-contract)
7. [Default Theme (sourced from `ui-tokens`)](#7-default-theme-sourced-from-ui-tokens)
8. [Merging Consumer Input with Defaults](#8-merging-consumer-input-with-defaults)
9. [Validating Consumer Input](#9-validating-consumer-input)
10. [CSS Variable Application](#10-css-variable-application)
11. [The `ThemeProvider` and `useTheme`](#11-the-themeprovider-and-usetheme)
12. [How Components Consume the Theme](#12-how-components-consume-the-theme)
13. [Writing Tests](#13-writing-tests)
14. [Writing Storybook Stories](#14-writing-storybook-stories)
15. [Build & Publish Setup](#15-build--publish-setup)
16. [Migration Plan from the Current Package](#16-migration-plan-from-the-current-package)
17. [Summary Checklist](#17-summary-checklist)
18. [How This Changes Downstream Component Work](#18-how-this-changes-downstream-component-work)

---

## 1. Where `ui-themes` Fits

```
utils  -->  ui-tokens  -->  ui-themes  -->  ui-hooks / ui-core (components)
```

- **`utils`** — generic helpers (string/array/object/date/etc.), no design concepts.
- **`ui-tokens`** — the fixed design vocabulary: `colorPrimitive`, `spacing`, `typography`, `scale` (radius), `shadow`, `zIndex`, `breakpoints`, `duration`, `opacity`. All baked in at build time, no semantic meaning attached (`colorPrimitive.blue[600]` doesn't know it means "primary").
- **`ui-themes`** — a **runtime layer** on top of tokens. Attaches semantic meaning (`primary`, `menu.background`, `feedback.danger`) and lets a *consumer of the library* override those semantics at runtime without forking or rebuilding components.
- **`ui-core` / `ui-hooks`** — every component reads color/radius/font through the theme layer, never hardcodes a `colorPrimitive` value directly.

The key distinction from `ui-tokens`: tokens are fixed at build time (Axiora's design vocabulary). Themes are supplied at runtime by whoever installs `@axiora-ui/ui-core` — a specific brand's primary color, a specific customer's menu color, light vs. dark preference. `ui-themes` is the bridge: it takes an input theme object, validates it, merges it with token-derived defaults, and makes the result available to every component via CSS variables and a React context.

---

## 2. Current State vs. Target State

The package already exists (`packages/ui-themes/src/index.ts`) but implements only the *semantic layer*, not the *runtime layer*:

```ts
// current: packages/ui-themes/src/index.ts
export const lightTheme = { name: "light", colors: { ...semanticColors, background, foreground, surface }, spacing, typography } as const;
export const darkTheme  = { name: "dark",  colors: { ...semanticColors, background, foreground, surface }, spacing, typography } as const;
export type Theme = typeof lightTheme | typeof darkTheme;
```

This is useful and correct as far as it goes — `colorPrimitive.blue[600]` is picked out and named `primary` here rather than in every component. But it has three gaps this design closes:

| Gap in current package | What's missing |
|---|---|
| No consumer override | A brand can't say "my primary is `#7c3aed`" — the only choice is `lightTheme` or `darkTheme` as-is. |
| No propagation mechanism | `Theme` is just a plain object; a component must be handed it via props/context manually (see `Theme.stories.tsx`'s inline styles) — there's no `ThemeProvider`, no CSS variables, no zero-prop-drilling story. |
| No `menu` group | Sidebar/navigation coloring can't be tuned independently of `primary`, which is a named requirement for this design (mirrors the model document this design is based on). |

`lightTheme` / `darkTheme` are not thrown away — they become the two **built-in presets** that seed the new `defaultTheme` (see [§16](#16-migration-plan-from-the-current-package)).

---

## 3. The Core Idea

A consumer of the component library does this:

```tsx
import { ThemeProvider } from '@axiora-ui/ui-themes';

function App() {
  return (
    <ThemeProvider
      theme={{
        colors: {
          primary: '#7c3aed',
          menu: { background: '#111827', text: '#f9fafb' },
        },
      }}
    >
      <YourApp />
    </ThemeProvider>
  );
}
```

Every component in `@axiora-ui/ui-core` — `Button`, and everything built after it — automatically picks up `#7c3aed` wherever it references `primary`, without the component itself knowing anything about that consumer's brand. That propagation is the entire job of this package.

---

## 4. Possible Approaches

### Option A — CSS Custom Properties + React Context (recommended)

`ThemeProvider` writes the resolved theme as CSS custom properties onto a wrapping element, and also exposes the resolved theme object via React Context for the rare case a component needs the raw value in JS.

**Pros:** no re-render cost for style changes, works with the plain inline-style / CSS-module patterns already used in this repo (see `Button.tsx`'s `CSSProperties` objects), trivial dark-mode/theme-switching, small runtime footprint.
**Cons:** slightly more setup than pure CSS-in-JS.

### Option B — CSS-in-JS Theming (styled-components / Emotion)

**Pros:** familiar pattern. **Cons:** the repo has **no CSS-in-JS dependency today** (`Button.tsx` uses plain `CSSProperties` objects) — adopting this would add a new runtime dependency to every downstream component and cause tree-wide re-renders on theme change.

### Option C — Tailwind Config Generation

**Cons:** the repo isn't Tailwind-based, and this makes theming build-time again, defeating the "runtime brand override" requirement.

### Recommendation

**Option A.** It requires no new UI dependency for `ui-core`/`ui-hooks`, keeps theming truly dynamic (a consumer can switch themes at runtime, e.g. a per-tenant admin panel), and composes cleanly with `ui-tokens` exactly as the existing `lightTheme`/`darkTheme` composition already does — tokens supply the *defaults and shape*, `ui-themes` supplies the *runtime override*.

---

## 5. Package Structure

Following the per-concern, colocated-tests-and-stories convention already used in `ui-tokens` (e.g. `src/colors/colors.ts` + `colors.test.ts` + `Colors.stories.tsx`):

```
packages/ui-themes/
  src/
    types/
      theme.ts                 # ThemeConfig contract (the "input shape")
    presets/
      lightTheme.ts             # today's lightTheme, rehomed as a preset
      darkTheme.ts               # today's darkTheme, rehomed as a preset
      presets.ts                 # presets registry: { light, dark }
    defaults/
      defaultTheme.ts            # resolved fallback, sourced from ui-tokens + a preset
    context/
      ThemeContext.tsx
      ThemeProvider.tsx
      ThemeProvider.test.tsx
      useTheme.ts
    css/
      apply-theme-vars.ts        # theme object -> CSS custom properties
      apply-theme-vars.test.ts
    validation/
      validateTheme.ts           # schema validation for consumer input
      validateTheme.test.ts
    utils/
      mergeTheme.ts               # deep-merge consumer theme with defaults
      mergeTheme.test.ts
    index.ts
  stories/
    ThemeProvider.stories.tsx
    ThemeSwitcher.stories.tsx      # demonstrates runtime switching
  package.json
  tsconfig.json
  vitest.config.ts
```

This replaces the current single flat `src/index.ts` + `src/Theme.stories.tsx`.

---

## 6. Designing the Theme Contract

The most important design decision — the public API every consumer of `@axiora-ui/ui-core` will write against. Shallow enough to fill in partially, structured enough to map onto components.

```ts
// src/types/theme.ts
export interface ThemeColors {
  primary: string;
  primaryHover?: string;
  secondary: string;
  secondaryHover?: string;

  background: string;
  foreground: string;
  surface: string;

  text: {
    onPrimary: string;   // text color placed on top of `primary`
    onSecondary: string;
  };

  border: string;

  menu: {
    background: string;
    text: string;
    textActive?: string;
    itemHoverBackground?: string;
  };

  feedback: {
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
}

export interface ThemeConfig {
  name?: string;                          // e.g. "acme-brand-dark", used for data-theme attr
  mode?: 'light' | 'dark';                 // which preset to merge onto — defaults to 'light'
  colors?: Partial<ThemeColors>;           // consumer only supplies what they want to override
  radius?: keyof typeof import('@axiora-ui/ui-tokens').scale;  // 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  fontFamily?: string;
}
```

Design notes:

- **`colors` is `Partial<ThemeColors>`** at the consumer-facing level — a consumer passes only `{ primary: '#7c3aed' }` and gets sensible defaults for everything else. The *resolved* internal theme (after merging) is fully required.
- **`menu` is its own nested group**, matching the model document's requirement directly — a future `Sidebar`/navigation component reads from `theme.colors.menu.*`, not from `primary`, even though `menu.background` derives from a gray shade by default. A consumer can say "brand purple everywhere, but keep the sidebar dark" without those two settings fighting each other.
- **`text.onPrimary` / `text.onSecondary`** exist because "what text color goes on my primary color" is a real per-theme decision (a light brand color needs dark text) — this repo's current `Button.tsx` currently hardcodes `color: "#ffffff"` for its `primary` variant (line 14), which is exactly the kind of hardcode this contract removes.
- **`spacing`, `typography`, `shadow`, `zIndex`, `breakpoints`, `duration`, `opacity` are deliberately *not* part of `ThemeConfig`.** These are structural/system tokens (grid rhythm, type scale, motion timing), not brand tokens — no known Axiora consumer requirement calls for a tenant to override letter-spacing or z-index scale at runtime. They stay static passthroughs from `ui-tokens`, exactly as `lightTheme`/`darkTheme` already do today. `ThemeConfig` covers only the values a brand actually customizes: color, radius, font family.

---

## 7. Default Theme (sourced from `ui-tokens`)

The default theme fills in anything the consumer didn't specify, and is built from the existing `lightTheme` / `darkTheme` presets rather than duplicating `colorPrimitive` values a third time:

```ts
// src/presets/lightTheme.ts  (moved from src/index.ts, colors expanded to the new ThemeColors shape)
import { colorPrimitive } from '@axiora-ui/ui-tokens';
import type { ThemeColors } from '../types/theme';

export const lightThemeColors: ThemeColors = {
  primary: colorPrimitive.blue[600],
  primaryHover: colorPrimitive.blue[700],
  secondary: colorPrimitive.gray[500],
  secondaryHover: colorPrimitive.gray[600],

  background: colorPrimitive.gray[50],
  foreground: colorPrimitive.gray[900],
  surface: '#ffffff',

  text: { onPrimary: '#ffffff', onSecondary: '#ffffff' },
  border: colorPrimitive.gray[200],

  menu: {
    background: colorPrimitive.gray[900],
    text: colorPrimitive.gray[300],
    textActive: '#ffffff',
    itemHoverBackground: colorPrimitive.gray[800],
  },

  feedback: {
    success: colorPrimitive.green[600],
    warning: colorPrimitive.yellow[600],
    danger: colorPrimitive.red[600],
    info: colorPrimitive.blue[600],
  },
};
```

`darkThemeColors` inverts `background`/`foreground`/`surface` (as today's `darkTheme` already does) and lifts `primary`/`secondary` a shade lighter for contrast against a dark page, but keeps `menu.*` and `feedback.*` identical to light — a dark sidebar already reads correctly against either page background, and success/warning/danger/info are brand-recognition colors that shouldn't shift with mode:

```ts
// src/presets/darkTheme.ts
import { colorPrimitive } from '@axiora-ui/ui-tokens';
import type { ThemeColors } from '../types/theme';

export const darkThemeColors: ThemeColors = {
  primary: colorPrimitive.blue[500],       // one shade lighter than light mode's 600, for contrast on a dark surface
  primaryHover: colorPrimitive.blue[400],
  secondary: colorPrimitive.gray[400],
  secondaryHover: colorPrimitive.gray[300],

  background: colorPrimitive.gray[900],
  foreground: colorPrimitive.gray[50],
  surface: colorPrimitive.gray[800],

  text: { onPrimary: '#ffffff', onSecondary: '#ffffff' },
  border: colorPrimitive.gray[700],

  menu: {
    background: colorPrimitive.gray[900],       // same as light — see note above
    text: colorPrimitive.gray[300],
    textActive: '#ffffff',
    itemHoverBackground: colorPrimitive.gray[800],
  },

  feedback: {
    success: colorPrimitive.green[600],          // same as light — see note above
    warning: colorPrimitive.yellow[600],
    danger: colorPrimitive.red[600],
    info: colorPrimitive.blue[600],
  },
};
```

```ts
// src/presets/presets.ts
import { lightThemeColors } from './lightTheme';
import { darkThemeColors } from './darkTheme';

export const presets = {
  light: lightThemeColors,
  dark: darkThemeColors,
} as const;
```

```ts
// src/defaults/defaultTheme.ts
import { scale } from '@axiora-ui/ui-tokens';
import { presets } from '../presets/presets';

export const defaultTheme = {
  name: 'default',
  mode: 'light' as const,
  colors: presets.light,
  radius: 'md' as keyof typeof scale,
  fontFamily: `'Inter', -apple-system, sans-serif`,
};
```

---

## 8. Merging Consumer Input with Defaults

A shallow `{ ...base, ...override }` is not enough because `colors` is itself nested (`text`, `menu`, `feedback`) — a consumer overriding just `menu.background` must not wipe out `menu.text`.

```ts
// src/utils/mergeTheme.ts
import { defaultTheme } from '../defaults/defaultTheme';
import { presets } from '../presets/presets';       // { light: lightThemeColors, dark: darkThemeColors }
import type { ThemeConfig, ThemeColors } from '../types/theme';

function mergeColors(base: ThemeColors, override?: Partial<ThemeColors>): ThemeColors {
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
  const base = input?.mode === 'dark' ? presets.dark : presets.light;
  return {
    name: input?.name ?? defaultTheme.name,
    mode: input?.mode ?? defaultTheme.mode,
    colors: mergeColors(base, input?.colors),
    radius: input?.radius ?? defaultTheme.radius,
    fontFamily: input?.fontFamily ?? defaultTheme.fontFamily,
  };
}

export type ResolvedTheme = ReturnType<typeof mergeTheme>;
```

### 8.1 The No-Override Case: Just Switching Between Light and Dark

Not every consumer wants a custom brand palette — many just want the built-in light/dark pair, toggled at runtime (e.g. a user's OS preference or an in-app dark-mode switch), with **zero color overrides**. `mergeTheme` handles this without any special-casing, because `mode` alone selects which full preset (`presets.light` or `presets.dark`) is the merge base, and `mergeColors(base, undefined)` returns `base` untouched:

```tsx
// No theme prop at all -> defaultTheme (mode: 'light', presets.light)
<ThemeProvider>
  <App />
</ThemeProvider>

// mode only, no colors -> the *entire* dark preset applies, unmodified
<ThemeProvider theme={{ mode: 'dark' }}>
  <App />
</ThemeProvider>

// mode + a partial override -> dark preset as the base, primary overridden on top
<ThemeProvider theme={{ mode: 'dark', colors: { primary: '#7c3aed' } }}>
  <App />
</ThemeProvider>
```

```ts
// src/utils/mergeTheme.test.ts — the case this section documents
it('resolves the full dark preset when only mode is given, with no colors override', () => {
  const result = mergeTheme({ mode: 'dark' });
  expect(result.colors).toEqual(presets.dark);     // every field, not just background/foreground
});
```

This is also the shape a plain light/dark toggle takes in an app — no `colors` key is ever passed, only `mode` flips between renders:

```tsx
function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  return (
    <ThemeProvider theme={{ mode }}>
      <button onClick={() => setMode(m => (m === 'light' ? 'dark' : 'light'))}>Toggle theme</button>
      <YourApp />
    </ThemeProvider>
  );
}
```

Because `ThemeProvider` re-derives `resolved`/`cssVars` from `theme` via `useMemo` (§11), this re-renders with new CSS variables on every toggle — no remount, same mechanism as the branded-override case, just with `presets.dark` swapped in wholesale instead of a partial override layered on top.

---

## 9. Validating Consumer Input

Since `theme` becomes a public input from *outside* this codebase (any app installing `@axiora-ui/ui-core`), it should be validated defensively — a malformed hex value should fail fast with a clear message, not silently render invisible text. **`zod` is a new dependency this design introduces** — it is not used anywhere in the monorepo today, so it should be added only to `ui-themes`'s `package.json`, not hoisted to the workspace root.

```ts
// src/validation/validateTheme.ts
import { z } from 'zod';
import { scale } from '@axiora-ui/ui-tokens';

const hexColor = z.string().regex(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, 'must be a valid hex color');

const themeColorsSchema = z.object({
  primary: hexColor, primaryHover: hexColor.optional(),
  secondary: hexColor, secondaryHover: hexColor.optional(),
  background: hexColor, foreground: hexColor, surface: hexColor,
  text: z.object({ onPrimary: hexColor, onSecondary: hexColor }),
  border: hexColor,
  menu: z.object({
    background: hexColor, text: hexColor,
    textActive: hexColor.optional(), itemHoverBackground: hexColor.optional(),
  }),
  feedback: z.object({ success: hexColor, warning: hexColor, danger: hexColor, info: hexColor }),
}).partial();

export const themeConfigSchema = z.object({
  name: z.string().optional(),
  mode: z.enum(['light', 'dark']).optional(),
  colors: themeColorsSchema.optional(),
  radius: z.enum(Object.keys(scale) as [string, ...string[]]).optional(),
  fontFamily: z.string().optional(),
});

export function validateTheme(input: unknown) {
  const result = themeConfigSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`Invalid theme config: ${result.error.issues.map(i => i.message).join(', ')}`);
  }
  return result.data;
}
```

Deriving the `radius` enum from `Object.keys(scale)` (rather than hand-listing `'none' | 'xs' | ... | 'full'`) keeps validation in sync automatically if `ui-tokens`'s `scale` ever changes.

---

## 10. CSS Variable Application

The mechanism that reaches every component with zero prop drilling. `ThemeProvider` sets CSS custom properties on a wrapper element; components read `var(--color-primary)` instead of importing `colorPrimitive` directly.

```ts
// src/css/apply-theme-vars.ts
import { scale } from '@axiora-ui/ui-tokens';
import type { ResolvedTheme } from '../utils/mergeTheme';

export function themeToCSSVars(theme: ResolvedTheme): Record<string, string> {
  return {
    '--color-primary': theme.colors.primary,
    '--color-primary-hover': theme.colors.primaryHover ?? theme.colors.primary,
    '--color-secondary': theme.colors.secondary,
    '--color-secondary-hover': theme.colors.secondaryHover ?? theme.colors.secondary,
    '--color-background': theme.colors.background,
    '--color-foreground': theme.colors.foreground,
    '--color-surface': theme.colors.surface,
    '--color-text-on-primary': theme.colors.text.onPrimary,
    '--color-text-on-secondary': theme.colors.text.onSecondary,
    '--color-border': theme.colors.border,
    '--color-menu-background': theme.colors.menu.background,
    '--color-menu-text': theme.colors.menu.text,
    '--color-menu-text-active': theme.colors.menu.textActive ?? theme.colors.menu.text,
    '--color-menu-item-hover': theme.colors.menu.itemHoverBackground ?? theme.colors.menu.background,
    '--color-success': theme.colors.feedback.success,
    '--color-warning': theme.colors.feedback.warning,
    '--color-danger': theme.colors.feedback.danger,
    '--color-info': theme.colors.feedback.info,
    '--radius-base': scale[theme.radius],
    '--font-family-base': theme.fontFamily,
  };
}
```

---

## 11. The `ThemeProvider` and `useTheme`

```tsx
// src/context/ThemeContext.tsx
import { createContext } from 'react';
import type { ResolvedTheme } from '../utils/mergeTheme';

export const ThemeContext = createContext<ResolvedTheme | null>(null);

// src/context/ThemeProvider.tsx
import { useMemo } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import { ThemeContext } from './ThemeContext';
import { mergeTheme } from '../utils/mergeTheme';
import { validateTheme } from '../validation/validateTheme';
import { themeToCSSVars } from '../css/apply-theme-vars';
import type { ThemeConfig } from '../types/theme';

export interface ThemeProviderProps {
  theme?: ThemeConfig;
  children: ReactNode;
  /** Render a wrapping <div> (default) or apply vars to document.documentElement */
  target?: 'wrapper' | 'root';
}

export function ThemeProvider({ theme, children, target = 'wrapper' }: ThemeProviderProps) {
  const resolved = useMemo(() => {
    const validated = theme ? validateTheme(theme) : undefined;
    return mergeTheme(validated);
  }, [theme]);

  const cssVars = useMemo(() => themeToCSSVars(resolved), [resolved]);

  if (target === 'root') {
    useApplyVarsToDocument(cssVars, resolved.name);
    return <ThemeContext.Provider value={resolved}>{children}</ThemeContext.Provider>;
  }

  return (
    <ThemeContext.Provider value={resolved}>
      <div data-theme={resolved.name} style={cssVars as CSSProperties}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

function useApplyVarsToDocument(vars: Record<string, string>, name: string) {
  if (typeof document === 'undefined') return; // SSR guard
  Object.entries(vars).forEach(([key, value]) => document.documentElement.style.setProperty(key, value));
  document.documentElement.setAttribute('data-theme', name);
}

// src/context/useTheme.ts
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
```

This is a direct implementation of the "Planned Additions" the current README already names (`ThemeProvider`/`useTheme`, `createTheme(overrides)` ≈ `mergeTheme`, "CSS variable injection").

---

## 12. How Components Consume the Theme

Two patterns: CSS variables for styling (preferred), `useTheme()` only when JS needs the raw value.

**Migration example — `packages/ui-core/src/Button.tsx` today:**

```tsx
// current — hardcodes colorPrimitive directly
const variantStyles: Record<ButtonVariant, CSSProperties> = {
  primary:   { backgroundColor: colorPrimitive.blue[600], color: "#ffffff" },
  secondary: { backgroundColor: colorPrimitive.gray[100], color: colorPrimitive.gray[900] },
  danger:    { backgroundColor: colorPrimitive.red[600], color: "#ffffff" },
};
```

**After `ui-themes` ships:**

```tsx
// target — reads CSS variables, falls back to the same ui-tokens defaults when unthemed
const variantStyles: Record<ButtonVariant, CSSProperties> = {
  primary:   { backgroundColor: `var(--color-primary, ${colorPrimitive.blue[600]})`, color: `var(--color-text-on-primary, #ffffff)` },
  secondary: { backgroundColor: `var(--color-secondary, ${colorPrimitive.gray[100]})`, color: `var(--color-foreground, ${colorPrimitive.gray[900]})` },
  danger:    { backgroundColor: `var(--color-danger, ${colorPrimitive.red[600]})`, color: `var(--color-text-on-primary, #ffffff)` },
};
```

`Button` never needs to import `ThemeProvider` or know a `ThemeProvider` exists — the `var(--x, fallback)` pattern means it renders correctly standalone (e.g. in isolation tests) *and* picks up a theme automatically when one is present higher in the tree. This is the payoff: a consumer wrapping their app in `<ThemeProvider theme={{ colors: { primary: '#7c3aed' } }}>` changes every `Button` in the library, everywhere, without touching `Button.tsx`.

`useTheme()` is reserved for the rare case a component needs the raw JS value (e.g. passing a color into a canvas/chart library), not for everyday styling.

---

## 13. Writing Tests

Following the existing `*.test.ts` colocation convention (see `ui-tokens/src/colors/colors.test.ts`), three things need coverage:

1. **`mergeTheme.test.ts`** — default passthrough, single-field override without losing siblings, nested-group override (`menu.background` doesn't wipe `menu.text`), `mode: 'dark'` with no `colors` resolves the full dark preset unmodified (§8.1), `mode: 'dark'` plus a partial `colors` override layers correctly on the dark base rather than the light one.
2. **`validateTheme.test.ts`** — accepts a partial valid theme, rejects invalid hex, rejects invalid `radius`.
3. **`ThemeProvider.test.tsx`** — provides the resolved theme via context, sets CSS variables on the wrapper element, `useTheme()` throws a clear error outside a provider.

---

## 14. Writing Storybook Stories

The repo's `.storybook/main.ts` already globs `packages/ui-themes/src/**/*.stories.@(ts|tsx)` and `storySort` already reserves a `"Themes"` group — no Storybook config changes needed, only new stories.

**14.1 Global decorator** (new — add to `.storybook/preview.tsx`): a toolbar theme switcher so every existing `ui-core` story (currently just `Button`) can be viewed under multiple themes without per-component theme stories:

```tsx
// .storybook/preview.tsx — addition
import { ThemeProvider } from '../packages/ui-themes/src';
import { sampleThemes } from '../packages/ui-themes/src/presets/sampleThemes';

// add to the Preview object:
globalTypes: {
  theme: { toolbar: { icon: 'paintbrush', items: Object.keys(sampleThemes), showName: true } },
},
initialGlobals: { ...existing, theme: 'default' },
decorators: [
  (Story, context) => <ThemeProvider theme={sampleThemes[context.globals.theme]}><Story /></ThemeProvider>,
],
```

**14.2 Dedicated `ui-themes` stories** — replaces the current `Theme.stories.tsx` (which manually inlines `theme.colors.background` etc. into `style` props):

- `stories/ThemeProvider.stories.tsx` — `Default` / `Violet` / `Emerald` / `Dark` variants, each rendering a `var(--...)`-styled preview swatch (primary button, secondary button, menu panel) — proves the CSS variables actually change, not just the JS object.
- `stories/ThemeSwitcher.stories.tsx` — a `useState`-driven live switcher proving runtime re-theming with no remount.

---

## 15. Build & Publish Setup

`package.json` changes relative to the current file:

```jsonc
{
  "name": "@axiora-ui/ui-themes",
  "peerDependencies": {
    "react": ">=18"
  },
  "dependencies": {
    "@axiora-ui/ui-tokens": "workspace:*",
    "zod": "^3.23.0"                         // new
  },
  "scripts": {
    // unchanged: build / lint / test — build already externalizes @axiora-ui/ui-tokens
  }
}
```

`react` moves from implicit to an explicit `peerDependencies` entry (the current package has no React dependency at all, since it only exports plain objects today — `ThemeProvider`/`useTheme` make React a real runtime requirement of this package for the first time).

`src/index.ts` grows from two exports to:

```ts
export { ThemeProvider } from './context/ThemeProvider';
export { useTheme } from './context/useTheme';
export { mergeTheme } from './utils/mergeTheme';
export { validateTheme } from './validation/validateTheme';
export { defaultTheme } from './defaults/defaultTheme';
export { lightTheme, darkTheme } from './presets/presets';   // preserved for compatibility, see §16
export type { ThemeConfig, ThemeColors } from './types/theme';
export type { ResolvedTheme } from './utils/mergeTheme';
```

---

## 16. Migration Plan from the Current Package

Because `@axiora-ui/ui-themes` is already published-shaped (`package.json` exists, version `1.1.0`), this isn't a greenfield build — it's an evolution. Recommended sequencing:

### 16.1 Current Implementation Status

Work on §5's structure has already started directly in `src/`, ahead of this document:

| File | State | Notes |
|---|---|---|
| `src/types/theme.ts` | In progress | `ThemeColors`/`ThemeConfig` drafted. Has a `background` field typo (`backgroud`) that should be corrected before other files depend on the name — the contract in §6 uses the corrected `background` spelling as the target. Also declares a `ThemeMode` interface (`{ Light: "light"; Dark: "dark" }`) used as `mode?: ThemeMode \| "light" \| "dark"` and `radius?: Scale \| number \| keyof Scale` — both are broader/stricter than §6's simple `mode?: 'light' \| 'dark'` and `radius?: keyof typeof scale`. Worth a second pass: `ThemeMode` as drafted is an object shape, not a union of the two literals, so `mode: someThemeModeObject` would type-check but isn't a real usable value; and `radius: Scale` would accept the entire token map as a single radius value. Recommend collapsing both back to the simpler unions in §6 unless there's a concrete use case (e.g. numeric custom radius) driving the wider type.
| `src/presets/lightTheme.ts` | In progress | Matches §7's shape and values, but inherits the `backgroud` typo from `theme.ts`, and sets `menu.text` to `colorPrimitive.yellow[600]` rather than a neutral gray — likely a copy/paste slip while filling in the `feedback.warning` value just below it. §7's `lightThemeColors` uses `background` and `colorPrimitive.gray[300]` for `menu.text` as the target values. |
| `src/presets/darkTheme.ts` | Stub | Currently `export const darkThemeColors: ThemeColors = {}` — an empty object, which will fail to type-check once `ThemeColors`' required fields are non-optional. §7's `darkThemeColors` code block is the target implementation to fill this in with. |
| `src/presets/presets.ts` | Not started | The `{ light, dark }` registry from §7 that `mergeTheme` (§8) reads by `mode`. |
| `src/index.ts` | Not started | Currently effectively empty; target export surface is listed in §15. |
| `src/Theme.stories.tsx` | Removed | Deleted in the working tree ahead of §14's replacement stories — fine, since §16 step 4 already sequences the story migration after `ThemeProvider` exists; nothing currently fills that gap in Storybook until then. |

None of this blocks the design — it's the expected shape of §5 being built out — but `theme.ts` and `lightTheme.ts` should be corrected (or deliberately diverged from §6/§7 with a reason) before `mergeTheme`, `validateTheme`, or `ThemeProvider` are written against them, since every other file in the package will import `ThemeColors` from `theme.ts` and inherit whatever field names and typos it settles on.

### 16.2 Sequencing

1. **Expand the contract without breaking exports.** Add the new `ThemeColors` fields (`menu`, `feedback`, `text.onPrimary/onSecondary`, `secondaryHover`) to `lightTheme`/`darkTheme`'s `colors` object. Existing consumers reading `theme.colors.primary` or `theme.colors.background` see no change.
2. **Rehome, don't delete.** Move the `lightTheme`/`darkTheme` construction logic into `src/presets/`, keep both names exported from `src/index.ts` unchanged so nothing importing `@axiora-ui/ui-themes` today breaks.
3. **Add the runtime layer alongside.** `ThemeProvider`, `useTheme`, `mergeTheme`, `validateTheme` are all-new exports — purely additive, no existing symbol changes shape or is removed.
4. **Migrate `Theme.stories.tsx` last**, once `ThemeProvider` exists, so the story can demonstrate the new mechanism (per §14) instead of the manual `theme.colors.background` inlining it does today.
5. **Only then** touch `ui-core`'s `Button.tsx` (per §12) — that migration is downstream work explicitly out of scope for this package, tracked separately.

This order means the package is releasable at each step and `Theme`/`lightTheme`/`darkTheme` remain valid imports throughout.

---

## 17. Summary Checklist

- [ ] `ThemeConfig` contract defined — `colors.primary`, `colors.secondary`, `colors.menu.*`, `colors.feedback.*`, all consumer fields optional
- [ ] `lightTheme`/`darkTheme` colors expanded to the full `ThemeColors` shape, still exported unchanged for compatibility
- [ ] `defaultTheme` built from `ui-tokens` primitives via the existing presets, never duplicating hex values a third time
- [ ] `mergeTheme` deep-merges nested groups (`text`, `menu`, `feedback`) correctly, respects `mode: 'light' | 'dark'`
- [ ] `mode`-only input (no `colors` at all) resolves the full opposite preset unmodified — the plain light/dark toggle case (§8.1)
- [ ] `validateTheme` (zod, new dependency scoped to this package) rejects malformed input with a clear error
- [ ] `ThemeProvider` writes CSS custom properties + provides React context; `react` promoted to a real `peerDependency`
- [ ] `useTheme()` hook available for the rare cases components need the raw JS value
- [ ] `radius` sourced from `ui-tokens`'s `scale` keys, not hand-duplicated
- [ ] Storybook global theme-switcher decorator wired into `.storybook/preview.tsx` (main.ts story globs already cover it)
- [ ] Tests: merge correctness, validation, provider CSS-var output (colocated per existing repo convention)
- [ ] Package exports `ThemeProvider`, `useTheme`, `mergeTheme`, `validateTheme`, `defaultTheme`, `lightTheme`, `darkTheme`, and types

---

## 18. How This Changes Downstream Component Work

Once this ships, every component built in `ui-core`/`ui-hooks` afterward follows one rule: **no component may hardcode a color, radius, or font-family** — it must reference a `var(--...)` token supplied by `ui-themes`, with a `ui-tokens`-derived fallback for the unthemed case (see the `Button.tsx` before/after in [§12](#12-how-components-consume-the-theme)). This is the enforcement mechanism that guarantees every component reflects theming — it isn't a convention to remember per component, it's a rule checkable at review time (e.g. a CI grep for `colorPrimitive\.` inside `ui-core`/`ui-hooks` `style` objects, flagging anything not routed through a `var(--...)` fallback).

`Button.tsx` is the one existing component with this hardcode today (`colorPrimitive.blue[600]`, `colorPrimitive.gray[100]`, `colorPrimitive.red[600]`, `colorPrimitive.gray[900]`); it becomes the first migration once this package lands, but that migration itself is explicitly not part of this design document.

---

*This document is a design reference only, prepared for the `ui-themes` package of the Axiora UI component library, following the `utils -> ui-tokens -> ui-themes -> components` package chain, modeled on the uploaded `ui-themes` implementation guide.*
