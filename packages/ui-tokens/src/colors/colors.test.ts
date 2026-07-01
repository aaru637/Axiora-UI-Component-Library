import { describe, expect, it } from "vitest";

import { colorPrimitive } from "./colors";

const HEX_COLOR = /^#[0-9a-f]{3,8}$/i;
const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
const PALETTES = [
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "indigo",
  "purple",
  "pink",
] as const;

describe("colorPrimitive", () => {
  it("exposes every expected palette", () => {
    expect(Object.keys(colorPrimitive).sort()).toEqual([...PALETTES].sort());
  });

  it.each(PALETTES)("%s has all shade stops from 50 to 950", (palette) => {
    expect(
      Object.keys(colorPrimitive[palette])
        .map(Number)
        .sort((a, b) => a - b),
    ).toEqual([...SHADES]);
  });

  it.each(PALETTES)("%s shades are all valid hex colors", (palette) => {
    for (const value of Object.values(colorPrimitive[palette])) {
      expect(value).toMatch(HEX_COLOR);
    }
  });

  it.each(PALETTES)(
    "%s has a distinct color at every shade stop",
    (palette) => {
      const values = Object.values(colorPrimitive[palette]);
      expect(new Set(values).size).toBe(values.length);
    },
  );
});
