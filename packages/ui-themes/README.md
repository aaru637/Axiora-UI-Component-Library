# @axiora-ui/ui-themes

Theme layer of the Axiora UI design system. Composes raw primitive tokens from `@axiora-ui/ui-tokens` into complete, named theme objects — one for light mode and one for dark mode. Consumers can pass these theme objects to components or a theme context to drive appearance.

This is also where **semantic meaning** gets attached to colors: `@axiora-ui/ui-tokens` only exports a raw hue/shade palette (`colorPrimitive`), so this package picks specific shades (`colorPrimitive.blue[600]`, `colorPrimitive.gray[500]`, ...) and gives them semantic names (`primary`, `secondary`, `neutral`, ...).

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Themes Reference](#themes-reference)
  - [lightTheme](#lighttheme)
  - [darkTheme](#darktheme)
  - [Theme Type](#theme-type)
- [How It Works](#how-it-works)
- [Planned Additions](#planned-additions)
- [Build](#build)

---

## Installation

This package is part of the Axiora UI monorepo and is consumed via the workspace protocol:

```json
"dependencies": {
  "@axiora-ui/ui-themes": "workspace:*"
}
```

`@axiora-ui/ui-tokens` is a peer dependency — it is listed as a direct dependency in `package.json` so it is always present.

---

## Usage

Import the theme you need and apply it directly or via a context provider:

```tsx
import { lightTheme, darkTheme } from "@axiora-ui/ui-themes";
import type { Theme } from "@axiora-ui/ui-themes";

// Direct usage
const pageStyle = {
  backgroundColor: lightTheme.colors.background,
  color: lightTheme.colors.foreground,
  fontFamily: lightTheme.typography.fontFamily.sans,
};
```

With a simple React context:

```tsx
import { createContext, useContext } from "react";
import { lightTheme } from "@axiora-ui/ui-themes";
import type { Theme } from "@axiora-ui/ui-themes";

const ThemeContext = createContext<Theme>(lightTheme);

export function ThemeProvider({
  theme,
  children,
}: {
  theme: Theme;
  children: React.ReactNode;
}) {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

Then in your app:

```tsx
import { darkTheme } from "@axiora-ui/ui-themes";

<ThemeProvider theme={darkTheme}>
  <App />
</ThemeProvider>;
```

> This `ThemeProvider` is a minimal example to wire up yourself — it isn't exported from this package yet. See [Planned Additions](#planned-additions).

---

## Themes Reference

**File:** [`src/index.ts`](./src/index.ts)

Both themes share the same shape. The difference is in the semantic color overrides: `background`, `foreground`, and `surface`.

---

### lightTheme

Default theme for light-mode interfaces.

```ts
import { lightTheme } from "@axiora-ui/ui-themes";
```

| Property             | Value                                                | Notes                               |
| -------------------- | ----------------------------------------------------- | ------------------------------------ |
| `name`               | `"light"`                                             | Theme identifier                     |
| `colors.background`  | `colorPrimitive.gray[50]` (`#f9fafb`)                 | Page-level background                |
| `colors.foreground`  | `colorPrimitive.gray[900]` (`#111827`)                | Primary text and icons               |
| `colors.surface`     | `#ffffff`                                             | Card, modal, and panel backgrounds   |
| `colors.primary`     | `colorPrimitive.blue[600]` (`#2563eb`)                | Primary actions, links, focus rings  |
| `colors.secondary`   | `colorPrimitive.gray[500]` (`#6b7280`)                | Secondary actions, muted text        |
| `colors.success`     | `colorPrimitive.green[600]` (`#16a34a`)               | Confirmation, positive states        |
| `colors.danger`      | `colorPrimitive.red[600]` (`#dc2626`)                 | Errors, destructive actions          |
| `colors.neutral[50]`  | `colorPrimitive.gray[50]` (`#f9fafb`)                 | Surface backgrounds, disabled states |
| `colors.neutral[100]` | `colorPrimitive.gray[100]` (`#f3f4f6`)                | Surface backgrounds, disabled states |
| `colors.neutral[900]` | `colorPrimitive.gray[900]` (`#111827`)                | Primary text                         |
| `spacing`            | Full `spacing` scale from `@axiora-ui/ui-tokens`      | 4px-based, steps `0`–`64`             |
| `typography`         | Full `typography` scale from `@axiora-ui/ui-tokens`   | `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing` |

---

### darkTheme

Theme for dark-mode interfaces. Inverts the background/foreground pair and uses a dark surface.

```ts
import { darkTheme } from "@axiora-ui/ui-themes";
```

| Property             | Value                                                | Notes                               |
| -------------------- | ----------------------------------------------------- | ------------------------------------ |
| `name`               | `"dark"`                                              | Theme identifier                     |
| `colors.background`  | `colorPrimitive.gray[900]` (`#111827`)                | Page-level background                |
| `colors.foreground`  | `colorPrimitive.gray[50]` (`#f9fafb`)                  | Primary text and icons               |
| `colors.surface`     | `#1e293b`                                             | Card, modal, and panel backgrounds   |
| `colors.primary`     | `colorPrimitive.blue[600]` (`#2563eb`)                | Same as light — adjust if needed     |
| `colors.secondary`   | `colorPrimitive.gray[500]` (`#6b7280`)                | Same as light                        |
| `colors.success`     | `colorPrimitive.green[600]` (`#16a34a`)               | Same as light                        |
| `colors.danger`      | `colorPrimitive.red[600]` (`#dc2626`)                 | Same as light                        |
| `spacing`            | Shared with light theme                              |                                       |
| `typography`         | Shared with light theme                              |                                       |

---

### Theme Type

The `Theme` type is the union of `lightTheme` and `darkTheme`. Use it to type any function or component that accepts a theme:

```ts
import type { Theme } from "@axiora-ui/ui-themes";

function applyTheme(theme: Theme) {
  document.body.style.backgroundColor = theme.colors.background;
  document.body.style.color = theme.colors.foreground;
}
```

Because both theme objects use `as const`, the type system knows the exact literal values of each property. This gives full autocomplete and makes accidental misspelling a compile error.

---

## How It Works

A local `semanticColors` object picks specific shades out of `colorPrimitive` and gives them semantic names. Each theme then spreads that object and overrides the three properties that differ between light and dark:

```ts
import { colorPrimitive, spacing, typography } from "@axiora-ui/ui-tokens";

const semanticColors = {
  primary: colorPrimitive.blue[600],
  secondary: colorPrimitive.gray[500],
  success: colorPrimitive.green[600],
  danger: colorPrimitive.red[600],
  neutral: {
    50: colorPrimitive.gray[50],
    100: colorPrimitive.gray[100],
    900: colorPrimitive.gray[900],
  },
} as const;

export const lightTheme = {
  name: "light",
  colors: {
    ...semanticColors,
    background: semanticColors.neutral[50],
    foreground: semanticColors.neutral[900],
    surface: "#ffffff",
  },
  spacing,
  typography,
} as const;
```

`spacing` and `typography` are the same objects in both themes — they are not overridden because spacing and type scales do not change between light and dark mode.

Changing a brand color means changing which `colorPrimitive` shade `semanticColors` points to — components never reference `colorPrimitive` directly, only `theme.colors.*`.

---

## Planned Additions

The following are natural next steps for this package as the design system grows:

- **`ThemeProvider` / `useTheme`** — Ship the context provider shown in [Usage](#usage) from this package instead of asking consumers to hand-roll it.
- **`createTheme(overrides)`** — A factory that deep-merges partial overrides (e.g. a consuming app's brand colors) onto `lightTheme` or `darkTheme`.
- **CSS variable injection** — A helper that writes theme values into CSS custom properties (e.g. `--color-primary`) so plain CSS or CSS-in-JS can consume them, and so brand colors can be swapped at runtime without a rebuild.
- **`systemTheme`** — A theme that follows `prefers-color-scheme` automatically.
- **High-contrast theme** — An accessibility-focused variant for users who prefer higher contrast.

---

## Build

```bash
# From the package directory
pnpm build

# From the monorepo root
pnpm build --filter @axiora-ui/ui-themes
```

Output: `dist/index.js` (ESM) and `dist/index.d.ts` (type declarations).

> `@axiora-ui/ui-tokens` is marked as `--external` in the build config, so it is not bundled into the output.
