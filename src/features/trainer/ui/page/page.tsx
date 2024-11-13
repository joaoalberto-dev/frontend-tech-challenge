import { Card } from "@/core/components/card";
import { EmptyState } from "@/core/components/empty-state";
import { List } from "@/core/components/list";
import { Search } from "@/core/components/search";
import { usePokeTrainerFetch } from "../../hooks/use-poke-trainer-fetch";
import { useFlatPokeTrainers } from "../../hooks/use-poke-trainer-flat";
import { usePokeTrainerSearch } from "../../hooks/use-poke-trainer-search";
import { LoadMore } from "../load-more/load-more";

function PokeTrainerListPage() {
  const { name, handleChange } = usePokeTrainerSearch();
  const { data, loadMore, hasMore, isLoading } = usePokeTrainerFetch(name);
  const characters = useFlatPokeTrainers(data);

  return (
    <div>
      <header className="flex flex-col md:flex-row md:justify-between md:items-center items-center justify-center p-5 md:p-10 max-w-full xl:max-w-[1920px] mx-auto">
        <h1 className="w-full text-3xl md:text-5xl md:w-auto">
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
