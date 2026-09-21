# Axiora UI Component Library

A TypeScript-first monorepo that provides a complete design system for building React applications — from raw design tokens through runtime theming to shadcn-style Radix UI components.

---

## Implementation Status

| Package                | Progress | Status      | Notes                                            |
| ---------------------- | -------- | ----------- | ------------------------------------------------ |
| `@axiora-ui/ui-tokens` | 100%     | ✅ Complete | Design tokens, fully tested                      |
| `@axiora-ui/ui-themes` | 100%     | ✅ Complete | Runtime `ThemeProvider`, CSS vars, brand presets |
| `@axiora-ui/utils`     | 100%     | ✅ Complete | 12 utility modules, 300+ tests                   |
| `@axiora-ui/ui-hooks`  | 100%     | ✅ Complete | 12 hooks with stories and tests (Phases 4 + 6)   |
| `@axiora-ui/ui-core`   | 100%     | ✅ Complete | 36 components, Storybook stories, Radix-based    |

**Stack:** React 19 · Radix UI · CSS custom properties · Storybook 10 · Vitest · Turborepo · pnpm

---

## Table of Contents

- [Overview](#overview)
- [Packages](#packages)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Scripts](#scripts)
- [Storybook](#storybook)
- [Publishing to npm](#publishing-to-npm)
- [Contributing](#contributing)

---

## Overview

Axiora UI is built in clear layers. Each package owns one concern; higher-level packages depend on lower-level ones — never the reverse.

```
@axiora-ui/ui-tokens  →  @axiora-ui/ui-themes  →  @axiora-ui/ui-core
@axiora-ui/ui-hooks   (standalone React hooks)
@axiora-ui/utils      (standalone utilities)
```

Consumers configure a theme once via `ThemeProvider`; components pick up colors through CSS variables automatically.

---

## Packages

| Package                            | Description                                                           |
| ---------------------------------- | --------------------------------------------------------------------- |
| [ui-tokens](./packages/ui-tokens/) | Raw design tokens: colors, spacing, typography, shadows, breakpoints  |
| [ui-themes](./packages/ui-themes/) | `ThemeProvider`, theme merging/validation, light/dark + brand presets |
| [ui-core](./packages/ui-core/)     | React components (forms, overlays, layout, navigation) + `styles.css` |
| [ui-hooks](./packages/ui-hooks/)   | Reusable React hooks (useToggle, useDebounce, useFetch, …)            |
| [utils](./packages/utils/)         | Pure TypeScript utilities (string, array, object, date, URL, …)       |

See each package README for API details and usage examples.

---

## Quick Start

### Prerequisites

- Node.js `>=18`
- pnpm `>=10.6.2`

### Install & run Storybook

```bash
pnpm install
pnpm storybook
# → http://localhost:6006
```

### Use in an app

```tsx
import "@axiora-ui/ui-core/styles.css";
import { ThemeProvider } from "@axiora-ui/ui-themes";
import { Button, Input, Select, Toaster, toast } from "@axiora-ui/ui-core";

function App() {
  return (
    <ThemeProvider theme={{ mode: "dark" }}>
      <Button onClick={() => toast({ title: "Saved" })}>Save</Button>
      <Input label="Email" placeholder="you@example.com" />
      <Select
        label="Country"
        placeholder="Select…"
        options={[
          { value: "us", label: "United States" },
          { value: "in", label: "India" },
        ]}
      />
      <Toaster />
    </ThemeProvider>
  );
}
```

---

## Architecture

```
axiora-ui-component-library/
├── packages/
│   ├── ui-tokens/          Layer 0 — primitive tokens
│   ├── ui-themes/          Layer 1 — ThemeProvider, mergeTheme, CSS vars
│   ├── ui-core/            Layer 2 — React + Radix components, components.css
│   ├── ui-hooks/           React hooks
│   └── utils/              Pure utilities
├── .storybook/             Global ThemeProvider decorator, axTheme toolbar
├── turbo.json
└── pnpm-workspace.yaml
```

### Build outputs

Each package builds to `dist/` with `tsup`:

- `dist/index.js` — ESM
- `dist/index.d.ts` — TypeScript declarations

`@axiora-ui/ui-core` also ships `dist/styles/components.css` via the `@axiora-ui/ui-core/styles.css` export.

---

## Scripts

| Command                | Description                             |
| ---------------------- | --------------------------------------- |
| `pnpm build`           | Build all packages (dependency order)   |
| `pnpm lint`            | ESLint + TypeScript across the monorepo |
| `pnpm test`            | Vitest for all packages                 |
| `pnpm storybook`       | Dev server on port 6006                 |
| `pnpm build-storybook` | Static Storybook build                  |
| `pnpm format`          | Prettier                                |
| `pnpm publish:dry-run` | Preview npm publish tarballs            |
| `pnpm publish:all`     | Build and publish all public packages   |

---

## Storybook

Storybook is the primary component explorer:

- **Tokens** — color, spacing, typography scales
- **Themes** — `ThemeProvider` demos (light, dark, violet, emerald)
- **Hooks** — 12 hooks including `useToggle`, `useDebounce`, `useFetch`, `useAsync`, `useForm`, `useIntersectionObserver`, and more
- **Core** — all 36 ui-core components + `Core/Feedback` showcase (Toast, Alert, Spinner, …)

Use the **Theme** toolbar (`axTheme`) to switch between Default, Dark, Violet Brand, Emerald Brand, Violet Dark, and Emerald Dark presets.

---

## Publishing to npm

All packages are scoped `@axiora-ui/` and publish as **public**.

```bash
pnpm lint && pnpm test
pnpm publish:dry-run    # preview
pnpm publish:all        # build + publish
```

**Publish order** (handled automatically by Turborepo):

1. `@axiora-ui/ui-tokens`
2. `@axiora-ui/utils`
3. `@axiora-ui/ui-themes`
4. `@axiora-ui/ui-core`
5. `@axiora-ui/ui-hooks`

---

## Contributing

1. Clone and run `pnpm install`
2. Create a feature branch
3. Add or update source under `packages/<name>/src/`
4. Add Storybook stories (`.stories.tsx`) for UI changes
5. Add or update tests where behavior matters
6. Run `pnpm lint && pnpm test` before committing
7. Open a pull request

Commit hooks run lint-staged (ESLint + Prettier) on staged files.
