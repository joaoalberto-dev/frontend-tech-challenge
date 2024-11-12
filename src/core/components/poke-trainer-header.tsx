type PokeTrainerHeaderProps = {
  image: string;
  name: string;
};

function PokeTrainerHeader({ image, name }: PokeTrainerHeaderProps) {
  return (
    <header className="w-full flex flex-col items-center justify-center h-[200px] lg:h-[300px] relative">
      <img
        src={image}
        className="absolute inset-0 object-cover object-center w-full h-full blur-md"
      />
      <div className="relative flex flex-col items-center gap-4 top-1/2">
        <img
          src={image}
          alt={name}
          className="w-[150px] h-[150px] lg:w-[300px] lg:h-[300px] rounded-lg"
        />
        <h1 className="text-xl lg:text-3xl">{name}</h1>
      </div>
    </header>
  );
}

export { PokeTrainerHeader };
