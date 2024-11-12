import bug from "@/assets/pokemon-types/bug.svg";
import dark from "@/assets/pokemon-types/dark.svg";
import dragon from "@/assets/pokemon-types/dragon.svg";
import electric from "@/assets/pokemon-types/electric.svg";
import fairy from "@/assets/pokemon-types/fairy.svg";
import fighting from "@/assets/pokemon-types/fighting.svg";
import fire from "@/assets/pokemon-types/fire.svg";
import flying from "@/assets/pokemon-types/flying.svg";
import {
  default as ghost,
  default as shadow,
} from "@/assets/pokemon-types/ghost.svg";
import grass from "@/assets/pokemon-types/grass.svg";
import ground from "@/assets/pokemon-types/ground.svg";
import ice from "@/assets/pokemon-types/ice.svg";
import {
  default as normal,
  default as stellar,
  default as unknown,
} from "@/assets/pokemon-types/normal.svg";
import poison from "@/assets/pokemon-types/poison.svg";
import psychic from "@/assets/pokemon-types/psychic.svg";
import rock from "@/assets/pokemon-types/rock.svg";
import steel from "@/assets/pokemon-types/steel.svg";
import water from "@/assets/pokemon-types/water.svg";
import { PokemonTypes } from "@/features/pokemon/services/pokemon-api.types";

const pokemonTypes: Record<PokemonTypes, string> = {
  bug,
  dark,
  dragon,
  electric,
  fairy,
  fighting,
  fire,
  flying,
  ghost,
  grass,
  ground,
  ice,
  normal,
  poison,
  psychic,
  rock,
  shadow,
  steel,
  stellar,
  unknown,
  water,
};

type PokemonTypeImageProps = {
  type: PokemonTypes;
  className?: string;
};

function PokemonTypeImage({ type, className = "" }: PokemonTypeImageProps) {
  return <img src={pokemonTypes[type]} className={`w-4 h-4 ${className}`} />;
}

export { PokemonTypeImage, pokemonTypes };
