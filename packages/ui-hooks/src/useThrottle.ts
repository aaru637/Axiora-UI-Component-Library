import { useEffect, useRef, useState } from "react";

export function useThrottle<T>(value: T, delay = 300): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastUpdated = useRef(0);

  useEffect(() => {
    const now = Date.now();
    const elapsed = now - lastUpdated.current;

    if (elapsed >= delay) {
      lastUpdated.current = now;
      setThrottledValue(value);
      return undefined;
    }

    const timer = window.setTimeout(() => {
      lastUpdated.current = Date.now();
      setThrottledValue(value);
    }, delay - elapsed);

    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return throttledValue;
}
