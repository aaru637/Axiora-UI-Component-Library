import { isArray, isNullOrUndefined } from "../common/common.utils";

/**
 * Returns `true` when the array has at least one element.
 * Inverse of {@link isEmpty}.
 *
 * @param array - The array to check.
 * @returns `true` when the array is a non-empty `T[]`.
 *
 * @example
 * ```ts
 * isNotEmpty(null);       // false
 * isNotEmpty([]);          // false
 * isNotEmpty([1, 2]);     // true
 * ```
 */
const isNotEmpty = <T>(array: T[] | null | undefined): array is T[] =>
  !isNullOrUndefined(array) && array.length > 0;

/**
 * Checks whether an array is `null`, `undefined`, or has no elements.
 *
 * @param array - The array to check.
 * @returns `true` when the array is nullish or empty.
 *
 * @example
 * ```ts
 * isEmpty(null);       // true
 * isEmpty(undefined);  // true
 * isEmpty([]);          // true
 * isEmpty([1, 2]);     // false
 * ```
 */
const isEmpty = <T>(
  array: T[] | null | undefined,
): array is null | undefined | [] => !isNotEmpty(array);

/**
 * Removes duplicate values from an array.
 * When `keyFun` is provided, uniqueness is determined by the returned key.
 *
 * @param values - The array to deduplicate.
 * @param keyFun - Optional function that returns a unique key for each item.
 * @returns The deduplicated array, or the original nullish/empty value.
 *
 * @example
 * ```ts
 * unique([1, 2, 2, 3]);                    // [1, 2, 3]
 * unique([{ id: 1 }, { id: 1 }], (x) => x.id); // [{ id: 1 }]
 * unique(null);                            // null
 * ```
 */
