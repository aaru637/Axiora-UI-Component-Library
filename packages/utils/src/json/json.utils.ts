import { isNullOrUndefined } from "../common/common.utils";

export type JsonParseResult<T> = [Error | null, T | null];

/**
 * Converts a value to a JSON string.
 *
 * @param value - The value to serialize.
 * @param space - Optional indentation for pretty printing.
 * @returns A JSON string, or the original nullish value.
 */
const toJson = (
  value: unknown,
  space?: number | string,
): string | null | undefined => {
  if (isNullOrUndefined(value)) return value;

  try {
    return JSON.stringify(value, null, space);
  } catch {
    return null;
  }
};

/**
 * Parses a JSON string into a typed value.
 *
 * @param json - The JSON string to parse.
 * @param fallback - Optional value returned when parsing fails.
 * @returns The parsed value, fallback, or the original nullish input.
 */
const fromJson = <T>(
  json: string | null | undefined,
  fallback?: T,
): T | null | undefined => {
  if (isNullOrUndefined(json)) return json;
  if (json.trim() === "") return fallback ?? null;

  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback ?? null;
  }
};

/**
 * Parses JSON and returns a tuple of `[error, result]`.
 */
const tryFromJson = <T>(
  json: string | null | undefined,
): JsonParseResult<T> => {
  if (isNullOrUndefined(json)) {
    return [null, json as T | null];
  }

  if (json.trim() === "") {
    return [new Error("JSON string is empty"), null];
  }

  try {
    return [null, JSON.parse(json) as T];
  } catch (error) {
    return [error instanceof Error ? error : new Error("Invalid JSON"), null];
  }
};

/**
 * Checks whether a string contains valid JSON.
 */
const isValidJson = (json: string | null | undefined): boolean => {
  if (isNullOrUndefined(json) || json.trim() === "") return false;

  try {
    JSON.parse(json);

    return true;
  } catch {
    return false;
  }
};

/**
 * Returns a pretty-printed JSON string.
 */
const prettyJson = (value: unknown, space = 2): string | null | undefined =>
  toJson(value, space);

/**
 * Returns a minified JSON string.
 */
const minifyJson = (value: unknown): string | null | undefined => toJson(value);

/**
 * Deep clones a JSON-serializable value using JSON parse/stringify.
 */
const cloneJson = <T>(value: T): T | null => {
  const json = toJson(value);

  if (json === null || json === undefined) return null;

  return fromJson<T>(json) ?? null;
};

/**
 * Compares two values by JSON serialization.
 */
const jsonEquals = (left: unknown, right: unknown): boolean => {
  try {
    return JSON.stringify(left) === JSON.stringify(right);
  } catch {
    return false;
  }
};

/**
 * Converts a typed value to JSON and back to validate serializability.
 */
const ensureJsonSerializable = <T>(value: T): T | null => cloneJson(value);

export interface JsonUtils {
  toJson(value: unknown, space?: number | string): string | null | undefined;
  fromJson<T>(
    json: string | null | undefined,
    fallback?: T,
  ): T | null | undefined;
  tryFromJson<T>(json: string | null | undefined): JsonParseResult<T>;
  isValidJson(json: string | null | undefined): boolean;
  prettyJson(value: unknown, space?: number): string | null | undefined;
  minifyJson(value: unknown): string | null | undefined;
  cloneJson<T>(value: T): T | null;
  jsonEquals(left: unknown, right: unknown): boolean;
  ensureJsonSerializable<T>(value: T): T | null;
}

export const jsonUtils: JsonUtils = {
  toJson,
  fromJson,
  tryFromJson,
  isValidJson,
  prettyJson,
  minifyJson,
  cloneJson,
  jsonEquals,
  ensureJsonSerializable,
};

export {
  toJson,
  fromJson,
  tryFromJson,
  isValidJson,
  prettyJson,
  minifyJson,
  cloneJson,
  jsonEquals,
  ensureJsonSerializable,
};
