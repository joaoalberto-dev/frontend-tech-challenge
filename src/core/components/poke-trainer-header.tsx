type PokeTrainerHeaderProps = {
  image: string;
  name: string;
};

function PokeTrainerHeader({ image, name }: PokeTrainerHeaderProps) {
  return (
    <header className="w-full flex flex-col items-center justify-center h-[200px] lg:h-[300px] relative">
      <img
        src={image}
        className="w-full h-full absolute inset-0 object-cover object-center blur-md"
      />
      <div className="top-1/2 flex items-center flex-col gap-4 relative">
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
