import { RickAndMortyCharacter } from "@/core/services/rick-and-morty.types";

type PokeTrainerStatsProps = {
  trainer: RickAndMortyCharacter;
};

function PokeTrainerStats({ trainer }: PokeTrainerStatsProps) {
  return (
    <div className="border rounded-md">
      <div className="flex border-b">
        <div className="border-r p-4 w-[100px] bg-neutral-100">Name</div>
        <div className="p-4">{trainer.name}</div>
      </div>
      <div className="flex border-b">
        <div className="border-r p-4 w-[100px] bg-neutral-100">Gender</div>
        <div className="p-4">{trainer.gender}</div>
      </div>
      <div className="flex border-b">
        <div className="border-r p-4 w-[100px] bg-neutral-100">Origin</div>
        <div className="p-4">{trainer.origin.name}</div>
      </div>
      <div className="flex">
        <div className="border-r p-4 w-[100px] bg-neutral-100">Species</div>
        <div className="p-4">{trainer.species}</div>
      </div>
    </div>
  );
}

export { PokeTrainerStats };
