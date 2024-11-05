import { Pokemon } from "@/core/services/pokemon-api.types";
import { create } from "zustand";

type FavoritePokemonStore = {
  favoritePokemons: Record<string, Map<string, Pokemon>>;
  add: (trainerId: string, pokemon: Pokemon) => void;
  remove: (trainerId: string, pokemon: Pokemon) => void;
  replace: (trainerId: string, pokemons: [string, Pokemon][]) => void;
  list: (trainerId?: string) => [string, Pokemon][];
  canAdd: (trainerId: string) => boolean;
};

const useFavoritePokemon = create<FavoritePokemonStore>((set, get) => ({
  favoritePokemons: {},
  add(trainerId, pokemon) {
    set(({ favoritePokemons }) => {
      let trainer = favoritePokemons[trainerId];

      if (!trainer) trainer = new Map();

      if (!trainer.has(String(pokemon.id)) && trainer.size < 6) {
        trainer.set(String(pokemon.id), pokemon);
        favoritePokemons[trainerId] = trainer;
      }

      return favoritePokemons;
    });
  },
  remove(trainerId, pokemon) {
    set(({ favoritePokemons }) => {
      const trainer = favoritePokemons[trainerId] || new Map();

      if (trainer.has(String(pokemon.id))) {
        trainer.delete(String(pokemon.id));
        favoritePokemons[trainerId] = trainer;
      }

      return favoritePokemons;
    });
  },
  replace(trainerId, pokemons) {
    set(({ favoritePokemons }) => {
      favoritePokemons[trainerId] = new Map(pokemons);

      return favoritePokemons;
    });
  },
  list(trainerId) {
    if (!trainerId) return [];

    const trainer = get().favoritePokemons[trainerId] || new Map();
    const items = Array.from(trainer);

    return items;
  },
  canAdd(trainerId) {
    const trainer = get().favoritePokemons[trainerId] || new Map();

    return trainer.size < 6;
  },
}));

export { useFavoritePokemon };
