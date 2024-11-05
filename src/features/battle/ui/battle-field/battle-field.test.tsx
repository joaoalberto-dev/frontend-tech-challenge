import { test, expect, describe } from "vitest";
import { render } from "@testing-library/react";
import { BattleField } from "./battle-field";

describe("BattleField", () => {
  test("renders left and right content", () => {
    const screen = render(
      <BattleField
        left={<div>Left Content</div>}
        right={<div>Right Content</div>}
      />
    );

    expect(screen.getByText("Left Content")).toBeInTheDocument();
    expect(screen.getByText("Right Content")).toBeInTheDocument();
  });

  test("renders optional center content when provided", () => {
    const screen = render(
      <BattleField
        left={<div>Left Content</div>}
        right={<div>Right Content</div>}
        center={<div>Center Content</div>}
      />
    );

    expect(screen.getByText("Center Content")).toBeInTheDocument();
  });
});
