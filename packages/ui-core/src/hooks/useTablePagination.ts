import { useEffect, useMemo, useState } from "react";

export interface UseTablePaginationOptions {
  pageSize?: number;
  initialPage?: number;
}

export function useTablePagination<T>(
  data: T[],
  { pageSize = 10, initialPage = 1 }: UseTablePaginationOptions = {},
) {
  const [page, setPage] = useState(initialPage);

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, page, pageSize]);

  const goToPage = (nextPage: number) => {
    setPage(Math.min(Math.max(1, nextPage), totalPages));
  };

  return {
    page,
    pageSize,
    totalPages,
    pageData,
    setPage: goToPage,
    totalItems: data.length,
  } as const;
}
