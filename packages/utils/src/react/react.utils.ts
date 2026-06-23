import {
  isNotNullOrUndefined,
  isNullOrUndefined,
} from "../common/common.utils";

export type ScrollTarget =
  | HTMLElement
  | null
  | undefined
  | { current: HTMLElement | null | undefined };

/**
 * Caches function results by serialized arguments.
 */
const memoize = <T extends (...args: never[]) => unknown>(fn: T): T => {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args) as ReturnType<T>;
    cache.set(key, result);

    return result;
  }) as T;
};

/**
 * Extracts a readable message from an unknown error value.
 */
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;

  return "Unknown error";
};

/**
 * Checks whether a value is a Promise-like object.
 */
const isPromise = (value: unknown): value is Promise<unknown> =>
  isNotNullOrUndefined(value) &&
  typeof (value as Promise<unknown>).then === "function";

/**
 * Wraps an async function and returns a tuple of `[error, result]`.
 */
const asyncHandler = <Args extends unknown[], T>(
  fn: (...args: Args) => Promise<T>,
) => {
  return async (...args: Args): Promise<[Error | null, T | null]> => {
    try {
      return [null, await fn(...args)];
    } catch (error) {
      return [
        error instanceof Error ? error : new Error(getErrorMessage(error)),
        null,
      ];
    }
  };
};

/**
 * Copies text to the clipboard when running in a browser.
 */
const copyToClipboard = async (text: string): Promise<boolean> => {
  if (
    typeof navigator === "undefined" ||
    isNullOrUndefined(navigator.clipboard)
  ) {
    return false;
  }

  await navigator.clipboard.writeText(text);

  return true;
};

/**
 * Triggers a browser download for a blob.
 */
const downloadFile = (blob: Blob, filename: string): void => {
  if (typeof document === "undefined") return;

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

/**
 * Scrolls the page to the top.
 */
const scrollToTop = (): void => {
  if (typeof window === "undefined") return;

  window.scrollTo({ top: 0, behavior: "smooth" });
};

/**
 * Scrolls an element or React ref into view.
 */
const scrollIntoView = (
  target: ScrollTarget,
  options?: ScrollIntoViewOptions,
): void => {
  const element =
    target && typeof target === "object" && "current" in target
      ? target.current
      : target;

  element?.scrollIntoView(options ?? { behavior: "smooth", block: "start" });
};

export interface ReactUtils {
  memoize<T extends (...args: never[]) => unknown>(fn: T): T;
  getErrorMessage(error: unknown): string;
  isPromise(value: unknown): value is Promise<unknown>;
  asyncHandler<Args extends unknown[], T>(
    fn: (...args: Args) => Promise<T>,
  ): (...args: Args) => Promise<[Error | null, T | null]>;
  copyToClipboard(text: string): Promise<boolean>;
  downloadFile(blob: Blob, filename: string): void;
  scrollToTop(): void;
  scrollIntoView(target: ScrollTarget, options?: ScrollIntoViewOptions): void;
}

export const reactUtils: ReactUtils = {
  memoize,
  copyToClipboard,
  downloadFile,
  scrollToTop,
  scrollIntoView,
  getErrorMessage,
  isPromise,
  asyncHandler,
};

export {
  memoize,
  copyToClipboard,
  downloadFile,
  scrollToTop,
  scrollIntoView,
  getErrorMessage,
  isPromise,
  asyncHandler,
};
