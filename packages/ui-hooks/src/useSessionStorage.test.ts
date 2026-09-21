import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useSessionStorage } from "./useSessionStorage";

describe("useSessionStorage", () => {
  it("reads and writes values to sessionStorage", () => {
    const { result } = renderHook(() =>
      useSessionStorage("tab", { active: "home" }),
    );

    expect(result.current[0]).toEqual({ active: "home" });

    act(() => {
      result.current[1]({ active: "settings" });
    });

    expect(result.current[0]).toEqual({ active: "settings" });
    expect(sessionStorage.getItem("tab")).toBe('{"active":"settings"}');
  });

  it("removes the stored value", () => {
    sessionStorage.setItem("draft", JSON.stringify("saved"));

    const { result } = renderHook(() => useSessionStorage("draft", "empty"));

    expect(result.current[0]).toBe("saved");

    act(() => {
      result.current[2]();
    });

    expect(result.current[0]).toBe("empty");
    expect(sessionStorage.getItem("draft")).toBeNull();
  });
});
