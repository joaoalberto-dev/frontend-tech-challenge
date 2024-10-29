import { Loader as LoaderIcon, Search as SearchIcon } from "lucide-react";
import { ChangeEvent } from "react";

type SearchProps = {
  isLoading: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  defaultValue: string;
};

function Search({ isLoading, onChange, defaultValue }: SearchProps) {
  return (
    <form className="mt-8 md:mt-0 w-full md:w-auto bg-white">
      <div className="flex relative gap-2 border-2 border-neutral-200 focus-within:border-neutral-950 p-2 rounded-md">
        {isLoading ? <LoaderIcon className="animate-spin" /> : <SearchIcon />}
        <input
          className="outline-none flex-1"
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
