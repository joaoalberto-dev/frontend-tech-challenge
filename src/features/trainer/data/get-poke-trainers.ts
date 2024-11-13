import { buildQueryParams } from "@/core/utils/build-query-params";
import { rickAndMortyApi } from "@/features/trainer/services/rick-and-morty";
import {
  RickAndMortyFilterParams,
  RickAndMortyResponse,
} from "@/features/trainer/services/rick-and-morty.types";

async function getPokeTrainers(
  params?: Partial<RickAndMortyFilterParams>
): Promise<RickAndMortyResponse> {
  const searchParams = buildQueryParams(params);
  const response = await rickAndMortyApi.get(
    `/character?${searchParams.toString()}`
  );

  return response as RickAndMortyResponse;
}

export { getPokeTrainers };
