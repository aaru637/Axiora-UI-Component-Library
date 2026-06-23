import { afterEach, describe, expect, it, vi } from "vitest";
import {
  average,
  ceil,
  clamp,
  floor,
  formatCurrency,
  formatNumber,
  isBetween,
  isEven,
  isOdd,
  max,
  min,
  percentage,
  random,
  round,
  sum,
} from "./number.utils";

describe("Number Utils", () => {
  /**
   * clamp
   */
  it("clamp returns nullish values unchanged", () => {
    expect(clamp(null)).toBe(null);
    expect(clamp(undefined)).toBe(undefined);
  });

  it("clamp returns the value when it is within bounds", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
  });

  it("clamp returns the minimum when the value is below bounds", () => {
    expect(clamp(-3, 0, 10)).toBe(0);
    expect(clamp(0.5, 1, 5)).toBe(1);
  });

  it("clamp returns the maximum when the value is above bounds", () => {
    expect(clamp(15, 0, 10)).toBe(10);
    expect(clamp(6, 1, 5)).toBe(5);
  });

  it("clamp uses default min and max of 1", () => {
    expect(clamp(5)).toBe(1);
    expect(clamp(0)).toBe(1);
    expect(clamp(1)).toBe(1);
  });

  /**
   * round
   */
  it("round returns nullish values unchanged", () => {
    expect(round(null)).toBe(null);
    expect(round(undefined)).toBe(undefined);
  });

  it("round rounds to two decimal places by default", () => {
    expect(round(1.2345)).toBe(1.23);
    expect(round(1.235)).toBe(1.24);
  });

  it("round rounds to a custom number of decimal places", () => {
    expect(round(1.2345, 3)).toBe(1.235);
    expect(round(10.55, 1)).toBe(10.6);
    expect(round(10, 0)).toBe(10);
  });

  it("round handles negative numbers", () => {
    expect(round(-1.235, 2)).toBe(-1.24);
    expect(round(-1.234, 2)).toBe(-1.23);
  });

  /**
   * floor
   */
  it("floor returns nullish values unchanged", () => {
    expect(floor(null)).toBe(null);
    expect(floor(undefined)).toBe(undefined);
  });

  it("floor returns the largest integer less than or equal to the value", () => {
    expect(floor(4.9)).toBe(4);
    expect(floor(4.1)).toBe(4);
    expect(floor(-4.1)).toBe(-5);
    expect(floor(-4.9)).toBe(-5);
  });

  /**
   * ceil
   */
  it("ceil returns nullish values unchanged", () => {
    expect(ceil(null)).toBe(null);
    expect(ceil(undefined)).toBe(undefined);
  });

  it("ceil returns the smallest integer greater than or equal to the value", () => {
    expect(ceil(4.1)).toBe(5);
    expect(ceil(4.9)).toBe(5);
    expect(ceil(-4.9)).toBe(-4);
    expect(ceil(-4.1)).toBe(-4);
  });

  /**
   * random
   */
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("random returns a value within the given range for a mocked random source", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    expect(random(0, 10)).toBe(0);

    vi.spyOn(Math, "random").mockReturnValue(0.5);
    expect(random(0, 10)).toBe(5);

    vi.spyOn(Math, "random").mockReturnValue(0.999);
    expect(random(5, 6)).toBeCloseTo(5.999, 5);
  });

  it("random supports negative ranges", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    expect(random(-10, 10)).toBe(0);
  });

  /**
   * percentage
   */
  it("percentage returns nullish values unchanged", () => {
    expect(percentage(null)).toBe(null);
    expect(percentage(undefined)).toBe(undefined);
  });

  it("percentage computes rate divided by total divided by 100", () => {
    expect(percentage(100, 100)).toBe(0.01);
    expect(percentage(200, 50)).toBe(0.0025);
    expect(percentage(50, 25)).toBe(0.005);
  });

  it("percentage uses a default rate of 100", () => {
    expect(percentage(100)).toBe(0.01);
  });

  /**
   * sum
   */
  it("sum returns zero when no values are provided", () => {
    expect(sum()).toBe(0);
  });

  it("sum adds all provided numbers", () => {
    expect(sum(1, 2, 3)).toBe(6);
    expect(sum(10, -5, 2)).toBe(7);
  });

  it("sum handles a single value", () => {
    expect(sum(42)).toBe(42);
  });

  /**
   * average
   */
  it("average returns NaN when no values are provided", () => {
    expect(average()).toBeNaN();
  });

  it("average computes the arithmetic mean", () => {
    expect(average(1, 2, 3)).toBe(2);
    expect(average(10, 20)).toBe(15);
  });

  it("average handles a single value", () => {
    expect(average(42)).toBe(42);
  });

  /**
   * min
   */
  it("min returns the smallest value", () => {
    expect(min(1, 5, 3)).toBe(1);
    expect(min(-2, -8, 4)).toBe(-8);
  });

  it("min handles a single value", () => {
    expect(min(42)).toBe(42);
  });

  /**
   * max
   */
  it("max returns the largest value", () => {
    expect(max(1, 5, 3)).toBe(5);
    expect(max(-2, -8, 4)).toBe(4);
  });

  it("max handles a single value", () => {
    expect(max(42)).toBe(42);
  });

  /**
   * formatCurrency
   */
  it("formatCurrency returns nullish values unchanged", () => {
    expect(formatCurrency(null, "INR", "en-IN")).toBe(null);
    expect(formatCurrency(undefined, "INR", "en-IN")).toBe(undefined);
  });

  it("formatCurrency formats a number as INR currency for en-IN locale", () => {
    expect(formatCurrency(1234.5, "INR", "en-IN")).toBe("₹1,234.50");
    expect(formatCurrency(0, "INR", "en-IN")).toBe("₹0.00");
  });

  /**
   * formatNumber
   */
  it("formatNumber returns nullish values unchanged", () => {
    expect(formatNumber(null)).toBe(null);
    expect(formatNumber(undefined)).toBe(undefined);
  });

  it("formatNumber formats a number with default en-IN locale and two fraction digits", () => {
    expect(formatNumber(1234.5)).toBe("1,234.50");
    expect(formatNumber(1000)).toBe("1,000.00");
  });

  it("formatNumber supports custom fraction digits", () => {
    expect(formatNumber(1234.5, "en-IN", 0)).toBe("1,235");
    expect(formatNumber(1234.567, "en-IN", 3)).toBe("1,234.567");
  });

  /**
   * isEven
   */
  it("isEven returns false for nullish values", () => {
    expect(isEven(null)).toBe(false);
    expect(isEven(undefined)).toBe(false);
  });

  it("isEven returns true for even numbers", () => {
    expect(isEven(0)).toBe(true);
    expect(isEven(2)).toBe(true);
    expect(isEven(-4)).toBe(true);
  });

  it("isEven returns false for odd numbers", () => {
    expect(isEven(1)).toBe(false);
    expect(isEven(3)).toBe(false);
    expect(isEven(-3)).toBe(false);
  });

  /**
   * isOdd
   */
  it("isOdd returns true for nullish values", () => {
    expect(isOdd(null)).toBe(true);
    expect(isOdd(undefined)).toBe(true);
  });

  it("isOdd returns true for odd numbers", () => {
    expect(isOdd(1)).toBe(true);
    expect(isOdd(3)).toBe(true);
    expect(isOdd(-3)).toBe(true);
  });

  it("isOdd returns false for even numbers", () => {
    expect(isOdd(0)).toBe(false);
    expect(isOdd(2)).toBe(false);
    expect(isOdd(-4)).toBe(false);
  });

  /**
   * isBetween
   */
  it("isBetween returns false for nullish values", () => {
    expect(isBetween(null, 0, 10)).toBe(false);
    expect(isBetween(undefined, 0, 10)).toBe(false);
  });

  it("isBetween returns true when value is greater than or equal to min", () => {
    expect(isBetween(15, 0, 10)).toBe(true);
    expect(isBetween(10, 10, 5)).toBe(true);
  });

  it("isBetween returns true when value is less than or equal to max", () => {
    expect(isBetween(-5, 0, 10)).toBe(true);
    expect(isBetween(3, 10, 5)).toBe(true);
  });

  it("isBetween returns false when neither comparison succeeds", () => {
    expect(isBetween(7, 10, 5)).toBe(false);
  });

  it("isBetween returns true for any finite value with default bounds", () => {
    expect(isBetween(0)).toBe(true);
    expect(isBetween(1000)).toBe(true);
    expect(isBetween(-1000)).toBe(true);
  });
});
