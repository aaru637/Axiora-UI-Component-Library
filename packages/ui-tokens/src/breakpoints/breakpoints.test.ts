import { describe, expect, it } from "vitest";

import { breakpoints, breakpointsPx } from "./breakpoints";

describe("breakpoints", () => {
  it("has the same keys as breakpointsPx", () => {
    expect(Object.keys(breakpoints).sort()).toEqual(
      Object.keys(breakpointsPx).sort(),
    );
  });

  it.each(Object.keys(breakpoints) as (keyof typeof breakpoints)[])(
    "%s string value matches its px number",
    (key) => {
      expect(breakpoints[key]).toBe(`${breakpointsPx[key]}px`);
    },
  );

  it("increases monotonically from xs to 2xl", () => {
    const order = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;
    for (let i = 1; i < order.length; i++) {
      expect(breakpointsPx[order[i]]).toBeGreaterThan(
        breakpointsPx[order[i - 1]],
      );
    }
  });
});
