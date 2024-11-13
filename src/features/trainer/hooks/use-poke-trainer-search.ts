import { useDebounceCallback } from "@/core/hooks/use-debounce-callback";
import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";

function usePokeTrainerSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name") || "";

  const handleChange = useDebounceCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchParams({ name: String(event.target.value).toLowerCase() });
    }
  );

  return {
    name,
    handleChange,
  };
}

export { usePokeTrainerSearch };
