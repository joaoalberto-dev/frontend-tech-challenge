import { render } from "@/core/test-utils";
import { PokeTrainerHeader } from "./poke-trainer-header";
import { describe, expect, test } from "vitest";

describe("PokeTrainerHeader", () => {
  const defaultProps = {
    image: "https://example.com/trainer.jpg",
    name: "Ash Ketchum",
  };

  test("renders trainer name correctly", () => {
    const screen = render(<PokeTrainerHeader {...defaultProps} />);

    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
  });

  test("renders two images with correct src", () => {
    const screen = render(<PokeTrainerHeader {...defaultProps} />);
    const images = screen.getAllByRole("img");

    expect(images).toHaveLength(2);

    images.forEach((img) => {
      expect(img).toHaveAttribute("src", defaultProps.image);
    });
  });

  test("renders trainer image with correct alt text", () => {
    const screen = render(<PokeTrainerHeader {...defaultProps} />);

    expect(screen.getByAltText(defaultProps.name)).toBeInTheDocument();
  });
});
