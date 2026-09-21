import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useToggle } from "./useToggle";

describe("useToggle", () => {
  it("starts with the initial value", () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current.value).toBe(true);
  });

  it("toggles, sets on, and sets off", () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => result.current.toggle());
    expect(result.current.value).toBe(true);

    act(() => result.current.setOff());
    expect(result.current.value).toBe(false);

    act(() => result.current.setOn());
    expect(result.current.value).toBe(true);
  });
});
