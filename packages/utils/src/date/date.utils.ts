import { isDate, isNullOrUndefined } from "../common/common.utils";

const MS_PER_DAY = 86_400_000;

const toDate = (date: Date | null | undefined): Date | null | undefined => {
  if (isNullOrUndefined(date)) return date;
  if (!isDate(date) || Number.isNaN(date.getTime())) return null;

  return date;
};

const startOfDay = (date: Date | null | undefined): Date | null | undefined => {
  const value = toDate(date);
  if (isNullOrUndefined(value)) return value;

  const result = new Date(value);
  result.setHours(0, 0, 0, 0);

  return result;
};

const endOfDay = (date: Date | null | undefined): Date | null | undefined => {
  const value = toDate(date);
  if (isNullOrUndefined(value)) return value;

  const result = new Date(value);
  result.setHours(23, 59, 59, 999);

  return result;
};

/**
 * Formats a date as `YYYY-MM-DD`.
 */
const formatDate = (
  date: Date | null | undefined,
): string | null | undefined => {
  const value = toDate(date);
  if (isNullOrUndefined(value)) return value;

  return value.toISOString().slice(0, 10);
};

/**
 * Formats a date and time using locale settings.
 */
const formatDateTime = (
  date: Date | null | undefined,
  locale = "en-US",
): string | null | undefined => {
  const value = toDate(date);
  if (isNullOrUndefined(value)) return value;

  return value.toLocaleString(locale);
};

/**
 * Checks whether a date falls on the current local day.
 */
const isToday = (date: Date | null | undefined): boolean => {
  const value = toDate(date);
  if (isNullOrUndefined(value)) return false;

  const today = startOfDay(new Date())!;

  return (
    value.getTime() >= today.getTime() &&
    value.getTime() <= endOfDay(today)!.getTime()
  );
};

/**
 * Checks whether a date is before today.
 */
const isPast = (date: Date | null | undefined): boolean => {
  const value = toDate(date);
  if (isNullOrUndefined(value)) return false;

  return value.getTime() < startOfDay(new Date())!.getTime();
};

/**
 * Checks whether a date is after today.
 */
const isFuture = (date: Date | null | undefined): boolean => {
  const value = toDate(date);
  if (isNullOrUndefined(value)) return false;

  return value.getTime() > endOfDay(new Date())!.getTime();
};

/**
 * Adds days to a date.
 */
const addDays = (
  date: Date | null | undefined,
  days: number,
): Date | null | undefined => {
  const value = toDate(date);
  if (isNullOrUndefined(value)) return value;

  const result = new Date(value);
  result.setDate(result.getDate() + days);

  return result;
};

/**
 * Subtracts days from a date.
 */
const subtractDays = (
  date: Date | null | undefined,
  days: number,
): Date | null | undefined => addDays(date, -days);

/**
 * Returns the whole-day difference between two dates.
 */
const differenceInDays = (
  a: Date | null | undefined,
  b: Date | null | undefined,
): number | null | undefined => {
  const left = startOfDay(a);
  const right = startOfDay(b);

  if (isNullOrUndefined(left) || isNullOrUndefined(right)) return null;

  return Math.round((left.getTime() - right.getTime()) / MS_PER_DAY);
};

/**
 * Returns a human-readable relative time string.
 */
const relativeTime = (
  date: Date | null | undefined,
  now: Date = new Date(),
): string | null | undefined => {
  const value = toDate(date);
  if (isNullOrUndefined(value)) return value;

  const seconds = Math.round((value.getTime() - now.getTime()) / 1000);
  const absSeconds = Math.abs(seconds);
  const suffix = seconds < 0 ? "ago" : "from now";

  if (absSeconds < 60) return `${absSeconds} seconds ${suffix}`;

  const minutes = Math.round(absSeconds / 60);
  if (minutes < 60) return `${minutes} minutes ${suffix}`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hours ${suffix}`;

  const days = Math.round(hours / 24);
  if (days < 30) return `${days} days ${suffix}`;

  const months = Math.round(days / 30);
  if (months < 12) return `${months} months ${suffix}`;

  const years = Math.round(months / 12);

  return `${years} years ${suffix}`;
};

export interface DateUtils {
  formatDate(date: Date | null | undefined): string | null | undefined;
  formatDateTime(
    date: Date | null | undefined,
    locale?: string,
  ): string | null | undefined;
  isToday(date: Date | null | undefined): boolean;
  isPast(date: Date | null | undefined): boolean;
  isFuture(date: Date | null | undefined): boolean;
  addDays(date: Date | null | undefined, days: number): Date | null | undefined;
  subtractDays(
    date: Date | null | undefined,
    days: number,
  ): Date | null | undefined;
  startOfDay(date: Date | null | undefined): Date | null | undefined;
  endOfDay(date: Date | null | undefined): Date | null | undefined;
  differenceInDays(
    a: Date | null | undefined,
    b: Date | null | undefined,
  ): number | null | undefined;
  relativeTime(
    date: Date | null | undefined,
    now?: Date,
  ): string | null | undefined;
}

export const dateUtils: DateUtils = {
  formatDate,
  formatDateTime,
  isToday,
  isPast,
  isFuture,
  addDays,
  subtractDays,
  startOfDay,
  endOfDay,
  differenceInDays,
  relativeTime,
};

export {
  formatDate,
  formatDateTime,
  isToday,
  isPast,
  isFuture,
  addDays,
  subtractDays,
  startOfDay,
  endOfDay,
  differenceInDays,
  relativeTime,
};
