import { randonBetween } from "@/core/utils/random-between";
import { usePokemonList } from "@/features/pokemon/hooks/use-pokemon-list";
import { fetchMultiplePokemons } from "../data/fetch-multiple-pokemons";
import { Pokemon } from "@/core/services/pokemon-api.types";

type PokemonPair = [string, Pokemon];

function useRandomPokemons() {
  const { data: allPokemons } = usePokemonList();

  async function getRandomPokemons(count: number = 6): Promise<PokemonPair[]> {
    if (!allPokemons) {
      throw new Error("Pokemon list is not available");
    }

    const availablePokemons = [...allPokemons];
    const selectedPokemonUrls: string[] = [];

    for (let i = 0; i < Math.min(count, availablePokemons.length); i++) {
      const randomIndex = randonBetween(0, availablePokemons.length - 1);
      const selectedPokemon = availablePokemons.splice(randomIndex, 1)[0];
      selectedPokemonUrls.push(selectedPokemon.url);
    }

    try {
      const pokemonsData = await fetchMultiplePokemons(selectedPokemonUrls);
      return pokemonsData.map(
        (pokemon): PokemonPair => [pokemon.name, pokemon]
      );
    } catch {
      throw new Error("Failed to fetch Pokemon details");
    }
  }

  return { getRandomPokemons };
}

export { useRandomPokemons };
