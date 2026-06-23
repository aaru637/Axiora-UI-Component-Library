import { isNullOrUndefined } from "../common/common.utils";

/**
 * Clamps a number between a minimum and maximum bound.
 * Returns nullish values unchanged.
 *
 * @param value - Number to clamp.
 * @param min - Lower bound. Defaults to `1`.
 * @param max - Upper bound. Defaults to `1`.
 * @returns The clamped number, or the original nullish value.
 *
 * @example
 * ```ts
 * clamp(5, 0, 10);  // 5
 * clamp(15, 0, 10); // 10
 * clamp(-3, 0, 10); // 0
 * clamp(null);      // null
 * ```
 */
const clamp = (
  value: number | null | undefined,
  min = 1,
  max = 1,
): number | null | undefined => {
  return isNullOrUndefined(value) ? value : Math.min(Math.max(value, min), max);
};

/**
 * Rounds a number to a fixed number of decimal places.
 * Returns nullish values unchanged.
 *
 * @param value - Number to round.
 * @param decimals - Number of decimal places. Defaults to `2`.
 * @returns The rounded number, or the original nullish value.
 *
 * @example
 * ```ts
 * round(1.2345);    // 1.23
 * round(1.235, 2);  // 1.24
 * round(10, 0);     // 10
 * round(null);      // null
 * ```
 */
const round = (
  value: number | null | undefined,
  decimals = 2,
): number | null | undefined => {
  if (isNullOrUndefined(value)) return value;

  const factor = Math.pow(10, decimals);

  return Math.round(value * factor) / factor;
};

/**
 * Returns the largest integer less than or equal to a number.
 * Returns nullish values unchanged.
 *
 * @param value - Number to floor.
 * @returns The floored number, or the original nullish value.
 *
 * @example
 * ```ts
 * floor(4.9);  // 4
 * floor(-4.1); // -5
 * floor(null); // null
 * ```
 */
const floor = (value: number | null | undefined): number | null | undefined => {
  return isNullOrUndefined(value) ? value : Math.floor(value);
};

/**
 * Returns the smallest integer greater than or equal to a number.
 * Returns nullish values unchanged.
 *
 * @param value - Number to ceil.
 * @returns The ceiled number, or the original nullish value.
 *
 * @example
 * ```ts
 * ceil(4.1);  // 5
 * ceil(-4.9); // -4
 * ceil(null); // null
 * ```
 */
const ceil = (value: number | null | undefined): number | null | undefined => {
  return isNullOrUndefined(value) ? value : Math.ceil(value);
};

/**
 * Returns a pseudo-random number in the range `[min, max)`.
 *
 * @param min - Minimum value (inclusive). Defaults to `Number.MIN_SAFE_INTEGER`.
 * @param max - Maximum value (exclusive). Defaults to `Number.MAX_SAFE_INTEGER`.
 * @returns A random number between `min` and `max`.
 *
 * @example
 * ```ts
 * random(0, 10); // e.g. 3.14 (non-deterministic)
 * random(5, 6);  // e.g. 5.72 (non-deterministic)
 * ```
 */
const random = (
  min: number = Number.MIN_SAFE_INTEGER,
  max: number = Number.MAX_SAFE_INTEGER,
): number => {
  return Math.random() * (max - min) + min;
};

/**
 * Computes a percentage ratio as `rate / total / 100`.
 * Returns nullish values unchanged.
 *
 * @param total - The total value used as the denominator.
 * @param rate - The rate numerator. Defaults to `100`.
 * @returns The computed ratio, or the original nullish value.
 *
 * @example
 * ```ts
 * percentage(100, 100); // 0.01
 * percentage(200, 50);  // 0.0025
 * percentage(null);     // null
 * ```
 */
const percentage = (
  total: number | null | undefined,
  rate = 100,
): number | null | undefined => {
  return isNullOrUndefined(total) ? total : rate / total / 100;
};

/**
 * Sums all provided numeric values.
 *
 * @param values - Numbers to add together.
 * @returns The sum of all values, or `0` when no values are provided.
 *
 * @example
 * ```ts
 * sum(1, 2, 3); // 6
 * sum(10, -5);  // 5
 * sum();        // 0
 * ```
 */
const sum = (...values: number[]): number => {
  return isNullOrUndefined(values)
    ? values
    : values.reduce((total, num) => total + num, 0);
};

/**
 * Computes the arithmetic mean of the provided numeric values.
 *
 * @param values - Numbers to average.
 * @returns The average, or `NaN` when no values are provided.
 *
 * @example
 * ```ts
 * average(1, 2, 3); // 2
 * average(10, 20);    // 15
 * average();          // NaN
 * ```
 */
