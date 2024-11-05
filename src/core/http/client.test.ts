import { httpClient, createHttpClient } from "./client";
import { vi, describe, beforeEach, expect, MockedFunction, test } from "vitest";

// @ts-expect-error
global.fetch = vi.fn();

describe("httpClient", () => {
  const mockedFetch = fetch as MockedFunction<typeof fetch>;

  beforeEach(() => {
    mockedFetch.mockClear();
  });

  test("should successfully fetch JSON data", async () => {
    const mockResponse = {
      ok: true,
      headers: new Headers({ "content-type": "application/json" }),
      json: vi.fn().mockResolvedValue({ data: "test" }),
    };
    mockedFetch.mockResolvedValue(mockResponse as any);

    const result = await httpClient<{ data: string }>(
      "https://api.example.com/data"
    );
    expect(result).toEqual({ data: "test" });
    expect(mockedFetch).toHaveBeenCalledWith(
      "https://api.example.com/data",
      {}
    );
  });

  test("should throw an error for non-OK responses", async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      statusText: "Not Found",
    };
    mockedFetch.mockResolvedValue(mockResponse as any);

    await expect(
      httpClient("https://api.example.com/notfound")
    ).rejects.toThrow();
  });

  test("should throw an error for unexpected content types", async () => {
    const mockResponse = {
      ok: true,
      headers: new Headers({ "content-type": "text/plain" }),
    };
    mockedFetch.mockResolvedValue(mockResponse as any);

    await expect(httpClient("https://api.example.com/text")).rejects.toThrow();
  });
});

describe("createHttpClient", () => {
  const mockedFetch = fetch as MockedFunction<typeof fetch>;

  beforeEach(() => {
    mockedFetch.mockClear();
  });

  test("should create a client with a base URL", async () => {
    const mockResponse = {
      ok: true,
      headers: new Headers({ "content-type": "application/json" }),
      json: vi.fn().mockResolvedValue({ data: "test" }),
    };
    mockedFetch.mockResolvedValue(mockResponse as any);

    const client = createHttpClient("https://api.example.com");
    const result = await client.get<{ data: string }>("/data");

    expect(result).toEqual({ data: "test" });
    expect(mockedFetch).toHaveBeenCalledWith("https://api.example.com/data", {
      method: "GET",
    });
  });
});
