import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useKeyPress } from "./useKeyPress";

describe("useKeyPress", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns true while target key is held", () => {
    const { result } = renderHook(() => useKeyPress("Enter"));

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    });
    expect(result.current).toBe(true);

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter" }));
    });
    expect(result.current).toBe(false);
  });

  it("calls onPress when key matches", () => {
    const onPress = vi.fn();
    renderHook(() => useKeyPress("k", { onPress, preventDefault: true }));

    const event = new KeyboardEvent("keydown", {
      key: "k",
      cancelable: true,
    });
    const preventDefault = vi.spyOn(event, "preventDefault");

    act(() => {
      window.dispatchEvent(event);
    });

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(preventDefault).toHaveBeenCalled();
  });

  it("supports multiple keys", () => {
    const { result } = renderHook(() => useKeyPress(["Enter", " "]));

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));
    });
    expect(result.current).toBe(true);
  });
});
