import { fireEvent } from "@testing-library/react";
import { FavoritePokemonCard } from "./favorite-card";
import { useFavoritePokemon } from "../../context/favorite-pokemon";
import { describe, test, vi, expect, beforeEach, Mock } from "vitest";
import { Pokemon } from "@/core/services/pokemon-api.types";
import { render } from "@/core/test-utils";

vi.mock("../../context/favorite-pokemon", () => ({
  useFavoritePokemon: vi.fn(),
}));

describe("FavoritePokemonCard", () => {
  const mockPokemon = {
    id: "1",
    name: "Bulbasaur",
    sprites: {
      front_default: "mock-sprite-url",
      other: {
        "official-artwork": {
          front_default: "mock-artwork-url",
        },
      },
    },
  };

  const mockTrainerId = "trainer-123";
  const mockRemove = vi.fn();

  beforeEach(() => {
    (useFavoritePokemon as unknown as Mock).mockReturnValue({
      remove: mockRemove,
    });
  });

  test("renders pokemon card with correct information", () => {
    const screen = render(
      <FavoritePokemonCard
        pokemon={mockPokemon as unknown as Pokemon}
        trainerId={mockTrainerId}
      />
    );

    expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
  });

  test("calls remove function when remove button is clicked", () => {
    const screen = render(
      <FavoritePokemonCard
        pokemon={mockPokemon as unknown as Pokemon}
        trainerId={mockTrainerId}
      />
    );

    const removeButton = screen.getByRole("button");
    fireEvent.click(removeButton);

    expect(mockRemove).toHaveBeenCalledWith(mockTrainerId, mockPokemon);
  });

  test("uses fallback image when front_default is not available", () => {
    const pokemonNoSprite = {
      ...mockPokemon,
      sprites: {
        front_default: "",
        other: {
          "official-artwork": {
            front_default: "mock-artwork-url",
          },
        },
      },
    };

    const screen = render(
      <FavoritePokemonCard
        pokemon={pokemonNoSprite as unknown as Pokemon}
        trainerId={mockTrainerId}
      />
    );

    const cardImage = screen.getByRole("img");
    expect(cardImage).toHaveAttribute("src", "mock-artwork-url");
  });
});
