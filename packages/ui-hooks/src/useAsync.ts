import { useCallback, useEffect, useRef, useState } from "react";

export interface UseAsyncOptions {
  immediate?: boolean;
}

export interface UseAsyncResult<T> {
  data: T | undefined;
  error: Error | null;
  loading: boolean;
  execute: () => Promise<T | undefined>;
  reset: () => void;
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  options?: UseAsyncOptions,
): UseAsyncResult<T> {
  const { immediate = false } = options ?? {};
  const asyncRef = useRef(asyncFunction);
  asyncRef.current = asyncFunction;

  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(immediate);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await asyncRef.current();
      setData(result);
      setLoading(false);
      return result;
    } catch (asyncError: unknown) {
      const nextError =
        asyncError instanceof Error
          ? asyncError
          : new Error(String(asyncError));
      setError(nextError);
      setData(undefined);
      setLoading(false);
      return undefined;
    }
  }, []);

  const reset = useCallback(() => {
    setData(undefined);
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (immediate) {
      void execute();
    }
  }, [immediate, execute]);

  return { data, error, loading, execute, reset };
}
