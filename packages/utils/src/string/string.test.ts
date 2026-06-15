import { describe, expect, it } from "vitest";
import { EMPTY_STRING } from "../common/common.utils";
import { isEmptyString, isNotEmptyString } from "./string.utils";

describe("String Utils", () => {
  /**
   * isEmptyString
   */
  it("isEmptyString returns true when value is null", () => {
    expect(isEmptyString(null)).toBe(true);
  });

  it("isEmptyString returns true when value is undefined", () => {
    expect(isEmptyString(undefined)).toBe(true);
  });

  it("isEmptyString returns true when value equals EMPTY_STRING", () => {
    expect(isEmptyString(EMPTY_STRING)).toBe(true);
    expect(isEmptyString("")).toBe(true);
  });

  it("isEmptyString returns false for whitespace only strings", () => {
    expect(isEmptyString(" ")).toBe(false);
    expect(isEmptyString("   ")).toBe(false);
    expect(isEmptyString("\t")).toBe(false);
    expect(isEmptyString("\n")).toBe(false);
  });

  it("isEmptyString returns false for non empty strings", () => {
    expect(isEmptyString("Axon")).toBe(false);
    expect(isEmptyString(" Axon ")).toBe(false);
    expect(isEmptyString("Axon UI Component Library")).toBe(false);
  });

  /**
   * isNotEmptyString
   */
  it("isNotEmptyString returns false when value is null", () => {
    expect(isNotEmptyString(null)).toBe(false);
  });

  it("isNotEmptyString returns false when value is undefined", () => {
    expect(isNotEmptyString(undefined)).toBe(false);
  });

  it("isNotEmptyString returns false when value equals EMPTY_STRING", () => {
    expect(isNotEmptyString(EMPTY_STRING)).toBe(false);
    expect(isNotEmptyString("")).toBe(false);
  });

  it("isNotEmptyString returns true for whitespace only strings", () => {
    expect(isNotEmptyString(" ")).toBe(true);
    expect(isNotEmptyString("   ")).toBe(true);
    expect(isNotEmptyString("\t")).toBe(true);
    expect(isNotEmptyString("\n")).toBe(true);
  });

  it("isNotEmptyString returns true for non empty strings", () => {
    expect(isNotEmptyString("Axon")).toBe(true);
    expect(isNotEmptyString(" Axon ")).toBe(true);
    expect(isNotEmptyString("Axon UI Component Library")).toBe(true);
  });
});
