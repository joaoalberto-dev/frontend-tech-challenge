import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { EmptyState } from "./empty-state";

describe("EmptyState", () => {
  test("renders with default props", () => {
    const screen = render(<EmptyState />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  test("renders with provided text", () => {
    const testText = "No items found";
    const screen = render(<EmptyState text={testText} />);

    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  test("does not render text paragraph when text prop is not provided", () => {
    const screen = render(<EmptyState />);
    const paragraphs = screen.queryAllByRole("paragraph");

    expect(paragraphs.length).toBe(0);
  });
});
