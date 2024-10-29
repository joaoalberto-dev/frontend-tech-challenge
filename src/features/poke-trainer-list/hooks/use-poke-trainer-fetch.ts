import { useInfiniteQuery } from "@tanstack/react-query";
import { RickAndMortyResponse } from "@/core/services/rick-and-morty.types";
import { getPokeTrainers } from "../data/get-poke-trainers";

function usePokeTrainerFetch(name: string) {
  const {
    data,
    fetchNextPage,
    isFetching,
    isRefetching,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<RickAndMortyResponse>({
    initialPageParam: 1,
    queryKey: ["characters", name],
    queryFn: ({ pageParam }) =>
      getPokeTrainers({ name, page: String(pageParam) }),
    getNextPageParam: ({ info }) => {
      const [, nextUrlParams] = (info.next ?? "").split("?");
      const params = new URLSearchParams(nextUrlParams);

      return params.get("page");
    },
  });

  return {
    data,
    loadMore: fetchNextPage,
    hasMore: hasNextPage,
    isLoading: isFetching || isRefetching || isFetchingNextPage,
  };
}

export { usePokeTrainerFetch };
