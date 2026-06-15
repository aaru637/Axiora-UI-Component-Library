import { EMPTY_STRING, isNullOrUndefined } from "../common/common.utils";

/**
 * Returns `true` when the value is `null`, `undefined`, or an empty string (`""`).
 * Whitespace-only strings such as `"   "` are not considered empty.
 *
 * @param value - String value to evaluate.
 * @returns `true` for nullish or empty string values.
 *
 * @example
 * ```ts
 * isEmptyString(null);   // true
 * isEmptyString("");     // true
 * isEmptyString("   ");  // false
 * isEmptyString("Axon"); // false
 * ```
 */
const isEmptyString = (value: string | null | undefined): boolean =>
  isNullOrUndefined(value) || value === EMPTY_STRING;

/**
 * Returns `true` when the value is a non-empty string.
 * Inverse of {@link isEmptyString}.
 *
 * @param value - String value to evaluate.
 * @returns `true` for any value that is not nullish or empty.
 *
 * @example
 * ```ts
 * isNotEmptyString(null);   // false
 * isNotEmptyString("");     // false
 * isNotEmptyString("   ");  // true
 * isNotEmptyString("Axon"); // true
 * ```
 */
const isNotEmptyString = (value: string | null | undefined): boolean =>
  !isEmptyString(value);

export { isEmptyString, isNotEmptyString };
