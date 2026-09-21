# @axiora-ui/ui-hooks

Reusable React hooks for common UI interaction patterns. Every hook is standalone — no cross-hook dependencies. Drop them into any React 19 application.

**Status:** ✅ **12 hooks implemented** · Storybook stories for all · Vitest coverage

---

## Table of Contents

- [Installation](#installation)
- [Hooks inventory](#hooks-inventory)
- [Phase 4 hooks](#phase-4-hooks)
- [Phase 6 hooks](#phase-6-hooks)
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

| Hook                      | Phase | Description                                | Storybook | Tests |
| ------------------------- | ----- | ------------------------------------------ | --------- | ----- |
| `useToggle`               | 4     | Boolean state with toggle / setOn / setOff | ✅        | ✅    |
| `useDebounce`             | 4     | Debounce a value by delay                  | ✅        | ✅    |
| `useLocalStorage`         | 4     | Sync state with `localStorage`             | ✅        | ✅    |
| `useMediaQuery`           | 4     | React to CSS media query changes           | ✅        | ✅    |
| `useClickOutside`         | 4     | Detect clicks outside a ref element        | ✅        | ✅    |
| `useFetch`                | 4     | Minimal fetch with loading, error, refetch | ✅        | ✅    |
| `useAsync`                | 6     | Run async functions with loading/error     | ✅        | ✅    |
| `usePrevious`             | 6     | Track the previous render value            | ✅        | ✅    |
| `useThrottle`             | 6     | Throttle a value by delay                  | ✅        | ✅    |
| `useSessionStorage`       | 6     | Sync state with `sessionStorage`           | ✅        | ✅    |
| `useIntersectionObserver` | 6     | Detect element visibility in viewport      | ✅        | ✅    |
| `useForm`                 | 6     | Lightweight form state, validation, submit | ✅        | ✅    |

Browse **Hooks/** in Storybook for interactive demos.

---

## Phase 4 hooks

Core interaction hooks for toggles, persistence, responsiveness, and data fetching.

## Phase 6 hooks

Extended hooks for async workflows, performance (throttle/previous), session persistence, visibility detection, and form handling.

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

### useAsync

```tsx
import { useAsync } from "@axiora-ui/ui-hooks";

const { data, error, loading, execute } = useAsync(async () => {
  const response = await fetch("/api/profile");
  return response.json();
});
```

### usePrevious

```tsx
import { usePrevious } from "@axiora-ui/ui-hooks";

const previousCount = usePrevious(count);
```

### useThrottle

```tsx
import { useThrottle } from "@axiora-ui/ui-hooks";

const throttledScroll = useThrottle(scrollY, 200);
```

### useSessionStorage

```tsx
import { useSessionStorage } from "@axiora-ui/ui-hooks";

const [tab, setTab] = useSessionStorage("active-tab", "home");
```

### useIntersectionObserver

```tsx
import { useRef } from "react";
import { useIntersectionObserver } from "@axiora-ui/ui-hooks";

const ref = useRef<HTMLDivElement>(null);
const isVisible = useIntersectionObserver(ref, { threshold: 0.5 });
```

### useForm

```tsx
import { useForm } from "@axiora-ui/ui-hooks";

const { values, errors, handleChange, handleSubmit } = useForm({
  initialValues: { email: "", password: "" },
  validate: (formValues) => (formValues.email ? {} : { email: "Required" }),
  onSubmit: async (formValues) => save(formValues),
});
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

Additional hooks from the roadmap (not yet implemented): `useKeyPress`, `useWindowSize`, `useScrollPosition`, `useResizeObserver`, `useCounter`, `useCopyToClipboard`, `useEventListener`, `useTimeout`, `useInterval`, and others.

See [IMPLEMENTATION_STATUS.md](../../IMPLEMENTATION_STATUS.md) for overall project progress.
