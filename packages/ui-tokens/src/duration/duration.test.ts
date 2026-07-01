import { describe, expect, it } from "vitest";

import { duration, easing } from "./duration";

describe("duration", () => {
  it("starts at instant (0ms)", () => {
    expect(duration.instant).toBe("0ms");
  });

  it("increases monotonically from instant to slower", () => {
    const order = ["instant", "fast", "base", "slow", "slower"] as const;
    const values = order.map((key) => parseInt(duration[key], 10));
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThan(values[i - 1]);
    }
  });
});

describe("easing", () => {
  it("defines linear as a plain keyword", () => {
    expect(easing.linear).toBe("linear");
  });

  it("defines the rest as cubic-bezier curves", () => {
    const curves = ["easeIn", "easeOut", "easeInOut"] as const;
    for (const key of curves) {
      expect(easing[key]).toMatch(/^cubic-bezier\(/);
    }
  });
});
