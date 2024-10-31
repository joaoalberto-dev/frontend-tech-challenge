import { createHttpClient } from "../http/client";

const rickAndMortyApi = createHttpClient(
  import.meta.env.VITE_RICK_AND_MORTY_BASE_API_URL,
);

export { rickAndMortyApi };
