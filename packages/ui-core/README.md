# @axiora-ui/ui-core

<!-- AI-ASSISTED: Cursor
     PROMPT: Update ui-core README with all implemented components and theming setup
     ACCEPTED-BY: dhinesh -->

React UI components for the Axiora design system — shadcn-inspired, built on **Radix UI**, styled with **CSS custom properties** from `@axiora-ui/ui-themes`.

**Status:** ✅ **33 components implemented** · Storybook stories for all · Theme-aware light/dark + brand presets

---

## Table of Contents

- [Installation](#installation)
- [Setup (required)](#setup-required)
- [Component inventory](#component-inventory)
- [Usage examples](#usage-examples)
- [Theming](#theming)
- [Storybook](#storybook)
- [Not yet implemented](#not-yet-implemented)
- [Build](#build)

---

## Installation

```json
"dependencies": {
  "@axiora-ui/ui-core": "workspace:*",
  "@axiora-ui/ui-themes": "workspace:*"
}
```

**Peer dependencies:** `react` and `react-dom` ^19.0.0

---

## Setup (required)

1. Import the stylesheet **once** in your app entry:

```tsx
import "@axiora-ui/ui-core/styles.css";
```

2. Wrap your app with `ThemeProvider`:

```tsx
import { ThemeProvider } from "@axiora-ui/ui-themes";

<ThemeProvider theme={{ mode: "light" }}>
  <App />
</ThemeProvider>;
```

Without both steps, components render but won't follow your theme (labels, surfaces, primary colors, etc.).

---

## Component inventory

| Category       | Components                                                                                                                                           | Storybook |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| **Form**       | `Button`, `Label`, `Input`, `Textarea`, `Select` (+ compound API), `NativeSelect`, `Checkbox`, `RadioGroup` / `Radio`, `Switch`, `Slider`, `Toggle`  | ✅ All    |
| **Overlay**    | `Dialog`, `AlertDialog`, `Popover`, `Tooltip`, `HoverCard`, `ContextMenu`                                                                            | ✅ All    |
| **Layout**     | `Card`, `Badge`, `Alert`, `Separator`, `Avatar`, `Skeleton`, `Progress`, `Spinner`, `AspectRatio`, `Table`, `Pagination`, `Breadcrumb`, `ScrollArea` | ✅ All    |
| **Navigation** | `Tabs`, `Accordion`, `Collapsible`                                                                                                                   | ✅ All    |

### Highlights

- **Select** — Radix dropdown with groups, checkmarks, error auto-clear on valid selection
- **Switch** — Button-like track (secondary off, primary on) for settings toggles
- **Toggle** — Formatting chip (subtle border; primary tint when pressed) for toolbar actions
- **AlertDialog** — Native alert-dialog primitives; Cancel (secondary) + Action (primary/danger)
- **Form fields** — Shared label, helper text, and error styling via `.ax-label`, `.ax-input`, etc.

---

## Usage examples

### Form

```tsx
import { Button, Input, Checkbox, Select } from "@axiora-ui/ui-core";

<Input label="Email" placeholder="you@example.com" required />
<Checkbox label="Accept terms" helperText="Required to continue" />
<Select
  label="Country"
  placeholder="Select a country"
  options={[
    { value: "us", label: "United States" },
    { value: "in", label: "India" },
  ]}
/>
<Button variant="primary">Submit</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="danger">Delete</Button>
```

### Dialog & AlertDialog

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@axiora-ui/ui-core";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@axiora-ui/ui-core";

// Standard dialog
<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>Make changes here.</DialogDescription>
    </DialogHeader>
    <DialogFooter><Button>Save</Button></DialogFooter>
  </DialogContent>
</Dialog>

// Destructive confirmation
<AlertDialog>
  <AlertDialogTrigger asChild><Button variant="danger">Delete</Button></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction variant="danger">Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Button variants

| Variant     | Use for             |
| ----------- | ------------------- |
| `primary`   | Main call-to-action |
| `secondary` | Secondary / cancel  |
| `danger`    | Destructive actions |

Colors come from `--color-primary`, `--color-surface`, `--color-danger`, etc. — not hard-coded hex in components.

---

## Theming

Components read CSS variables set by `@axiora-ui/ui-themes` `ThemeProvider`:

| Variable             | Used for                              |
| -------------------- | ------------------------------------- |
| `--color-primary`    | Buttons, switch on-state, focus rings |
| `--color-foreground` | Text, labels                          |
| `--color-background` | Page / container background           |
| `--color-surface`    | Inputs, cards, secondary buttons      |
| `--color-border`     | Borders, dividers                     |
| `--radius-base`      | Border radius                         |
| `--font-family-base` | Typography                            |

Override brand colors:

```tsx
<ThemeProvider
  theme={{
    name: "brand",
    colors: { primary: "#7c3aed", primaryHover: "#6d28d9" },
  }}
>
  <App />
</ThemeProvider>
```

Dark mode:

```tsx
<ThemeProvider theme={{ mode: "dark" }}>
  <App />
</ThemeProvider>
```

---

## Storybook

From the monorepo root:

```bash
pnpm storybook
```

Browse **Core/** for all component stories. Use the **Theme** toolbar to preview light, dark, and brand presets.

---

## Not yet implemented

| Component      | Notes                                              |
| -------------- | -------------------------------------------------- |
| `Toast`        | Non-blocking notifications                         |
| `Drawer`       | Side panel                                         |
| `Tag` / `Chip` | Dismissable filter labels                          |
| `DropdownMenu` | Removed from scope (use `ContextMenu` or `Select`) |

Unit tests for individual components are planned; theming and validation are covered in `@axiora-ui/ui-themes`.

---

## Build

```bash
pnpm build --filter @axiora-ui/ui-core
```

Output:

- `dist/index.js` + `dist/index.d.ts`
- `dist/styles/components.css` (import as `@axiora-ui/ui-core/styles.css`)

Radix packages, React, and `@axiora-ui/ui-tokens` are externalized — not bundled into the output.
