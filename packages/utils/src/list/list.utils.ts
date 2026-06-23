import { isEmpty } from "../array/array.utils";
import { isNullOrUndefined } from "../common/common.utils";

export type PaginatedResult<T> = {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

/**
 * Finds the first object where `item[key] === value`.
 */
const findBy = <T, K extends keyof T>(
  list: T[] | null | undefined,
  key: K,
  value: T[K],
): T | null | undefined => {
  if (isNullOrUndefined(list)) return list;

  return list.find((item) => item[key] === value) ?? null;
};

/**
 * Filters objects where `item[key] === value`.
 */
const filterBy = <T, K extends keyof T>(
  list: T[] | null | undefined,
  key: K,
  value: T[K],
): T[] | null | undefined => {
  if (isNullOrUndefined(list)) return list;

  return list.filter((item) => item[key] === value);
};

/**
 * Checks whether any object matches `item[key] === value`.
 */
const exists = <T, K extends keyof T>(
  list: T[] | null | undefined,
  key: K,
  value: T[K],
): boolean => {
  if (isNullOrUndefined(list)) return false;

  return list.some((item) => item[key] === value);
};

/**
 * Removes objects where `item[key] === value`.
 */
const removeBy = <T, K extends keyof T>(
  list: T[] | null | undefined,
  key: K,
  value: T[K],
): T[] | null | undefined => {
  if (isNullOrUndefined(list)) return list;

  return list.filter((item) => item[key] !== value);
};

/**
 * Updates objects where `item[key] === value`.
 */
const updateBy = <T, K extends keyof T>(
  list: T[] | null | undefined,
  key: K,
  value: T[K],
  updates: Partial<T>,
): T[] | null | undefined => {
  if (isNullOrUndefined(list)) return list;

  return list.map((item) =>
    item[key] === value ? { ...item, ...updates } : item,
  );
};

/**
 * Sorts objects by a property key in ascending order.
 */
const sortBy = <T, K extends keyof T>(
  list: T[] | null | undefined,
  key: K,
): T[] | null | undefined => {
  if (isEmpty(list)) return list;

  return [...list].sort((a, b) => {
    const left = a[key];
    const right = b[key];

    if (left < right) return -1;
    if (left > right) return 1;

    return 0;
  });
};

/**
 * Groups objects by a property key.
 */
const groupBy = <T, K extends keyof T>(
  list: T[] | null | undefined,
  key: K,
): Record<string, T[]> | null | undefined => {
  if (isNullOrUndefined(list)) return list;

  return list.reduce<Record<string, T[]>>((groups, item) => {
    const group = String(item[key]);

    if (!groups[group]) {
      groups[group] = [];
    }

    groups[group].push(item);

    return groups;
  }, {});
};

/**
 * Counts occurrences of each property value.
 */
const countBy = <T, K extends keyof T>(
  list: T[] | null | undefined,
  key: K,
): Record<string, number> | null | undefined => {
  if (isNullOrUndefined(list)) return list;

  return list.reduce<Record<string, number>>((counts, item) => {
    const group = String(item[key]);
    counts[group] = (counts[group] ?? 0) + 1;

    return counts;
  }, {});
};

/**
 * Extracts a property value from each object.
 */
const pluck = <T, K extends keyof T>(
  list: T[] | null | undefined,
  key: K,
): T[K][] | null | undefined => {
  if (isEmpty(list)) return list;

  return list.map((item) => item[key]);
};

/**
 * Removes duplicate objects by property key.
 */
const distinctBy = <T, K extends keyof T>(
  list: T[] | null | undefined,
  key: K,
): T[] | null | undefined => {
  if (isNullOrUndefined(list)) return list;

  const seen = new Set<unknown>();

  return list.filter((item) => {
    const value = item[key];

    if (seen.has(value)) return false;

    seen.add(value);

    return true;
  });
};

/**
 * Converts a list into a map keyed by a property value.
 */
const indexBy = <T, K extends keyof T>(
  list: T[] | null | undefined,
  key: K,
): Record<string, T> | null | undefined => {
  if (isNullOrUndefined(list)) return list;

  return list.reduce<Record<string, T>>((map, item) => {
    map[String(item[key])] = item;

    return map;
  }, {});
};

/**
 * Splits a list into matching and non-matching groups.
 */
const partition = <T>(
  list: T[] | null | undefined,
  predicate: (item: T) => boolean,
): [T[], T[]] | null | undefined => {
  if (isNullOrUndefined(list)) return list;

  const matched: T[] = [];
  const unmatched: T[] = [];

  for (const item of list) {
    if (predicate(item)) {
      matched.push(item);
    } else {
      unmatched.push(item);
    }
  }

  return [matched, unmatched];
};

/**
 * Searches objects across multiple keys using case-insensitive text matching.
 */
const search = <T extends object>(
  list: T[] | null | undefined,
  text: string,
  keys: (keyof T)[],
): T[] | null | undefined => {
  if (isNullOrUndefined(list)) return list;

  const query = text.trim().toLowerCase();

  if (!query) return list;

  return list.filter((item) =>
    keys.some((key) => String(item[key]).toLowerCase().includes(query)),
  );
};

/**
 * Paginates a list.
 */
const paginate = <T>(
  list: T[] | null | undefined,
  page = 1,
  pageSize = 10,
): PaginatedResult<T> | null | undefined => {
  if (isNullOrUndefined(list)) return list;

  const safePage = Math.max(1, page);
  const safePageSize = Math.max(1, pageSize);
  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / safePageSize));
  const start = (safePage - 1) * safePageSize;

  return {
    data: list.slice(start, start + safePageSize),
    page: safePage,
    pageSize: safePageSize,
    total,
    totalPages,
  };
};

