# @axiora-ui/ui-hooks

## 📊 Implementation Status

### ✅ Partially Implemented - UI Hooks Ready

Reusable React hooks for common UI interaction patterns. Current status:

| Hook      | Status         | Description                                | Storybook                  | Tests     |
| --------- | -------------- | ------------------------------------------ | -------------------------- | --------- |
| useToggle | ✅ Implemented | Boolean state with toggle/on/off callbacks | ✅ `UseToggle.stories.tsx` | ✅ Tested |

---

Reusable React hooks for common UI interaction patterns. Every hook in this package is standalone — no cross-hook dependencies, no internal state shared between hooks. Just drop the ones you need into any React 19 application.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Hooks Reference](#hooks-reference)
  - [useToggle](#usetoggle)
- [Planned Hooks](#planned-hooks)
- [Build](#build)

---

## Installation

This package is part of the Axiora UI monorepo and is consumed via the workspace protocol:

```json
"dependencies": {
  "@axiora-ui/ui-hooks": "workspace:*"
}
```

React 19 is a peer dependency. Install it in your consuming app:

```bash
pnpm add react react-dom
```

---

## Usage

```tsx
import { useToggle } from "@axiora-ui/ui-hooks";

function PasswordField() {
  const { value: isVisible, toggle } = useToggle(false);

  return (
    <div>
      <input type={isVisible ? "text" : "password"} />
      <button onClick={toggle}>{isVisible ? "Hide" : "Show"}</button>
    </div>
  );
}
```

---

## Hooks Reference

### useToggle

**File:** [`src/useToggle.ts`](./src/useToggle.ts)

Manages a boolean state with stable setter callbacks. All returned functions are wrapped in `useCallback` so they never cause unnecessary re-renders in child components that receive them as props.

#### Import

```ts
import { useToggle } from "@axiora-ui/ui-hooks";
```

#### Signature

```ts
function useToggle(initial?: boolean): {
  value: boolean;
  toggle: () => void;
  setOn: () => void;
  setOff: () => void;
};
```

#### Parameters

| Parameter | Type      | Default | Description                         |
| --------- | --------- | ------- | ----------------------------------- |
| `initial` | `boolean` | `false` | Starting value for the toggle state |

#### Return Value

| Property | Type         | Description                                        |
| -------- | ------------ | -------------------------------------------------- |
| `value`  | `boolean`    | Current boolean state                              |
| `toggle` | `() => void` | Flips `value` from `true` to `false` or vice versa |
| `setOn`  | `() => void` | Sets `value` to `true` unconditionally             |
| `setOff` | `() => void` | Sets `value` to `false` unconditionally            |

#### Examples

**Basic toggle (defaults to `false`):**

```tsx
const { value: isOpen, toggle } = useToggle();

return <button onClick={toggle}>{isOpen ? "Close" : "Open"} Menu</button>;
```

**Start in the `true` state:**

```tsx
const { value: isEnabled, toggle } = useToggle(true);
```

**Modal / dialog open state:**

```tsx
const {
  value: isModalOpen,
  setOn: openModal,
  setOff: closeModal,
} = useToggle();

return (
  <>
    <button onClick={openModal}>Open Dialog</button>
    {isModalOpen && (
      <Dialog onClose={closeModal}>
        <p>Dialog content</p>
        <button onClick={closeModal}>Close</button>
      </Dialog>
    )}
  </>
);
```

**Password visibility toggle:**

```tsx
const { value: isVisible, toggle } = useToggle(false);

return (
  <label>
    Password
    <input type={isVisible ? "text" : "password"} name="password" />
    <button type="button" onClick={toggle}>
      {isVisible ? "Hide" : "Show"}
    </button>
  </label>
);
```

**Accordion / expand-collapse:**

```tsx
const { value: isExpanded, toggle } = useToggle(false);

return (
  <section>
    <button onClick={toggle} aria-expanded={isExpanded}>
      Section Title
    </button>
    {isExpanded && <div>Section content...</div>}
  </section>
);
```

**Sidebar visibility:**

```tsx
const {
  value: isSidebarOpen,
  setOn: showSidebar,
  setOff: hideSidebar,
} = useToggle(true);

return (
  <div style={{ display: "flex" }}>
    {isSidebarOpen && <Sidebar onClose={hideSidebar} />}
    <main>
      <button onClick={showSidebar}>Show Sidebar</button>
    </main>
  </div>
);
```

#### Implementation Notes

- `toggle` uses the functional form of `setState` (`(current) => !current`), so it is safe to call multiple times in the same render cycle.
- `setOn` and `setOff` are stable across renders. Pass them as props to memoized child components without needing `useCallback` at the call site.
- The hook returns `as const`, ensuring TypeScript infers the narrowest type for each property.

---

## Roadmap

### ✅ Implemented

| Hook        | Description                                                       | Storybook | Tests |
| ----------- | ----------------------------------------------------------------- | --------- | ----- |
| `useToggle` | Boolean state with stable `toggle` / `setOn` / `setOff` callbacks | ✅        | ✅    |

### 🚧 Planned

The following hooks are planned for implementation. They will follow the same pattern as `useToggle`:

| Hook                        | Description                                  | Priority | Use Case                          |
| --------------------------- | -------------------------------------------- | -------- | --------------------------------- |
| **useLocalStorage**         | Sync state to localStorage                   | High     | Persistent UI state               |
| **useSessionStorage**       | Sync state to sessionStorage                 | Medium   | Session-based UI state            |
| **useDebounce**             | Debounce a value by delay                    | High     | Search inputs, filters            |
| **useThrottle**             | Throttle rapidly changing value              | Medium   | Scroll handlers, resize           |
| **usePrevious**             | Hold previous render's value                 | Medium   | Show "changed from" indicators    |
| **useMediaQuery**           | React to CSS media query match               | High     | Responsive UI states              |
| **useClickOutside**         | Detect clicks outside ref-ed element         | High     | Modals, dropdowns, tooltips       |
| **useKeyPress**             | Listen for specific keyboard key             | Medium   | Keyboard shortcuts                |
| **useFocus**                | Track focus state of element                 | Medium   | Form validation, accessibility    |
| **useHover**                | Track hover state of element                 | Low      | Enhanced hover effects            |
| **useWindowSize**           | Read window dimensions reactively            | Medium   | Responsive layouts                |
| **useScrollPosition**       | Track page/element scroll position           | Medium   | Scroll indicators, sticky headers |
| **useIntersectionObserver** | Detect element viewport entry/exit           | High     | Lazy loading, animations          |
| **useResizeObserver**       | Observe element dimension changes            | Medium   | Dynamic layouts                   |
| **useFetch**                | Minimal data fetching with loading/error     | High     | API calls, data loading           |
| **useAsync**                | Execute async function with loading/error    | High     | Complex async operations          |
| **useCounter**              | Numeric counter with inc/dec/reset           | Medium   | Counters, badges                  |
| **useList**                 | Array state with add/remove/update           | High     | Dynamic lists, collections        |
| **useMap**                  | Map state with set/delete/clear              | Medium   | Key-value collections             |
| **useSet**                  | Set state with add/delete/toggle/clear       | Medium   | Unique collections                |
| **useForm**                 | Controlled form state with validation        | High     | Form management                   |
| **useCopyToClipboard**      | Copy text with success status                | Medium   | Copy to clipboard feature         |
| **useEventListener**        | Attach/cleanup DOM event listeners           | High     | Custom event handling             |
| **useTimeout**              | Schedule callback with cleanup               | Medium   | Delayed actions                   |
| **useInterval**             | Run callback on fixed interval               | Medium   | Timers, animations                |
| **useIsomorphicEffect**     | useLayoutEffect in browser, useEffect in SSR | High     | SSR-safe effects                  |

---

## Build

```bash
# From the package directory
pnpm build

# From the monorepo root
pnpm build --filter @axiora-ui/ui-hooks
```

Output: `dist/index.js` (ESM) and `dist/index.d.ts` (type declarations).

> `react` is marked as `--external` in the build config and is not bundled into the output.
