import { describe, expect, it } from "vitest";

import { spacing } from "./spacing";

describe("spacing", () => {
  it("maps every step to 4px times the step number", () => {
    for (const [step, value] of Object.entries(spacing)) {
      expect(value).toBe(`${Number(step) * 4}px`);
    }
  });

  it("starts at 0px", () => {
    expect(spacing[0]).toBe("0px");
  });
});
