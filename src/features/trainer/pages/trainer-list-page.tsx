import { Card } from "@/core/components/card";
import { EmptyState } from "@/core/components/empty-state";
import { List } from "@/core/components/list";
import { usePokeTrainerFetch } from "../hooks/use-poke-trainer-fetch";
import { useFlatPokeTrainers } from "../hooks/use-poke-trainer-flat";
import { usePokeTrainerSearch } from "../hooks/use-poke-trainer-search";
import { LoadMore } from "../ui/load-more/load-more";
import { TrainerListHeader } from "../ui/trainer-list-header/trainer-list-header";

function PokeTrainerListPage() {
  const { name, handleChange } = usePokeTrainerSearch();
  const { data, loadMore, hasMore, isLoading } = usePokeTrainerFetch(name);
  const characters = useFlatPokeTrainers(data);

  return (
    <div>
      <TrainerListHeader
        isLoading={isLoading}
        defaultName={name}
        onSearchTextChange={handleChange}
      />
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
