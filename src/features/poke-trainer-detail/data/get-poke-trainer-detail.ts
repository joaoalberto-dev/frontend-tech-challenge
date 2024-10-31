import { RickAndMortyCharacter } from "@/core/services/rick-and-morty.types";
import { rickAndMortyApi } from "@/core/services/rick-and-morty";

async function getPokeTrainerDetail(
  id: string,
): Promise<RickAndMortyCharacter> {
  try {
    const response = await rickAndMortyApi.get(`/character/${id}`);

    return response as RickAndMortyCharacter;
  } catch (error) {
    throw error;
  }
}

export { getPokeTrainerDetail };
