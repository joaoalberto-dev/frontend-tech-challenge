import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import { Divider } from "./divider";

describe("Divider", () => {
  test("renders VS text", () => {
    const screen = render(<Divider />);
    expect(screen.getByText("VS")).toBeInTheDocument();
  });

  test("renders children when provided", () => {
    const screen = render(
      <Divider>
        <div data-testid="child-element">Child Content</div>
      </Divider>
    );

    expect(screen.getByTestId("child-element")).toBeInTheDocument();
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  test("renders without children", () => {
    const { container } = render(<Divider />);
    const dividerElement = container.firstChild as HTMLElement;

    expect(dividerElement).toHaveClass("fixed");
    expect(dividerElement).toHaveClass("left-1/2");
  });
});
