import { useCallback, useState } from "react";

function readStoredValue<T>(key: string, initialValue: T): T {
  if (typeof window === "undefined") {
    return initialValue;
  }

  try {
    const item = window.sessionStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : initialValue;
  } catch {
    return initialValue;
  }
}

export function useSessionStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() =>
    readStoredValue(key, initialValue),
  );

  const setValue = useCallback(
    (value: T | ((current: T) => T)) => {
      setStoredValue((current) => {
        const nextValue =
          typeof value === "function"
            ? (value as (current: T) => T)(current)
            : value;

        if (typeof window !== "undefined") {
          window.sessionStorage.setItem(key, JSON.stringify(nextValue));
        }

        return nextValue;
      });
    },
    [key],
  );

  const removeValue = useCallback(() => {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(key);
    }
    setStoredValue(initialValue);
  }, [initialValue, key]);

  return [storedValue, setValue, removeValue] as const;
}
