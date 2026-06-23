import { v4 as uuidv4 } from "uuid";

/**
 * Common type-checking utilities.
 */

/**
 * Empty string constant used for string comparisons.
 *
 * @example
 * ```ts
 * value === EMPTY_STRING; // true when value is ""
 * ```
 */
const EMPTY_STRING = "";

/**
 * Checks whether a value is strictly `null`.
 *
 * @param value - The value to check.
 * @returns `true` if the value is `null`, otherwise `false`.
 *
 * @example
 * ```ts
 * isNull(null);       // true
 * isNull(undefined);  // false
 * isNull("");         // false
 * ```
 */
const isNull = (value: unknown): value is null => value === null;

/**
 * Checks whether a value is strictly `undefined`.
 *
 * @param value - The value to check.
 * @returns `true` if the value is `undefined`, otherwise `false`.
 *
 * @example
 * ```ts
 * isUndefined(undefined); // true
 * isUndefined(null);        // false
 * isUndefined("");          // false
 * ```
 */
const isUndefined = (value: unknown): value is undefined => value === undefined;

/**
 * Checks whether a value is `null` or `undefined`.
 *
 * @param value - The value to check.
 * @returns `true` if the value is `null` or `undefined`, otherwise `false`.
 *
 * @example
 * ```ts
 * isNullOrUndefined(null);       // true
 * isNullOrUndefined(undefined);  // true
 * isNullOrUndefined("");          // false
 * ```
 */
const isNullOrUndefined = (value: unknown): value is null | undefined =>
  value === null || value === undefined;

/**
 * Checks whether a value is not `null`.
 *
 * @param value - The value to check.
 * @returns `true` if the value is not `null`, otherwise `false`.
 *
 * @example
 * ```ts
 * isNotNull(null);       // false
 * isNotNull(undefined);  // true
 * isNotNull("");         // true
 * ```
 */
const isNotNull = (value: unknown): boolean => !isNull(value);

/**
 * Checks whether a value is neither `null` nor `undefined`.
 *
 * @param value - The value to check.
 * @returns `true` if the value is defined, otherwise `false`.
 *
 * @example
 * ```ts
 * isNotNullOrUndefined(null);       // false
 * isNotNullOrUndefined(undefined);  // false
 * isNotNullOrUndefined("");         // true
 * ```
 */
const isNotNullOrUndefined = (value: unknown): boolean =>
  !isNullOrUndefined(value);

/**
 * Checks whether a value is a string.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a string, otherwise `false`.
 *
 * @example
 * ```ts
 * isString("Axon"); // true
 * isString("");     // true
 * isString(12);     // false
 * isString(null);   // false
 * ```
 */
const isString = (value: unknown): value is string =>
  isNotNullOrUndefined(value) && typeof value === "string";

/**
 * Checks whether a value is a valid number.
 * Excludes `NaN`.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a number and not `NaN`, otherwise `false`.
 *
 * @example
 * ```ts
 * isNumber(12);           // true
 * isNumber(Number.NaN);   // false
 * isNumber("12");         // false
 * isNumber(null);         // false
 * ```
 */
const isNumber = (value: unknown): value is number =>
  isNotNullOrUndefined(value) &&
  typeof value === "number" &&
  !Number.isNaN(value);

/**
 * Checks whether a value is a boolean.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a boolean, otherwise `false`.
 *
 * @example
 * ```ts
 * isBoolean(true);   // true
 * isBoolean(false);  // true
 * isBoolean("true"); // false
 * isBoolean(1);      // false
 * ```
 */
const isBoolean = (value: unknown): value is boolean =>
  isNotNullOrUndefined(value) && typeof value === "boolean";

/**
 * Checks whether a value is a valid `Date` instance.
 * Excludes invalid dates where `getTime()` returns `NaN`.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a valid date, otherwise `false`.
 *
 * @example
 * ```ts
 * isDate(new Date("2024-01-01")); // true
 * isDate(new Date("invalid"));    // false
 * isDate("2024-01-01");           // false
 * ```
 */
const isDate = (value: unknown): value is Date =>
  isNotNullOrUndefined(value) &&
  value instanceof Date &&
  !Number.isNaN(value.getTime());

/**
 * Checks whether a value is an array.
 *
 * @param value - The value to check.
 * @returns `true` if the value is an array, otherwise `false`.
 *
 * @example
 * ```ts
 * isArray([]);        // true
 * isArray([1, 2, 3]); // true
 * isArray({});        // false
 * isArray(null);      // false
 * ```
 */
const isArray = <T = unknown>(value: unknown): value is T[] =>
  isNotNullOrUndefined(value) && Array.isArray(value);

