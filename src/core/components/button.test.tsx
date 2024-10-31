import { fireEvent, render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  test("renders children correctly", () => {
    const screen = render(
      <Button onClick={() => {}} disabled={false}>
        Click me
      </Button>,
    );

    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  test("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    const screen = render(
      <Button onClick={handleClick} disabled={false}>
        Click me
      </Button>,
    );

    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("applies disabled styles when disabled prop is true", () => {
    const screen = render(
      <Button onClick={() => {}} disabled={true}>
        Click me
      </Button>,
    );

    const button = screen.getByText("Click me");
    expect(button).toHaveClass("cursor-not-allowed");
    expect(button).toHaveClass("opacity-50");
  });

  test("does not call onClick handler when disabled", () => {
    const handleClick = vi.fn();
    const screen = render(
      <Button onClick={handleClick} disabled={true}>
        Click me
      </Button>,
    );

    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test("passes through additional HTML button attributes", () => {
    const screen = render(
      <Button onClick={() => {}} disabled={false} aria-label="Custom button">
        Click me
      </Button>,
    );

    const button = screen.getByText("Click me");
    expect(button).toHaveAttribute("aria-label", "Custom button");
  });
});
