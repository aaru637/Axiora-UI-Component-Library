import { type RefObject, useEffect, useState } from "react";

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  enabled?: boolean;
}

export function useIntersectionObserver(
  ref: RefObject<Element | null>,
  options?: UseIntersectionObserverOptions,
): boolean {
  const { enabled = true, root, rootMargin, threshold } = options ?? {};
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!enabled || !element || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry?.isIntersecting ?? false);
      },
      { root, rootMargin, threshold },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [enabled, ref, root, rootMargin, threshold]);

  return isIntersecting;
}
