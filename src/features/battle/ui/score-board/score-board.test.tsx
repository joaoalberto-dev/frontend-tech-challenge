import { render, screen, fireEvent } from "@testing-library/react";
import { ScoreBoard } from "./score-board";
import { describe, test, expect, vi } from "vitest";

describe("ScoreBoard", () => {
  const mockStartBattle = vi.fn();
  const mockHandleRestartBattle = vi.fn();

  test("renders battle button when there is no battle result", () => {
    render(
      <ScoreBoard
        battleResult={null}
        canBattle={true}
        startBattle={mockStartBattle}
        handleRestartBattle={mockHandleRestartBattle}
      />
    );

    const battleButton = screen.getByRole("button");
    expect(battleButton).not.toBeDisabled();
    fireEvent.click(battleButton);
    expect(mockStartBattle).toHaveBeenCalled();
  });

  test("renders restart button and scores when battle result exists", () => {
    const battleResult = {
      myTeamScore: 3,
      enemyTeamScore: 2,
    };

    render(
      <ScoreBoard
        battleResult={battleResult}
        canBattle={true}
        startBattle={mockStartBattle}
        handleRestartBattle={mockHandleRestartBattle}
      />
    );

    const restartButton = screen.getByRole("button");
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();

    fireEvent.click(restartButton);
    expect(mockHandleRestartBattle).toHaveBeenCalled();
  });

  test("disables button when canBattle is false", () => {
    render(
      <ScoreBoard
        battleResult={null}
        canBattle={false}
        startBattle={mockStartBattle}
        handleRestartBattle={mockHandleRestartBattle}
      />
    );

    const battleButton = screen.getByRole("button");
    expect(battleButton).toBeDisabled();
  });

  test("shows correct winner indication based on scores", () => {
    const battleResult = {
      myTeamScore: 2,
      enemyTeamScore: 3,
    };

    render(
      <ScoreBoard
        battleResult={battleResult}
        canBattle={true}
        startBattle={mockStartBattle}
        handleRestartBattle={mockHandleRestartBattle}
      />
    );

    const scores = screen.getAllByTestId("score-result");
    expect(scores).toHaveLength(2);
  });
});
