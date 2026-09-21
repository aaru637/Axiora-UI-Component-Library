import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useTableFilter } from "./useTableFilter";

type Row = { name: string; role: string };

const rows: Row[] = [
  { name: "Alice", role: "Admin" },
  { name: "Bob", role: "Editor" },
  { name: "Carol", role: "Viewer" },
];

describe("useTableFilter", () => {
  it("returns all rows when query is empty", () => {
    const { result } = renderHook(() =>
      useTableFilter({
        data: rows,
        query: "",
        getSearchableText: (row) => `${row.name} ${row.role}`,
      }),
    );

    expect(result.current.filteredData).toEqual(rows);
    expect(result.current.resultCount).toBe(3);
  });

  it("filters rows by query", () => {
    const { result } = renderHook(() =>
      useTableFilter({
        data: rows,
        query: "bob",
        getSearchableText: (row) => `${row.name} ${row.role}`,
      }),
    );

    expect(result.current.filteredData).toEqual([
      { name: "Bob", role: "Editor" },
    ]);
  });
});
