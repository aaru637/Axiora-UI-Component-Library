import { describe, expect, it } from "vitest";
import { sampleThemes } from "../presets/sampleThemes";
import { validateTheme } from "./validateTheme";

describe("validateTheme", () => {
  it("accepts a partial valid theme", () => {
    const result = validateTheme({
      mode: "dark",
      colors: { primary: "#7c3aed" },
    });
    expect(result.mode).toBe("dark");
    expect(result.colors?.primary).toBe("#7c3aed");
  });

  it("accepts emerald brand preset without validation errors", () => {
    expect(() => validateTheme(sampleThemes.emerald)).not.toThrow();
    const result = validateTheme(sampleThemes.emerald);
    expect(result.colors?.primary).toBe("#059669");
  });

  it("accepts violet brand preset without validation errors", () => {
    expect(() => validateTheme(sampleThemes.violet)).not.toThrow();
    const result = validateTheme(sampleThemes.violet);
    expect(result.colors?.primary).toBe("#7c3aed");
  });

  it("accepts partial feedback color overrides", () => {
    const result = validateTheme({
      colors: { feedback: { success: "#059669", info: "#7c3aed" } },
    });
    expect(result.colors?.feedback?.success).toBe("#059669");
    expect(result.colors?.feedback?.info).toBe("#7c3aed");
  });

  it("rejects invalid hex colors", () => {
    expect(() => validateTheme({ colors: { primary: "not-a-color" } })).toThrow(
      /Invalid theme config/,
    );
  });

  it("rejects invalid radius", () => {
    expect(() => validateTheme({ radius: "invalid" as never })).toThrow(
      /Invalid theme config/,
    );
  });
});
