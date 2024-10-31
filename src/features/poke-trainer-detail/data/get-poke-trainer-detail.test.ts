import { describe, test, expect, vi, afterEach } from "vitest";
import { rickAndMortyApi } from "@/core/services/rick-and-morty";
import { getPokeTrainerDetail } from "./get-poke-trainer-detail";

vi.mock("@/core/services/rick-and-morty", () => ({
  rickAndMortyApi: {
    get: vi.fn(),
  },
}));

describe("getPokeTrainerDetail", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should fetch character details successfully", async () => {
    const mockCharacter = {
      id: "1",
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
    };

    vi.mocked(rickAndMortyApi.get).mockResolvedValueOnce(mockCharacter);

    const result = await getPokeTrainerDetail("1");

    expect(rickAndMortyApi.get).toHaveBeenCalledWith("/character/1");
    expect(result).toEqual(mockCharacter);
  });

  test("should throw an error when the API call fails", async () => {
    const mockError = new Error("API Error");
    vi.mocked(rickAndMortyApi.get).mockRejectedValueOnce(mockError);

    await expect(getPokeTrainerDetail("1")).rejects.toThrow("API Error");
    expect(rickAndMortyApi.get).toHaveBeenCalledWith("/character/1");
  });
});
