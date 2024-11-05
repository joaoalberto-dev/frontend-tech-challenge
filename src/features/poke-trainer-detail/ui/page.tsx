import { Button } from "@/core/components/button";
import { EmptyState } from "@/core/components/empty-state";
import { List } from "@/core/components/list";
import { PokeTrainerHeader } from "@/core/components/poke-trainer-header";
import { Search } from "@/core/components/search";
import { useDebounceCallback } from "@/core/hooks/use-debounce-callback";
import { usePokemonList } from "@/features/pokemon/hooks/use-pokemon-list";
import { Swords } from "lucide-react";
import { ChangeEvent, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFavoritePokemon } from "../context/favorite-pokemon";
import { usePokeTrainerProfile } from "../hooks/use-poke-trainer-profile";
import { PokemonCard } from "./card/card";
import { FavoritePokemonCard } from "./favorite-card/favorite-card";
import { PokeTrainerStats } from "./stats/stats";

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
  const { list, canAdd } = useFavoritePokemon();
  const navigate = useNavigate();

  if (!profile || !id) return null;

  const favorites = list(id);
  const trainerCanAdd = canAdd(id);

  return (
    <div>
      <PokeTrainerHeader name={profile.name} image={profile.image} />
      <div className="mt-[180px] p-5 md:p-10 max-w-full xl:max-w-[1920px] mx-auto flex flex-col gap-8">
        <PokeTrainerStats trainer={profile} />
        <h1 className="text-3xl">Favorite pokemons</h1>
        <div className="flex items-center justify-center">
          {!favorites.length ? (
            <EmptyState text="No favorites found" />
          ) : (
            <div className="flex p-4 bg-sky-100 rounded-md flex-col gap-2 w-full">
              <List
                items={favorites}
                containerClassName="lg:grid-cols-3 xl:grid-cols-6"
                renderItem={([_, pokemon]) => (
                  <FavoritePokemonCard
                    key={pokemon.id}
                    pokemon={pokemon}
                    trainerId={id}
                  />
                )}
              />
              {trainerCanAdd && (
                <p className="text-xs text-sky-600">
                  Select at least 6 pokemons to start a battle.
                </p>
              )}
            </div>
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
        <Button disabled={trainerCanAdd} onClick={() => navigate("battle")}>
          <Swords />
        </Button>
      </div>
    </div>
  );
}

export { PokeTrainerDetail };
