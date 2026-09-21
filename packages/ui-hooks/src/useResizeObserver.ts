import { type RefObject, useEffect, useState } from "react";

export interface ElementSize {
  width: number;
  height: number;
}

export interface UseResizeObserverOptions extends ResizeObserverOptions {
  enabled?: boolean;
}

const defaultSize: ElementSize = { width: 0, height: 0 };

export function useResizeObserver<T extends Element>(
  ref: RefObject<T | null>,
  options?: UseResizeObserverOptions,
): ElementSize {
  const { enabled = true, box = "content-box" } = options ?? {};
  const [size, setSize] = useState<ElementSize>(defaultSize);

  useEffect(() => {
    const element = ref.current;

    if (!enabled || !element || typeof ResizeObserver === "undefined") {
      return undefined;
    }

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) {
        return;
      }

      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(element, { box });

    return () => observer.disconnect();
  }, [box, enabled, ref]);

  return size;
}
