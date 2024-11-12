import { rickAndMortyApi } from "@/features/trainer/services/rick-and-morty";
import { RickAndMortyCharacter } from "@/features/trainer/services/rick-and-morty.types";

async function getPokeTrainerDetail(
  id: string
): Promise<RickAndMortyCharacter> {
  const response = await rickAndMortyApi.get(`/character/${id}`);

  return response as RickAndMortyCharacter;
}

export { getPokeTrainerDetail };
