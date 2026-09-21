import { renderHook } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useResizeObserver } from "./useResizeObserver";

describe("useResizeObserver", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns element size from ResizeObserver callback", () => {
    const ref = createRef<HTMLDivElement>();
    const element = document.createElement("div");
    ref.current = element;

    const observe = vi.fn();
    const disconnect = vi.fn();

    vi.stubGlobal(
      "ResizeObserver",
      vi.fn(function ResizeObserverMock(this: ResizeObserver, callback) {
        callback([
          {
            contentRect: { width: 320, height: 180 },
          } as ResizeObserverEntry,
        ]);
        this.observe = observe;
        this.disconnect = disconnect;
        this.unobserve = vi.fn();
      }),
    );

    const { result } = renderHook(() => useResizeObserver(ref));

    expect(observe).toHaveBeenCalledWith(element, { box: "content-box" });
    expect(result.current).toEqual({ width: 320, height: 180 });
  });
});
