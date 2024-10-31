/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RICK_AND_MORTY_BASE_API_URL: string;
  readonly VITE_POKEMON_BASE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
