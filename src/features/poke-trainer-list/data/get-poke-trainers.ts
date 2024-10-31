import {
  RickAndMortyFilterParams,
  RickAndMortyResponse,
} from "@/core/services/rick-and-morty.types";
import { rickAndMortyApi } from "@/core/services/rick-and-morty";
import { buildQueryParams } from "@/core/utils/build-query-params";

async function getPokeTrainers(
  params?: Partial<RickAndMortyFilterParams>,
): Promise<RickAndMortyResponse> {
  try {
    const searchParams = buildQueryParams(params);
    const response = await rickAndMortyApi.get(
      `/character?${searchParams.toString()}`,
    );

    return response as RickAndMortyResponse;
  } catch (error) {
    throw error;
  }
}

export { getPokeTrainers };
