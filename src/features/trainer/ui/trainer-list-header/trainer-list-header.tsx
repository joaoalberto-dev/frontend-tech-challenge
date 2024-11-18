import { Search } from "@/core/components/search";

type TrainerListHeaderProps = {
  isLoading: boolean;
  defaultName: string;
  onSearchTextChange: (searchTerm: string) => void;
};

function TrainerListHeader({
  isLoading,
  defaultName,
  onSearchTextChange,
}: TrainerListHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:justify-between md:items-center items-center justify-center p-5 md:p-10 max-w-full xl:max-w-[1920px] mx-auto">
      <h1 className="w-full text-3xl md:text-5xl md:w-auto">
        Pick your champion
      </h1>
      <Search
        isLoading={isLoading}
        defaultValue={defaultName}
        onChange={(event) => onSearchTextChange(event.target.value)}
      />
    </header>
  );
}

export { TrainerListHeader };