/**
 * Checks whether the value is a plain object.
 * Excludes:
 * - `null`
 * - arrays
 * - valid `Date` instances
 *
 * @param value - The value to check.
 * @returns `true` if the value is a plain object, otherwise `false`.
 *
 * @example
 * ```ts
 * isObject({ name: "Axon" }); // true
 * isObject([]);               // false
 * isObject(new Date());       // false
 * isObject(null);             // false
 * ```
 */
const isObject = (value: unknown): value is Record<string, unknown> => {
  return (
    isNotNullOrUndefined(value) &&
    typeof value === "object" &&
    !isArray(value) &&
    !isDate(value)
  );
};

/**
 * Returns the default value if the value is `null` or `undefined`.
 *
 * @param value - The value to check.
 * @param defaultValue - The default value to return.
 * @returns The value if it is not `null` or `undefined`, otherwise the default value.
 */
const defaultIfNullOrUndefined = <T>(
  value: unknown,
  defaultValue: T,
): unknown => (isNotNullOrUndefined(value) ? value : defaultValue);

/**
 * A no-operation function that does nothing.
 *
 * @example
 * ```ts
 * noop(); // does nothing
 * ```
 */
const noop = (): void => {};

/**
 * Returns the value itself.
 *
 * @param value - The value to return.
 * @returns The value itself.
 *
 * @example
 * ```ts
 * identity(12); // 12
 * identity("Axon"); // "Axon"
 * identity(true); // true
 * identity(null); // null
 * identity(undefined); // undefined
 * ```
 */
const identity = <T>(value: T): T => value;

/**
 * Sleeps for a given number of milliseconds.
 *
 * @param ms - The number of milliseconds to sleep.
 * @returns A promise that resolves after the given number of milliseconds.
 *
 * @example
 * ```ts
 * sleep(1000); // waits for 1 second
 * ```
 */
const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const debounce = <T extends (...args: Parameters<T>) => void>(
  func: T,
  wait: number,
): T => {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return function (this: ThisType<T>, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  } as T;
};

/**
 * Throttles a function to be called at most once every `wait` milliseconds.
 *
 * @param func - The function to throttle.
 * @param wait - The number of milliseconds to wait.
 * @returns The throttled function.
 */
const throttle = <T extends (...args: Parameters<T>) => void>(
  func: T,
  wait: number,
): T => {
  let lastCallTime = 0;
  return function (this: ThisType<T>, ...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastCallTime < wait) {
      return;
    }
    lastCallTime = now;
    func.apply(this, args);
  } as T;
};

/**
 * Generates a UUID.
 *
 * @returns A UUID.
 *
 * @example
 * ```ts
 * generateUUID(); // "123e4567-e89b-12d3-a456-426614174000"
 * ```
 */
const generateUUID = (): string => {
  return uuidv4();
};

/**
 * Exports the common utilities.
 */
export interface CommonUtils {
  readonly EMPTY_STRING: "";
  isNull(value: unknown): value is null;
  isNullOrUndefined(value: unknown): value is null | undefined;
  isUndefined(value: unknown): value is undefined;
  isNotNull(value: unknown): boolean;
  isNotNullOrUndefined(value: unknown): boolean;
  isString(value: unknown): value is string;
  isNumber(value: unknown): value is number;
  isBoolean(value: unknown): value is boolean;
  isDate(value: unknown): value is Date;
  isArray(value: unknown): value is unknown[];
  isObject(value: unknown): value is object;
  defaultIfNullOrUndefined<T>(value: unknown, defaultValue: T): unknown;
  noop(): void;
  identity<T>(value: T): T;
  sleep(ms: number): Promise<void>;
  debounce<T extends (...args: Parameters<T>) => void>(
    func: T,
    wait: number,
  ): T;
  throttle<T extends (...args: Parameters<T>) => void>(
    func: T,
    wait: number,
  ): T;
  generateUUID(): string;
}

export const commonUtils: CommonUtils = {
  EMPTY_STRING,
  isNull,
  isNullOrUndefined,
  isUndefined,
  isNotNull,
  isNotNullOrUndefined,
  isString,
  isNumber,
  isBoolean,
  isDate,
  isArray,
  isObject,
  defaultIfNullOrUndefined,
  noop,
  identity,
  sleep,
  debounce,
  throttle,
  generateUUID,
};

export {
  EMPTY_STRING,
  isNull,
  isNullOrUndefined,
  isUndefined,
  isNotNull,
  isNotNullOrUndefined,
  isString,
  isNumber,
  isBoolean,
  isDate,
  isArray,
  isObject,
  defaultIfNullOrUndefined,
  noop,
  identity,
  sleep,
  debounce,
  throttle,
  generateUUID,
};
