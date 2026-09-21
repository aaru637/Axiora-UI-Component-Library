import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useWindowSize } from "./useWindowSize";

describe("useWindowSize", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns current window dimensions", () => {
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(1024);
    vi.spyOn(window, "innerHeight", "get").mockReturnValue(768);

    const { result } = renderHook(() => useWindowSize());

    expect(result.current).toEqual({ width: 1024, height: 768 });
  });

  it("updates when window resizes", () => {
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(800);
    vi.spyOn(window, "innerHeight", "get").mockReturnValue(600);

    const { result } = renderHook(() => useWindowSize());

    vi.spyOn(window, "innerWidth", "get").mockReturnValue(1200);
    vi.spyOn(window, "innerHeight", "get").mockReturnValue(900);

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toEqual({ width: 1200, height: 900 });
  });
});
