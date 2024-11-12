import { httpClient } from "@/core/http/client";
import { MockedFunction, beforeEach, describe, expect, test, vi } from "vitest";
import { fetchMultiplePokemons } from "./fetch-multiple-pokemons";

vi.mock("@/core/http/client", () => ({
  httpClient: vi.fn(),
}));

describe("fetchMultiplePokemons", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should fetch multiple pokemons from given URLs", async () => {
    const mockPokemon1 = { name: "bulbasaur", id: 1 };
    const mockPokemon2 = { name: "charmander", id: 4 };
    const urls = [
      "https://pokeapi.co/api/v2/pokemon/1",
      "https://pokeapi.co/api/v2/pokemon/4",
    ];

    const mockHttpClient = httpClient as MockedFunction<typeof httpClient>;
    mockHttpClient
      .mockResolvedValueOnce(mockPokemon1)
      .mockResolvedValueOnce(mockPokemon2);

    const result = await fetchMultiplePokemons(urls);

    expect(result).toEqual([mockPokemon1, mockPokemon2]);
    expect(httpClient).toHaveBeenCalledTimes(2);
    expect(httpClient).toHaveBeenCalledWith(urls[0]);
    expect(httpClient).toHaveBeenCalledWith(urls[1]);
  });

  test("should handle empty URL array", async () => {
    const result = await fetchMultiplePokemons([]);

    expect(result).toEqual([]);
    expect(httpClient).not.toHaveBeenCalled();
  });

  test("should reject if any Pokemon fetch fails", async () => {
    const urls = [
      "https://pokeapi.co/api/v2/pokemon/1",
      "https://pokeapi.co/api/v2/pokemon/invalid",
    ];
    const mockError = new Error("Failed to fetch Pokemon");

    const mockHttpClient = httpClient as MockedFunction<typeof httpClient>;

    mockHttpClient
      .mockResolvedValueOnce({ name: "bulbasaur", id: 1 })
      .mockRejectedValueOnce(mockError);

    await expect(fetchMultiplePokemons(urls)).rejects.toThrow();
    expect(httpClient).toHaveBeenCalledWith(urls[0]);
    expect(httpClient).toHaveBeenCalledWith(urls[1]);
  });
});
