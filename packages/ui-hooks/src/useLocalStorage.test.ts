import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  it("reads and writes values to localStorage", () => {
    const { result } = renderHook(() =>
      useLocalStorage<{ mode: "light" | "dark" }>("theme", { mode: "light" }),
    );

    expect(result.current[0]).toEqual({ mode: "light" });

    act(() => {
      result.current[1]({ mode: "dark" });
    });

    expect(result.current[0]).toEqual({ mode: "dark" });
    expect(localStorage.getItem("theme")).toBe('{"mode":"dark"}');
  });

  it("removes the stored value", () => {
    localStorage.setItem("sidebar", JSON.stringify("open"));

    const { result } = renderHook(() => useLocalStorage("sidebar", "closed"));

    expect(result.current[0]).toBe("open");

    act(() => {
      result.current[2]();
    });

    expect(result.current[0]).toBe("closed");
    expect(localStorage.getItem("sidebar")).toBeNull();
  });
});
