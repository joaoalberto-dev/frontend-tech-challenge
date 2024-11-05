import { describe, test, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useRandomPokemons } from "./use-random-pokemons";
import { usePokemonList } from "@/features/pokemon/hooks/use-pokemon-list";
import { fetchMultiplePokemons } from "../data/fetch-multiple-pokemons";

vi.mock("@/features/pokemon/hooks/use-pokemon-list");
vi.mock("../data/fetch-multiple-pokemons");

describe("useRandomPokemons", () => {
  const mockPokemonList = [
    { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1" },
    { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4" },
    { name: "squirtle", url: "https://pokeapi.co/api/v2/pokemon/7" },
  ];

  const mockPokemonDetails = [
    { name: "bulbasaur", id: 1 },
    { name: "charmander", id: 4 },
    { name: "squirtle", id: 7 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (usePokemonList as any).mockReturnValue({ data: mockPokemonList });
    (fetchMultiplePokemons as any).mockResolvedValue(mockPokemonDetails);
  });

  test("should return the getRandomPokemons function", () => {
    const { result } = renderHook(() => useRandomPokemons());
    expect(result.current.getRandomPokemons).toBeDefined();
    expect(typeof result.current.getRandomPokemons).toBe("function");
  });

  test("should throw error when Pokemon list is not available", async () => {
    (usePokemonList as any).mockReturnValue({ data: null });
    const { result } = renderHook(() => useRandomPokemons());

    await expect(result.current.getRandomPokemons()).rejects.toThrow(
      "Pokemon list is not available"
    );
  });

  test("should return correct number of random Pokemons", async () => {
    const { result } = renderHook(() => useRandomPokemons());
    const count = 3;
    const pokemons = await result.current.getRandomPokemons(count);

    expect(pokemons).toHaveLength(count);
    expect(fetchMultiplePokemons).toHaveBeenCalledTimes(1);
    expect(fetchMultiplePokemons).toHaveBeenCalledWith(
      expect.arrayContaining([expect.stringContaining("pokemon")])
    );
  });

  test("should handle fetch errors gracefully", async () => {
    (fetchMultiplePokemons as any).mockRejectedValue(new Error("API Error"));
    const { result } = renderHook(() => useRandomPokemons());

    await expect(result.current.getRandomPokemons()).rejects.toThrow(
      "Failed to fetch Pokemon details"
    );
  });

  test("should not request more Pokemons than available", async () => {
    const { result } = renderHook(() => useRandomPokemons());
    const count = 10; // More than available in mockPokemonList
    const pokemons = await result.current.getRandomPokemons(count);

    expect(pokemons).toHaveLength(mockPokemonList.length);
    expect(fetchMultiplePokemons).toHaveBeenCalledWith(
      expect.arrayContaining([expect.stringContaining("pokemon")])
    );
  });
});
