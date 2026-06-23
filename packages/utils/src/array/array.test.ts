import { afterEach, describe, expect, it, vi } from "vitest";
import {
  chunk,
  compact,
  deepFlatten,
  difference,
  first,
  flatten,
  insert,
  intersection,
  isEmpty,
  isNotEmpty,
  last,
  move,
  remove,
  shuffle,
  sort,
  union,
  unique,
} from "./array.utils";

describe("Array Utils", () => {
  /**
   * isEmpty
   */
  it("isEmpty returns true for null and undefined", () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  it("isEmpty returns true for an empty array", () => {
    expect(isEmpty([])).toBe(true);
  });

  it("isEmpty returns false for a non-empty array", () => {
    expect(isEmpty([1])).toBe(false);
    expect(isEmpty([1, 2, 3])).toBe(false);
  });

  /**
   * isNotEmpty
   */
  it("isNotEmpty returns false for null and undefined", () => {
    expect(isNotEmpty(null)).toBe(false);
    expect(isNotEmpty(undefined)).toBe(false);
  });

  it("isNotEmpty returns false for an empty array", () => {
    expect(isNotEmpty([])).toBe(false);
  });

  it("isNotEmpty returns true for a non-empty array", () => {
    expect(isNotEmpty([1])).toBe(true);
    expect(isNotEmpty([1, 2, 3])).toBe(true);
  });

  /**
   * unique
   */
  it("unique returns nullish values unchanged", () => {
    expect(unique(null)).toBe(null);
    expect(unique(undefined)).toBe(undefined);
  });

  it("unique returns an empty array unchanged", () => {
    expect(unique([])).toEqual([]);
  });

  it("unique removes primitive duplicates", () => {
    expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
  });

  it("unique removes duplicates by key when keyFun is provided", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 1 }];
    expect(unique(input, (item) => item.id)).toEqual([{ id: 1 }, { id: 2 }]);
  });

  /**
   * difference
   */
  it("difference returns nullish or empty arr1 unchanged", () => {
    expect(difference(null, [1], (x) => x)).toBe(null);
    expect(difference(undefined, [1], (x) => x)).toBe(undefined);
    expect(difference([], [1], (x) => x)).toEqual([]);
  });

  it("difference returns arr2 when arr2 is nullish or empty", () => {
    expect(difference([1, 2], null, (x) => x)).toBe(null);
    expect(difference([1, 2], undefined, (x) => x)).toBe(undefined);
    expect(difference([1, 2], [], (x) => x)).toEqual([]);
  });

  it("difference returns items in arr1 not present in arr2 by key", () => {
    const arr1 = [
      { id: 1, name: "a" },
      { id: 2, name: "b" },
      { id: 3, name: "c" },
    ];
    const arr2 = [{ id: 2, name: "b" }];

    expect(difference(arr1, arr2, (item) => item.id)).toEqual([
      { id: 1, name: "a" },
      { id: 3, name: "c" },
    ]);
  });

  /**
   * intersection
   */
  it("intersection returns nullish or empty arr1 unchanged", () => {
    expect(intersection(null, [1], (x) => x)).toBe(null);
    expect(intersection([], [1], (x) => x)).toEqual([]);
  });

  it("intersection returns arr2 when arr2 is nullish or empty", () => {
    expect(intersection([1, 2], null, (x) => x)).toBe(null);
    expect(intersection([1, 2], [], (x) => x)).toEqual([]);
  });

  it("intersection returns shared items by key", () => {
    const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const arr2 = [{ id: 2 }, { id: 4 }];

    expect(intersection(arr1, arr2, (item) => item.id)).toEqual([{ id: 2 }]);
  });

  /**
   * union
   */
  it("union returns nullish or empty arr1 unchanged", () => {
    expect(union(null, [1], (x) => x)).toBe(null);
    expect(union([], [1], (x) => x)).toEqual([]);
  });

  it("union returns arr2 when arr2 is nullish or empty", () => {
    expect(union([1, 2], null, (x) => x)).toBe(null);
    expect(union([1, 2], [], (x) => x)).toEqual([]);
  });

  it("union merges arrays and overwrites duplicate keys with arr2 values", () => {
    const arr1 = [{ id: 1, name: "a" }];
    const arr2 = [
      { id: 1, name: "b" },
      { id: 2, name: "c" },
    ];

    expect(union(arr1, arr2, (item) => item.id)).toEqual([
      { id: 1, name: "b" },
      { id: 2, name: "c" },
    ]);
  });

  /**
   * compact
   */
  it("compact returns nullish or empty values unchanged", () => {
    expect(compact(null)).toBe(null);
    expect(compact(undefined)).toBe(undefined);
    expect(compact([])).toEqual([]);
  });

  it("compact removes falsy values", () => {
    expect(
      compact([0, 1, false, 2, "", 3, null, undefined, Number.NaN]),
    ).toEqual([1, 2, 3]);
  });

  /**
   * flatten
   */
  it("flatten returns nullish or empty values unchanged", () => {
    expect(flatten(null)).toBe(null);
    expect(flatten(undefined)).toBe(undefined);
    expect(flatten([])).toEqual([]);
  });

  it("flatten flattens one level", () => {
    expect(flatten([1, [2, 3], 4])).toEqual([1, 2, 3, 4]);
  });

  /**
   * deepFlatten
   */
  it("deepFlatten returns nullish or empty values unchanged", () => {
    expect(deepFlatten(null)).toBe(null);
    expect(deepFlatten(undefined)).toBe(undefined);
    expect(deepFlatten([])).toEqual([]);
  });

  it("deepFlatten flattens nested arrays recursively", () => {
    expect(deepFlatten([1, [2, [3, 4]], 5])).toEqual([1, 2, 3, 4, 5]);
  });

  /**
   * chunk
   */
  it("chunk returns nullish or empty values unchanged", () => {
    expect(chunk(null)).toBe(null);
    expect(chunk(undefined)).toBe(undefined);
    expect(chunk([])).toEqual([]);
  });

  it("chunk splits an array into groups of the given size", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it("chunk defaults size to 1", () => {
    expect(chunk([1, 2, 3])).toEqual([[1], [2], [3]]);
  });

  /**
   * shuffle
   */
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shuffle returns nullish or empty values unchanged", () => {
    expect(shuffle(null)).toBe(null);
    expect(shuffle(undefined)).toBe(undefined);
    expect(shuffle([])).toEqual([]);
  });

  it("shuffle returns a deterministic permutation when random is mocked", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    expect(shuffle([1, 2, 3])).toEqual([3, 1, 2]);
  });

  it("shuffle returns a reordering of the same elements", () => {
    const input = [1, 2, 3, 4];
    const result = shuffle(input);

    expect(result).not.toBe(input);
    expect(result?.sort()).toEqual(input.sort());
  });

  /**
   * move
   */
  it("move returns the original array when array is empty or to is nullish", () => {
    const input = [1, 2, 3];
    expect(move(null, 0, 1)).toBe(null);
    expect(move([], 0, 1)).toEqual([]);
    expect(move(input, 0, undefined)).toBe(input);
    expect(move(input, 0, null)).toBe(input);
  });

  it("move relocates an item from one index to another", () => {
    expect(move(["a", "b", "c"], 0, 2)).toEqual(["b", "c", "a"]);
    expect(move([1, 2, 3, 4], 1, 3)).toEqual([1, 3, 4, 2]);
  });

  /**
   * remove
   */
  it("remove returns the original array when array or values are empty", () => {
    const input = [1, 2, 3];
    expect(remove(null, 1)).toBe(null);
    expect(remove([], 1)).toEqual([]);
    expect(remove(input)).toBe(input);
  });

  it("remove excludes all matching values using strict equality", () => {
    expect(remove([1, 2, 3, 2, 4], 2)).toEqual([1, 3, 4]);
    expect(remove(["a", "b", "c"], "a", "c")).toEqual(["b"]);
  });

  /**
   * insert
   */
  it("insert returns the original array when array or values are empty", () => {
    const input = [1, 2, 3];
    expect(insert(null, 0, 1)).toBe(null);
    expect(insert([], 0, 1)).toEqual([]);
    expect(insert(input, 0)).toBe(input);
  });

  it("insert adds values at the given index", () => {
    expect(insert([1, 3], 1, 2)).toEqual([1, 2, 3]);
    expect(insert([2, 3], 0, 1)).toEqual([1, 2, 3]);
    expect(insert([1, 2], 2, 3, 4)).toEqual([1, 2, 3, 4]);
  });

  /**
   * first
   */
  it("first returns null for nullish or empty arrays", () => {
    expect(first(null)).toBe(null);
    expect(first(undefined)).toBe(null);
    expect(first([])).toBe(null);
  });

  it("first returns the first element", () => {
    expect(first([1, 2, 3])).toBe(1);
    expect(first(["a", "b"])).toBe("a");
  });

  /**
   * last
   */
  it("last returns null for nullish or empty arrays", () => {
    expect(last(null)).toBe(null);
    expect(last(undefined)).toBe(null);
    expect(last([])).toBe(null);
  });

  it("last returns the last element", () => {
    expect(last([1, 2, 3])).toBe(3);
    expect(last(["a", "b"])).toBe("b");
  });

  /**
   * sort
   */
  it("sort returns nullish or empty values unchanged", () => {
    expect(sort(null)).toBe(null);
    expect(sort(undefined)).toBe(undefined);
    expect(sort([])).toEqual([]);
  });

  it("sort sorts primitives in ascending order by default", () => {
    expect(sort([3, 1, 2])).toEqual([1, 2, 3]);
  });

  it("sort sorts primitives in descending order", () => {
    expect(sort([3, 1, 2], null, "desc")).toEqual([3, 2, 1]);
  });

  it("sort sorts objects by keyFun", () => {
    const input = [{ n: 3 }, { n: 1 }, { n: 2 }];
    expect(sort(input, (item) => item.n)).toEqual([
      { n: 1 },
      { n: 2 },
      { n: 3 },
    ]);
  });

  it("sort sorts objects in descending order by keyFun", () => {
    const input = [{ n: 1 }, { n: 3 }, { n: 2 }];
    expect(sort(input, (item) => item.n, "desc")).toEqual([
      { n: 3 },
      { n: 2 },
      { n: 1 },
    ]);
  });
});
