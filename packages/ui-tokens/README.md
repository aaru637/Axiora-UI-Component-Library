# @axiora-ui/ui-tokens

<!-- AI-ASSISTED: Cursor
     PROMPT: Refresh ui-tokens README status and downstream usage notes
     ACCEPTED-BY: dhinesh -->

## 📊 Implementation Status

### ✅ Fully Implemented (UI-Ready)

All design tokens are fully implemented and tested:

| Token Category | Status      | Test Coverage | UI Usage |
| -------------- | ----------- | ------------- | -------- |
| Colors         | ✅ Complete | ✅ Tested     | ✅ Ready |
| Spacing        | ✅ Complete | ✅ Tested     | ✅ Ready |
| Typography     | ✅ Complete | ✅ Tested     | ✅ Ready |
| Scale          | ✅ Complete | ✅ Tested     | ✅ Ready |
| Shadow         | ✅ Complete | ✅ Tested     | ✅ Ready |
| Z-Index        | ✅ Complete | ✅ Tested     | ✅ Ready |
| Duration       | ✅ Complete | ✅ Tested     | ✅ Ready |
| Opacity        | ✅ Complete | ✅ Tested     | ✅ Ready |
| Breakpoints    | ✅ Complete | ✅ Tested     | ✅ Ready |

---

The foundation layer of the Axiora UI design system. This package exports raw design token constants — colors, spacing, typography, border radius, shadows, z-index, breakpoints, duration/easing, and opacity — as plain TypeScript objects. Every other Axiora UI package that needs visual values imports from here.

No runtime dependencies. No React. Just typed constants.

