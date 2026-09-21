import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useTablePagination } from "./useTablePagination";

describe("useTablePagination", () => {
  it("slices data for the current page", () => {
    const data = Array.from({ length: 25 }, (_, index) => index + 1);

    const { result } = renderHook(() =>
      useTablePagination(data, { pageSize: 10, initialPage: 2 }),
    );

    expect(result.current.pageData).toEqual([
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ]);
    expect(result.current.totalPages).toBe(3);
    expect(result.current.totalItems).toBe(25);
  });

  it("clamps page when data shrinks", () => {
    const { result, rerender } = renderHook(
      ({ data }) => useTablePagination(data, { pageSize: 5 }),
      { initialProps: { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] } },
    );

    act(() => {
      result.current.setPage(2);
    });
    expect(result.current.page).toBe(2);

    rerender({ data: [1, 2, 3] });

    expect(result.current.page).toBe(1);
    expect(result.current.pageData).toEqual([1, 2, 3]);
  });
});
