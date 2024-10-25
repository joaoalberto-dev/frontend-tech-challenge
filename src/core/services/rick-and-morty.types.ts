type FilterStatus = 'alive' | 'dead' | 'unknown'
type FilterGender = 'female' | 'male' | 'genderless' | 'unknown'

type RickAndMortyPaginationInfo = {
  count: number;
  pages: number;
  next: string;
  prev: string;
};

type RickAndMortyFilterParams = {
  name: string;
  status: FilterStatus;
  species: string;
  type: string;
  gender: FilterGender;
}

type RickAndMortyCharacter = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

type RickAndMortyResponse = {
  info: RickAndMortyPaginationInfo;
  results: RickAndMortyCharacter[];
};

export type {
  RickAndMortyPaginationInfo,
  RickAndMortyCharacter,
  RickAndMortyResponse,
  RickAndMortyFilterParams
};