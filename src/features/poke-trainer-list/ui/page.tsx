import { Card } from "@/core/components/card";
import { EmptyState } from "@/core/components/empty-state";
import { List } from "@/core/components/list";
import { Search } from "@/core/components/search";
import {
  RickAndMortyCharacter,
  RickAndMortyResponse,
} from "@/core/services/rick-and-morty.types";
import { useMemo } from "react";
import { usePokeTrainerFetch } from "../hooks/use-poke-trainer-fetch";
import { usePokeTrainerSearch } from "../hooks/use-poke-trainer-search";
import { LoadMore } from "./load-more/load-more";

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
            <List
              items={characters}
              renderItem={({ id, name, image }) => (
                <Card
                  key={id}
                  kind="link"
                  link={`/${id}`}
                  id={id}
                  name={name}
                  image={image}
                />
              )}
            />
            <LoadMore
              loadMore={loadMore}
              disabled={!hasMore || isLoading}
              isLoadingMore={isLoading}
            />
          </>
        )}
        {characters.length <= 0 && !isLoading && (
          <EmptyState text="No trainers found." />
        )}
      </div>
    </div>
  );
}

export { PokeTrainerListPage };
