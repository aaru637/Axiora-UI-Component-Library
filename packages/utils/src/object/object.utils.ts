import {
  isArray,
  isDate,
  isNotNullOrUndefined,
  isNull,
  isNullOrUndefined,
  isObject,
} from "../common/common.utils";

/**
 * Checks whether a value is a plain object (e.g. `{}` or `Object.create(null)`).
 * Excludes arrays, dates, and class instances.
 *
 * @param value - The value to check.
 * @returns `true` when the value is a plain object.
 *
 * @example
 * ```ts
 * isPlainObject({});              // true
 * isPlainObject(Object.create(null)); // true
 * isPlainObject([]);              // false
 * isPlainObject(new Date());      // false
 * isPlainObject(null);            // false
 * ```
 */
const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (!isNotNullOrUndefined(value) || typeof value !== "object") {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  return prototype === null || prototype === Object.prototype;
};

/**
 * Checks whether an object has an own property for the given key.
 *
 * @param obj - The object to inspect.
 * @param key - The property key to check.
 * @returns `true` when the key exists on the object.
 */
const hasKey = <T extends object>(
  obj: T | null | undefined,
  key: PropertyKey,
): key is keyof T => {
  return (
    isNotNullOrUndefined(obj) && Object.prototype.hasOwnProperty.call(obj, key)
  );
};

/**
 * Returns a property value, or a default when the object or value is nullish.
 *
 * @param obj - The source object.
 * @param key - The property key to read.
 * @param defaultValue - Value returned when the property is missing or nullish.
 */
const get = <T, K extends keyof T, D = undefined>(
  obj: T | null | undefined,
  key: K,
  defaultValue?: D,
): T[K] | D => {
  if (isNullOrUndefined(obj)) return defaultValue as D;

  return (obj[key] ?? defaultValue) as T[K] | D;
};

/**
 * Sets a nested property on an object using a dot-separated path.
 *
 * @param obj - The target object.
 * @param path - Dot-separated property path.
 * @param value - Value to assign.
 * @returns The updated object, or the original nullish value.
 */
const set = <T extends object>(
  obj: T | null | undefined,
  path: string,
  value: unknown,
): T | null | undefined => {
  if (isNullOrUndefined(obj)) return obj;

  const keys = path.split(".");
  let current: Record<string, unknown> = obj as Record<string, unknown>;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    if (!isObject(current[key])) {
      current[key] = {};
    }

    current = current[key] as Record<string, unknown>;
  }

  current[keys[keys.length - 1]] = value;

  return obj;
};

/**
 * Deep merges two objects. Nested plain objects are merged recursively.
 *
 * @param obj1 - The first object.
 * @param obj2 - The second object.
 * @returns The merged object, or whichever input is defined when one is nullish.
 */
const merge = <T extends object, U extends object>(
  obj1: T | null | undefined,
  obj2: U | null | undefined,
): (T & U) | null | undefined => {
  if (isNullOrUndefined(obj1)) return obj2 as T & U;
  if (isNullOrUndefined(obj2)) return obj1 as T & U;

  const result: Record<PropertyKey, unknown> = {
    ...(obj1 as Record<PropertyKey, unknown>),
  };

  for (const key in obj2) {
    const value1 = result[key];
    const value2 = obj2[key];

    if (isPlainObject(value1) && isPlainObject(value2)) {
      result[key] = merge(value1, value2);
    } else {
      result[key] = value2;
    }
  }

  return result as T & U;
};

/**
 * Keeps only the specified properties from an object.
 *
 * @param obj - The source object.
 * @param keys - Property keys to keep.
 * @returns A new object with only the selected keys.
 *
 * @example
 * ```ts
 * pick({ name: "Axiora UI", age: 20 }, ["name"]); // { name: "Axiora UI" }
 * pick(null, ["name"]);                      // null
 * ```
 */
const pick = <T extends object, K extends keyof T>(
  obj: T | null | undefined,
  keys: K[],
): Pick<T, K> | null | undefined => {
  if (isNullOrUndefined(obj)) return obj;

  return keys.reduce(
    (acc, key) => {
      acc[key] = obj[key];
      return acc;
    },
    {} as Pick<T, K>,
  );
};

/**
 * Removes the specified properties from an object.
 *
 * @param obj - The source object.
 * @param keys - Property keys to remove.
 * @returns A new object without the omitted keys.
 *
 * @example
 * ```ts
 * omit({ name: "Axiora UI", age: 20 }, ["age"]); // { name: "Axiora UI" }
 * ```
 */
const omit = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T | null | undefined,
  keys: K[],
): Omit<T, K> | null | undefined => {
  if (isNullOrUndefined(obj)) return obj;

  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as K)),
  ) as Omit<T, K>;
};

/**
 * Returns the own enumerable keys of an object.
 *
 * @param obj - The source object.
 * @returns An array of keys, or the original nullish value.
 */
const keys = <T extends object>(
  obj: T | null | undefined,
): (keyof T)[] | null | undefined => {
  if (isNullOrUndefined(obj)) return obj;

  return Object.keys(obj) as (keyof T)[];
};

