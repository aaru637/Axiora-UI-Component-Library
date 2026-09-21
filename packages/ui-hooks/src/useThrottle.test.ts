import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useThrottle } from "./useThrottle";

describe("useThrottle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useThrottle("hello", 300));
    expect(result.current).toBe("hello");
  });

  it("throttles rapid value changes", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 300),
      { initialProps: { value: "a" } },
    );

    rerender({ value: "b" });
    rerender({ value: "c" });

    expect(result.current).toBe("a");

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("c");
  });
});
