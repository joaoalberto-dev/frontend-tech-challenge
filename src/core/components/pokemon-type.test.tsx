import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import { PokemonTypeImage, pokemonTypes } from "./pokemon-type";

describe("PokemonTypeImage", () => {
  test("renders with default className", () => {
    const { container } = render(<PokemonTypeImage type="fire" />);
    const img = container.querySelector("img");

    expect(img).toBeTruthy();
    expect(img?.src).toContain(pokemonTypes.fire);
    expect(img?.className).toBe("w-4 h-4 ");
  });

  test("renders with custom className", () => {
    const { container } = render(
      <PokemonTypeImage type="water" className="custom-class" />
    );
    const img = container.querySelector("img");

    expect(img).toBeTruthy();
    expect(img?.src).toContain(pokemonTypes.water);
    expect(img?.className).toBe("w-4 h-4 custom-class");
  });

  test("renders correct image for each pokemon type", () => {
    Object.entries(pokemonTypes).forEach(([type, src]) => {
      const { container } = render(
        <PokemonTypeImage type={type as keyof typeof pokemonTypes} />
      );
      const img = container.querySelector("img");

      expect(img).toBeTruthy();
      expect(img?.src).toContain(src);
    });
  });
});
