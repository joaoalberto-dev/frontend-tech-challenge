import { rickAndMortyApi } from "@/features/trainer/services/rick-and-morty";
import { RickAndMortyResponse } from "@/features/trainer/services/rick-and-morty.types";
import { describe, expect, Mock, test, vi } from "vitest";
import { getPokeTrainers } from "./get-poke-trainers";

vi.mock("@/features/trainer/services/rick-and-morty", () => ({
  rickAndMortyApi: {
    get: vi.fn(),
  },
}));

describe("getPokeTrainers", () => {
  const response = {
    info: {
      count: 0,
      pages: 0,
      next: "",
      prev: "",
    },
    results: [],
  };

  test("should call rickAndMortyApi.get with the correct endpoint", async () => {
    const mockResponse: RickAndMortyResponse = response;
    (rickAndMortyApi.get as Mock).mockResolvedValue(mockResponse);

    await getPokeTrainers({});

    expect(rickAndMortyApi.get).toHaveBeenCalledWith("/character?");
  });

  test("should return the response from rickAndMortyApi.get", async () => {
    const mockResponse: RickAndMortyResponse = response;
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
