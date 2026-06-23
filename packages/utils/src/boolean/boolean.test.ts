import { describe, expect, it } from "vitest";
import {
  allTrue,
  and,
  anyTrue,
  isFalse,
  isTrue,
  noneTrue,
  or,
  toBoolean,
  toggle,
  xor,
} from "./boolean.utils";

describe("Boolean Utils", () => {
  it("toBoolean converts values to booleans", () => {
    expect(toBoolean(true)).toBe(true);
    expect(toBoolean(false)).toBe(false);
    expect(toBoolean("true")).toBe(true);
    expect(toBoolean("1")).toBe(true);
    expect(toBoolean("false")).toBe(false);
    expect(toBoolean(1)).toBe(true);
    expect(toBoolean(0)).toBe(false);
  });

  it("isTrue and isFalse check strict boolean values", () => {
    expect(isTrue(true)).toBe(true);
    expect(isTrue("true")).toBe(false);
    expect(isFalse(false)).toBe(true);
    expect(isFalse(0)).toBe(false);
  });

  it("toggle flips a boolean", () => {
    expect(toggle(true)).toBe(false);
    expect(toggle(false)).toBe(true);
  });

  it("allTrue returns true only when every value is true", () => {
    expect(allTrue([true, true])).toBe(true);
    expect(allTrue([true, false])).toBe(false);
    expect(allTrue([])).toBe(false);
    expect(allTrue(null)).toBe(false);
  });

  it("anyTrue returns true when at least one value is true", () => {
    expect(anyTrue([false, true])).toBe(true);
    expect(anyTrue([false, false])).toBe(false);
    expect(anyTrue([])).toBe(false);
  });

  it("noneTrue returns true when no values are true", () => {
    expect(noneTrue([false, false])).toBe(true);
    expect(noneTrue([false, true])).toBe(false);
    expect(noneTrue([])).toBe(true);
  });

  it("xor, and, and or perform logical operations", () => {
    expect(xor(true, false)).toBe(true);
    expect(xor(true, true)).toBe(false);
    expect(and(true, false)).toBe(false);
    expect(and(true, true)).toBe(true);
    expect(or(false, false)).toBe(false);
    expect(or(false, true)).toBe(true);
  });
});
