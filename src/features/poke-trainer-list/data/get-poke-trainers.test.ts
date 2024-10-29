import { getPokeTrainers } from "./get-poke-trainers";
import { rickAndMortyApi } from "@/core/services/rick-and-morty";
import { RickAndMortyResponse } from "@/core/services/rick-and-morty.types";
import { describe, Mock, test, vi, expect } from "vitest";

vi.mock("@/core/services/rick-and-morty", () => ({
  rickAndMortyApi: {
    get: vi.fn(),
  },
}));

describe("getPokeTrainers", () => {
  test("should call rickAndMortyApi.get with the correct endpoint", async () => {
    const mockResponse: RickAndMortyResponse = {
      info: {
        count: 0,
        pages: 0,
        next: "",
        prev: "",
      },
      results: [],
    };
    (rickAndMortyApi.get as Mock).mockResolvedValue(mockResponse);

    await getPokeTrainers();

    expect(rickAndMortyApi.get).toHaveBeenCalledWith("/character");
  });

  test("should return the response from rickAndMortyApi.get", async () => {
    const mockResponse: RickAndMortyResponse = {
      info: {
        count: 0,
        pages: 0,
        next: "",
        prev: "",
      },
      results: [],
    };
    (rickAndMortyApi.get as Mock).mockResolvedValue(mockResponse);

    const result = await getPokeTrainers();

    expect(result).toEqual(mockResponse);
  });

  test("should throw an error if rickAndMortyApi.get fails", async () => {
    const mockError = new Error("API error");
    (rickAndMortyApi.get as Mock).mockRejectedValue(mockError);

    await expect(getPokeTrainers()).rejects.toThrow("API error");
  });
});