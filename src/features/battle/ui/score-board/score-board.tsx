import { Button } from "@/core/components/button";
import { RotateCw, Swords } from "lucide-react";
import { BattleResult } from "../../types";
import { ScoreResult } from "../score-result/score-result";

type ScoreBoardProps = {
  battleResult: BattleResult;
  canBattle: boolean;
  startBattle: (myId?: string, enemyId?: string) => void;
  handleRestartBattle: () => void;
};

function ScoreBoard({
  battleResult,
  startBattle,
  handleRestartBattle,
  canBattle,
}: ScoreBoardProps) {
  return (
    <div className="fixed bottom-0 lg:relative flex items-center justify-center">
      {battleResult && (
        <ScoreResult
          winner={battleResult.myTeamScore > battleResult.enemyTeamScore}
          score={battleResult.myTeamScore}
        />
      )}
      <Button
        disabled={!canBattle}
        onClick={() => (!battleResult ? startBattle() : handleRestartBattle())}
      >
        {!battleResult ? <Swords /> : <RotateCw />}
      </Button>
      {battleResult && (
        <ScoreResult
          winner={battleResult.enemyTeamScore > battleResult.myTeamScore}
          score={battleResult.enemyTeamScore}
        />
      )}
    </div>
  );
}

export { ScoreBoard };
