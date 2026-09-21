import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { dismissToast, resetToasts, toast, useToast } from "./useToast";

describe("useToast", () => {
  afterEach(() => {
    resetToasts();
  });
  it("adds a toast via toast()", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: "Hello", description: "World" });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]?.title).toBe("Hello");
    expect(result.current.toasts[0]?.description).toBe("World");
    expect(result.current.toasts[0]?.open).toBe(true);
  });

  it("supports destructive variant", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ variant: "destructive", title: "Error" });
    });

    expect(result.current.toasts[0]?.variant).toBe("destructive");
  });

  it("dismisses a toast by id", () => {
    const { result } = renderHook(() => useToast());
    let id = "";

    act(() => {
      const created = toast({ title: "Dismiss me" });
      id = created.id;
    });

    expect(result.current.toasts[0]?.open).toBe(true);

    act(() => {
      dismissToast(id);
    });

    expect(result.current.toasts[0]?.open).toBe(false);
  });

  it("limits visible toasts to five", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      for (let index = 0; index < 7; index += 1) {
        toast({ title: `Toast ${index}` });
      }
    });

    expect(result.current.toasts).toHaveLength(5);
  });
});
