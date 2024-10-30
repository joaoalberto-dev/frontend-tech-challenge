import { useParams } from "react-router-dom";
import { usePokeTrainerProfile } from "../hooks/use-poke-trainer-profile";
import { PokeTrainerHeader } from "./header/header";
import { PokeTrainerStats } from "./stats/stats";
import { usePokemonList } from "@/features/pokemon/hooks/use-pokemon-list";
import { Search } from "@/core/components/search";
import { ChangeEvent, useMemo, useState } from "react";
import { List } from "@/core/components/list";
import { PokemonCard } from "./card/card";
import { useDebounceCallback } from "@/core/hooks/use-debounce-callback";
import { useFavoritePokemon } from "../context/favorite-pokemon";
import { EmptyState } from "@/core/components/empty-state";
import { FavoritePokemonCard } from "./favorite-card/favorite-card";

function PokeTrainerDetail() {
  const { id } = useParams();
  const { data: profile } = usePokeTrainerProfile(id);
  const { data: pokemonList } = usePokemonList();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPokemonList = useMemo(() => {
    return pokemonList?.filter((pokemon) => pokemon.name.includes(searchTerm));
  }, [searchTerm, pokemonList]);
  const handleChange = useDebounceCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    1000
  );
  const { list } = useFavoritePokemon();

  if (!profile || !id) return null;

  const favs = list(id);

  return (
    <div>
      <PokeTrainerHeader name={profile.name} image={profile.image} />
      <div className="mt-[180px] p-5 md:p-10 max-w-full xl:max-w-[1920px] mx-auto flex flex-col gap-8">
        <PokeTrainerStats trainer={profile} />
        <h1 className="text-3xl">Favorite pokemons</h1>
        <div className="flex items-center justify-center">
          {!favs.length ? (
            <EmptyState text="No favorites found" />
          ) : (
            <List
              items={favs}
              renderItem={([_, pokemon]) => (
                <FavoritePokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  trainerId={id}
                />
              )}
            />
          )}
        </div>
        <h1 className="text-3xl">Search favorite pokemons</h1>
        <Search isLoading={false} onChange={handleChange} defaultValue="" />
        {searchTerm && filteredPokemonList && (
          <List
            items={filteredPokemonList}
            renderItem={({ url }) => <PokemonCard url={url} key={url} />}
          />
        )}
      </div>
    </div>
  );
}

export { PokeTrainerDetail };
