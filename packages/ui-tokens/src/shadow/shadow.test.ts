import { describe, expect, it } from "vitest";

import { shadow } from "./shadow";

describe("shadow", () => {
  it("has a none elevation with no visual effect", () => {
    expect(shadow.none).toBe("none");
  });

  it("has an inset shadow for inner", () => {
    expect(shadow.inner).toMatch(/^inset /);
  });

  it("every elevation other than none and inner is a layered box-shadow value", () => {
    const elevations = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;
    for (const key of elevations) {
      expect(shadow[key]).toMatch(/^0 \d+px \d+px rgba\(/);
    }
  });
});
