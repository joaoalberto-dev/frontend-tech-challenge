import { RickAndMortyCharacter } from "@/core/services/rick-and-morty.types";
import { rickAndMortyApi } from "@/core/services/rick-and-morty";

async function getPokeTrainerDetail(
  id: string
): Promise<RickAndMortyCharacter> {
  const response = await rickAndMortyApi.get(`/character/${id}`);

  return response as RickAndMortyCharacter;
}

export { getPokeTrainerDetail };
