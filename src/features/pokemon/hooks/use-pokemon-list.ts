import { useQuery } from "@tanstack/react-query";
import { pokemonListLoader } from "../data/pokemon-list-loader";

function usePokemonList() {
  const query = useQuery({
    queryKey: ["pokemon-list"],
    queryFn: pokemonListLoader,
  });

  return query;
}

export { usePokemonList };
