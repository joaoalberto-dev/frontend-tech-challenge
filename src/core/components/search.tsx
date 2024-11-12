import { Loader as LoaderIcon, Search as SearchIcon } from "lucide-react";
import { ChangeEvent } from "react";

type SearchProps = {
  isLoading: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  defaultValue: string;
};

function Search({ isLoading, onChange, defaultValue }: SearchProps) {
  return (
    <form className="w-full mt-8 bg-white md:mt-0 md:w-auto">
      <div className="relative flex gap-2 p-2 border-2 rounded-md border-neutral-200 focus-within:border-neutral-950">
        {isLoading ? (
          <LoaderIcon data-testid="loader" className="animate-spin" />
        ) : (
          <SearchIcon data-testid="search-icon" />
        )}
        <input
          className="flex-1 outline-none"
          type="search"
          id="search"
          placeholder="Name"
          onChange={onChange}
          defaultValue={defaultValue}
          autoFocus
          required
        />
      </div>
    </form>
  );
}

export { Search };
