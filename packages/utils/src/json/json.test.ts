import { describe, expect, it } from "vitest";
import {
  cloneJson,
  ensureJsonSerializable,
  fromJson,
  isValidJson,
  jsonEquals,
  minifyJson,
  prettyJson,
  toJson,
  tryFromJson,
} from "./json.utils";

describe("JSON Utils", () => {
  const sample = { id: 1, name: "Ada", active: true };

  it("toJson serializes values to JSON strings", () => {
    expect(toJson(sample)).toBe('{"id":1,"name":"Ada","active":true}');
    expect(toJson(null)).toBe(null);
    expect(toJson(undefined)).toBe(undefined);
  });

  it("fromJson parses JSON strings into typed values", () => {
    expect(
      fromJson<typeof sample>('{"id":1,"name":"Ada","active":true}'),
    ).toEqual(sample);
    expect(fromJson("not-json", sample)).toEqual(sample);
    expect(fromJson(null)).toBe(null);
  });

  it("tryFromJson returns tuple results", () => {
    expect(
      tryFromJson<typeof sample>('{"id":1,"name":"Ada","active":true}'),
    ).toEqual([null, sample]);
    expect(tryFromJson("{bad")).toEqual([expect.any(Error), null]);
  });

  it("isValidJson validates JSON strings", () => {
    expect(isValidJson('{"ok":true}')).toBe(true);
    expect(isValidJson("")).toBe(false);
    expect(isValidJson("{bad")).toBe(false);
  });

  it("prettyJson and minifyJson format output", () => {
    expect(prettyJson(sample)).toContain('\n  "id": 1');
    expect(minifyJson(sample)).toBe('{"id":1,"name":"Ada","active":true}');
  });

  it("cloneJson and ensureJsonSerializable round-trip values", () => {
    const cloned = cloneJson(sample);

    expect(cloned).toEqual(sample);
    expect(cloned).not.toBe(sample);
    expect(ensureJsonSerializable(sample)).toEqual(sample);
  });

  it("jsonEquals compares serialized values", () => {
    expect(jsonEquals({ a: 1 }, { a: 1 })).toBe(true);
    expect(jsonEquals({ a: 1 }, { a: 2 })).toBe(false);
  });
});
