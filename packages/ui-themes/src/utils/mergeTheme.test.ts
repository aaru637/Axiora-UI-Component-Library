import { describe, expect, it } from "vitest";
import { presets } from "../presets/presets";
import { mergeTheme } from "./mergeTheme";

// AI-ASSISTED: Cursor
// PROMPT: Add mergeTheme unit tests
// ACCEPTED-BY: dhinesh

describe("mergeTheme", () => {
  it("returns light preset by default", () => {
    const result = mergeTheme();
    expect(result.colors).toEqual(presets.light);
    expect(result.mode).toBe("light");
  });

  it("resolves full dark preset when only mode is given", () => {
    const result = mergeTheme({ mode: "dark" });
    expect(result.colors).toEqual(presets.dark);
    expect(result.mode).toBe("dark");
  });

  it("overrides a single color without losing siblings", () => {
    const result = mergeTheme({ colors: { primary: "#7c3aed" } });
    expect(result.colors.primary).toBe("#7c3aed");
    expect(result.colors.secondary).toBe(presets.light.secondary);
  });

  it("deep-merges nested menu colors", () => {
    const result = mergeTheme({
      colors: { menu: { background: "#111827" } },
    });
    expect(result.colors.menu.background).toBe("#111827");
    expect(result.colors.menu.text).toBe(presets.light.menu.text);
  });

  it("layers partial override on dark base", () => {
    const result = mergeTheme({
      mode: "dark",
      colors: { primary: "#7c3aed" },
    });
    expect(result.colors.primary).toBe("#7c3aed");
    expect(result.colors.background).toBe(presets.dark.background);
  });
});
