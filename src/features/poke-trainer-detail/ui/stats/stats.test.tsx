import { RickAndMortyCharacter } from "@/core/services/rick-and-morty.types";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { PokeTrainerStats } from "./stats";

const mockTrainer = {
  name: "Rick Sanchez",
  gender: "Male",
  origin: { name: "Earth", url: "" },
  species: "Human",
} as unknown as RickAndMortyCharacter;

describe("PokeTrainerStats Component", () => {
  test("renders correctly with trainer details", () => {
    const { getByText } = render(<PokeTrainerStats trainer={mockTrainer} />);

    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Rick Sanchez")).toBeInTheDocument();
    expect(getByText("Gender")).toBeInTheDocument();
    expect(getByText("Male")).toBeInTheDocument();
    expect(getByText("Origin")).toBeInTheDocument();
    expect(getByText("Earth")).toBeInTheDocument();
    expect(getByText("Species")).toBeInTheDocument();
    expect(getByText("Human")).toBeInTheDocument();
  });
});
