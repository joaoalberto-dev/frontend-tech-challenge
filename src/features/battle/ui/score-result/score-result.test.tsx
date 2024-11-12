import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ScoreResult } from "./score-result";

describe("ScoreResult", () => {
  test("should render score", () => {
    const screen = render(<ScoreResult winner={false} score={42} />);

    expect(screen.getByTestId("score-result")).toHaveTextContent("42");
  });

  test("should not display trophy when not winner", () => {
    const screen = render(<ScoreResult winner={false} score={42} />);

    expect(screen.queryByTestId("trophy")).not.toBeInTheDocument();
  });

  test("should display trophy when winner", () => {
    const screen = render(<ScoreResult winner={true} score={42} />);

    const trophy = screen.getByTestId("trophy");
    expect(trophy).toBeInTheDocument();
  });
});
