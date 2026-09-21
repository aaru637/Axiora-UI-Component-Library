# @axiora-ui/ui-core

## 📊 Implementation Status

### 🚧 Partially Implemented - UI Implementation in Progress

UI components are being built using a UI-first approach. Current status:

| Component | Status         | Variants                   | Storybook               | Tests             |
| --------- | -------------- | -------------------------- | ----------------------- | ----------------- |
| Button    | ✅ Implemented | primary, secondary, danger | ✅ `Button.stories.tsx` | ❌ Not yet tested |

---

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

Colors are picked directly from the `colorPrimitive` scale in `@axiora-ui/ui-tokens` (see that package's README for the full palette).

| Variant     | Background                             | Text                                   | Use for                     |
| ----------- | -------------------------------------- | -------------------------------------- | --------------------------- |
| `primary`   | `colorPrimitive.blue[600]` (`#2563eb`) | White                                  | Main call-to-action         |
| `secondary` | `colorPrimitive.gray[100]` (`#f3f4f6`) | `colorPrimitive.gray[900]` (`#111827`) | Secondary or cancel actions |
| `danger`    | `colorPrimitive.red[600]` (`#dc2626`)  | White                                  | Destructive actions         |

#### Base Styles

Applied to all variants regardless of which is chosen:

| Property       | Token                          | Value                                                                |
| -------------- | ------------------------------ | -------------------------------------------------------------------- |
| `border`       | —                              | `none`                                                               |
| `borderRadius` | `spacing[2]`                   | `8px`                                                                |
| `cursor`       | —                              | `pointer`                                                            |
| `fontFamily`   | `typography.fontFamily.sans`   | `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `fontSize`     | `typography.fontSize.base`     | `16px`                                                               |
| `fontWeight`   | `typography.fontWeight.medium` | `500`                                                                |
| `padding`      | `spacing[2] spacing[4]`        | `8px 16px`                                                           |

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

## UI Implementation Status

### 🚧 In Progress - UI-First Implementation

This package is being built using a **UI-first approach**. Components are implemented one at a time, starting with the most commonly used UI elements.

### ✅ Implemented Components

| Component  | Status         | Variants/States            | Storybook               | Tests      | Priority |
| ---------- | -------------- | -------------------------- | ----------------------- | ---------- | -------- |
| **Button** | ✅ Implemented | primary, secondary, danger | ✅ `Button.stories.tsx` | ❌ Pending | High     |

### 🚧 Planned Components (UI Implementation Queue)

The following components are planned for implementation. They will follow the same pattern as `Button`:

| Component                  | Description                                     | Priority | Notes                   |
| -------------------------- | ----------------------------------------------- | -------- | ----------------------- |
| **Input**                  | Text input with label, error state, helper text | High     | Essential form element  |
| **Textarea**               | Multi-line text input                           | High     | Essential form element  |
| **Select**                 | Dropdown select with controlled value           | High     | Essential form element  |
| **Checkbox**               | Boolean toggle with label                       | High     | Essential form element  |
| **Radio** / **RadioGroup** | Single-choice selection                         | Medium   | Essential form element  |
| **Switch**                 | Toggle switch (binary state)                    | Medium   | Alternative to checkbox |
| **Badge**                  | Status label with color variants                | Medium   | Feedback/Status         |
| **Tag** / **Chip**         | Dismissable label for filters                   | Medium   | Data display            |
| **Avatar**                 | User avatar with image/initials fallback        | Medium   | User display            |
| **Spinner**                | Loading indicator                               | Medium   | Loading states          |
| **Tooltip**                | Hover tooltip                                   | Low      | Enhancement             |
| **Modal** / **Dialog**     | Accessible modal dialog                         | High     | Critical UI pattern     |
| **Drawer**                 | Side panel                                      | Medium   | Navigation/Content      |
| **Card**                   | Content container with surface styling          | High     | Common container        |
| **Divider**                | Horizontal/vertical rule                        | Low      | Layout                  |
| **Alert**                  | Feedback message with severity                  | Medium   | User feedback           |
| **Toast**                  | Non-blocking notification                       | Medium   | User feedback           |
| **Table**                  | Data table with sort/pagination                 | High     | Data display            |
| **Tabs**                   | Tab navigation panel                            | Medium   | Content organization    |
| **Accordion**              | Collapsible content section                     | Medium   | Content organization    |
| **Breadcrumb**             | Navigation path indicator                       | Low      | Navigation              |
| **Pagination**             | Page navigation controls                        | High     | Data display            |
| **Progress**               | Linear/circular progress indicators             | Medium   | Loading/Progress        |
| **Skeleton**               | Loading placeholder                             | Medium   | Loading states          |

### Implementation Strategy

Each component will be implemented with:

1. **Type-safe props** extending native HTML elements where applicable
2. **Token-based styling** using `@axiora-ui/ui-tokens`
3. **Storybook stories** for documentation and testing
4. **Theme support** for light/dark mode
5. **Accessibility** features (ARIA attributes, keyboard navigation)
6. **Custom style prop** for customization

### Component Architecture Pattern

```typescript
// Example: Input component
interface InputProps extends HTMLInputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({ label, error, helperText, style, ...props }: InputProps) {
  return (
    <div style={{ ...baseStyle, ...style }}>
      {label && <label>{label}</label>}
      <input {...props} style={inputStyle} />
      {error && <span className="error">{error}</span>}
      {helperText && <span className="helper">{helperText}</span>}
    </div>
  );
}
```

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
