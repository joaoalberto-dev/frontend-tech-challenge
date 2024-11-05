import { httpClient } from "@/core/http/client";
import { pokemonApi } from "@/core/services/pokemon-api";
import {
  PokemonType,
  PokemonTypeListResponse,
} from "@/core/services/pokemon-api.types";

async function pokemonTypesListLoader() {
  try {
    let pokemonTypesList: PokemonType[] = JSON.parse(
      window.localStorage.getItem("POKEMON_TYPES_LIST") ?? "[]"
    );

    if (!pokemonTypesList.length) {
      const pokemonTypesIndexList =
        await pokemonApi.get<PokemonTypeListResponse>("/type?limit=10000");

      for await (const type of pokemonTypesIndexList.results) {
        const t = await httpClient<PokemonType>(type.url);
        pokemonTypesList.push(t);
      }

      window.localStorage.setItem(
        "POKEMON_TYPES_LIST",
        JSON.stringify(pokemonTypesList)
      );
    }

    return pokemonTypesList;
  } catch {
    return [];
  }
}

export { pokemonTypesListLoader };
