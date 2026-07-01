import { describe, expect, it } from "vitest";

import { textStyle, typography } from "./typography";

describe("typography", () => {
  it("defines sans, serif, and mono font families", () => {
    expect(Object.keys(typography.fontFamily).sort()).toEqual([
      "mono",
      "sans",
      "serif",
    ]);
  });

  it("font weights increase with the semantic name", () => {
    const { regular, medium, semibold, bold } = typography.fontWeight;
    expect(regular).toBeLessThan(medium);
    expect(medium).toBeLessThan(semibold);
    expect(semibold).toBeLessThan(bold);
  });

  it("font sizes increase monotonically from xs to 6xl", () => {
    const order = [
      "xs",
      "sm",
      "base",
      "lg",
      "xl",
      "2xl",
      "3xl",
      "4xl",
      "5xl",
      "6xl",
    ] as const;
    const sizes = order.map((key) => parseInt(typography.fontSize[key], 10));
    for (let i = 1; i < sizes.length; i++) {
      expect(sizes[i]).toBeGreaterThan(sizes[i - 1]);
    }
  });
});

describe("textStyle", () => {
  it.each(Object.keys(textStyle) as (keyof typeof textStyle)[])(
    "%s composes values that exist in the typography scale",
    (name) => {
      const style = textStyle[name];
      expect(Object.values(typography.fontSize)).toContain(style.fontSize);
      expect(Object.values(typography.fontWeight)).toContain(style.fontWeight);
      expect(Object.values(typography.lineHeight)).toContain(style.lineHeight);
      expect(Object.values(typography.letterSpacing)).toContain(
        style.letterSpacing,
      );
    },
  );
});
