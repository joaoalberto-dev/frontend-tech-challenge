import { httpClient } from "@/core/http/client";
import { pokemonApi } from "@/core/services/pokemon-api";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { pokemonTypesListLoader } from "./pokemon-types-list-loader";

vi.mock("@/core/services/pokemon-api", () => ({
  pokemonApi: {
    get: vi.fn(),
  },
}));
vi.mock("@/core/http/client", () => ({
  httpClient: vi.fn(),
}));

describe("pokemonTypesListLoader", () => {
  const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
    });
  });

  test("should return cached pokemon types from localStorage if available", async () => {
    const mockTypes = [{ name: "fire", url: "fire-url" }];
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockTypes));

    const result = await pokemonTypesListLoader();

    expect(result).toEqual(mockTypes);
    expect(pokemonApi.get).not.toHaveBeenCalled();
    expect(httpClient).not.toHaveBeenCalled();
  });

  test("should fetch pokemon types if not in localStorage", async () => {
    mockLocalStorage.getItem.mockReturnValue("[]");

    const mockTypesList = {
      results: [
        { name: "fire", url: "fire-url" },
        { name: "water", url: "water-url" },
      ],
    };

    const mockTypeDetails = {
      name: "fire",
      id: 1,
      damage_relations: {},
    };

    vi.mocked(pokemonApi.get).mockResolvedValue(mockTypesList);
    vi.mocked(httpClient).mockResolvedValue(mockTypeDetails);

    const result = await pokemonTypesListLoader();

    expect(pokemonApi.get).toHaveBeenCalledWith("/type?limit=10000");
    expect(httpClient).toHaveBeenCalledTimes(2);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "POKEMON_TYPES_LIST",
      expect.any(String)
    );
    expect(result).toEqual([mockTypeDetails, mockTypeDetails]);
  });

  test("should return empty array when an error occurs", async () => {
    mockLocalStorage.getItem.mockImplementation(() => {
      throw new Error("Storage error");
    });

    const result = await pokemonTypesListLoader();

    expect(result).toEqual([]);
  });
});
