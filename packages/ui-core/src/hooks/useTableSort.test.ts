import { renderHook, act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useTableSort } from "./useTableSort";

type Row = { name: string; amount: number };

const rows: Row[] = [
  { name: "Beta", amount: 20 },
  { name: "Alpha", amount: 10 },
  { name: "Gamma", amount: 30 },
];

describe("useTableSort", () => {
  it("sorts ascending by string column", () => {
    const { result } = renderHook(() =>
      useTableSort<Row, "name">({
        data: rows,
        getSortValue: (item, column) => item[column],
      }),
    );

    act(() => {
      result.current.toggleSort("name");
    });

    expect(result.current.sortedData.map((row) => row.name)).toEqual([
      "Alpha",
      "Beta",
      "Gamma",
    ]);
  });

  it("toggles to descending then clears sort", () => {
    const { result } = renderHook(() =>
      useTableSort<Row, "amount">({
        data: rows,
        getSortValue: (item, column) => item[column],
      }),
    );

    act(() => {
      result.current.toggleSort("amount");
    });
    expect(result.current.getSortDirection("amount")).toBe("asc");

    act(() => {
      result.current.toggleSort("amount");
    });
    expect(result.current.getSortDirection("amount")).toBe("desc");
    expect(result.current.sortedData[0]?.amount).toBe(30);

    act(() => {
      result.current.toggleSort("amount");
    });
    expect(result.current.getSortDirection("amount")).toBe(null);
    expect(result.current.sortedData).toEqual(rows);
  });
});
