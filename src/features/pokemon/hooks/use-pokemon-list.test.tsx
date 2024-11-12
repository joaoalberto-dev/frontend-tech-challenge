import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { pokemonListLoader } from "../data/pokemon-list-loader";
import { usePokemonList } from "./use-pokemon-list";

vi.mock("../data/pokemon-list-loader", () => ({
  pokemonListLoader: vi.fn(),
}));

describe("usePokemonList", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  test("should fetch pokemon list successfully", async () => {
    const mockPokemonList = [
      { id: 1, name: "bulbasaur" },
      { id: 2, name: "ivysaur" },
    ];

    (pokemonListLoader as any).mockResolvedValue(mockPokemonList);

    const { result } = renderHook(() => usePokemonList(), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockPokemonList);
  });

  test("should handle error states", async () => {
    const mockError = new Error("Failed to fetch pokemon");

    (pokemonListLoader as any).mockRejectedValue(mockError);

    const { result } = renderHook(() => usePokemonList(), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBe(mockError);
  });
});
