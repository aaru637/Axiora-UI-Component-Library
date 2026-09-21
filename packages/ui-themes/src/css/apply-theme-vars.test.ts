import { describe, expect, it } from "vitest";
import { mergeTheme } from "../utils/mergeTheme";
import { themeToCSSVars } from "./apply-theme-vars";

// AI-ASSISTED: Cursor
// PROMPT: Add themeToCSSVars unit tests
// ACCEPTED-BY: dhinesh

describe("themeToCSSVars", () => {
  it("maps resolved theme to CSS custom properties", () => {
    const theme = mergeTheme({ colors: { primary: "#7c3aed" } });
    const vars = themeToCSSVars(theme);

    expect(vars["--color-primary"]).toBe("#7c3aed");
    expect(vars["--color-background"]).toBe(theme.colors.background);
    expect(vars["--radius-base"]).toBe("8px");
    expect(vars["--font-family-base"]).toBeTruthy();
  });
});
