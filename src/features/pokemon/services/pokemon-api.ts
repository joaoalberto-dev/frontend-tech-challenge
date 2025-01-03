import { createHttpClient } from "@/core/http/client";

const pokemonApi = createHttpClient(import.meta.env.VITE_POKEMON_BASE_API_URL);

export { pokemonApi };
