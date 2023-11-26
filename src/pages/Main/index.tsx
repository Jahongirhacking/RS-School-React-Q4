// Hooks
import { useContext } from 'react';
// Components
import Card from '../../components/Card';
// FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// Types
import { IPokemonLocal, LimitedPokemons } from '../../@types/card';
import { ISearchContext } from '../../@types/app';
// Styles
import './style.scss';
// Context API
import { SearchContext } from '../../contexts/SearchContext';
import { PokemonsContext } from '../../contexts/PokemonsContext';

const Main = () => {
  // List of Pokemons which will be updated
  const { searchedKey, isError, isPending } = useContext(
    SearchContext
  ) as ISearchContext;
  const { pokemonsList } = useContext(PokemonsContext) as LimitedPokemons;

  // filter if it has not trailing spaces
  // and match with searchedKey
  const handleFilter = (pokemon: IPokemonLocal) => {
    return (
      searchedKey === searchedKey.trim() &&
      pokemon.pokemonName.toLowerCase().includes(searchedKey.toLowerCase())
    );
  };

  return (
    <main className="main">
      <section className="card-container">
        {isError ? (
          // If there is error
          <div className="status-info error">Error Happened ☹️</div>
        ) : isPending ? (
          // If it's pending
          <div className="status-info fetching">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" />
          </div>
        ) : (
          <Cards pokemonsList={pokemonsList} handleFilter={handleFilter} />
        )}
      </section>
    </main>
  );
};

export const Cards = ({
  pokemonsList,
  handleFilter,
}: {
  pokemonsList: IPokemonLocal[];
  handleFilter: (value: IPokemonLocal) => boolean;
}) => {
  const cards = pokemonsList
    .filter(handleFilter)
    .map((pokemon: IPokemonLocal) => (
      <Card
        key={pokemon.id}
        pokemonName={pokemon.pokemonName}
        imgUrl={pokemon.imgUrl}
        abilities={pokemon.abilities}
        height={pokemon.height}
        id={pokemon.id}
      />
    ));
  return cards.length !== 0 ? (
    cards
  ) : (
    <div style={{ marginTop: '50px' }}>🤷🏻‍♂️ Nothing found for now...</div>
  );
};

export default Main;
