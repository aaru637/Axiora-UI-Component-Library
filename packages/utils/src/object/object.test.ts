import { describe, expect, it } from "vitest";
import {
  deepClone,
  deepEqual,
  deepEquals,
  entries,
  get,
  hasKey,
  invert,
  isPlainObject,
  keys,
  mapKeys,
  mapValues,
  merge,
  omit,
  pick,
  removeNull,
  removeUndefined,
  set,
  values,
} from "./object.utils";

describe("Object Utils", () => {
  /**
   * isPlainObject
   */
  it("isPlainObject returns true for plain objects", () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ name: "Axon" })).toBe(true);
    expect(isPlainObject(Object.create(null))).toBe(true);
  });

  it("isPlainObject returns false for non-plain values", () => {
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(new Date())).toBe(false);
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
    expect(isPlainObject("Axon")).toBe(false);
    expect(isPlainObject(new Map())).toBe(false);
  });

  /**
   * hasKey
   */
  it("hasKey returns true when the object owns the key", () => {
    expect(hasKey({ name: "Axon" }, "name")).toBe(true);
  });

  it("hasKey returns false for nullish objects or missing keys", () => {
    expect(hasKey(null, "name")).toBe(false);
    expect(hasKey({ name: "Axon" }, "age")).toBe(false);
  });

  /**
   * get
   */
  it("get returns the property value", () => {
    expect(get({ name: "Axon", age: 20 }, "name")).toBe("Axon");
  });

  it("get returns the default value for nullish objects or missing keys", () => {
    expect(
      get(null as { name: string; age: number } | null, "name", "default"),
    ).toBe("default");
    expect(get({ name: "Axon", age: 20 }, "age", 0)).toBe(20);
    expect(
      get({ name: "Axon" } as { name: string; age?: number }, "age", 0),
    ).toBe(0);
  });

  /**
   * set
   */
  it("set returns nullish objects unchanged", () => {
    expect(set(null, "a.b", 1)).toBe(null);
    expect(set(undefined, "a.b", 1)).toBe(undefined);
  });

  it("set assigns a nested value using a dot-separated path", () => {
    const obj = { user: { name: "Axon" } };
    set(obj, "user.age", 20);

    expect(obj).toEqual({ user: { name: "Axon", age: 20 } });
  });

  /**
   * merge
   */
  it("merge returns the defined object when one input is nullish", () => {
    expect(merge(null, { a: 1 })).toEqual({ a: 1 });
    expect(merge({ a: 1 }, null)).toEqual({ a: 1 });
  });

  it("merge deeply merges plain objects", () => {
    expect(
      merge({ a: 1, nested: { x: 1 } }, { b: 2, nested: { y: 2 } }),
    ).toEqual({
      a: 1,
      b: 2,
      nested: { x: 1, y: 2 },
    });
  });

  it("merge overwrites non-object values", () => {
    expect(merge({ a: 1, b: { c: 1 } }, { b: 2 })).toEqual({ a: 1, b: 2 });
  });

  /**
   * pick
   */
  it("pick returns nullish values unchanged", () => {
    expect(pick(null as { name: string } | null, ["name"])).toBe(null);
    expect(pick(undefined as { name: string } | undefined, ["name"])).toBe(
      undefined,
    );
  });

  it("pick selects the requested keys", () => {
    expect(pick({ name: "Axon", age: 20 }, ["name"])).toEqual({
      name: "Axon",
    });
    expect(
      pick({ name: "Axon", age: 20, active: true }, ["name", "active"]),
    ).toEqual({ name: "Axon", active: true });
  });

  it("pick returns an empty object when no keys are provided", () => {
    expect(pick({ name: "Axon" }, [])).toEqual({});
  });

  /**
   * omit
   */
  it("omit returns nullish values unchanged", () => {
    expect(omit(null, ["name"])).toBe(null);
    expect(omit(undefined, ["name"])).toBe(undefined);
  });

  it("omit removes the requested keys", () => {
    expect(omit({ name: "Axon", age: 20 }, ["age"])).toEqual({
      name: "Axon",
    });
    expect(
      omit({ name: "Axon", age: 20, active: true }, ["age", "active"]),
    ).toEqual({ name: "Axon" });
  });

  it("omit returns all keys when omit list is empty", () => {
    const obj = { name: "Axon", age: 20 };
    expect(omit(obj, [])).toEqual({ name: "Axon", age: 20 });
  });

  /**
   * keys
   */
  it("keys returns nullish values unchanged", () => {
    expect(keys(null)).toBe(null);
    expect(keys(undefined)).toBe(undefined);
  });

  it("keys returns object keys", () => {
    expect(keys({ a: 1, b: 2 })).toEqual(["a", "b"]);
  });

  /**
   * values
   */
  it("values returns nullish values unchanged", () => {
    expect(values(null)).toBe(null);
    expect(values(undefined)).toBe(undefined);
  });

  it("values returns object values", () => {
    expect(values({ a: 1, b: 2 })).toEqual([1, 2]);
  });

  /**
   * entries
   */
  it("entries returns nullish values unchanged", () => {
    expect(entries(null)).toBe(null);
    expect(entries(undefined)).toBe(undefined);
  });

  it("entries returns key-value pairs", () => {
    expect(entries({ a: 1, b: 2 })).toEqual([
      ["a", 1],
      ["b", 2],
    ]);
  });

  /**
   * invert
   */
  it("invert returns nullish values unchanged", () => {
    expect(invert(null)).toBe(null);
    expect(invert(undefined)).toBe(undefined);
  });

  it("invert swaps keys and values", () => {
    expect(invert({ a: "x", b: "y" })).toEqual({ x: "a", y: "b" });
    expect(invert({ one: 1, two: 2 })).toEqual({ 1: "one", 2: "two" });
  });

  /**
   * mapKeys
   */
  it("mapKeys returns nullish values unchanged", () => {
    expect(mapKeys(null, (key) => key)).toBe(null);
  });

  it("mapKeys transforms object keys", () => {
    expect(mapKeys({ a: 1, b: 2 }, (key) => key.toUpperCase())).toEqual({
      A: 1,
      B: 2,
    });
  });

  /**
   * mapValues
   */
  it("mapValues returns nullish values unchanged", () => {
    expect(mapValues(null, (value) => value)).toBe(null);
  });

  it("mapValues transforms object values", () => {
    expect(mapValues({ a: 1, b: 2 }, (value) => value * 2)).toEqual({
      a: 2,
      b: 4,
    });
  });

  /**
   * deepClone
   */
  it("deepClone clones plain objects deeply", () => {
    const obj = { name: "Axon", nested: { value: 1 } };
    const cloned = deepClone(obj);

    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.nested).not.toBe(obj.nested);
  });

  it("deepClone clones arrays deeply", () => {
    const arr = [1, [2, 3]];
    const cloned = deepClone(arr);

    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
    expect(cloned[1]).not.toBe(arr[1]);
  });

  it("deepClone returns nullish and primitive values as-is", () => {
    expect(deepClone(null)).toBe(null);
    expect(deepClone(undefined)).toBe(undefined);
    expect(deepClone(42)).toBe(42);
    expect(deepClone("Axon")).toBe("Axon");
  });

  it("deepClone clones dates", () => {
    const date = new Date("2024-01-01T00:00:00.000Z");
    const cloned = deepClone(date);

    expect(cloned).toEqual(date);
    expect(cloned).not.toBe(date);
    expect(cloned).toBeInstanceOf(Date);
  });

  /**
   * deepEqual / deepEquals
   */
  it("deepEqual returns true for structurally equal values", () => {
    expect(deepEqual({ name: "Axon" }, { name: "Axon" })).toBe(true);
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(deepEqual(new Date("2024-01-01"), new Date("2024-01-01"))).toBe(
      true,
    );
  });

  it("deepEqual returns false for different values", () => {
    expect(deepEqual({ name: "Axon" }, { name: "Other" })).toBe(false);
    expect(deepEqual([1, 2], [1, 3])).toBe(false);
    expect(deepEqual(null, {})).toBe(false);
  });

  it("deepEqual handles nullish values", () => {
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(undefined, undefined)).toBe(true);
    expect(deepEqual(null, undefined)).toBe(false);
  });

  it("deepEquals is an alias for deepEqual", () => {
    expect(deepEquals({ a: 1 }, { a: 1 })).toBe(true);
    expect(deepEquals).toBe(deepEqual);
  });

  /**
   * removeUndefined
   */
  it("removeUndefined returns nullish values unchanged", () => {
    expect(removeUndefined(null)).toBe(null);
    expect(removeUndefined(undefined)).toBe(undefined);
  });

  it("removeUndefined removes undefined properties", () => {
    expect(removeUndefined({ a: 1, b: undefined, c: "Axon", d: null })).toEqual(
      {
        a: 1,
        c: "Axon",
        d: null,
      },
    );
  });

  /**
   * removeNull
   */
  it("removeNull returns nullish values unchanged", () => {
    expect(removeNull(null)).toBe(null);
    expect(removeNull(undefined)).toBe(undefined);
  });

  it("removeNull removes null properties", () => {
    expect(removeNull({ a: 1, b: null, c: "Axon", d: undefined })).toEqual({
      a: 1,
      c: "Axon",
      d: undefined,
    });
  });
});
