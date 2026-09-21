import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { usePrevious } from "./usePrevious";

describe("usePrevious", () => {
  it("returns undefined on first render", () => {
    const { result } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 1 },
    });

    expect(result.current).toBeUndefined();
  });

  it("returns the previous value after updates", () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 1 },
    });

    rerender({ value: 2 });
    expect(result.current).toBe(1);

    rerender({ value: 3 });
    expect(result.current).toBe(2);
  });
});
