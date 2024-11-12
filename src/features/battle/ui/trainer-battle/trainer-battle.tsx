import { Button } from "@/core/components/button";
import { Center } from "@/core/components/center";
import { List } from "@/core/components/list";
import { PokeTrainerHeader } from "@/core/components/poke-trainer-header";
import { PokemonTypeImage } from "@/core/components/pokemon-type";
import { Pokemon } from "@/core/services/pokemon-api.types";
import { RickAndMortyCharacter } from "@/core/services/rick-and-morty.types";
import { Shuffle } from "lucide-react";

type TrainerBattleProps = {
  profile?: RickAndMortyCharacter;
  favorites?: [string, Pokemon][];
  handleRandomPokemons?: () => void;
  handleRandomTrainer?: () => void;
};

function TrainerBattle({
  profile,
  favorites,
  handleRandomPokemons = () => {},
  handleRandomTrainer = () => {},
}: TrainerBattleProps) {
  if (!profile)
    return (
      <Center>
        <Button onClick={handleRandomTrainer}>
          <Shuffle className="w-4 h-4" />
          Trainer
        </Button>
      </Center>
    );

  return (
    <div className="flex flex-col h-full gap-4">
      <PokeTrainerHeader name={profile.name} image={profile.image} />
      {!favorites || !favorites.length ? (
        <Center>
          <Button onClick={handleRandomPokemons}>
            <Shuffle className="w-4 h-4" />
            Pokemons
          </Button>
        </Center>
      ) : (
        <List
          items={favorites}
          containerClassName="mt-[120px] lg:mt-[220px] !flex flex-col flex-1 gap-4 justify-center items-center"
          renderItem={([, pokemon]) => {
            const bg =
              pokemon.sprites.front_default ||
              pokemon.sprites.other["official-artwork"].front_default ||
              "";

            return (
              <div
                key={profile.id + pokemon.id}
                className="flex w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] flex-col justify-between  bg-cover relative border rounded-md p-2"
                style={{
                  backgroundImage: `url(${bg})`,
                }}
              >
                <div className="flex gap-1">
                  {pokemon.types.map(({ type }) => (
                    <PokemonTypeImage
                      key={profile.id + type.name}
                      className="w-5 h-5"
                      type={type.name}
                    />
                  ))}
                </div>

                <p className="p-1 text-xs font-bold rounded-md bg-white/90">
                  {pokemon.name}
                </p>
              </div>
            );
          }}
        />
      )}
    </div>
  );
}

export { TrainerBattle };
