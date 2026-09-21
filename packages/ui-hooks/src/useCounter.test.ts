import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  it("increments and decrements by step", () => {
    const { result } = renderHook(() => useCounter(0, { step: 2 }));

    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(2);

    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(0);
  });

  it("clamps values within min and max", () => {
    const { result } = renderHook(() =>
      useCounter(5, { min: 0, max: 10, step: 3 }),
    );

    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(8);

    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(10);

    act(() => {
      result.current.decrement();
      result.current.decrement();
      result.current.decrement();
      result.current.decrement();
    });
    expect(result.current.count).toBe(0);
  });

  it("resets to initial value", () => {
    const { result } = renderHook(() => useCounter(3));

    act(() => {
      result.current.increment();
      result.current.reset();
    });

    expect(result.current.count).toBe(3);
  });
});
