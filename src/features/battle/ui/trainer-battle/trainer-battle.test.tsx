import { fireEvent, render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { TrainerBattle } from "./trainer-battle";

describe("TrainerBattle", () => {
  test("should render random trainer button when no profile is provided", () => {
    const screen = render(<TrainerBattle />);

    expect(
      screen.getByRole("button", { name: /trainer/i })
    ).toBeInTheDocument();
  });

  test("should call handleRandomTrainer when trainer button is clicked", () => {
    const handleRandomTrainer = vi.fn();
    const screen = render(
      <TrainerBattle handleRandomTrainer={handleRandomTrainer} />
    );

    fireEvent.click(screen.getByRole("button", { name: /trainer/i }));

    expect(handleRandomTrainer).toHaveBeenCalledOnce();
  });

  test("should render random pokemon button when profile exists but no favorites", () => {
    const profile = {
      id: 1,
      name: "Rick Sanchez",
      image: "rick.jpg",
    };

    // @ts-expect-error
    const screen = render(<TrainerBattle profile={profile} />);

    expect(
      screen.getByRole("button", { name: /pokemons/i })
    ).toBeInTheDocument();
  });

  test("should display trainer header and pokemon list when both profile and favorites exist", () => {
    const profile = {
      id: 1,
      name: "Rick Sanchez",
      image: "rick.jpg",
    };

    const favorites: [string, any][] = [
      [
        "1",
        {
          id: 25,
          name: "pikachu",
          sprites: {
            front_default: "pikachu.jpg",
            other: { "official-artwork": { front_default: "" } },
          },
          types: [{ type: { name: "electric" } }],
        },
      ],
    ];

    const screen = render(
      // @ts-expect-error
      <TrainerBattle profile={profile} favorites={favorites} />
    );

    expect(screen.getByText(profile.name)).toBeInTheDocument();
    expect(screen.getByText("pikachu")).toBeInTheDocument();
  });

  test("should call handleRandomPokemons when pokemon button is clicked", () => {
    const profile = {
      id: 1,
      name: "Rick Sanchez",
      image: "rick.jpg",
    };
    const handleRandomPokemons = vi.fn();

    const screen = render(
      <TrainerBattle
        // @ts-expect-error
        profile={profile}
        handleRandomPokemons={handleRandomPokemons}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /pokemons/i }));

    expect(handleRandomPokemons).toHaveBeenCalledOnce();
  });
});
