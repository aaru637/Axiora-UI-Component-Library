import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useFetch } from "./useFetch";

describe("useFetch", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("loads data successfully", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1, name: "Axiora" }),
    } as Response);

    const { result } = renderHook(() =>
      useFetch<{ id: number; name: string }>("/api/item"),
    );

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual({ id: 1, name: "Axiora" });
    expect(result.current.error).toBeNull();
  });

  it("captures fetch errors", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    } as Response);

    const { result } = renderHook(() => useFetch("/api/item"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error?.message).toContain("500");
    expect(result.current.data).toBeUndefined();
  });

  it("refetches when refetch is called", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ count: 1 }),
    } as Response);

    const { result } = renderHook(() =>
      useFetch<{ count: number }>("/api/count"),
    );

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(fetchMock).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.refetch();
    });

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
  });

  it("skips fetching when disabled or url is null", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");

    renderHook(() => useFetch(null));
    renderHook(() => useFetch("/api/item", { enabled: false }));

    expect(fetchMock).not.toHaveBeenCalled();
  });
});
