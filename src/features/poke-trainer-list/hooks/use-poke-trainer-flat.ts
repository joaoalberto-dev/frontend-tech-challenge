import {
  RickAndMortyCharacter,
  RickAndMortyResponse,
} from "@/core/services/rick-and-morty.types";
import { InfiniteData } from "@tanstack/react-query";
import { useMemo } from "react";

function useFlatPokeTrainers(
  data?: InfiniteData<RickAndMortyResponse, unknown>
) {
  return useMemo(() => {
    if (!data) return [];

    return data.pages.reduce(
      (previous: RickAndMortyCharacter[], current: RickAndMortyResponse) => [
        ...previous,
        ...current.results,
      ],
      []
    );
  }, [data]);
}

export { useFlatPokeTrainers };