/**
 * Returns the own enumerable values of an object.
 *
 * @param obj - The source object.
 * @returns An array of values, or the original nullish value.
 */
const values = <T extends object>(
  obj: T | null | undefined,
): T[keyof T][] | null | undefined => {
  if (isNullOrUndefined(obj)) return obj;

  return Object.values(obj) as T[keyof T][];
};

/**
 * Returns the own enumerable key-value pairs of an object.
 *
 * @param obj - The source object.
 * @returns An array of entries, or the original nullish value.
 */
const entries = <T extends object>(
  obj: T | null | undefined,
): [keyof T, T[keyof T]][] | null | undefined => {
  if (isNullOrUndefined(obj)) return obj;

  return Object.entries(obj) as [keyof T, T[keyof T]][];
};

/**
 * Swaps keys and values in an object.
 *
 * @param obj - The source object. Values must be valid property keys.
 * @returns A new object with keys and values inverted.
 *
 * @example
 * ```ts
 * invert({ a: "x", b: "y" }); // { x: "a", y: "b" }
 * ```
 */
const invert = <T extends Record<string, string | number>>(
  obj: T | null | undefined,
): Record<string, string> | null | undefined => {
  if (isNullOrUndefined(obj)) return obj;

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [String(value), key]),
  );
};

/**
 * Transforms each key in an object using the provided function.
 *
 * @param obj - The source object.
 * @param fn - Function that receives the key and value and returns a new key.
 * @returns A new object with transformed keys.
 */
const mapKeys = <T extends Record<string, unknown>>(
  obj: T | null | undefined,
  fn: (key: string, value: T[keyof T]) => string,
): Record<string, T[keyof T]> | null | undefined => {
  if (isNullOrUndefined(obj)) return obj;

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      fn(key, value as T[keyof T]),
      value,
    ]),
  ) as Record<string, T[keyof T]>;
};

/**
 * Transforms each value in an object using the provided function.
 *
 * @param obj - The source object.
 * @param fn - Function that receives the value and key and returns a new value.
 * @returns A new object with transformed values.
 */
const mapValues = <T extends Record<string, unknown>, R>(
  obj: T | null | undefined,
  fn: (value: T[keyof T], key: string) => R,
): Record<string, R> | null | undefined => {
  if (isNullOrUndefined(obj)) return obj;

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      fn(value as T[keyof T], key),
    ]),
  ) as Record<string, R>;
};

/**
 * Creates a deep copy of a value.
 * Supports plain objects, arrays, dates, and primitives.
 *
 * @param value - The value to clone.
 * @returns A deep clone of the input value.
 */
const deepClone = <T>(value: T): T => {
  if (isNullOrUndefined(value)) return value;
  if (isDate(value)) return new Date(value.getTime()) as T;

  if (isArray(value)) {
    return value.map((item) => deepClone(item)) as T;
  }

  if (isPlainObject(value)) {
    const result: Record<string, unknown> = {};

    for (const key of Object.keys(value)) {
      result[key] = deepClone(value[key]);
    }

    return result as T;
  }

  return value;
};

/**
 * Performs a deep equality comparison between two values.
 *
 * @param a - The first value.
 * @param b - The second value.
 * @returns `true` when both values are deeply equal.
 */
const deepEqual = (a: unknown, b: unknown): boolean => {
  if (Object.is(a, b)) return true;
  if (isNullOrUndefined(a) || isNullOrUndefined(b)) return false;

  if (isDate(a) && isDate(b)) {
    return a.getTime() === b.getTime();
  }

  if (isArray(a) && isArray(b)) {
    if (a.length !== b.length) return false;

    return a.every((item, index) => deepEqual(item, b[index]));
  }

  if (isPlainObject(a) && isPlainObject(b)) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    return keysA.every((key) => deepEqual(a[key], b[key]));
  }

  return false;
};

/** @deprecated Use {@link deepEqual} instead. */
const deepEquals = deepEqual;

/**
 * Removes properties with `undefined` values from an object.
 *
 * @param obj - The source object.
 * @returns A new object without `undefined` properties.
 */
const removeUndefined = <T extends Record<string, unknown>>(
  obj: T | null | undefined,
): Partial<T> | null | undefined => {
  if (isNullOrUndefined(obj)) return obj;

  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined),
  ) as Partial<T>;
};

/**
 * Removes properties with `null` values from an object.
 *
 * @param obj - The source object.
 * @returns A new object without `null` properties.
 */
const removeNull = <T extends Record<string, unknown>>(
  obj: T | null | undefined,
): Partial<T> | null | undefined => {
  if (isNullOrUndefined(obj)) return obj;

  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => !isNull(value)),
  ) as Partial<T>;
};

export {
  isPlainObject,
  hasKey,
  get,
  set,
  merge,
  pick,
  omit,
  keys,
  values,
  entries,
  invert,
  mapKeys,
  mapValues,
  deepClone,
  deepEqual,
  deepEquals,
  removeUndefined,
  removeNull,
};
