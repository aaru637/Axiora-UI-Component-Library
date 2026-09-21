# @axiora-ui/ui-hooks

Reusable React hooks for common UI interaction patterns. Every hook is standalone — no cross-hook dependencies. Drop them into any React 19 application.

**Status:** ✅ **6 hooks implemented** · Storybook stories for all · Vitest coverage

---

## Table of Contents

- [Installation](#installation)
- [Hooks inventory](#hooks-inventory)
- [Usage examples](#usage-examples)
- [Build & test](#build--test)
- [Future hooks](#future-hooks)

---

## Installation

```json
"dependencies": {
  "@axiora-ui/ui-hooks": "workspace:*"
}
```

**Peer dependency:** `react` ^19.0.0

---

## Hooks inventory

| Hook              | Description                                      | Storybook | Tests |
| ----------------- | ------------------------------------------------ | --------- | ----- |
| `useToggle`       | Boolean state with `toggle` / `setOn` / `setOff` | ✅        | ✅    |
| `useDebounce`     | Debounce a value by delay (search, filters)      | ✅        | ✅    |
| `useLocalStorage` | Sync state with `localStorage`                   | ✅        | ✅    |
| `useMediaQuery`   | React to CSS media query changes                 | ✅        | ✅    |
| `useClickOutside` | Detect clicks outside a ref element              | ✅        | ✅    |
| `useFetch`        | Minimal fetch with loading, error, refetch       | ✅        | ✅    |

Browse **Hooks/** in Storybook for interactive demos.

---

## Usage examples

### useToggle

```tsx
import { useToggle } from "@axiora-ui/ui-hooks";

const { value: isVisible, toggle } = useToggle(false);
```

### useDebounce

```tsx
import { useDebounce } from "@axiora-ui/ui-hooks";

const [query, setQuery] = useState("");
const debouncedQuery = useDebounce(query, 300);
```

### useLocalStorage

```tsx
import { useLocalStorage } from "@axiora-ui/ui-hooks";

const [theme, setTheme, removeTheme] = useLocalStorage("theme", "light");
```

### useMediaQuery

```tsx
import { useMediaQuery } from "@axiora-ui/ui-hooks";

const isDesktop = useMediaQuery("(min-width: 1024px)");
```

### useClickOutside

```tsx
import { useRef } from "react";
import { useClickOutside } from "@axiora-ui/ui-hooks";

const ref = useRef<HTMLDivElement>(null);
useClickOutside(ref, () => setOpen(false));
```

### useFetch

```tsx
import { useFetch } from "@axiora-ui/ui-hooks";

const { data, error, loading, refetch } = useFetch<User>("/api/user");
```

---

## Build & test

```bash
pnpm build --filter @axiora-ui/ui-hooks
pnpm test --filter @axiora-ui/ui-hooks
```

Output: `dist/index.js` + `dist/index.d.ts` (React is externalized).

---

## Future hooks

Additional hooks from the roadmap (not yet implemented): `useSessionStorage`, `useThrottle`, `usePrevious`, `useKeyPress`, `useIntersectionObserver`, `useAsync`, `useForm`, and others.

See [IMPLEMENTATION_STATUS.md](../../IMPLEMENTATION_STATUS.md) for overall project progress.