export interface ListUtils {
  findBy<T, K extends keyof T>(
    list: T[] | null | undefined,
    key: K,
    value: T[K],
  ): T | null | undefined;
  filterBy<T, K extends keyof T>(
    list: T[] | null | undefined,
    key: K,
    value: T[K],
  ): T[] | null | undefined;
  exists<T, K extends keyof T>(
    list: T[] | null | undefined,
    key: K,
    value: T[K],
  ): boolean;
  removeBy<T, K extends keyof T>(
    list: T[] | null | undefined,
    key: K,
    value: T[K],
  ): T[] | null | undefined;
  updateBy<T, K extends keyof T>(
    list: T[] | null | undefined,
    key: K,
    value: T[K],
    updates: Partial<T>,
  ): T[] | null | undefined;
  sortBy<T, K extends keyof T>(
    list: T[] | null | undefined,
    key: K,
  ): T[] | null | undefined;
  groupBy<T, K extends keyof T>(
    list: T[] | null | undefined,
    key: K,
  ): Record<string, T[]> | null | undefined;
  countBy<T, K extends keyof T>(
    list: T[] | null | undefined,
    key: K,
  ): Record<string, number> | null | undefined;
  pluck<T, K extends keyof T>(
    list: T[] | null | undefined,
    key: K,
  ): T[K][] | null | undefined;
  distinctBy<T, K extends keyof T>(
    list: T[] | null | undefined,
    key: K,
  ): T[] | null | undefined;
  indexBy<T, K extends keyof T>(
    list: T[] | null | undefined,
    key: K,
  ): Record<string, T> | null | undefined;
  partition<T>(
    list: T[] | null | undefined,
    predicate: (item: T) => boolean,
  ): [T[], T[]] | null | undefined;
  search<T extends object>(
    list: T[] | null | undefined,
    text: string,
    keys: (keyof T)[],
  ): T[] | null | undefined;
  paginate<T>(
    list: T[] | null | undefined,
    page?: number,
    pageSize?: number,
  ): PaginatedResult<T> | null | undefined;
}

export const listUtils: ListUtils = {
  findBy,
  filterBy,
  exists,
  removeBy,
  updateBy,
  sortBy,
  groupBy,
  countBy,
  pluck,
  distinctBy,
  indexBy,
  partition,
  search,
  paginate,
};

export {
  findBy,
  filterBy,
  exists,
  removeBy,
  updateBy,
  sortBy,
  groupBy,
  countBy,
  pluck,
  distinctBy,
  indexBy,
  partition,
  search,
  paginate,
};