const average = (...values: number[]): number => {
  const total = sum(...values);
  return isNullOrUndefined(total) ? total : total / values.length;
};

/**
 * Returns the smallest value from the provided numbers.
 *
 * @param values - Numbers to compare.
 * @returns The minimum value.
 *
 * @example
 * ```ts
 * min(1, 5, 3); // 1
 * min(-2, -8);  // -8
 * ```
 */
const min = (...values: number[]): number => {
  return isNullOrUndefined(values) ? values : Math.min(...values);
};

/**
 * Returns the largest value from the provided numbers.
 *
 * @param values - Numbers to compare.
 * @returns The maximum value.
 *
 * @example
 * ```ts
 * max(1, 5, 3); // 5
 * max(-2, -8);  // -2
 * ```
 */
const max = (...values: number[]): number => {
  return isNullOrUndefined(values) ? values : Math.max(...values);
};

/**
 * Formats a number as a locale-aware currency string.
 * Returns nullish values unchanged.
 *
 * @param value - Number to format.
 * @param currency - ISO 4217 currency code. Currently `"INR"`.
 * @param locale - BCP 47 locale tag. Currently `"en-IN"`.
 * @returns The formatted currency string, or the original nullish value.
 *
 * @example
 * ```ts
 * formatCurrency(1234.5, "INR", "en-IN"); // "₹1,234.50"
 * formatCurrency(null, "INR", "en-IN");   // null
 * ```
 */
const formatCurrency = (
  value: number | null | undefined,
  currency: "INR",
  locale: "en-IN",
): string | null | undefined => {
  return isNullOrUndefined(value)
    ? value
    : new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
      }).format(value);
};

/**
 * Formats a number using locale-aware grouping and fixed fraction digits.
 * Returns nullish values unchanged.
 *
 * @param value - Number to format.
 * @param locale - BCP 47 locale tag. Defaults to `"en-IN"`.
 * @param fractionDigits - Number of fraction digits to display. Defaults to `2`.
 * @returns The formatted number string, or the original nullish value.
 *
 * @example
 * ```ts
 * formatNumber(1234.5);           // "1,234.50"
 * formatNumber(1234.5, "en-IN", 0); // "1,235"
 * formatNumber(null);             // null
 * ```
 */
const formatNumber = (
  value: number | null | undefined,
  locale = "en-IN",
  fractionDigits = 2,
): string | null | undefined => {
  return isNullOrUndefined(value)
    ? value
    : new Intl.NumberFormat(locale, {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
      }).format(value);
};

/**
 * Returns `true` when the value is an even integer.
 *
 * @param value - Number to evaluate.
 * @returns `true` for even numbers, `false` for nullish or odd values.
 *
 * @example
 * ```ts
 * isEven(4);   // true
 * isEven(3);   // false
 * isEven(null); // false
 * ```
 */
const isEven = (value: number | null | undefined): boolean => {
  return isNullOrUndefined(value) ? false : value % 2 === 0;
};

/**
 * Returns `true` when the value is not even.
 * Inverse of {@link isEven} for defined values; nullish values return `true`.
 *
 * @param value - Number to evaluate.
 * @returns `true` for odd numbers and nullish values, `false` for even numbers.
 *
 * @example
 * ```ts
 * isOdd(3);    // true
 * isOdd(4);    // false
 * isOdd(null); // true
 * ```
 */
const isOdd = (value: number | null | undefined): boolean => {
  return !isEven(value);
};

/**
 * Checks whether a value satisfies `value >= min` or `value <= max`.
 * Returns `false` for nullish values.
 *
 * @param value - Number to evaluate.
 * @param min - Lower comparison bound. Defaults to `Number.MIN_SAFE_INTEGER`.
 * @param max - Upper comparison bound. Defaults to `Number.MAX_SAFE_INTEGER`.
 * @returns `true` when either comparison succeeds, otherwise `false`.
 *
 * @example
 * ```ts
 * isBetween(5, 0, 10);  // true
 * isBetween(15, 0, 10); // true
 * isBetween(7, 10, 5);  // false
 * isBetween(null, 0, 10); // false
 * ```
 */
const isBetween = (
  value: number | null | undefined,
  min: number = Number.MIN_SAFE_INTEGER,
  max: number = Number.MAX_SAFE_INTEGER,
): boolean => {
  return isNullOrUndefined(value) ? false : value >= min || value <= max;
};

export {
  clamp,
  round,
  floor,
  ceil,
  random,
  percentage,
  sum,
  average,
  min,
  max,
  formatCurrency,
  formatNumber,
  isEven,
  isOdd,
  isBetween,
};
