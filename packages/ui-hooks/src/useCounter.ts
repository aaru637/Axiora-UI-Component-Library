import { useCallback, useState } from "react";

export interface UseCounterOptions {
  min?: number;
  max?: number;
  step?: number;
}

export function useCounter(initial = 0, options: UseCounterOptions = {}) {
  const { min, max, step = 1 } = options;
  const [count, setCount] = useState(initial);

  const clamp = useCallback(
    (value: number) => {
      let next = value;
      if (min !== undefined) {
        next = Math.max(min, next);
      }
      if (max !== undefined) {
        next = Math.min(max, next);
      }
      return next;
    },
    [max, min],
  );

  const increment = useCallback(() => {
    setCount((current) => clamp(current + step));
  }, [clamp, step]);

  const decrement = useCallback(() => {
    setCount((current) => clamp(current - step));
  }, [clamp, step]);

  const reset = useCallback(() => {
    setCount(clamp(initial));
  }, [clamp, initial]);

  const set = useCallback(
    (value: number | ((current: number) => number)) => {
      setCount((current) => {
        const next = typeof value === "function" ? value(current) : value;
        return clamp(next);
      });
    },
    [clamp],
  );

  return { count, increment, decrement, reset, set } as const;
}
