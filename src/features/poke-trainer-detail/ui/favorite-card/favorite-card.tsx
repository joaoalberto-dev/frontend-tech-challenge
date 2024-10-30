import { Card } from "@/core/components/card";
import { Pokemon } from "@/core/services/pokemon-api.types";
import { useFavoritePokemon } from "../../context/favorite-pokemon";
import { StarOff } from "lucide-react";
import { noop } from "@/core/utils/noop";

type FavoritePokemonCardProps = {
  trainerId: string;
  pokemon: Pokemon;
};

function FavoritePokemonCard({ pokemon, trainerId }: FavoritePokemonCardProps) {
  const { remove } = useFavoritePokemon();

  return (
    <div className="relative group w-full aspect-square">
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
        className="w-8 rounded-md h-8 items-center justify-center bg-neutral-100 absolute hidden right-2 top-2 group-hover:flex"
        onClick={() => remove(trainerId, pokemon)}
      >
        <StarOff className="w-4 h-4" />
      </button>
    </div>
  );
}

export { FavoritePokemonCard };
