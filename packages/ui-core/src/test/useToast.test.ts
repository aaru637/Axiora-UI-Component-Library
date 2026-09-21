import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { dismissToast, resetToasts, toast, useToast } from "../useToast";

describe("useToast", () => {
  afterEach(() => {
    resetToasts();
  });

  it("returns toasts after toast() is called", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: "Hello" });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]?.title).toBe("Hello");
  });

  it("dismisses a toast by id", () => {
    const { result } = renderHook(() => useToast());

    let toastId = "";
    act(() => {
      const created = toast({ title: "Dismiss me" });
      toastId = created.id;
    });

    expect(result.current.toasts[0]?.open).toBe(true);

    act(() => {
      dismissToast(toastId);
    });

    expect(result.current.toasts[0]?.open).toBe(false);
  });

  it("updates an existing toast", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      const created = toast({ title: "Original" });
      created.update({ title: "Updated" });
    });

    expect(result.current.toasts[0]?.title).toBe("Updated");
  });
});
