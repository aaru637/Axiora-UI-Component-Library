import { renderHook, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useIntersectionObserver } from "./useIntersectionObserver";

class IntersectionObserverMock implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin = "";
  readonly scrollMargin = "";
  readonly thresholds: readonly number[] = [];

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);

  static lastInstance: IntersectionObserverMock | null = null;

  constructor(private callback: IntersectionObserverCallback) {
    IntersectionObserverMock.lastInstance = this;
  }

  trigger(isIntersecting: boolean) {
    this.callback([{ isIntersecting } as IntersectionObserverEntry], this);
  }
}

describe("useIntersectionObserver", () => {
  beforeEach(() => {
    IntersectionObserverMock.lastInstance = null;
    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns false when element is not intersecting", () => {
    const ref = createRef<HTMLDivElement>();
    ref.current = document.createElement("div");

    const { result } = renderHook(() => useIntersectionObserver(ref));

    expect(result.current).toBe(false);
    expect(IntersectionObserverMock.lastInstance?.observe).toHaveBeenCalledWith(
      ref.current,
    );
  });

  it("updates when intersection changes", async () => {
    const ref = createRef<HTMLDivElement>();
    ref.current = document.createElement("div");

    const { result } = renderHook(() => useIntersectionObserver(ref));

    IntersectionObserverMock.lastInstance?.trigger(true);

    await waitFor(() => expect(result.current).toBe(true));
  });

  it("skips observation when disabled", () => {
    const ref = createRef<HTMLDivElement>();
    ref.current = document.createElement("div");

    renderHook(() => useIntersectionObserver(ref, { enabled: false }));

    expect(IntersectionObserverMock.lastInstance).toBeNull();
  });
});
