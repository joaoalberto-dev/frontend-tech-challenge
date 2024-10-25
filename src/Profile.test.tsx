import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Profile } from "./Profile";

describe("Profile", () => {
  test("renders the Profile component", () => {
    const screen = render(<Profile />);
    const profile = screen.getByText(/Profile/);

    expect(profile).toBeInTheDocument();
  });
});