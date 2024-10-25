import { RickAndMortyResponse } from "@/core/services/rick-and-morty.types";
import { rickAndMortyApi } from '@/core/services/rick-and-morty'

async function getPokeTrainers(): Promise<RickAndMortyResponse> {
  return await rickAndMortyApi.get('/character')
}

export { getPokeTrainers }