import { Pokemon, PokemonType } from "@/core/services/pokemon-api.types";

function calculatePoints(
  pokemon1: Pokemon,
  pokemon2: Pokemon,
  types: PokemonType[]
): number {
  let points = 0;

  pokemon1.types.forEach((type1) => {
    const damageRelations = types.find(
      (t) => t.name === type1.type.name
    )?.damage_relations;
    if (!damageRelations) return;

    pokemon2.types.forEach((type2) => {
      if (
        damageRelations.double_damage_to.some((t) => t.name === type2.type.name)
      ) {
        points++;
      }
    });
  });

  return points;
}

function battle(
  pokemon1: Pokemon,
  pokemon2: Pokemon,
  types: PokemonType[]
): number {
  const points1 = calculatePoints(pokemon1, pokemon2, types);
  const points2 = calculatePoints(pokemon2, pokemon1, types);

  if (points1 > points2) return 1;
  if (points2 > points1) return -1;
  return 0;
}

function teamBattle(
  myTeam: Pokemon[],
  enemyTeam: Pokemon[],
  types: PokemonType[]
): { myTeamScore: number; enemyTeamScore: number } {
  let myTeamScore = 0;
  let enemyTeamScore = 0;

  for (let i = 0; i < 6; i++) {
    const result = battle(myTeam[i], enemyTeam[i], types);

    if (result === 1) {
      myTeamScore++;
    } else if (result === -1) {
      enemyTeamScore++;
    }
  }

  return { myTeamScore, enemyTeamScore };
}

export { teamBattle };
