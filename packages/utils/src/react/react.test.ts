/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  asyncHandler,
  copyToClipboard,
  downloadFile,
  getErrorMessage,
  isPromise,
  memoize,
  scrollIntoView,
  scrollToTop,
} from "./react.utils";

describe("React Utils", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("memoize caches function results", () => {
    const fn = vi.fn((value: number) => value * 2);
    const memoized = memoize(fn);

    expect(memoized(2)).toBe(4);
    expect(memoized(2)).toBe(4);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("getErrorMessage extracts messages from errors", () => {
    expect(getErrorMessage(new Error("Boom"))).toBe("Boom");
    expect(getErrorMessage("Plain error")).toBe("Plain error");
    expect(getErrorMessage({})).toBe("Unknown error");
  });

  it("isPromise identifies promise-like values", () => {
    expect(isPromise(Promise.resolve(1))).toBe(true);
    expect(isPromise({ then: () => undefined })).toBe(true);
    expect(isPromise(42)).toBe(false);
  });

  it("asyncHandler returns tuple results for async functions", async () => {
    const success = asyncHandler(async (value: number) => value + 1);
    const failure = asyncHandler(async () => {
      throw new Error("Failed");
    });

    expect(await success(1)).toEqual([null, 2]);
    expect(await failure()).toEqual([expect.any(Error), null]);
  });

  it("copyToClipboard writes text when clipboard is available", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    await expect(copyToClipboard("Axon")).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith("Axon");
  });

  it("downloadFile creates a downloadable anchor", () => {
    const click = vi.fn();
    const createElement = vi
      .spyOn(document, "createElement")
      .mockReturnValue({ click } as unknown as HTMLAnchorElement);
    const revokeObjectURL = vi.spyOn(URL, "revokeObjectURL");

    downloadFile(new Blob(["hello"]), "test.txt");

    expect(createElement).toHaveBeenCalledWith("a");
    expect(click).toHaveBeenCalled();
    expect(revokeObjectURL).toHaveBeenCalledTimes(1);
  });

  it("scrollToTop scrolls the window", () => {
    const scrollTo = vi.fn();
    Object.assign(window, { scrollTo });

    scrollToTop();

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("scrollIntoView scrolls an element or ref", () => {
    const element = document.createElement("div");
    const scrollIntoViewMock = vi.fn();
    element.scrollIntoView = scrollIntoViewMock;

    scrollIntoView(element);
    scrollIntoView({ current: element });

    expect(scrollIntoViewMock).toHaveBeenCalledTimes(2);
  });
});
