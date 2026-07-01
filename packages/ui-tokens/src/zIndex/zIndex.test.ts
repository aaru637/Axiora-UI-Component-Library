import { describe, expect, it } from "vitest";

import { zIndex } from "./zIndex";

describe("zIndex", () => {
  it("bases the stack at 0", () => {
    expect(zIndex.base).toBe(0);
  });

  it("stacks layers in the expected visual order", () => {
    const order = [
      "base",
      "dropdown",
      "sticky",
      "fixed",
      "overlay",
      "modal",
      "popover",
      "toast",
      "tooltip",
    ] as const;

    for (let i = 1; i < order.length; i++) {
      expect(zIndex[order[i]]).toBeGreaterThan(zIndex[order[i - 1]]);
    }
  });

  it("has no duplicate values across layers", () => {
    const values = Object.values(zIndex);
    expect(new Set(values).size).toBe(values.length);
  });
});
