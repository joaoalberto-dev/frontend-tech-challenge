import { describe, test, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Card } from "./card";

const CardWrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
);

describe("Card", () => {
  const defaultProps = {
    id: "1",
    name: "Test Card",
    image: "test-image.jpg",
  };

  test("renders link card correctly", () => {
    const screen = render(
      <Card {...defaultProps} kind="link" link="/test-link" />,
      {
        wrapper: CardWrapper,
      },
    );

    expect(screen.getByText("Test Card")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "test-image.jpg");
    expect(screen.getByRole("link")).toHaveAttribute("href", "/test-link");
  });

  test("renders button card correctly", () => {
    const handleClick = vi.fn();

    const screen = render(
      <Card {...defaultProps} kind="button" onClick={handleClick} />,
      {
        wrapper: CardWrapper,
      },
    );

    expect(screen.getByText("Test Card")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });

  test("calls onClick when button card is clicked", () => {
    const handleClick = vi.fn();

    const screen = render(
      <Card {...defaultProps} kind="button" onClick={handleClick} />,
      {
        wrapper: CardWrapper,
      },
    );

    fireEvent.click(screen.getByRole("link"));
    expect(handleClick).toHaveBeenCalledWith("1");
  });

  test("does not call onClick for link card", () => {
    const handleClick = vi.fn();

    const screen = render(
      <Card {...defaultProps} kind="link" link="/test-link" />,
      {
        wrapper: CardWrapper,
      },
    );

    fireEvent.click(screen.getByRole("link"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
