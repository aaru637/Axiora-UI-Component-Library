# @axiora-ui/ui-tokens

The foundation layer of the Axiora UI design system. This package exports raw design token constants — colors, spacing, and typography — as plain TypeScript objects. Every other Axiora UI package that needs visual values imports from here.

No runtime dependencies. No React. Just typed constants.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Tokens Reference](#tokens-reference)
  - [Colors](#colors)
  - [Spacing](#spacing)
  - [Typography](#typography)
- [Design Decisions](#design-decisions)
- [Build](#build)

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

Import individual token groups or use them together:

```ts
import { colors, spacing, typography } from "@axiora-ui/ui-tokens";

// Apply in inline styles
const style = {
  backgroundColor: colors.primary,
  padding: `${spacing.sm} ${spacing.md}`,
  fontFamily: typography.fontFamily.sans,
  fontSize: typography.fontSize.md,
};
```

All three token groups are also re-exported from the package root, so a single import covers everything:

```ts
import { colors, spacing, typography } from "@axiora-ui/ui-tokens";
```

---

## Tokens Reference

### Colors

**File:** [`src/colors.ts`](./src/colors.ts)

Defines the semantic and neutral color palette used throughout the design system.

```ts
import { colors } from "@axiora-ui/ui-tokens";
```

| Token                 | Value     | Usage                                |
| --------------------- | --------- | ------------------------------------ |
| `colors.primary`      | `#2563eb` | Primary actions, links, focus rings  |
| `colors.secondary`    | `#64748b` | Secondary actions, muted text        |
| `colors.success`      | `#16a34a` | Confirmation, positive states        |
| `colors.danger`       | `#dc2626` | Errors, destructive actions          |
| `colors.neutral[50]`  | `#f8fafc` | Page background (light)              |
| `colors.neutral[100]` | `#f1f5f9` | Surface backgrounds, disabled states |
| `colors.neutral[900]` | `#0f172a` | Primary text, page background (dark) |

**Examples:**

```ts
// Button background
{
  backgroundColor: colors.primary;
}

// Error message text
{
  color: colors.danger;
}

// Light surface card
{
  backgroundColor: colors.neutral[100];
}
```

---

### Spacing

**File:** [`src/spacing.ts`](./src/spacing.ts)

A 5-step spacing scale in `rem` units. Use these to keep padding, margin, and gap values consistent across components.

```ts
import { spacing } from "@axiora-ui/ui-tokens";
```

| Token        | Value     | Pixels (at 16px base) |
| ------------ | --------- | --------------------- |
| `spacing.xs` | `0.25rem` | 4px                   |
| `spacing.sm` | `0.5rem`  | 8px                   |
| `spacing.md` | `1rem`    | 16px                  |
| `spacing.lg` | `1.5rem`  | 24px                  |
| `spacing.xl` | `2rem`    | 32px                  |

**Examples:**

```ts
// Compact icon button
{
  padding: `${spacing.xs} ${spacing.sm}`;
}

// Default button
{
  padding: `${spacing.sm} ${spacing.md}`;
}

// Section gap
{
  gap: spacing.lg;
}

// Page section padding
{
  padding: spacing.xl;
}
```

---

### Typography

**File:** [`src/typography.ts`](./src/typography.ts)

Font family, size, and weight scales. All sizes are in `rem`.

```ts
import { typography } from "@axiora-ui/ui-tokens";
```

#### Font Families

| Token                        | Value                                  |
| ---------------------------- | -------------------------------------- |
| `typography.fontFamily.sans` | `system-ui, -apple-system, sans-serif` |
| `typography.fontFamily.mono` | `ui-monospace, monospace`              |

Use `sans` for all UI text and `mono` for code blocks, keyboard shortcuts, and monospaced data.

#### Font Sizes

| Token                    | Value      | Pixels (at 16px base) |
| ------------------------ | ---------- | --------------------- |
| `typography.fontSize.sm` | `0.875rem` | 14px                  |
| `typography.fontSize.md` | `1rem`     | 16px                  |
| `typography.fontSize.lg` | `1.25rem`  | 20px                  |
| `typography.fontSize.xl` | `1.5rem`   | 24px                  |

#### Font Weights

| Token                           | Value | Common use          |
| ------------------------------- | ----- | ------------------- |
| `typography.fontWeight.regular` | `400` | Body text           |
| `typography.fontWeight.medium`  | `500` | Labels, button text |
| `typography.fontWeight.bold`    | `700` | Headings, emphasis  |

**Examples:**

```ts
// Body text
{
  fontFamily: typography.fontFamily.sans,
  fontSize: typography.fontSize.md,
  fontWeight: typography.fontWeight.regular,
}

// Button label
{
  fontFamily: typography.fontFamily.sans,
  fontSize: typography.fontSize.md,
  fontWeight: typography.fontWeight.medium,
}

// Heading
{
  fontFamily: typography.fontFamily.sans,
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.bold,
}

// Code snippet
{
  fontFamily: typography.fontFamily.mono,
  fontSize: typography.fontSize.sm,
}
```

---

## Design Decisions

- **`as const`** — All token objects use `as const` so TypeScript infers literal types. This means you get exact autocomplete (e.g. `"#2563eb"` not `string`) and the compiler catches typos in token names.
- **Rem units for spacing and font sizes** — Respects the user's browser font size preference and makes responsive scaling straightforward.
- **No CSS variables** — Tokens are TypeScript constants for maximum type safety. The `@axiora-ui/ui-themes` package is responsible for mapping tokens to CSS variable schemes if needed.
- **Flat color palette** — The neutral scale uses only three stops (`50`, `100`, `900`) to keep the initial token surface small. More stops can be added as the design system grows.

---

## Build

```bash
# From the package directory
pnpm build

# From the monorepo root
pnpm build --filter @axiora-ui/ui-tokens
```

Output: `dist/index.js` (ESM) and `dist/index.d.ts` (type declarations).