Tokens in this package are **primitives** — raw scales with no semantic meaning attached (`colorPrimitive.blue[600]`, not `colors.primary`). Semantic meaning (`primary`, `danger`, `background`, ...) is composed on top of these primitives by `@axiora-ui/ui-themes`.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Tokens Reference](#tokens-reference)
  - [Colors](#colors)
  - [Spacing](#spacing)
  - [Typography](#typography)
  - [Scale (border radius)](#scale-border-radius)
  - [Shadow](#shadow)
  - [Z-Index](#z-index)
  - [Breakpoints](#breakpoints)
  - [Duration & Easing](#duration--easing)
  - [Opacity](#opacity)
- [Design Decisions](#design-decisions)
- [Testing](#testing)
- [Generating API Docs](#generating-api-docs)
- [Build](#build)
- [UI Implementation Status](#ui-implementation-status)

---

## Installation

This package is part of the Axiora UI monorepo and is consumed via the workspace protocol:

```json
"dependencies": {
  "@axiora-ui/ui-tokens": "workspace:*"
}
```

---

## Usage

Every token group is exported from the package root:

```ts
import {
  colorPrimitive,
  spacing,
  typography,
  textStyle,
  scale,
  shadow,
  zIndex,
  breakpoints,
  breakpointsPx,
  duration,
  easing,
  opacity,
} from "@axiora-ui/ui-tokens";

// Apply in inline styles
const style = {
  backgroundColor: colorPrimitive.blue[600],
  padding: `${spacing[2]} ${spacing[4]}`,
  borderRadius: scale.md,
  boxShadow: shadow.sm,
  ...textStyle["body-md"],
};
```

---

## Tokens Reference

### Colors

**File:** [`src/colors/colors.ts`](./src/colors/colors.ts)

`colorPrimitive` is a raw palette of 10 hues, each with 11 shade stops from `50` (lightest) to `950` (darkest):

```ts
import { colorPrimitive } from "@axiora-ui/ui-tokens";

colorPrimitive.blue[600]; // "#2563eb"
colorPrimitive.gray[50]; // "#f9fafb"
```

| Hue      | 50        | 500       | 600       | 950       |
| -------- | --------- | --------- | --------- | --------- |
| `gray`   | `#f9fafb` | `#6b7280` | `#4b5563` | `#0b0f19` |
| `red`    | `#fef2f2` | `#ef4444` | `#dc2626` | `#450a0a` |
| `orange` | `#fff7ed` | `#f97316` | `#ea580c` | `#431407` |
| `yellow` | `#fefce8` | `#eab308` | `#ca8a04` | `#422006` |
| `green`  | `#f0fdf4` | `#22c55e` | `#16a34a` | `#052e16` |
| `teal`   | `#f0fdfa` | `#14b8a6` | `#0d9488` | `#042f2e` |
| `blue`   | `#eff6ff` | `#3b82f6` | `#2563eb` | `#172554` |
| `indigo` | `#eef2ff` | `#6366f1` | `#4f46e5` | `#1e1b4b` |
| `purple` | `#faf5ff` | `#a855f7` | `#9333ea` | `#3b0764` |
| `pink`   | `#fdf2f8` | `#ec4899` | `#db2777` | `#500724` |

Every hue has the full `50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950` stop set — see [`colors.ts`](./src/colors/colors.ts) for every value.

These are primitives, not semantics. Don't reach for `colorPrimitive.blue[600]` in a component to mean "primary action" — that mapping belongs in `@axiora-ui/ui-themes`, so a consuming app can swap its brand colors without touching component code.

---

### Spacing

**File:** [`src/spacing/spacing.ts`](./src/spacing/spacing.ts)

A pixel-based spacing scale on a 4px base unit — each key is a step number, and its value is always `step * 4` px. Use for padding, margin, and gap.

```ts
import { spacing } from "@axiora-ui/ui-tokens";
```

| Token        | Value  | Token         | Value   |
| ------------ | ------ | ------------- | ------- |
| `spacing[0]` | `0px`  | `spacing[10]` | `40px`  |
| `spacing[1]` | `4px`  | `spacing[12]` | `48px`  |
| `spacing[2]` | `8px`  | `spacing[14]` | `56px`  |
| `spacing[3]` | `12px` | `spacing[16]` | `64px`  |
| `spacing[4]` | `16px` | `spacing[20]` | `80px`  |
| `spacing[5]` | `20px` | `spacing[24]` | `96px`  |
| `spacing[6]` | `24px` | `spacing[28]` | `112px` |
| `spacing[7]` | `28px` | `spacing[32]` | `128px` |
| `spacing[8]` | `32px` | `spacing[40]` | `160px` |
| `spacing[9]` | `36px` | `spacing[48]` | `192px` |
|              |        | `spacing[56]` | `224px` |
|              |        | `spacing[64]` | `256px` |

**Examples:**

```ts
// Compact icon button
{
  padding: `${spacing[1]} ${spacing[2]}`;
}

// Default button
{
  padding: `${spacing[2]} ${spacing[4]}`;
}

// Section gap
{
  gap: spacing[6];
}
```

---

### Typography

**File:** [`src/typography/typography.ts`](./src/typography/typography.ts)

Font family, size, weight, line-height, and letter-spacing scales, plus a set of pre-composed `textStyle` presets built from them.

```ts
import { typography, textStyle } from "@axiora-ui/ui-tokens";
```

#### Font Families

| Token                         | Value                                                                |
| ----------------------------- | -------------------------------------------------------------------- |
| `typography.fontFamily.sans`  | `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `typography.fontFamily.serif` | `'Georgia', 'Times New Roman', serif`                                |
| `typography.fontFamily.mono`  | `'JetBrains Mono', 'SFMono-Regular', Consolas, monospace`            |

#### Font Sizes

| Token                      | Value  | Token                        | Value  |
| -------------------------- | ------ | ---------------------------- | ------ |
| `typography.fontSize.xs`   | `12px` | `typography.fontSize["2xl"]` | `24px` |
| `typography.fontSize.sm`   | `14px` | `typography.fontSize["3xl"]` | `30px` |
| `typography.fontSize.base` | `16px` | `typography.fontSize["4xl"]` | `36px` |
| `typography.fontSize.lg`   | `18px` | `typography.fontSize["5xl"]` | `48px` |
| `typography.fontSize.xl`   | `20px` | `typography.fontSize["6xl"]` | `60px` |

#### Font Weights

| Token                            | Value | Common use          |
| -------------------------------- | ----- | ------------------- |
| `typography.fontWeight.regular`  | `400` | Body text           |
| `typography.fontWeight.medium`   | `500` | Labels, button text |
| `typography.fontWeight.semibold` | `600` | Sub-headings        |
| `typography.fontWeight.bold`     | `700` | Headings, emphasis  |

#### Line Height & Letter Spacing

| `lineHeight` | Value  | `letterSpacing` | Value     |
| ------------ | ------ | --------------- | --------- |
| `.tight`     | `1.2`  | `.tight`        | `-0.02em` |
| `.snug`      | `1.35` | `.normal`       | `0em`     |
| `.normal`    | `1.5`  | `.wide`         | `0.02em`  |
| `.relaxed`   | `1.65` | `.wider`        | `0.04em`  |
| `.loose`     | `1.8`  |                 |           |

#### textStyle

Composed presets — the values components should actually consume instead of assembling `fontSize` / `fontWeight` / `lineHeight` / `letterSpacing` by hand:

```ts
const headingCss = textStyle["heading-lg"];
// { fontSize: "30px", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em" }
```

| Preset       | Built from                         |
| ------------ | ---------------------------------- |
| `heading-xl` | `5xl` / bold / tight / tight       |
| `heading-lg` | `3xl` / bold / tight / tight       |
| `heading-md` | `2xl` / semibold / snug / normal   |
| `body-lg`    | `lg` / regular / normal / normal   |
| `body-md`    | `base` / regular / normal / normal |
| `body-sm`    | `sm` / regular / normal / normal   |
| `caption`    | `xs` / medium / snug / wide        |

---

### Scale (border radius)

**File:** [`src/scale/scale.ts`](./src/scale/scale.ts)

```ts
import { scale } from "@axiora-ui/ui-tokens";
```

| Token          | Value    | Use for                  |
| -------------- | -------- | ------------------------ |
| `scale.none`   | `0px`    | Sharp corners            |
| `scale.xs`     | `2px`    | Subtle rounding          |
| `scale.sm`     | `4px`    | Inputs, small chips      |
| `scale.md`     | `8px`    | Buttons, cards (default) |
| `scale.lg`     | `12px`   | Larger cards, modals     |
| `scale.xl`     | `16px`   | Prominent surfaces       |
| `scale["2xl"]` | `24px`   | Hero sections            |
| `scale.full`   | `9999px` | Pills, circular avatars  |

---

### Shadow

**File:** [`src/shadow/shadow.ts`](./src/shadow/shadow.ts)

Box-shadow elevation scale, from `none` to `2xl`, plus an `inner` inset shadow for pressed/recessed surfaces.

```ts
import { shadow } from "@axiora-ui/ui-tokens";
```

| Token           | Value                                                            |
| --------------- | ---------------------------------------------------------------- |
| `shadow.none`   | `none`                                                           |
| `shadow.xs`     | `0 1px 2px rgba(0, 0, 0, 0.05)`                                  |
| `shadow.sm`     | `0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)`    |
| `shadow.md`     | `0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)`   |
| `shadow.lg`     | `0 10px 15px rgba(0, 0, 0, 0.08), 0 4px 6px rgba(0, 0, 0, 0.05)` |
| `shadow.xl`     | `0 20px 25px rgba(0, 0, 0, 0.1), 0 8px 10px rgba(0, 0, 0, 0.04)` |
| `shadow["2xl"]` | `0 25px 50px rgba(0, 0, 0, 0.18)`                                |
| `shadow.inner`  | `inset 0 2px 4px rgba(0, 0, 0, 0.06)`                            |

---

### Z-Index

**File:** [`src/zIndex/zIndex.ts`](./src/zIndex/zIndex.ts)

Stacking-order scale for layered UI. Layers are spaced 100 apart so new layers can be inserted between existing ones without a full renumber.

```ts
import { zIndex } from "@axiora-ui/ui-tokens";
```

| Token             | Value  |
| ----------------- | ------ |
| `zIndex.base`     | `0`    |
| `zIndex.dropdown` | `1000` |
| `zIndex.sticky`   | `1100` |
| `zIndex.fixed`    | `1200` |
| `zIndex.overlay`  | `1300` |
| `zIndex.modal`    | `1400` |
| `zIndex.popover`  | `1500` |
| `zIndex.toast`    | `1600` |
| `zIndex.tooltip`  | `1700` |

---

### Breakpoints

**File:** [`src/breakpoints/breakpoints.ts`](./src/breakpoints/breakpoints.ts)

`breakpoints` gives CSS length strings for media queries; `breakpointsPx` gives the same values as numbers for JS-side `matchMedia` logic.

```ts
import { breakpoints, breakpointsPx } from "@axiora-ui/ui-tokens";

`@media (min-width: ${breakpoints.md})`;
window.matchMedia(`(min-width: ${breakpointsPx.md}px)`);
```

| Token | `breakpoints` | `breakpointsPx` |
| ----- | ------------- | --------------- |
| `xs`  | `480px`       | `480`           |
| `sm`  | `640px`       | `640`           |
| `md`  | `768px`       | `768`           |
| `lg`  | `1024px`      | `1024`          |
| `xl`  | `1280px`      | `1280`          |
| `2xl` | `1536px`      | `1536`          |

---

### Duration & Easing

**File:** [`src/duration/duration.ts`](./src/duration/duration.ts)

```ts
import { duration, easing } from "@axiora-ui/ui-tokens";

{
  transitionDuration: duration.base,
  transitionTimingFunction: easing.easeOut,
}
```

| `duration` | Value   | `easing`     | Value                          |
| ---------- | ------- | ------------ | ------------------------------ |
| `.instant` | `0ms`   | `.linear`    | `linear`                       |
| `.fast`    | `100ms` | `.easeIn`    | `cubic-bezier(0.4, 0, 1, 1)`   |
| `.base`    | `200ms` | `.easeOut`   | `cubic-bezier(0, 0, 0.2, 1)`   |
| `.slow`    | `300ms` | `.easeInOut` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `.slower`  | `500ms` |              |                                |

---

### Opacity

**File:** [`src/opacity/opacity.ts`](./src/opacity/opacity.ts)

Numeric stops (`0`–`100`, matching the percentage) plus two semantic stops: `disabled` and `overlay`.

```ts
import { opacity } from "@axiora-ui/ui-tokens";

{
  opacity: opacity.disabled;
} // 0.5
```

| Token         | Value | Token              | Value |
| ------------- | ----- | ------------------ | ----- |
| `opacity[0]`  | `0`   | `opacity.disabled` | `0.5` |
| `opacity[10]` | `0.1` | `opacity[60]`      | `0.6` |
| `opacity[20]` | `0.2` | `opacity.overlay`  | `0.7` |
| `opacity[40]` | `0.4` | `opacity[80]`      | `0.8` |
|               |       | `opacity[100]`     | `1`   |

---

## Design Decisions

- **Primitives, not semantics** — `colorPrimitive` is a raw hue/shade palette with no meaning attached. Mapping primitives to semantic roles (`primary`, `danger`, `background`, ...) is the responsibility of `@axiora-ui/ui-themes`, so brand colors can change without touching this package or any component.
- **`as const`** — All token objects use `as const` so TypeScript infers literal types. This means you get exact autocomplete and the compiler catches typos in token names.
- **Pixel units** — Spacing and font sizes use `px` rather than `rem`, matching the primitive-scale convention used across colors, radius, and shadow.
- **No CSS variables** — Tokens are TypeScript constants for maximum type safety. `@axiora-ui/ui-themes` is responsible for mapping tokens to CSS variable schemes if needed.

---

## Testing

Every token module has a colocated `*.test.ts` that asserts on its structural invariants (e.g. spacing steps equal `step * 4`, z-index layers are strictly increasing, color shades are all valid hex and distinct):

```bash
pnpm test                                    # from the package directory
pnpm test --filter @axiora-ui/ui-tokens      # from the monorepo root
```

---

## Generating API Docs

API reference docs are generated from the TSDoc comments on each export via [TypeDoc](https://typedoc.org/):

```bash
pnpm build:docs          # one-off build to ./docs
pnpm build:docs:watch    # rebuild on save
```

`docs/` is gitignored — regenerate it locally when you need it.

---

## Build

```bash
# From the package directory
pnpm build

# From the monorepo root
pnpm build --filter @axiora-ui/ui-tokens
```

Output: `dist/index.js` (ESM) and `dist/index.d.ts` (type declarations).

---

## UI Implementation Status

### ✅ 100% Complete - Ready for UI Implementation

This package is **fully implemented** and **production-ready**. All design tokens are:

- ✅ **Defined** in TypeScript with proper types
- ✅ **Exported** from the package root
- ✅ **Tested** with comprehensive Vitest test coverage
- ✅ **Documented** with Storybook stories and Typedoc API docs
- ✅ **Used** by `@axiora-ui/ui-themes` (semantic presets) and `@axiora-ui/ui-core` (typography/spacing in components)
- ✅ **Stable** at version 1.1.0

### Token Categories

| Category    | File                             | Status      | Storybook                    | Tests                    |
| ----------- | -------------------------------- | ----------- | ---------------------------- | ------------------------ |
| Colors      | `src/colors/colors.ts`           | ✅ Complete | ✅ `Colors.stories.tsx`      | ✅ `colors.test.ts`      |
| Spacing     | `src/spacing/spacing.ts`         | ✅ Complete | ✅ `Spacing.stories.tsx`     | ✅ `spacing.test.ts`     |
| Typography  | `src/typography/typography.ts`   | ✅ Complete | ✅ `Typography.stories.tsx`  | ✅ `typography.test.ts`  |
| Scale       | `src/scale/scale.ts`             | ✅ Complete | ✅ Storybook                 | ✅ Storybook             |
| Shadow      | `src/shadow/shadow.ts`           | ✅ Complete | ✅ Storybook                 | ✅ Storybook             |
| Z-Index     | `src/zIndex/zIndex.ts`           | ✅ Complete | ✅ Storybook                 | ✅ Storybook             |
| Breakpoints | `src/breakpoints/breakpoints.ts` | ✅ Complete | ✅ `Breakpoints.stories.tsx` | ✅ `breakpoints.test.ts` |
| Duration    | `src/duration/duration.ts`       | ✅ Complete | ✅ Storybook                 | ✅ Storybook             |
| Opacity     | `src/opacity/opacity.ts`         | ✅ Complete | ✅ Storybook                 | ✅ Storybook             |

### Downstream usage

This package is **complete**. Tokens flow into:

- `@axiora-ui/ui-themes` — semantic color/radius mapping and CSS variable injection
- `@axiora-ui/ui-core` — spacing, typography, and fallback values in `themeVars.ts`

No further token work is required for the current component set.

---
