type Ability = {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  };
};

type Form = {
  name: string;
  url: string;
};

type GameIndex = {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
};

type VersionDetail = {
  rarity: number;
  version: {
    name: string;
    url: string;
  };
};

type HeldItem = {
  item: {
    name: string;
    url: string;
  };
  version_details: VersionDetail[];
};

type MoveVersionDetail = {
  level_learned_at: number;
  version_group: {
    name: string;
    url: string;
  };
  move_learn_method: {
    name: string;
    url: string;
  };
};

type Move = {
  move: {
    name: string;
    url: string;
  };
  version_group_details: MoveVersionDetail[];
};

type GenerationSprites = {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
};

type Sprites = GenerationSprites & {
  other: {
    dream_world: {
      front_default: string | null;
      front_female: string | null;
    };
    home: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    "official-artwork": {
      front_default: string | null;
      front_shiny: string | null;
    };
    showdown: GenerationSprites;
  };
  versions: {
    "generation-i": {
      "red-blue": {
        back_default: string;
        back_gray: string;
        front_default: string;
        front_gray: string;
      };
      yellow: {
        back_default: string;
        back_gray: string;
        front_default: string;
        front_gray: string;
      };
    };
    "generation-ii": {
      crystal: GenerationSprites;
      gold: GenerationSprites;
      silver: GenerationSprites;
    };
    "generation-iii": {
      emerald: {
        front_default: string;
        front_shiny: string;
      };
      "firered-leafgreen": GenerationSprites;
      "ruby-sapphire": GenerationSprites;
    };
    "generation-iv": {
      "diamond-pearl": GenerationSprites;
      "heartgold-soulsilver": GenerationSprites;
      platinum: GenerationSprites;
    };
    "generation-v": {
      "black-white": {
        animated: GenerationSprites;
      } & GenerationSprites;
    };
    "generation-vi": {
      "omegaruby-alphasapphire": {
        front_default: string;
        front_female: string | null;
        front_shiny: string;
        front_shiny_female: string | null;
      };
      "x-y": {
        front_default: string;
        front_female: string | null;
        front_shiny: string;
        front_shiny_female: string | null;
      };
    };
    "generation-vii": {
      icons: {
        front_default: string;
        front_female: string | null;
      };
      "ultra-sun-ultra-moon": {
        front_default: string;
        front_female: string | null;
        front_shiny: string;
        front_shiny_female: string | null;
      };
    };
    "generation-viii": {
      icons: {
        front_default: string;
        front_female: string | null;
      };
    };
  };
};

type Stat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

type PokemonTypes =
  | "bug"
  | "dark"
  | "dragon"
  | "electric"
  | "fairy"
  | "fighting"
  | "fire"
  | "flying"
  | "ghost"
  | "grass"
  | "ground"
  | "ice"
  | "normal"
  | "poison"
  | "psychic"
  | "rock"
  | "shadow"
  | "steel"
  | "stellar"
  | "unknown"
  | "water";

type Type = {
  slot: number;
  type: {
    name: PokemonTypes;
    url: string;
  };
};

type PastType = {
  generation: {
    name: string;
    url: string;
  };
  types: Type[];
};

type ResourceIndex = {
  name: string;
  url: string;
};

type PokemonIndexList = ResourceIndex[];

type PokemonApiResponseList<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T;
};

type PokemonIndexListResponse = PokemonApiResponseList<PokemonIndexList>;
type PokemonTypeListResponse = PokemonApiResponseList<ResourceIndex[]>;

type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Ability[];
  forms: Form[];
  game_indices: GameIndex[];
  held_items: HeldItem[];
  location_area_encounters: string;
  moves: Move[];
  species: {
    name: string;
    url: string;
  };
  sprites: Sprites;
  cries: {
    latest: string;
    legacy: string;
  };
  stats: Stat[];
  types: Type[];
  past_types: PastType[];
};

type TypeRelation = {
  name: string;
  url: string;
};

type DamageRelations = {
  no_damage_to: TypeRelation[];
  half_damage_to: TypeRelation[];
  double_damage_to: TypeRelation[];
  no_damage_from: TypeRelation[];
  half_damage_from: TypeRelation[];
  double_damage_from: TypeRelation[];
};

type PastDamageRelation = {
  generation: {
    name: string;
    url: string;
  };
  damage_relations: DamageRelations;
};

type TypeGameIndex = {
  game_index: number;
  generation: {
    name: string;
    url: string;
  };
};

type TypeName = {
  name: string;
  language: {
    name: string;
    url: string;
  };
};

type TypePokemon = {
  slot: number;
  pokemon: {
    name: string;
    url: string;
  };
};

type PokemonType = {
  id: number;
  name: string;
  damage_relations: DamageRelations;
  past_damage_relations: PastDamageRelation[];
  game_indices: TypeGameIndex[];
  generation: {
    name: string;
    url: string;
  };
  move_damage_class: {
    name: string;
    url: string;
  };
  names: TypeName[];
  pokemon: TypePokemon[];
  moves: {
    name: string;
    url: string;
  }[];
};

export type {
  DamageRelations,
  Pokemon,
  PokemonIndexList,
  PokemonIndexListResponse,
  PokemonType,
  PokemonTypeListResponse,
  PokemonTypes,
  ResourceIndex,
  TypeRelation,
};
