# @axiora-ui/ui-themes

Theme layer of the Axiora UI design system. Composes raw design tokens from `@axiora-ui/ui-tokens` into complete, named theme objects — one for light mode and one for dark mode. Consumers can pass these theme objects to components or a theme context to drive appearance.

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

| Property            | Value                                  | Notes                              |
| ------------------- | -------------------------------------- | ---------------------------------- |
| `name`              | `"light"`                              | Theme identifier                   |
| `colors.background` | `colors.neutral[50]` (`#f8fafc`)       | Page-level background              |
| `colors.foreground` | `colors.neutral[900]` (`#0f172a`)      | Primary text and icons             |
| `colors.surface`    | `#ffffff`                              | Card, modal, and panel backgrounds |
| `colors.primary`    | `#2563eb`                              | Inherited from tokens              |
| `colors.secondary`  | `#64748b`                              | Inherited from tokens              |
| `colors.success`    | `#16a34a`                              | Inherited from tokens              |
| `colors.danger`     | `#dc2626`                              | Inherited from tokens              |
| `spacing`           | `{ xs, sm, md, lg, xl }`               | Full spacing scale from tokens     |
| `typography`        | `{ fontFamily, fontSize, fontWeight }` | Full typography scale from tokens  |

---

### darkTheme

Theme for dark-mode interfaces. Inverts the background/foreground pair and uses a dark surface.

```ts
import { darkTheme } from "@axiora-ui/ui-themes";
```

| Property            | Value                                  | Notes                              |
| ------------------- | -------------------------------------- | ---------------------------------- |
| `name`              | `"dark"`                               | Theme identifier                   |
| `colors.background` | `colors.neutral[900]` (`#0f172a`)      | Page-level background              |
| `colors.foreground` | `colors.neutral[50]` (`#f8fafc`)       | Primary text and icons             |
| `colors.surface`    | `#1e293b`                              | Card, modal, and panel backgrounds |
| `colors.primary`    | `#2563eb`                              | Same as light — adjust if needed   |
| `colors.secondary`  | `#64748b`                              | Same as light                      |
| `colors.success`    | `#16a34a`                              | Same as light                      |
| `colors.danger`     | `#dc2626`                              | Same as light                      |
| `spacing`           | `{ xs, sm, md, lg, xl }`               | Shared with light theme            |
| `typography`        | `{ fontFamily, fontSize, fontWeight }` | Shared with light theme            |

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

Each theme spreads the full `colors` token object and then overrides three semantic properties that change between light and dark:

```ts
import { colors, spacing, typography } from "@axiora-ui/ui-tokens";

export const lightTheme = {
  name: "light",
  colors: {
    ...colors, // primary, secondary, success, danger, neutral
    background: colors.neutral[50],
    foreground: colors.neutral[900],
    surface: "#ffffff",
  },
  spacing,
  typography,
} as const;
```

`spacing` and `typography` are the same objects in both themes — they are not overridden because spacing and type scales do not change between light and dark mode.

---

## Planned Additions

The following are natural next steps for this package as the design system grows:

- **CSS variable injection** — A helper that writes theme values into CSS custom properties (e.g. `--color-background`) so styled-components or plain CSS can consume them.
- **`systemTheme`** — A theme that follows `prefers-color-scheme` automatically.
- **High-contrast theme** — An accessibility-focused variant for users who prefer higher contrast.
- **Custom theme factory** — A `createTheme(overrides)` function that merges partial overrides onto `lightTheme` or `darkTheme`.

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
