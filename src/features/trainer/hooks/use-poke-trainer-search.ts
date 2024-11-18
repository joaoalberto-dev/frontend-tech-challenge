import { useDebounceCallback } from "@/core/hooks/use-debounce-callback";
import { useSearchParams } from "react-router-dom";

function usePokeTrainerSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name") || "";

  const handleChange = useDebounceCallback((value: string) => {
    setSearchParams({ name: value.toLowerCase() });
  });

  return {
    name,
    handleChange,
  };
}

export { usePokeTrainerSearch };
