import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useDebounceCallback } from "./use-debounce-callback";

describe("useDebounceCallback", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("should debounce the callback function", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebounceCallback(callback, 500));

    result.current("test");
    result.current("test");
    result.current("test");

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("test");
  });

  it("should cancel previous timeout when called again", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebounceCallback(callback, 500));

    result.current("test1");
    vi.advanceTimersByTime(200);
    result.current("test2");
    vi.advanceTimersByTime(300);
    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(200);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("test2");
  });

  it("should use default delay of 300ms when not specified", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebounceCallback(callback));

    result.current("test");
    vi.advanceTimersByTime(299);
    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should preserve the callback arguments", () => {
    const callback = vi.fn();
    const { result } = renderHook(() =>
      useDebounceCallback((a: number, b: string) => callback(a, b))
    );

    result.current(42, "test");
    vi.advanceTimersByTime(300);

    expect(callback).toHaveBeenCalledWith(42, "test");
  });
});
