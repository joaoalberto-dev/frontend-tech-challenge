import type { Pokemon, PokemonType } from "@/core/services/pokemon-api.types";
import { describe, expect, test } from "vitest";
import { teamBattle } from "./battle";

describe("Battle Utils", () => {
  const mockTypes: PokemonType[] = [
    {
      name: "fire",
      // @ts-expect-error
      damage_relations: {
        double_damage_to: [{ name: "grass", url: "grass-url" }],
      },
    },
    {
      name: "grass",
      // @ts-expect-error
      damage_relations: {
        double_damage_to: [{ name: "water", url: "water-url" }],
      },
    },
    {
      name: "water",
      // @ts-expect-error
      damage_relations: {
        double_damage_to: [{ name: "fire", url: "fire-url" }],
      },
    },
  ];

  const createMockPokemon = (name: string, types: string[]): Pokemon => ({
    name,
    // @ts-expect-error
    types: types.map((type) => ({ type: { name: type } })),
  });

  test("teamBattle should correctly calculate type advantages", () => {
    const myTeam = Array(6).fill(createMockPokemon("Charizard", ["fire"]));
    const enemyTeam = Array(6).fill(createMockPokemon("Bulbasaur", ["grass"]));

    const result = teamBattle(myTeam, enemyTeam, mockTypes);

    expect(result.myTeamScore).toBe(6);
    expect(result.enemyTeamScore).toBe(0);
  });

  test("teamBattle should handle equal type advantages", () => {
    const myTeam = Array(6).fill(createMockPokemon("Charizard", ["fire"]));
    const enemyTeam = Array(6).fill(createMockPokemon("Charizard", ["fire"]));

    const result = teamBattle(myTeam, enemyTeam, mockTypes);

    expect(result.myTeamScore).toBe(0);
    expect(result.enemyTeamScore).toBe(0);
  });

  test("teamBattle should handle dual-type Pokémon", () => {
    const myTeam = Array(6).fill(createMockPokemon("Charizard", ["fire"]));
    const enemyTeam = Array(6).fill(createMockPokemon("Bulbasaur", ["grass"]));
    const result = teamBattle(myTeam, enemyTeam, mockTypes);

    expect(result.myTeamScore).toBe(6);
    expect(result.enemyTeamScore).toBe(0);
  });
});
