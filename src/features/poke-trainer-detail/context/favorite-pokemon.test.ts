import { describe, test, expect, beforeEach } from "vitest";
import { useFavoritePokemon } from "./favorite-pokemon";
import { Pokemon } from "@/core/services/pokemon-api.types";

describe("useFavoritePokemon", () => {
  // @ts-expect-error
  const mockPokemon: Pokemon = {
    id: 1,
    name: "bulbasaur",
  };

  const mockTrainerId = "trainer-1";

  beforeEach(() => {
    const store = useFavoritePokemon.getState();
    store.favoritePokemons = {};
  });

  test("should add a pokemon to trainer favorites", () => {
    const store = useFavoritePokemon.getState();

    store.add(mockTrainerId, mockPokemon);
    const favorites = store.list(mockTrainerId);

    expect(favorites).toHaveLength(1);
    expect(favorites[0][1]).toEqual(mockPokemon);
  });

  test("should not add duplicate pokemon", () => {
    const store = useFavoritePokemon.getState();

    store.add(mockTrainerId, mockPokemon);
    store.add(mockTrainerId, mockPokemon);
    const favorites = store.list(mockTrainerId);

    expect(favorites).toHaveLength(1);
  });

  test("should not allow more than 6 pokemon", () => {
    const store = useFavoritePokemon.getState();

    for (let i = 1; i <= 7; i++) {
      store.add(mockTrainerId, { ...mockPokemon, id: i });
    }

    const favorites = store.list(mockTrainerId);
    expect(favorites).toHaveLength(6);
  });

  test("should remove a pokemon from trainer favorites", () => {
    const store = useFavoritePokemon.getState();

    store.add(mockTrainerId, mockPokemon);
    store.remove(mockTrainerId, mockPokemon);
    const favorites = store.list(mockTrainerId);

    expect(favorites).toHaveLength(0);
  });

  test("should handle removing non-existent pokemon", () => {
    const store = useFavoritePokemon.getState();

    store.remove(mockTrainerId, mockPokemon);
    const favorites = store.list(mockTrainerId);

    expect(favorites).toHaveLength(0);
  });

  test("should correctly check if trainer can add more pokemon", () => {
    const store = useFavoritePokemon.getState();

    expect(store.canAdd(mockTrainerId)).toBe(true);

    for (let i = 1; i <= 6; i++) {
      store.add(mockTrainerId, { ...mockPokemon, id: i });
    }

    expect(store.canAdd(mockTrainerId)).toBe(false);
  });

  test("should handle multiple trainers independently", () => {
    const store = useFavoritePokemon.getState();
    const trainer2Id = "trainer-2";

    store.add(mockTrainerId, mockPokemon);
    store.add(trainer2Id, { ...mockPokemon, id: 2 });

    expect(store.list(mockTrainerId)).toHaveLength(1);
    expect(store.list(trainer2Id)).toHaveLength(1);
    expect(store.list(mockTrainerId)[0][1].id).toBe(1);
    expect(store.list(trainer2Id)[0][1].id).toBe(2);
  });
});
