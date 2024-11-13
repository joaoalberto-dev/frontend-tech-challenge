import { Card } from "@/core/components/card";
import { noop } from "@/core/utils/noop";
import { Pokemon } from "@/features/pokemon/services/pokemon-api.types";
import { StarOff } from "lucide-react";
import { useFavoritePokemon } from "../../context/favorite-pokemon";

type FavoritePokemonCardProps = {
  trainerId: string;
  pokemon: Pokemon;
};

function FavoritePokemonCard({ pokemon, trainerId }: FavoritePokemonCardProps) {
  const { remove } = useFavoritePokemon();

  return (
    <div className="relative w-full group aspect-square">
      <Card
        kind="button"
        id={pokemon.id}
        name={pokemon.name}
        image={
          pokemon.sprites.front_default ||
          pokemon.sprites.other["official-artwork"].front_default ||
          ""
        }
        onClick={noop}
      />
      <button
        className="absolute items-center justify-center hidden w-8 h-8 rounded-md bg-neutral-100 right-2 top-2 group-hover:flex"
        onClick={() => remove(trainerId, pokemon)}
      >
        <StarOff className="w-4 h-4" />
      </button>
    </div>
  );
}

export { FavoritePokemonCard };
