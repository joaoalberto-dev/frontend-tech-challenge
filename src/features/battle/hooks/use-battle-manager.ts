import { randonBetween } from "@/core/utils/random-between";
import { useFavoritePokemon } from "@/features/poke-trainer-detail/context/favorite-pokemon";
import { PokemonType } from "@/features/pokemon/services/pokemon-api.types";
import { RickAndMortyResponse } from "@/features/trainer/services/rick-and-morty.types";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { BattleResult } from "../types";
import { teamBattle } from "../utils/battle";
import { useRandomPokemons } from "./use-random-pokemons";

function useBattleManager() {
  const [battleResult, setBattleResult] = useState<BattleResult>(null);
  const { replace, list } = useFavoritePokemon();
  const { getRandomPokemons } = useRandomPokemons();
  const navigate = useNavigate();
  const { trainers, types } = useLoaderData() as {
    trainers: RickAndMortyResponse;
    types: PokemonType[];
  };

  async function handleRandomPokemons(id?: string) {
    if (!id) return;

    const randomPokemons = await getRandomPokemons();
    replace(id, randomPokemons);
  }

  function handleRandomTrainer() {
    const randomTrainer = randonBetween(0, trainers.info.count - 1);
    navigate(`${randomTrainer}`);
    handleRandomPokemons(randomTrainer.toString());
  }

  function startBattle(myId?: string, enemyId?: string) {
    if (!myId || !enemyId || !types.length) return;

    const myTeam = list(myId).map(([, pokemon]) => pokemon);
    const enemyTeam = list(enemyId).map(([, pokemon]) => pokemon);

    setBattleResult(teamBattle(myTeam, enemyTeam, types));
  }

  function resetBattle(id?: string) {
    handleRandomPokemons(id);
    setBattleResult(null);
  }

  return {
    battleResult,
    handleRandomPokemons,
    handleRandomTrainer,
    startBattle,
    resetBattle,
  };
}

export { useBattleManager };
