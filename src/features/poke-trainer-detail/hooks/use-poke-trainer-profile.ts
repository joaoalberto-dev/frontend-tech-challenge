import { useQuery } from "@tanstack/react-query";
import { getPokeTrainerDetail } from "../data/get-poke-trainer-detail";
import { RickAndMortyCharacter } from "@/core/services/rick-and-morty.types";

function usePokeTrainerProfile(id?: string) {
  const query = useQuery<RickAndMortyCharacter>({
    queryKey: ["profile", id],
    queryFn: () => {
      if (!id) throw new Error("ID is required");

      return getPokeTrainerDetail(id);
    },
    enabled: !!id,
  });

  return query;
}

export { usePokeTrainerProfile };
