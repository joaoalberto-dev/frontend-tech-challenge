import { Trophy } from "lucide-react";

type ScoreResultProps = {
  winner: boolean;
  score: number;
};

function ScoreResult({ winner, score }: ScoreResultProps) {
  return (
    <div
      data-testid="score-result"
      className="text-white relative flex items-center justify-center gap-2 bg-blue-700 rounded-lg text-sm p-5 py-2.5 m-2"
    >
      {winner && (
        <Trophy
          data-testid="trophy"
          className="absolute left-1/2 -translate-x-1/2 text-white bg-yellow-500 p-2 rounded-full w-[40px] h-[40px] -top-[45px]"
        />
      )}
      {score}
    </div>
  );
}

export { ScoreResult };
