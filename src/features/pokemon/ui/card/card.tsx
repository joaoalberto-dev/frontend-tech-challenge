import { Card } from "@/core/components/card";
import { httpClient } from "@/core/http/client";
import { Pokemon } from "@/features/pokemon/services/pokemon-api.types";
import { useFavoritePokemon } from "@/features/trainer/context/favorite-pokemon";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

type PokemonCardProps = {
  url: string;
};

function PokemonCard({ url }: PokemonCardProps) {
  const { id } = useParams();
  const { add, canAdd } = useFavoritePokemon();
  const query = useQuery<Pokemon>({
    queryKey: ["pokemon", url],
    queryFn: () => httpClient(url),
  });

  if (!query.data || !id) return;

  return (
    <Card
      kind="button"
      id={query.data.id}
      name={query.data.name}
      cardClassName={canAdd(id) ? "" : "cursor-not-allowed"}
      image={
        query.data.sprites.front_default ||
        query.data.sprites.other["official-artwork"].front_default ||
        ""
      }
      onClick={() => add(id, query.data)}
    />
  );
}

export { PokemonCard };
