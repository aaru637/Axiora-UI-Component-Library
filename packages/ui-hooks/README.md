# @axiora-ui/ui-hooks

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

## Planned Hooks

The following hooks are next in line for this package.

| Hook                      | Description                                          |
| ------------------------- | ---------------------------------------------------- |
| `useLocalStorage<T>`      | Sync state to `localStorage` with JSON serialization |
| `useSessionStorage<T>`    | Sync state to `sessionStorage`                       |
| `useDebounce<T>`          | Debounce a value by a configurable delay             |
| `useThrottle<T>`          | Throttle a rapidly changing value                    |
| `usePrevious<T>`          | Hold the previous render's value                     |
| `useMediaQuery`           | React to a CSS media query match                     |
| `useClickOutside`         | Detect clicks outside a ref-ed element               |
| `useKeyPress`             | Listen for a specific keyboard key                   |
| `useFocus`                | Track focus state of an element                      |
| `useHover`                | Track hover state of an element                      |
| `useWindowSize`           | Read `window.innerWidth` / `innerHeight` reactively  |
| `useScrollPosition`       | Track page or element scroll position                |
| `useIntersectionObserver` | Detect when an element enters or leaves the viewport |
| `useResizeObserver`       | Observe element dimension changes                    |
| `useFetch<T>`             | Minimal data fetching with loading/error state       |
| `useAsync<T>`             | Execute an async function with loading/error state   |
| `useCounter`              | Numeric counter with increment, decrement, reset     |
| `useList<T>`              | Array state with add, remove, update helpers         |
| `useMap<K, V>`            | `Map` state with set, delete, clear helpers          |
| `useSet<T>`               | `Set` state with add, delete, toggle, clear helpers  |
| `useForm`                 | Controlled form state with validation helpers        |
| `useCopyToClipboard`      | Copy text with a success status flag                 |
| `useEventListener`        | Attach and auto-cleanup DOM event listeners          |
| `useTimeout`              | Schedule a callback with automatic cleanup           |
| `useInterval`             | Run a callback on a fixed interval with cleanup      |
| `useIsomorphicEffect`     | `useLayoutEffect` in browser, `useEffect` in SSR     |

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
