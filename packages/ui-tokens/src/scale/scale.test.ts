import { describe, expect, it } from "vitest";

import { scale } from "./scale";

describe("scale", () => {
  it("starts at none (0px) and ends at full (9999px)", () => {
    expect(scale.none).toBe("0px");
    expect(scale.full).toBe("9999px");
  });

  it("increases monotonically between xs and 2xl", () => {
    const order = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;
    const sizes = order.map((key) => parseInt(scale[key], 10));
    for (let i = 1; i < sizes.length; i++) {
      expect(sizes[i]).toBeGreaterThan(sizes[i - 1]);
    }
  });
});
