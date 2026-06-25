# @axiora-ui/ui-core

React UI components for the Axiora UI design system. Components are styled using design tokens from `@axiora-ui/ui-tokens` so they stay visually consistent with themes and are trivially customizable via the `style` prop.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
  - [Button](#button)
- [Planned Components](#planned-components)
- [Build](#build)

---

## Installation

This package is part of the Axiora UI monorepo and is consumed via the workspace protocol:

```json
"dependencies": {
  "@axiora-ui/ui-core": "workspace:*"
}
```

React 19 is a peer dependency — install it separately in your consuming app.

---

## Usage

```tsx
import { Button } from "@axiora-ui/ui-core";

function App() {
  return (
    <div>
      <Button variant="primary" onClick={() => console.log("clicked")}>
        Save
      </Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="danger">Delete</Button>
    </div>
  );
}
```

---

## Components

### Button

**File:** [`src/Button.tsx`](./src/Button.tsx)

A styled HTML button with three semantic variants. Extends the native `HTMLButtonElement` props, so every standard attribute (`onClick`, `disabled`, `type`, `aria-*`, etc.) works out of the box.

#### Import

```tsx
import { Button } from "@axiora-ui/ui-core";
import type { ButtonProps, ButtonVariant } from "@axiora-ui/ui-core";
```

#### Props

| Prop       | Type                                      | Default     | Description                                                |
| ---------- | ----------------------------------------- | ----------- | ---------------------------------------------------------- |
| `variant`  | `"primary" \| "secondary" \| "danger"`    | `"primary"` | Visual style of the button                                 |
| `style`    | `React.CSSProperties`                     | —           | Additional inline styles (merged on top of variant styles) |
| `children` | `React.ReactNode`                         | —           | Button label content                                       |
| `...rest`  | `ButtonHTMLAttributes<HTMLButtonElement>` | —           | All standard HTML button attributes                        |

#### Variants

| Variant     | Background                        | Text                  | Use for                     |
| ----------- | --------------------------------- | --------------------- | --------------------------- |
| `primary`   | `colors.primary` (`#2563eb`)      | White                 | Main call-to-action         |
| `secondary` | `colors.neutral[100]` (`#f1f5f9`) | `colors.neutral[900]` | Secondary or cancel actions |
| `danger`    | `colors.danger` (`#dc2626`)       | White                 | Destructive actions         |

#### Base Styles

Applied to all variants regardless of which is chosen:

| Property       | Token                          | Value                                  |
| -------------- | ------------------------------ | -------------------------------------- |
| `border`       | —                              | `none`                                 |
| `borderRadius` | `spacing.sm`                   | `0.5rem` (8px)                         |
| `cursor`       | —                              | `pointer`                              |
| `fontFamily`   | `typography.fontFamily.sans`   | `system-ui, -apple-system, sans-serif` |
| `fontSize`     | `typography.fontSize.md`       | `1rem` (16px)                          |
| `fontWeight`   | `typography.fontWeight.medium` | `500`                                  |
| `padding`      | `spacing.sm spacing.md`        | `0.5rem 1rem`                          |

#### Examples

```tsx
// Default primary button
<Button>Submit</Button>

// Secondary / cancel
<Button variant="secondary">Cancel</Button>

// Destructive action
<Button variant="danger" onClick={handleDelete}>
  Delete Account
</Button>

// Disabled state (standard HTML attribute)
<Button variant="primary" disabled>
  Processing...
</Button>

// Custom style override
<Button variant="primary" style={{ width: "100%" }}>
  Full Width
</Button>

// With click handler and aria label
<Button
  variant="primary"
  onClick={() => saveForm()}
  aria-label="Save changes"
>
  Save
</Button>
```

#### `data-variant` attribute

The rendered `<button>` element carries a `data-variant` attribute matching the active variant. This allows CSS selectors and testing queries to target specific button variants without inspecting inline styles:

```css
/* In global CSS */
[data-variant="primary"]:hover {
  opacity: 0.9;
}
```

```ts
// In tests (e.g. Playwright / Testing Library)
screen.getByRole("button", { name: "Save" });
// or
document.querySelector('[data-variant="danger"]');
```

#### Types

```ts
type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}
```

---

## Planned Components

The following components are next in line for this package. Each will follow the same conventions as `Button` — typed props extending the native HTML element, inline token-based styles, and a Storybook story.

| Component              | Description                                         |
| ---------------------- | --------------------------------------------------- |
| `Input`                | Text input with label, error state, and helper text |
| `Textarea`             | Multi-line text input                               |
| `Select`               | Dropdown select with controlled value               |
| `Checkbox`             | Boolean toggle with label                           |
| `Radio` / `RadioGroup` | Single-choice selection                             |
| `Switch`               | Toggle switch (binary state)                        |
| `Badge`                | Status label with color variants                    |
| `Tag` / `Chip`         | Dismissable label for filters and tags              |
| `Avatar`               | User avatar with image and initials fallback        |
| `Spinner`              | Loading indicator                                   |
| `Tooltip`              | Hover tooltip                                       |
| `Modal` / `Dialog`     | Accessible modal dialog                             |
| `Drawer`               | Side panel                                          |
| `Card`                 | Content container with surface styling              |
| `Divider`              | Horizontal or vertical rule                         |
| `Alert`                | Feedback message with severity levels               |
| `Toast`                | Non-blocking notification                           |
| `Table`                | Data table with sort and pagination                 |
| `Tabs`                 | Tab navigation panel                                |
| `Accordion`            | Collapsible content section                         |
| `Breadcrumb`           | Navigation path indicator                           |
| `Pagination`           | Page navigation controls                            |
| `Progress`             | Linear and circular progress indicators             |
| `Skeleton`             | Loading placeholder                                 |

---

## Build

```bash
# From the package directory
pnpm build

# From the monorepo root
pnpm build --filter @axiora-ui/ui-core
```

Output: `dist/index.js` (ESM) and `dist/index.d.ts` (type declarations).

> `react`, `react-dom`, and `@axiora-ui/ui-tokens` are marked as `--external` in the build config and are not bundled into the output.
