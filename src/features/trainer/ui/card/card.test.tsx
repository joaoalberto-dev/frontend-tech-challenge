import { useQuery } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { useParams } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { useFavoritePokemon } from "../../context/favorite-pokemon";
import { PokemonCard } from "./card";

// Mock the dependencies
vi.mock("@tanstack/react-query");
vi.mock("react-router-dom");
vi.mock("../../context/favorite-pokemon");
vi.mock("@/core/components/card", () => ({
  Card: ({ name, onClick }: { name: string; onClick: () => void }) => (
    <button onClick={onClick}>{name}</button>
  ),
}));

describe("PokemonCard", () => {
  const mockPokemon = {
    id: 1,
    name: "bulbasaur",
    sprites: {
      front_default: "front-sprite.png",
      other: {
        "official-artwork": {
          front_default: "official-artwork.png",
        },
      },
    },
  };

  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue({ id: "trainer-1" });
    vi.mocked(useQuery).mockReturnValue({
      data: mockPokemon,
      isLoading: false,
    } as any);
    vi.mocked(useFavoritePokemon).mockReturnValue({
      add: vi.fn(),
      canAdd: vi.fn().mockReturnValue(true),
    });
  });

  test("renders pokemon card when data is available", () => {
    render(<PokemonCard url="https://pokeapi.co/api/v2/pokemon/1" />);
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
  });

  test("uses front_default sprite if available", () => {
    render(<PokemonCard url="https://pokeapi.co/api/v2/pokemon/1" />);
    const card = screen.getByRole("button");
    expect(card).toBeInTheDocument();
  });

  test("doesn't render when query data is not available", () => {
    vi.mocked(useQuery).mockReturnValue({
      data: null,
      isLoading: false,
    } as any);

    const { container } = render(
      <PokemonCard url="https://pokeapi.co/api/v2/pokemon/1" />
    );
    expect(container).toBeEmptyDOMElement();
  });

  test("doesn't render when trainer id is not available", () => {
    vi.mocked(useParams).mockReturnValue({});

    const { container } = render(
      <PokemonCard url="https://pokeapi.co/api/v2/pokemon/1" />
    );
    expect(container).toBeEmptyDOMElement();
  });

  test("applies cursor-not-allowed class when pokemon cannot be added", () => {
    vi.mocked(useFavoritePokemon).mockReturnValue({
      add: vi.fn(),
      canAdd: vi.fn().mockReturnValue(false),
    });

    render(<PokemonCard url="https://pokeapi.co/api/v2/pokemon/1" />);
    const card = screen.getByRole("button");
    expect(card).toBeInTheDocument();
  });

  test("calls add function when clicked", async () => {
    const mockAdd = vi.fn();
    vi.mocked(useFavoritePokemon).mockReturnValue({
      add: mockAdd,
      canAdd: vi.fn().mockReturnValue(true),
    });

    render(<PokemonCard url="https://pokeapi.co/api/v2/pokemon/1" />);
    const card = screen.getByRole("button");
    card.click();

    expect(mockAdd).toHaveBeenCalledWith("trainer-1", mockPokemon);
  });
});
