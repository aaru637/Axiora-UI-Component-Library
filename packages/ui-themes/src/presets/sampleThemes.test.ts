import { describe, expect, it } from "vitest";
import { mergeTheme } from "../utils/mergeTheme";
import { resolveSampleTheme } from "./sampleThemes";

describe("resolveSampleTheme", () => {
  it("resolves emerald brand primary color", () => {
    const resolved = mergeTheme(resolveSampleTheme("emerald"));
    expect(resolved.colors.primary).toBe("#059669");
    expect(resolved.name).toBe("emerald");
  });

  it("resolves violet brand primary color", () => {
    const resolved = mergeTheme(resolveSampleTheme("violet"));
    expect(resolved.colors.primary).toBe("#7c3aed");
    expect(resolved.name).toBe("violet");
  });

  it("falls back to default for unknown keys", () => {
    expect(resolveSampleTheme("unknown")).toBeUndefined();
  });

  it("resolves dark brand variants", () => {
    const violetDark = mergeTheme(resolveSampleTheme("violet-dark"));
    expect(violetDark.mode).toBe("dark");
    expect(violetDark.colors.primary).toBe("#8b5cf6");

    const emeraldDark = mergeTheme(resolveSampleTheme("emerald-dark"));
    expect(emeraldDark.mode).toBe("dark");
    expect(emeraldDark.colors.primary).toBe("#10b981");
  });
});
