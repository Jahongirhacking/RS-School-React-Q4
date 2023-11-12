export interface IPokemonLocal {
  pokemonName: string;
  imgUrl: string;
  abilities: string[];
  height: number;
  id: number;
}

export interface IPokemonGlobal {
  name: string;
  url: string;
}

export type LimitedPokemons = {
  pokemons: IPokemonLocal[];
};
