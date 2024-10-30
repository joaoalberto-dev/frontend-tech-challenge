import { Pokemon } from "@/core/services/pokemon-api.types";
import { create } from "zustand";

type FavoritePokemonStore = {
  favoritePokemons: Record<string, Map<string, Pokemon>>;
  add: (trainerId: string, pokemon: Pokemon) => void;
  remove: (trainerId: string, pokemon: Pokemon) => void;
  list: (trainerId: string) => [string, Pokemon][];
};

const useFavoritePokemon = create<FavoritePokemonStore>((set, get) => ({
  favoritePokemons: {},
  add(trainerId, pokemon) {
    set(({ favoritePokemons }) => {
      let trainer = favoritePokemons[trainerId];

      if (!trainer) trainer = new Map();

      if (!trainer.has(String(pokemon.id))) {
        trainer.set(String(pokemon.id), pokemon);
        favoritePokemons[trainerId] = trainer;
      }

      return favoritePokemons;
    });
  },
  remove(trainerId, pokemon) {
    set(({ favoritePokemons }) => {
      const trainer = favoritePokemons[trainerId];

      if (trainer.has(String(pokemon.id))) {
        trainer.delete(String(pokemon.id));
        favoritePokemons[trainerId] = trainer;
      }

      return favoritePokemons;
    });
  },
  list(trainerId) {
    const trainer = get().favoritePokemons[trainerId] || new Map();
    const items = Array.from(trainer);

    return items;
  },
}));

export { useFavoritePokemon };
