import { RickAndMortyCharacter } from "@/features/trainer/services/rick-and-morty.types";
import { useQuery } from "@tanstack/react-query";
import { getPokeTrainerDetail } from "../../trainer/data/get-poke-trainer-detail";

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
