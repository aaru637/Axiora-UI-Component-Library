import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  EMPTY_STRING,
  debounce,
  defaultIfNullOrUndefined,
  generateUUID,
  identity,
  isArray,
  isBoolean,
  isDate,
  isNotNull,
  isNotNullOrUndefined,
  isNull,
  isNullOrUndefined,
  isNumber,
  isObject,
  isString,
  isUndefined,
  noop,
  sleep,
  throttle,
} from "./common.utils";

describe("Common Utils", () => {
  /**
   * EMPTY_STRING
   */
  it("EMPTY_STRING is an empty string literal", () => {
    expect(EMPTY_STRING).toBe("");
    expect(EMPTY_STRING.length).toBe(0);
  });

  /**
   * isNull
   */
  it("isNull returns true only for null", () => {
    expect(isNull(null)).toBe(true);
  });

  it("isNull returns false for all non null values", () => {
    expect(isNull(undefined)).toBe(false);
    expect(isNull("")).toBe(false);
    expect(isNull("Axon")).toBe(false);
    expect(isNull(0)).toBe(false);
    expect(isNull(false)).toBe(false);
    expect(isNull(Number.NaN)).toBe(false);
    expect(isNull([])).toBe(false);
    expect(isNull({})).toBe(false);
    expect(isNull(new Date())).toBe(false);
    expect(isNull(() => undefined)).toBe(false);
    expect(isNull(Symbol("axon"))).toBe(false);
  });

  /**
   * isUndefined
   */
  it("isUndefined returns true only for undefined", () => {
    expect(isUndefined(undefined)).toBe(true);
  });

  it("isUndefined returns false for all non undefined values", () => {
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined("")).toBe(false);
    expect(isUndefined("Axon")).toBe(false);
    expect(isUndefined(0)).toBe(false);
    expect(isUndefined(false)).toBe(false);
    expect(isUndefined(Number.NaN)).toBe(false);
    expect(isUndefined([])).toBe(false);
    expect(isUndefined({})).toBe(false);
    expect(isUndefined(new Date())).toBe(false);
    expect(isUndefined(() => undefined)).toBe(false);
    expect(isUndefined(Symbol("axon"))).toBe(false);
  });

  /**
   * isNullOrUndefined
   */
  it("isNullOrUndefined returns true for null", () => {
    expect(isNullOrUndefined(null)).toBe(true);
  });

  it("isNullOrUndefined returns true for undefined", () => {
    expect(isNullOrUndefined(undefined)).toBe(true);
  });

  it("isNullOrUndefined returns false for all other values", () => {
    expect(isNullOrUndefined("")).toBe(false);
    expect(isNullOrUndefined("Axon")).toBe(false);
    expect(isNullOrUndefined(0)).toBe(false);
    expect(isNullOrUndefined(false)).toBe(false);
    expect(isNullOrUndefined(Number.NaN)).toBe(false);
    expect(isNullOrUndefined([])).toBe(false);
    expect(isNullOrUndefined({})).toBe(false);
    expect(isNullOrUndefined(new Date())).toBe(false);
    expect(isNullOrUndefined(() => undefined)).toBe(false);
    expect(isNullOrUndefined(Symbol("axon"))).toBe(false);
  });

  /**
   * isNotNull
   */
  it("isNotNull returns false only for null", () => {
    expect(isNotNull(null)).toBe(false);
  });

  it("isNotNull returns true for all non null values", () => {
    expect(isNotNull(undefined)).toBe(true);
    expect(isNotNull("")).toBe(true);
    expect(isNotNull("Axon")).toBe(true);
    expect(isNotNull(0)).toBe(true);
    expect(isNotNull(false)).toBe(true);
    expect(isNotNull(Number.NaN)).toBe(true);
    expect(isNotNull([])).toBe(true);
    expect(isNotNull({})).toBe(true);
    expect(isNotNull(new Date())).toBe(true);
    expect(isNotNull(() => undefined)).toBe(true);
    expect(isNotNull(Symbol("axon"))).toBe(true);
  });

  /**
   * isNotNullOrUndefined
   */
  it("isNotNullOrUndefined returns false for nullish values", () => {
    expect(isNotNullOrUndefined(null)).toBe(false);
    expect(isNotNullOrUndefined(undefined)).toBe(false);
  });

  it("isNotNullOrUndefined returns true for all non nullish values", () => {
    expect(isNotNullOrUndefined("")).toBe(true);
    expect(isNotNullOrUndefined("Axon")).toBe(true);
    expect(isNotNullOrUndefined(0)).toBe(true);
    expect(isNotNullOrUndefined(false)).toBe(true);
    expect(isNotNullOrUndefined(Number.NaN)).toBe(true);
    expect(isNotNullOrUndefined([])).toBe(true);
    expect(isNotNullOrUndefined({})).toBe(true);
    expect(isNotNullOrUndefined(new Date())).toBe(true);
    expect(isNotNullOrUndefined(() => undefined)).toBe(true);
    expect(isNotNullOrUndefined(Symbol("axon"))).toBe(true);
  });

  /**
   * isString
   */
  it("isString returns false for nullish values", () => {
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
  });

  it("isString returns false for non string values", () => {
    expect(isString(0)).toBe(false);
    expect(isString(false)).toBe(false);
    expect(isString(Number.NaN)).toBe(false);
    expect(isString({ name: "Axon" })).toBe(false);
    expect(isString(["Axon", "UI", "Component", "library"])).toBe(false);
    expect(isString(new Date())).toBe(false);
    expect(isString(() => "Axon")).toBe(false);
    expect(isString(Symbol("axon"))).toBe(false);
  });

  it("isString returns true for string values", () => {
    expect(isString("")).toBe(true);
    expect(isString("   ")).toBe(true);
    expect(isString("Axon UI Component Library")).toBe(true);
  });

  /**
   * isNumber
   */
  it("isNumber returns false for nullish values", () => {
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
  });

  it("isNumber returns false for NaN", () => {
    expect(isNumber(Number.NaN)).toBe(false);
  });

  it("isNumber returns false for non number values", () => {
    expect(isNumber("12")).toBe(false);
    expect(isNumber(true)).toBe(false);
    expect(isNumber(false)).toBe(false);
    expect(isNumber({ value: 12 })).toBe(false);
    expect(isNumber([12])).toBe(false);
    expect(isNumber(new Date())).toBe(false);
    expect(isNumber(() => 12)).toBe(false);
    expect(isNumber(Symbol("12"))).toBe(false);
  });

  it("isNumber returns true for valid numbers", () => {
    expect(isNumber(0)).toBe(true);
    expect(isNumber(-0)).toBe(true);
    expect(isNumber(12)).toBe(true);
    expect(isNumber(-3)).toBe(true);
    expect(isNumber(3.14)).toBe(true);
    expect(isNumber(Number.POSITIVE_INFINITY)).toBe(true);
    expect(isNumber(Number.NEGATIVE_INFINITY)).toBe(true);
  });

  /**
   * isBoolean
   */
  it("isBoolean returns false for nullish values", () => {
    expect(isBoolean(null)).toBe(false);
    expect(isBoolean(undefined)).toBe(false);
  });

  it("isBoolean returns false for non boolean values", () => {
    expect(isBoolean("true")).toBe(false);
    expect(isBoolean("false")).toBe(false);
    expect(isBoolean(0)).toBe(false);
    expect(isBoolean(1)).toBe(false);
    expect(isBoolean({ value: true })).toBe(false);
    expect(isBoolean([true])).toBe(false);
    expect(isBoolean(new Date())).toBe(false);
    expect(isBoolean(() => true)).toBe(false);
    expect(isBoolean(Symbol("true"))).toBe(false);
  });

  it("isBoolean returns true for boolean values", () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
  });

  /**
   * isDate
   */
  it("isDate returns false for nullish values", () => {
    expect(isDate(null)).toBe(false);
    expect(isDate(undefined)).toBe(false);
  });

  it("isDate returns false for invalid date instances", () => {
    expect(isDate(new Date("invalid"))).toBe(false);
    expect(isDate(new Date(Number.NaN))).toBe(false);
  });

  it("isDate returns false for non date values", () => {
    expect(isDate("2024-01-01")).toBe(false);
    expect(isDate(1704067200000)).toBe(false);
    expect(isDate({ date: "2024-01-01" })).toBe(false);
    expect(isDate(["2024-01-01"])).toBe(false);
    expect(isDate(true)).toBe(false);
    expect(isDate(() => new Date())).toBe(false);
    expect(isDate(Symbol("date"))).toBe(false);
  });

  it("isDate returns true for valid date instances", () => {
    expect(isDate(new Date("2024-01-01"))).toBe(true);
    expect(isDate(new Date(1704067200000))).toBe(true);
    expect(isDate(new Date())).toBe(true);
  });

  /**
   * isArray
   */
  it("isArray returns false for nullish values", () => {
    expect(isArray(null)).toBe(false);
    expect(isArray(undefined)).toBe(false);
  });

  it("isArray returns false for non array values", () => {
    expect(isArray("Axon")).toBe(false);
    expect(isArray(12)).toBe(false);
    expect(isArray(false)).toBe(false);
    expect(isArray({ name: "Axon" })).toBe(false);
    expect(isArray(new Date())).toBe(false);
    expect(isArray(() => [])).toBe(false);
    expect(isArray(Symbol("array"))).toBe(false);
    expect(isArray({ 0: "Axon", length: 1 })).toBe(false);
  });

  it("isArray returns true for array values", () => {
    expect(isArray([])).toBe(true);
    expect(isArray(["Axon", "UI", "Component", "library"])).toBe(true);
    expect(isArray([1, 2, 3])).toBe(true);
    expect(isArray(new Array(3))).toBe(true);
  });

  /**
   * isObject
   */
  it("isObject returns false for nullish values", () => {
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
  });

  it("isObject returns false for arrays", () => {
    expect(isObject([])).toBe(false);
    expect(isObject(["Axon"])).toBe(false);
  });

  it("isObject returns false for valid dates", () => {
    expect(isObject(new Date("2024-01-01"))).toBe(false);
    expect(isObject(new Date())).toBe(false);
  });

  it("isObject returns false for non object values", () => {
    expect(isObject("Axon")).toBe(false);
    expect(isObject(12)).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(() => ({}))).toBe(false);
    expect(isObject(Symbol("object"))).toBe(false);
  });

  it("isObject returns true for plain and built in objects", () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ name: "Axon" })).toBe(true);
    expect(isObject({ nested: { value: 1 } })).toBe(true);
    expect(isObject(Object.create(null))).toBe(true);
    expect(isObject(new Map())).toBe(true);
    expect(isObject(/axon/)).toBe(true);
    expect(isObject(new Date("invalid"))).toBe(true);
  });

  /**
   * defaultIfNullOrUndefined
   */
  it("defaultIfNullOrUndefined returns default value for null", () => {
    expect(defaultIfNullOrUndefined(null, "Axon")).toBe("Axon");
  });

  it("defaultIfNullOrUndefined returns default value for undefined", () => {
    expect(defaultIfNullOrUndefined(undefined, "Axon")).toBe("Axon");
  });

  it("defaultIfNullOrUndefined returns value for non nullish values", () => {
    expect(defaultIfNullOrUndefined("", "Axon")).toBe("");
    expect(defaultIfNullOrUndefined("Axon UI", "default")).toBe("Axon UI");
    expect(defaultIfNullOrUndefined(0, 42)).toBe(0);
    expect(defaultIfNullOrUndefined(false, true)).toBe(false);
    expect(defaultIfNullOrUndefined(Number.NaN, 0)).toBe(Number.NaN);
    expect(defaultIfNullOrUndefined([], ["default"])).toEqual([]);
    expect(defaultIfNullOrUndefined({ name: "Axon" }, {})).toEqual({
      name: "Axon",
    });
  });

  /**
   * noop
   */
  it("noop does nothing and returns undefined", () => {
    expect(noop()).toBeUndefined();
  });

  /**
   * identity
   */
  it("identity returns the same value for primitives", () => {
    expect(identity(12)).toBe(12);
    expect(identity("Axon")).toBe("Axon");
    expect(identity(true)).toBe(true);
    expect(identity(null)).toBe(null);
    expect(identity(undefined)).toBe(undefined);
  });

  it("identity returns the same reference for objects and arrays", () => {
    const obj = { name: "Axon" };
    const arr = [1, 2, 3];
    expect(identity(obj)).toBe(obj);
    expect(identity(arr)).toBe(arr);
  });

  /**
   * generateUUID
   */
  it("generateUUID returns a valid UUID v4 string", () => {
    const uuid = generateUUID();
    expect(uuid).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  });

  it("generateUUID returns unique values on successive calls", () => {
    const uuid1 = generateUUID();
    const uuid2 = generateUUID();
    expect(uuid1).not.toBe(uuid2);
  });
});

