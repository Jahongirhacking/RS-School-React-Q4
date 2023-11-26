import { IPokemonGlobal, LimitedPokemons } from '../@types/card';
import { IProperties } from '../@types/service';

const BASE_URL = 'https://pokeapi.co/api/v2';
const IMAGE_URL = 'https://img.pokemondb.net/artwork/large';
const DETAIL_URL = 'https://pokeapi.co/api/v2/pokemon-form';
export const LIMIT = 27;

export const fetchData = async (
  path: string,
  setIsError: (value: boolean) => void
) => {
  try {
    const data = await fetch(`${path}`);
    if (!data.ok) throw new Error("Couldn't find any info :(");
    const result = await data.json();
    return result;
  } catch (err) {
    setIsError(true);
    console.error(err);
  }
};

export const fetchProperties = async (
  id: number,
  setIsError: (value: boolean) => void
): Promise<IProperties> => {
  const properties = await fetchData(`${BASE_URL}/pokemon/${id}`, setIsError);
  const details = await fetchData(`${DETAIL_URL}/${id}`, setIsError);
  // TODO: return all details
  return {
    abilities: properties.abilities.map(
      ({ ability }: { ability: { name: string } }) => ability.name
    ),
    height: properties.height,
    name: `${details.name[0].toUpperCase()}${details.name.slice(1)}`,
    sprite: details.sprites.front_shiny,
    types: details.types.map(
      ({ type }: { type: { name: string } }) => type.name
    ),
  };
};

export const fetchLimitedPokemons = async (
  offset: number,
  limit: number,
  setIsError: (value: boolean) => void
): Promise<LimitedPokemons> => {
  const { results } = await fetchData(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset * limit}`,
    setIsError
  );
  const pokemonsList = await Promise.all(
    results.map(async (pokemon: IPokemonGlobal) => {
      // TODO: Get all information
      const id = Number.parseInt(pokemon.url.split('/')[6]); // Get ID from url
      const imgUrl = `${IMAGE_URL}/${pokemon.name}.jpg`; // Dynamic Image URL
      const pokemonProperties = await fetchProperties(id, setIsError);
      const pokemonName = pokemonProperties.name;
      const abilities = pokemonProperties.abilities;
      const height = pokemonProperties.height;
      // TODO: return all values
      return { id, pokemonName, imgUrl, abilities, height };
    })
  );
  return { pokemonsList };
};
