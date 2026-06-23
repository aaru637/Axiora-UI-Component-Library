import { describe, expect, it } from "vitest";
import {
  buildQueryString,
  getQueryParam,
  parseQueryString,
  removeQueryParam,
  setQueryParam,
} from "./url.utils";

const sampleUrl = "https://example.com/path?foo=bar&baz=1#section";

describe("URL Utils", () => {
  it("getQueryParam reads a query parameter", () => {
    expect(getQueryParam("foo", sampleUrl)).toBe("bar");
    expect(getQueryParam("missing", sampleUrl)).toBe(null);
  });

  it("setQueryParam updates or adds a query parameter", () => {
    expect(setQueryParam("foo", "updated", sampleUrl)).toContain("foo=updated");
    expect(setQueryParam("new", "value", sampleUrl)).toContain("new=value");
  });

  it("removeQueryParam deletes a query parameter", () => {
    const result = removeQueryParam("foo", sampleUrl);
    expect(result).not.toContain("foo=bar");
    expect(result).toContain("baz=1");
  });

  it("buildQueryString creates a query string", () => {
    expect(buildQueryString({ foo: "bar", page: 2, skip: undefined })).toBe(
      "?foo=bar&page=2",
    );
    expect(buildQueryString({})).toBe("");
  });

  it("parseQueryString converts URL params to an object", () => {
    expect(parseQueryString(sampleUrl)).toEqual({ foo: "bar", baz: "1" });
  });
});
