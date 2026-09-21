import { useMemo } from "react";

export interface UseTableFilterOptions<T> {
  data: T[];
  query: string;
  getSearchableText: (item: T) => string;
  caseSensitive?: boolean;
}

export function useTableFilter<T>({
  data,
  query,
  getSearchableText,
  caseSensitive = false,
}: UseTableFilterOptions<T>) {
  const filteredData = useMemo(() => {
    const normalizedQuery = caseSensitive
      ? query.trim()
      : query.trim().toLowerCase();

    if (!normalizedQuery) {
      return data;
    }

    return data.filter((item) => {
      const haystack = caseSensitive
        ? getSearchableText(item)
        : getSearchableText(item).toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [caseSensitive, data, getSearchableText, query]);

  return { filteredData, resultCount: filteredData.length } as const;
}
