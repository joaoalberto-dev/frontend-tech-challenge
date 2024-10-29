import { RickAndMortyCharacter } from "@/core/services/rick-and-morty.types";
import { Link } from "react-router-dom";

type ListProps = {
  characters: RickAndMortyCharacter[];
};

function List({ characters }: ListProps) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:grid-cols-4 auto-rows-auto">
      {characters.map((character) => {
        return (
          <Link
            to={`/poke-trainers/${character.id}`}
            key={character.id}
            className="w-full aspect-square relative rounded-lg overflow-hidden"
          >
            <img
              src={character.image}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute p-4 from-black to-[50%] flex items-end text-white to-transparent bg-gradient-to-t inset-0 w-full bottom-0">
              <p className="text-xs font-bold">{character.name}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export { List };
