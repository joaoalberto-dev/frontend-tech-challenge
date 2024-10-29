import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounceCallback } from "@/core/hooks/use-debounce-callback";

function usePokeTrainerSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name") || "";

  const handleChange = useDebounceCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchParams({ name: event.target.value });
    }
  );

  return {
    name,
    handleChange,
  };
}

export { usePokeTrainerSearch };
