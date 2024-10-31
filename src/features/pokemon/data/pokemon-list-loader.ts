import { pokemonApi } from "@/core/services/pokemon-api";
import { PokemonIndexListResponse } from "@/core/services/pokemon-api.types";

async function pokemonListLoader() {
  try {
    let pokemonList: PokemonIndexListResponse = JSON.parse(
      window.localStorage.getItem("POKEMON_LIST") ?? "{}",
    );

    if (!Object.keys(pokemonList).length) {
      pokemonList = await pokemonApi.get<PokemonIndexListResponse>(
        "/pokemon?limit=10000",
      );

      window.localStorage.setItem("POKEMON_LIST", JSON.stringify(pokemonList));
    }

    return pokemonList.results;
  } catch {
    return [];
  }
}

export { pokemonListLoader };
