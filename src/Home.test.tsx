import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Home } from "./Home";

describe("Home", () => {
  test("renders the Home component", () => {
    const screen = render(<Home />);
    const home = screen.getByText(/Home/);

    expect(home).toBeInTheDocument();
  });
});