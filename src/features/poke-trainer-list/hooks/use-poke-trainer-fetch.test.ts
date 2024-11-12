import { useInfiniteQuery } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { describe, expect, it, Mock, vi } from "vitest";
import { usePokeTrainerFetch } from "./use-poke-trainer-fetch";

vi.mock("@tanstack/react-query", () => ({
  useInfiniteQuery: vi.fn(),
}));

vi.mock("../data/get-poke-trainers", () => ({
  getPokeTrainers: vi.fn(),
}));

describe("usePokeTrainerFetch", () => {
  it("should return correct data structure", () => {
    const mockQueryResult = {
      data: { pages: [] },
      fetchNextPage: vi.fn(),
      isFetching: false,
      isRefetching: false,
      isFetchingNextPage: false,
      hasNextPage: true,
    };

    (useInfiniteQuery as Mock).mockReturnValue(mockQueryResult);

    const { result } = renderHook(() => usePokeTrainerFetch("Ash"));

    expect(result.current).toEqual({
      data: { pages: [] },
      loadMore: expect.any(Function),
      hasMore: true,
      isLoading: false,
    });
  });

  it("should handle loading states correctly", () => {
    const mockQueryResult = {
      data: { pages: [] },
      fetchNextPage: vi.fn(),
      isFetching: true,
      isRefetching: false,
      isFetchingNextPage: false,
      hasNextPage: true,
    };

    (useInfiniteQuery as Mock).mockReturnValue(mockQueryResult);

    const { result } = renderHook(() => usePokeTrainerFetch("Rick"));

    expect(result.current.isLoading).toBe(true);
  });

  it("should pass correct parameters to useInfiniteQuery", () => {
    const mockQueryResult = {
      data: { pages: [] },
      fetchNextPage: vi.fn(),
      isFetching: false,
      isRefetching: false,
      isFetchingNextPage: false,
      hasNextPage: true,
    };

    (useInfiniteQuery as Mock).mockReturnValue(mockQueryResult);

    renderHook(() => usePokeTrainerFetch("Ash"));

    expect(useInfiniteQuery).toHaveBeenCalledWith({
      initialPageParam: 1,
      queryKey: ["characters", "Rick"],
      queryFn: expect.any(Function),
      getNextPageParam: expect.any(Function),
    });
  });

  it("should correctly parse next page from URL", () => {
    const mockQueryResult = {
      data: { pages: [] },
      fetchNextPage: vi.fn(),
      isFetching: false,
      isRefetching: false,
      isFetchingNextPage: false,
      hasNextPage: true,
    };

    (useInfiniteQuery as Mock).mockReturnValue(mockQueryResult);

    renderHook(() => usePokeTrainerFetch("Rick"));

    const queryConfig = (useInfiniteQuery as Mock).mock.calls[0][0];
    const nextPage = queryConfig.getNextPageParam({
      info: { next: "https://api.example.com/characters?page=2" },
    });

    expect(nextPage).toBe("2");
  });
});
