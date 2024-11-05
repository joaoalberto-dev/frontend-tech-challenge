import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import { Center } from "./center";

describe("Center", () => {
  test("renders children centered in the container", () => {
    const testContent = "Test Content";
    const screen = render(
      <Center>
        <div data-testid="child">{testContent}</div>
      </Center>
    );
    const child = screen.getByTestId("child");
    const container = child.parentElement;

    expect(child).toBeInTheDocument();
    expect(child.textContent).toBe(testContent);
    expect(container).toHaveClass(
      "absolute",
      "inset-0",
      "flex",
      "w-full",
      "h-full",
      "justify-center",
      "items-center"
    );
  });

  test("renders multiple children", () => {
    const screen = render(
      <Center>
        <div data-testid="child1">First Child</div>
        <div data-testid="child2">Second Child</div>
      </Center>
    );

    expect(screen.getByTestId("child1")).toBeInTheDocument();
    expect(screen.getByTestId("child2")).toBeInTheDocument();
  });
});
