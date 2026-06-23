import { isNullOrUndefined } from "../common/common.utils";

/**
 * Converts a value to a boolean.
 *
 * @param value - The value to convert.
 * @returns A boolean representation of the value.
 */
const toBoolean = (value: unknown): boolean => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return normalized === "true" || normalized === "1";
  }

  return Boolean(value);
};

/**
 * Checks whether a value is strictly `true`.
 */
const isTrue = (value: unknown): value is true => value === true;

/**
 * Checks whether a value is strictly `false`.
 */
const isFalse = (value: unknown): value is false => value === false;

/**
 * Flips a boolean value.
 */
const toggle = (value: boolean): boolean => !value;

/**
 * Returns `true` when every value in the array is `true`.
 */
const allTrue = (array: boolean[] | null | undefined): boolean => {
  if (isNullOrUndefined(array) || array.length === 0) return false;

  return array.every(isTrue);
};

/**
 * Returns `true` when at least one value in the array is `true`.
 */
const anyTrue = (array: boolean[] | null | undefined): boolean => {
  if (isNullOrUndefined(array) || array.length === 0) return false;

  return array.some(isTrue);
};

/**
 * Returns `true` when no values in the array are `true`.
 */
const noneTrue = (array: boolean[] | null | undefined): boolean => {
  if (isNullOrUndefined(array) || array.length === 0) return true;

  return !array.some(isTrue);
};

/**
 * Exclusive OR for two boolean values.
 */
const xor = (a: boolean, b: boolean): boolean => a !== b;

/**
 * Logical AND for two boolean values.
 */
const and = (a: boolean, b: boolean): boolean => a && b;

/**
 * Logical OR for two boolean values.
 */
const or = (a: boolean, b: boolean): boolean => a || b;

export interface BooleanUtils {
  toBoolean(value: unknown): boolean;
  isTrue(value: unknown): value is true;
  isFalse(value: unknown): value is false;
  toggle(value: boolean): boolean;
  allTrue(array: boolean[] | null | undefined): boolean;
  anyTrue(array: boolean[] | null | undefined): boolean;
  noneTrue(array: boolean[] | null | undefined): boolean;
  xor(a: boolean, b: boolean): boolean;
  and(a: boolean, b: boolean): boolean;
  or(a: boolean, b: boolean): boolean;
}

export const booleanUtils: BooleanUtils = {
  toBoolean,
  isTrue,
  isFalse,
  toggle,
  allTrue,
  anyTrue,
  noneTrue,
  xor,
  and,
  or,
};

export {
  toBoolean,
  isTrue,
  isFalse,
  toggle,
  allTrue,
  anyTrue,
  noneTrue,
  xor,
  and,
  or,
};
