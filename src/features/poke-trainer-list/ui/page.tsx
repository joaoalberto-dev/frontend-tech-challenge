import {
  RickAndMortyCharacter,
  RickAndMortyResponse,
} from "@/core/services/rick-and-morty.types";
import { useMemo } from "react";
import { usePokeTrainerFetch } from "../hooks/use-poke-trainer-fetch";
import { usePokeTrainerSearch } from "../hooks/use-poke-trainer-search";
import { List } from "./list/list";
import { LoadMore } from "./load-more/load-more";
import { Search } from "./search/search";
import { EmptyList } from "./empty-list/empty-list";

function PokeTrainerListPage() {
  const { name, handleChange } = usePokeTrainerSearch();
  const { data, loadMore, hasMore, isLoading } = usePokeTrainerFetch(name);

  const characters = useMemo(() => {
    if (!data) return [];

    return data.pages.reduce(
      (previous: RickAndMortyCharacter[], current: RickAndMortyResponse) => [
        ...previous,
        ...current.results,
      ],
      []
    );
  }, [data]);

  return (
    <div>
      <header className="flex flex-col md:flex-row md:justify-between md:items-center items-center justify-center p-5 md:p-10 max-w-full xl:max-w-[1920px] mx-auto">
        <h1 className="text-3xl md:text-5xl w-full md:w-auto">
          Pick your champion
        </h1>
        <Search
          isLoading={isLoading}
          defaultValue={name}
          onChange={handleChange}
        />
      </header>
      <div className="p-5 md:p-10 max-w-full xl:max-w-[1920px] mx-auto">
        {characters.length > 0 && (
          <>
            <List characters={characters} />
            <LoadMore
              loadMore={loadMore}
              disabled={!hasMore || isLoading}
              isLoadingMore={isLoading}
            />
          </>
        )}
        {characters.length <= 0 && !isLoading && <EmptyList />}
      </div>
    </div>
  );
}

export { PokeTrainerListPage };
