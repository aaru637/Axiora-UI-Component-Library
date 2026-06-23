import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  addDays,
  differenceInDays,
  endOfDay,
  formatDate,
  formatDateTime,
  isFuture,
  isPast,
  isToday,
  relativeTime,
  startOfDay,
  subtractDays,
} from "./date.utils";

describe("Date Utils", () => {
  const fixedNow = new Date("2024-06-15T15:30:00.000Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(fixedNow);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("formatDate and formatDateTime format values", () => {
    const date = new Date("2024-06-15T15:30:00.000Z");
    expect(formatDate(date)).toBe("2024-06-15");
    expect(formatDateTime(date, "en-US")).toContain("2024");
  });

  it("startOfDay and endOfDay normalize time boundaries", () => {
    const date = new Date("2024-06-15T15:30:00.000Z");
    expect(startOfDay(date)?.getHours()).toBe(0);
    expect(endOfDay(date)?.getHours()).toBe(23);
  });

  it("isToday, isPast, and isFuture classify dates", () => {
    expect(isToday(fixedNow)).toBe(true);
    expect(isPast(new Date("2024-06-14T12:00:00.000Z"))).toBe(true);
    expect(isFuture(new Date("2024-06-16T12:00:00.000Z"))).toBe(true);
  });

  it("addDays and subtractDays shift dates", () => {
    const date = new Date("2024-06-15T12:00:00.000Z");
    expect(formatDate(addDays(date, 2))).toBe("2024-06-17");
    expect(formatDate(subtractDays(date, 2))).toBe("2024-06-13");
  });

  it("differenceInDays returns the day delta", () => {
    const left = new Date("2024-06-17T12:00:00.000Z");
    const right = new Date("2024-06-15T12:00:00.000Z");
    expect(differenceInDays(left, right)).toBe(2);
  });

  it("relativeTime returns a readable duration", () => {
    const twoHoursAgo = new Date(fixedNow.getTime() - 2 * 60 * 60 * 1000);
    expect(relativeTime(twoHoursAgo, fixedNow)).toBe("2 hours ago");
  });
});
