import { useFavoritePokemon } from "@/features/trainer/context/favorite-pokemon";
import { usePokeTrainerProfile } from "@/features/trainer/hooks/use-poke-trainer-profile";
import { useParams } from "react-router-dom";
import { useBattleManager } from "../hooks/use-battle-manager";
import { BattleField } from "./battle-field/battle-field";
import { ScoreBoard } from "./score-board/score-board";
import { TrainerBattle } from "./trainer-battle/trainer-battle";

type PageParams = {
  id: string;
  enemyId?: string;
};

function Battle() {
  const { id, enemyId } = useParams<PageParams>();
  const { list } = useFavoritePokemon();
  const {
    battleResult,
    handleRandomPokemons,
    handleRandomTrainer,
    startBattle,
    resetBattle,
  } = useBattleManager();
  const { data: myProfile } = usePokeTrainerProfile(id);
  const { data: enemyProfile } = usePokeTrainerProfile(enemyId);
  const myFavorites = list(id);
  const enemyFavorites = list(enemyId);

  return (
    <BattleField
      left={
        <TrainerBattle
          profile={myProfile}
          favorites={myFavorites}
          handleRandomPokemons={() => handleRandomPokemons(id)}
        />
      }
      center={
        <ScoreBoard
          battleResult={battleResult}
          canBattle={!!myFavorites.length && !!enemyFavorites.length}
          handleRestartBattle={() => resetBattle(enemyId)}
          startBattle={() => startBattle(id, enemyId)}
        />
      }
      right={
        <TrainerBattle
          profile={enemyProfile}
          favorites={enemyFavorites}
          handleRandomPokemons={() => handleRandomPokemons(enemyId)}
          handleRandomTrainer={handleRandomTrainer}
        />
      }
    />
  );
}

export { Battle };
