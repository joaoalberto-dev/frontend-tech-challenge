import { httpClient } from "@/core/http/client";
import { Pokemon } from "@/core/services/pokemon-api.types";

function fetchMultiplePokemons(urls: string[]) {
  return Promise.all(urls.map((url) => httpClient<Pokemon>(url)));
}

export { fetchMultiplePokemons };