const unique = <T>(
  values: T[] | null | undefined,
  keyFun?: (item: T) => string | number,
): T[] | null | undefined => {
  if (isEmpty(values)) return values;

  if (isNullOrUndefined(keyFun)) return Array.from(new Set(values));

  const seen = new Set<string | number>();
  return values.filter((item) => {
    const key = keyFun(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

/**
 * Returns items in `arr1` whose keys are not present in `arr2`.
 *
 * @param arr1 - The source array.
 * @param arr2 - The array whose keys should be excluded.
 * @param keyFun - Function that returns a comparison key for each item.
 * @returns Items in `arr1` not found in `arr2`, or the original nullish/empty value.
 *
 * @example
 * ```ts
 * difference(
 *   [{ id: 1 }, { id: 2 }],
 *   [{ id: 2 }],
 *   (x) => x.id,
 * ); // [{ id: 1 }]
 * ```
 */
const difference = <T>(
  arr1: T[] | null | undefined,
  arr2: T[] | null | undefined,
  keyFun: (item: T) => string | number,
): T[] | null | undefined => {
  if (isEmpty(arr1)) return arr1;
  if (isEmpty(arr2)) return arr2;

  const set2 = new Set(arr2.map(keyFun));

  return arr1.filter((item) => !set2.has(keyFun(item)));
};

/**
 * Returns items in `arr1` whose keys also exist in `arr2`.
 *
 * @param arr1 - The source array.
 * @param arr2 - The array to intersect against.
 * @param keyFun - Function that returns a comparison key for each item.
 * @returns Items shared by both arrays, or the original nullish/empty value.
 *
 * @example
 * ```ts
 * intersection(
 *   [{ id: 1 }, { id: 2 }],
 *   [{ id: 2 }, { id: 3 }],
 *   (x) => x.id,
 * ); // [{ id: 2 }]
 * ```
 */
const intersection = <T>(
  arr1: T[] | null | undefined,
  arr2: T[] | null | undefined,
  keyFun: (item: T) => string | number,
): T[] | null | undefined => {
  if (isEmpty(arr1)) return arr1;
  if (isEmpty(arr2)) return arr2;

  const set2 = new Set(arr2.map(keyFun));

  return arr1.filter((item) => set2.has(keyFun(item)));
};

/**
 * Returns the union of two arrays, deduplicated by key.
 * Items from `arr2` overwrite items from `arr1` when keys collide.
 *
 * @param arr1 - The first array.
 * @param arr2 - The second array.
 * @param keyFun - Function that returns a unique key for each item.
 * @returns Merged unique items, or the original nullish/empty value.
 *
 * @example
 * ```ts
 * union(
 *   [{ id: 1, name: "a" }],
 *   [{ id: 1, name: "b" }],
 *   (x) => x.id,
 * ); // [{ id: 1, name: "b" }]
 * ```
 */
const union = <T>(
  arr1: T[] | null | undefined,
  arr2: T[] | null | undefined,
  keyFun: (item: T) => string | number,
): T[] | null | undefined => {
  if (isEmpty(arr1)) return arr1;
  if (isEmpty(arr2)) return arr2;

  const map = new Map<string | number, T>();

  for (const item of arr1) {
    map.set(keyFun(item), item);
  }

  for (const item of arr2) {
    map.set(keyFun(item), item);
  }

  return [...map.values()];
};

/**
 * Removes falsy values (`false`, `0`, `""`, `null`, `undefined`, `NaN`) from an array.
 *
 * @param array - The array to compact.
 * @returns A new array with only truthy values, or the original nullish/empty value.
 *
 * @example
 * ```ts
 * compact([0, 1, false, 2, "", 3]); // [1, 2, 3]
 * compact([]);                        // []
 * compact(null);                      // null
 * ```
 */
const compact = <T>(
  array: T[] | null | undefined,
): NonNullable<T>[] | null | undefined => {
  if (isEmpty(array)) return array;

  return array.filter(Boolean) as NonNullable<T>[];
};

/**
 * Flattens an array one level deep.
 *
 * @param array - The array to flatten.
 * @returns A one-level flattened array, or the original nullish/empty value.
 *
 * @example
 * ```ts
 * flatten([1, [2, 3], 4]); // [1, 2, 3, 4]
 * flatten(null);             // null
 * ```
 */
const flatten = <T>(array: Array<T> | null | undefined) => {
  if (isEmpty(array)) return array;

  return array.flat();
};

type NestedArray<T> = Array<T | NestedArray<T>>;

/**
 * Recursively flattens a nested array into a single-level array.
 *
 * @param array - The nested array to flatten.
 * @returns A fully flattened array, or the original nullish/empty value.
 *
 * @example
 * ```ts
 * deepFlatten([1, [2, [3, 4]], 5]); // [1, 2, 3, 4, 5]
 * deepFlatten([]);                   // []
 * ```
 */
const deepFlatten = <T>(
  array: NestedArray<T> | null | undefined,
): T[] | null | undefined => {
  if (isEmpty(array)) return array;

  const result: T[] = [];

  const traverse = (arr: NestedArray<T>) => {
    for (const item of arr) {
      if (isArray(item)) {
        traverse(item);
      } else {
        result.push(item);
      }
    }
  };

  traverse(array);

  return result;
};

/**
 * Splits an array into smaller arrays of the given size.
 *
 * @param array - The array to chunk.
 * @param size - Maximum number of items per chunk. Defaults to `1`.
 * @returns An array of chunks, or the original nullish/empty value.
 *
 * @example
 * ```ts
 * chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
 * chunk(null);                 // null
 * ```
 */
const chunk = <T>(
  array: T[] | null | undefined,
  size = 1,
): T[][] | null | undefined => {
  if (isEmpty(array)) return array;

  const result: T[][] = [];

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
};

/**
 * Returns a new array with elements in random order.
 * Uses the Fisher-Yates shuffle algorithm.
 *
 * @param array - The array to shuffle.
 * @returns A shuffled copy, or the original nullish/empty value.
 *
 * @example
 * ```ts
 * shuffle([1, 2, 3]); // e.g. [2, 1, 3]
 * shuffle(null);        // null
 * ```
 */
const shuffle = <T>(array: T[] | null | undefined): T[] | null | undefined => {
  if (isEmpty(array)) return array;

  const result = [...array];

  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};

/**
 * Moves an item from one index to another in a new array.
 *
 * @param array - The source array.
 * @param from - Index of the item to move. Defaults to `0`.
 * @param to - Destination index.
 * @returns A new array with the item moved, or the original value when inputs are invalid.
 *
 * @example
 * ```ts
 * move(["a", "b", "c"], 0, 2); // ["b", "c", "a"]
 * move(null, 0, 1);             // null
 * ```
 */
const move = <T>(
  array: T[] | null | undefined,
  from = 0,
  to: number | null | undefined,
): T[] | null | undefined => {
  if (isEmpty(array) || isNullOrUndefined(to)) return array;

  const result = [...array];

  const [item] = result.splice(from, 1);
  result.splice(to, 0, item);

  return result;
};

/**
 * Removes all occurrences of the given values from an array.
 * Uses strict equality (`!==`) for comparison.
 *
 * @param array - The source array.
 * @param values - Values to remove.
 * @returns A new array without the given values, or the original nullish/empty value.
 *
 * @example
 * ```ts
 * remove([1, 2, 3, 2], 2); // [1, 3]
 * remove(null, 1);            // null
 * ```
 */
const remove = <T>(
  array: T[] | null | undefined,
  ...values: T[]
): T[] | null | undefined => {
  if (isEmpty(array) || isEmpty(values)) return array;

  return array.filter((item) => !values.some((value) => value === item));
};

/**
 * Inserts values at the given index in a new array.
 *
 * @param array - The source array.
 * @param index - Position at which to insert values. Defaults to `0`.
 * @param values - Values to insert.
 * @returns A new array with values inserted, or the original nullish/empty value.
 *
 * @example
 * ```ts
 * insert([1, 3], 1, 2); // [1, 2, 3]
 * insert(null, 0, 1);    // null
 * ```
 */
const insert = <T>(
  array: T[] | null | undefined,
  index = 0,
  ...values: T[]
): T[] | null | undefined => {
  if (isEmpty(array) || isEmpty(values)) return array;

  const result = [...array];

  result.splice(index, 0, ...values);

  return result;
};

/**
 * Returns the first element of an array.
 *
 * @param array - The source array.
 * @returns The first element, or `null` when the array is nullish or empty.
 *
 * @example
 * ```ts
 * first([1, 2, 3]); // 1
 * first([]);         // null
 * first(null);       // null
 * ```
 */
const first = <T>(array: T[] | null | undefined): T | null | undefined => {
  if (isEmpty(array)) return null;

  return array[0];
};

/**
 * Returns the last element of an array.
 *
 * @param array - The source array.
 * @returns The last element, or `null` when the array is nullish or empty.
 *
 * @example
 * ```ts
 * last([1, 2, 3]); // 3
 * last([]);         // null
 * last(null);       // null
 * ```
 */
const last = <T>(array: T[] | null | undefined): T | null | undefined => {
  if (isEmpty(array)) return null;

  return array.at(-1);
};

type KeyFunction<T> = (item: T) => number | string | Date;

/**
 * Returns a sorted copy of an array.
 * When `keyFun` is omitted, primitive values are compared directly.
 *
 * @param array - The array to sort.
 * @param keyFun - Optional function that returns the sort key for each item.
 * @param sortBy - Sort direction. Defaults to `"asc"`.
 * @returns A sorted copy, or the original nullish/empty value.
 *
 * @example
 * ```ts
 * sort([3, 1, 2]);                         // [1, 2, 3]
 * sort([3, 1, 2], null, "desc");           // [3, 2, 1]
 * sort([{ n: 2 }, { n: 1 }], (x) => x.n);  // [{ n: 1 }, { n: 2 }]
 * ```
 */
const sort = <T>(
  array: T[] | null | undefined,
  keyFun?: KeyFunction<T> | null,
  sortBy: "asc" | "desc" = "asc",
): T[] | null | undefined => {
  if (isEmpty(array)) return array;

  return [...array].sort((a, b) => {
    const ka = keyFun ? keyFun(a) : (a as number | string | Date);
    const kb = keyFun ? keyFun(b) : (b as number | string | Date);

    if (sortBy === "asc") {
      return ka < kb ? -1 : ka > kb ? 1 : 0;
    }

    return ka > kb ? -1 : ka < kb ? 1 : 0;
  });
};

export interface ArrayUtils {
  isEmpty<T>(array: T[] | null | undefined): array is null | undefined | [];
  isNotEmpty<T>(array: T[] | null | undefined): array is T[];
  unique<T>(
    values: T[] | null | undefined,
    keyFun?: (item: T) => string | number,
  ): T[] | null | undefined;
  difference<T>(
    arr1: T[] | null | undefined,
    arr2: T[] | null | undefined,
    keyFun: (item: T) => string | number,
  ): T[] | null | undefined;
  intersection<T>(
    arr1: T[] | null | undefined,
    arr2: T[] | null | undefined,
    keyFun: (item: T) => string | number,
  ): T[] | null | undefined;
  union<T>(
    arr1: T[] | null | undefined,
    arr2: T[] | null | undefined,
    keyFun: (item: T) => string | number,
  ): T[] | null | undefined;
  compact<T>(
    array: T[] | null | undefined,
  ): NonNullable<T>[] | null | undefined;
  flatten<T>(array: Array<T> | null | undefined): ReturnType<typeof flatten<T>>;
  deepFlatten<T>(
    array: Array<T | Array<T | Array<T>>> | null | undefined,
  ): T[] | null | undefined;
  chunk<T>(
    array: T[] | null | undefined,
    size: number,
  ): T[][] | null | undefined;
  shuffle<T>(array: T[] | null | undefined): T[] | null | undefined;
  move<T>(
    array: T[] | null | undefined,
    from?: number,
    to?: number | null,
  ): T[] | null | undefined;
  remove<T>(
    array: T[] | null | undefined,
    ...values: T[]
  ): T[] | null | undefined;
  insert<T>(
    array: T[] | null | undefined,
    index?: number,
    ...values: T[]
  ): T[] | null | undefined;
  first<T>(array: T[] | null | undefined): T | null | undefined;
  last<T>(array: T[] | null | undefined): T | null | undefined;
  sort<T>(
    array: T[] | null | undefined,
    keyFun?: KeyFunction<T> | null,
    sortBy?: "asc" | "desc",
  ): T[] | null | undefined;
}

export const arrayUtils: ArrayUtils = {
  isEmpty,
  isNotEmpty,
  unique,
  difference,
  intersection,
  union,
  compact,
  flatten,
  deepFlatten,
  chunk,
  shuffle,
  move,
  remove,
  insert,
  first,
  last,
  sort,
};

export {
  isEmpty,
  isNotEmpty,
  unique,
  difference,
  intersection,
  union,
  compact,
  flatten,
  deepFlatten,
  chunk,
  shuffle,
  move,
  remove,
  insert,
  first,
  last,
  sort,
};
