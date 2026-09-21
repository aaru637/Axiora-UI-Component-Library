import { useCallback, useEffect, useState } from "react";

export interface UseFetchOptions<T> {
  enabled?: boolean;
  initialData?: T;
}

export interface UseFetchResult<T> {
  data: T | undefined;
  error: Error | null;
  loading: boolean;
  refetch: () => void;
}

export function useFetch<T>(
  url: string | null,
  options?: UseFetchOptions<T>,
): UseFetchResult<T> {
  const { enabled = true, initialData } = options ?? {};
  const [data, setData] = useState<T | undefined>(initialData);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [requestId, setRequestId] = useState(0);

  const refetch = useCallback(() => {
    setRequestId((current) => current + 1);
  }, []);

  useEffect(() => {
    if (!enabled || !url) {
      return undefined;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(url)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        return response.json() as Promise<T>;
      })
      .then((json) => {
        if (!cancelled) {
          setData(json);
        }
      })
      .catch((fetchError: unknown) => {
        if (!cancelled) {
          setError(
            fetchError instanceof Error
              ? fetchError
              : new Error(String(fetchError)),
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [enabled, requestId, url]);

  return { data, error, loading, refetch };
}
