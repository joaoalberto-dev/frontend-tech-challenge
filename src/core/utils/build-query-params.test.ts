import { buildQueryParams } from "./build-query-params";
import { describe, test, expect } from "vitest";

describe("buildQueryParams", () => {
  test("should build query string from valid params", () => {
    const params = {
      name: "John",
      age: "30",
      city: "New York",
    };

    const result = buildQueryParams(params);
    expect(result).toBe("name=John&age=30&city=New+York");
  });

  test("should skip undefined values", () => {
    const params = {
      name: "John",
      age: undefined as unknown as string,
      city: "New York",
    };

    const result = buildQueryParams(params);
    expect(result).toBe("name=John&city=New+York");
  });

  test("should skip empty string values", () => {
    const params = {
      name: "John",
      age: "",
      city: "New York",
    };

    const result = buildQueryParams(params);
    expect(result).toBe("name=John&city=New+York");
  });

  test("should return empty string for empty params", () => {
    const result = buildQueryParams({});
    expect(result).toBe("");
  });

  test("should handle null params", () => {
    const result = buildQueryParams(null as unknown as Record<string, string>);
    expect(result).toBe("");
  });
});
