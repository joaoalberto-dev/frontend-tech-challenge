import { randonBetween } from "@/core/utils/random-between";
import { usePokemonList } from "@/features/pokemon/hooks/use-pokemon-list";
import { Pokemon } from "@/features/pokemon/services/pokemon-api.types";
import { toast } from "sonner";
import { fetchMultiplePokemons } from "../data/fetch-multiple-pokemons";

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
      throw toast("Failed to fetch Pokemon details");
    }
  }

  return { getRandomPokemons };
}

export { useRandomPokemons };
