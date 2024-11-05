import { describe, test, expect } from "vitest";
import { randonBetween } from "./random-between";

describe("randonBetween", () => {
  test("should return a number within the specified range", () => {
    const min = 1;
    const max = 10;
    const result = randonBetween(min, max);

    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  test("should return min when min equals max", () => {
    const number = 5;
    const result = randonBetween(number, number);

    expect(result).toBe(number);
  });

  test("should handle negative numbers", () => {
    const min = -10;
    const max = -5;
    const result = randonBetween(min, max);

    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  test("should generate different numbers over multiple calls", () => {
    const min = 1;
    const max = 100;
    const results = new Set();

    for (let i = 0; i < 10; i++) {
      results.add(randonBetween(min, max));
    }

    expect(results.size).toBeGreaterThan(1);
  });
});
