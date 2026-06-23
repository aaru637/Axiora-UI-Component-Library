import { isNullOrUndefined } from "../common/common.utils";

const getDefaultUrl = (): string => {
  if (typeof window !== "undefined" && window.location?.href) {
    return window.location.href;
  }

  return "http://localhost/";
};

const toUrl = (url?: string): URL => new URL(url ?? getDefaultUrl());

/**
 * Reads a query parameter from a URL.
 */
const getQueryParam = (name: string, url?: string): string | null => {
  return toUrl(url).searchParams.get(name);
};

/**
 * Sets a query parameter and returns the updated URL string.
 */
const setQueryParam = (name: string, value: string, url?: string): string => {
  const parsed = toUrl(url);
  parsed.searchParams.set(name, value);

  return parsed.toString();
};

/**
 * Removes a query parameter and returns the updated URL string.
 */
const removeQueryParam = (name: string, url?: string): string => {
  const parsed = toUrl(url);
  parsed.searchParams.delete(name);

  return parsed.toString();
};

/**
 * Builds a query string from a params object.
 */
const buildQueryString = (
  params: Record<string, string | number | boolean | null | undefined>,
): string => {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (!isNullOrUndefined(value)) {
      searchParams.set(key, String(value));
    }
  }

  const query = searchParams.toString();

  return query ? `?${query}` : "";
};

/**
 * Parses query parameters from a URL into an object.
 */
const parseQueryString = (url: string): Record<string, string> => {
  const parsed = new URL(url, "http://localhost");
  const result: Record<string, string> = {};

  parsed.searchParams.forEach((value, key) => {
    result[key] = value;
  });

  return result;
};

export interface UrlUtils {
  getQueryParam(name: string, url?: string): string | null;
  setQueryParam(name: string, value: string, url?: string): string;
  removeQueryParam(name: string, url?: string): string;
  buildQueryString(
    params: Record<string, string | number | boolean | null | undefined>,
  ): string;
  parseQueryString(url: string): Record<string, string>;
}

export const urlUtils: UrlUtils = {
  getQueryParam,
  setQueryParam,
  removeQueryParam,
  buildQueryString,
  parseQueryString,
};

export {
  getQueryParam,
  setQueryParam,
  removeQueryParam,
  buildQueryString,
  parseQueryString,
};
