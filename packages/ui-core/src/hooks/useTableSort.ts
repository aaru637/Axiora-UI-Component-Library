import { useMemo, useState } from "react";

export type SortDirection = "asc" | "desc";

export interface SortState<K extends string = string> {
  column: K | null;
  direction: SortDirection;
}

export interface UseTableSortOptions<T, K extends string> {
  data: T[];
  getSortValue: (item: T, column: K) => string | number;
  initialColumn?: K | null;
  initialDirection?: SortDirection;
}

export function useTableSort<T, K extends string>({
  data,
  getSortValue,
  initialColumn = null,
  initialDirection = "asc",
}: UseTableSortOptions<T, K>) {
  const [sort, setSort] = useState<SortState<K>>({
    column: initialColumn,
    direction: initialDirection,
  });

  const sortedData = useMemo(() => {
    if (!sort.column) return data;

    const column = sort.column;
    const multiplier = sort.direction === "asc" ? 1 : -1;

    return [...data].sort((a, b) => {
      const aVal = getSortValue(a, column);
      const bVal = getSortValue(b, column);

      if (typeof aVal === "number" && typeof bVal === "number") {
        return (aVal - bVal) * multiplier;
      }

      return String(aVal).localeCompare(String(bVal)) * multiplier;
    });
  }, [data, getSortValue, sort.column, sort.direction]);

  const toggleSort = (column: K) => {
    setSort((current) => {
      if (current.column !== column) {
        return { column, direction: "asc" };
      }

      if (current.direction === "asc") {
        return { column, direction: "desc" };
      }

      return { column: null, direction: "asc" };
    });
  };

  const getSortDirection = (column: K): SortDirection | null => {
    if (sort.column !== column) return null;
    return sort.direction;
  };

  return {
    sort,
    sortedData,
    toggleSort,
    getSortDirection,
  } as const;
}