describe("Common Utils (timers)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  /**
   * sleep
   */
  it("sleep resolves after the given number of milliseconds", async () => {
    const promise = sleep(500);
    vi.advanceTimersByTime(500);
    await expect(promise).resolves.toBeUndefined();
  });

  it("sleep does not resolve before the wait period elapses", async () => {
    let resolved = false;
    const promise = sleep(500).then(() => {
      resolved = true;
    });
    vi.advanceTimersByTime(499);
    await Promise.resolve();
    expect(resolved).toBe(false);
    vi.advanceTimersByTime(1);
    await promise;
    expect(resolved).toBe(true);
  });

  /**
   * debounce
   */
  it("debounce delays function execution until wait period elapses", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced();
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("debounce resets the timer on subsequent calls within wait period", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced();
    vi.advanceTimersByTime(50);
    debounced();
    vi.advanceTimersByTime(50);
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("debounce passes arguments to the debounced function", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced("Axon", 42);
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledWith("Axon", 42);
  });

  it("debounce preserves this context", () => {
    const ctx = { value: 42 };
    const fn = vi.fn(function (this: typeof ctx) {
      expect(this).toBe(ctx);
    });
    const debounced = debounce(fn, 100);
    debounced.call(ctx);
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  /**
   * throttle
   */
  it("throttle calls the function immediately on first invocation", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("throttle skips calls within the wait period", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled();
    throttled();
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("throttle allows a call after the wait period elapses", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled();
    vi.advanceTimersByTime(100);
    throttled();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("throttle passes arguments to the throttled function", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled("Axon", 42);
    expect(fn).toHaveBeenCalledWith("Axon", 42);
  });

  it("throttle preserves this context", () => {
    const ctx = { value: 42 };
    const fn = vi.fn(function (this: typeof ctx) {
      expect(this).toBe(ctx);
    });
    const throttled = throttle(fn, 100);
    throttled.call(ctx);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
