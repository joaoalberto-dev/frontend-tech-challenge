import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, Mock, test, vi } from "vitest";
import { getPokeTrainerDetail } from "../data/get-poke-trainer-detail";
import { usePokeTrainerProfile } from "./use-poke-trainer-profile";

vi.mock("../data/get-poke-trainer-detail", () => ({
  getPokeTrainerDetail: vi.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: any) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("usePokeTrainerProfile", () => {
  test("should fetch trainer profile when id is provided", async () => {
    const mockTrainer = {
      id: "1",
      name: "Rick Sanchez",
      status: "Alive",
    };

    (getPokeTrainerDetail as Mock).mockResolvedValue(mockTrainer);

    const { result } = renderHook(() => usePokeTrainerProfile("1"), {
      wrapper,
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockTrainer);
    expect(getPokeTrainerDetail).toHaveBeenCalledWith("1");
  });

  test("should not fetch when id is not provided", () => {
    const { result } = renderHook(() => usePokeTrainerProfile(), { wrapper });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isFetching).toBe(false);
  });

  test("should handle error when fetch fails", async () => {
    const error = new Error("Failed to fetch trainer");

    (getPokeTrainerDetail as Mock).mockRejectedValue(error);

    const { result } = renderHook(() => usePokeTrainerProfile("1"), {
      wrapper,
    });

    await waitFor(async () => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });
});
