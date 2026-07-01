import { describe, expect, it } from "vitest";

import { opacity } from "./opacity";

describe("opacity", () => {
  it("every value is a valid CSS opacity between 0 and 1", () => {
    for (const value of Object.values(opacity)) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(1);
    }
  });

  it("numeric keys are the value expressed as a percentage", () => {
    const numericKeys = [0, 10, 20, 40, 60, 80, 100] as const;
    for (const key of numericKeys) {
      expect(opacity[key]).toBeCloseTo(key / 100);
    }
  });

  it("disabled sits between 40% and 60%", () => {
    expect(opacity.disabled).toBeGreaterThan(opacity[40]);
    expect(opacity.disabled).toBeLessThan(opacity[60]);
  });
});
