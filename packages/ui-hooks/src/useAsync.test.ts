import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useAsync } from "./useAsync";

describe("useAsync", () => {
  it("resolves data when execute succeeds", async () => {
    const asyncFn = vi.fn(async () => ({ id: 1 }));

    const { result } = renderHook(() => useAsync(asyncFn));

    expect(result.current.loading).toBe(false);

    await act(async () => {
      await result.current.execute();
    });

    expect(result.current.data).toEqual({ id: 1 });
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("captures errors when execute fails", async () => {
    const asyncFn = vi.fn(async () => {
      throw new Error("Failed");
    });

    const { result } = renderHook(() => useAsync(asyncFn));

    await act(async () => {
      await result.current.execute();
    });

    expect(result.current.error?.message).toBe("Failed");
    expect(result.current.data).toBeUndefined();
  });

  it("runs immediately when immediate option is true", async () => {
    const asyncFn = vi.fn(async () => "ready");

    const { result } = renderHook(() => useAsync(asyncFn, { immediate: true }));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(asyncFn).toHaveBeenCalledTimes(1);
    expect(result.current.data).toBe("ready");
  });

  it("resets state", async () => {
    const { result } = renderHook(() => useAsync(async () => "done"));

    await act(async () => {
      await result.current.execute();
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});
