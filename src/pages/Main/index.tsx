// Hooks
import { useState, useCallback, useEffect, useContext } from 'react';
// Components
import Card from '../../components/Card';
// API
import { LIMIT, fetchLimitedPokemons } from '../../services/api';
// FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// Types
import { IPokemonLocal } from '../../@types/card';
import { ISearchContext } from '../../@types/app';
// Styles
import './style.scss';
// Routing
import { useSearchParams } from 'react-router-dom';
// Context API
import { SearchContext } from '../../contexts/SearchContext';

const Main = () => {
  // List of Pokemons which will be updated
  const [pokemonsList, setPokemonsList] = useState<IPokemonLocal[]>([]);
  const { setIsError, setIsPending, searchedKey, isError, isPending } = useContext(SearchContext) as ISearchContext;
  // Search Parameters
  const [searchParams] = useSearchParams();
  const pageNumber = Number(searchParams.get("page")) || 0;
  const LimitNumber = Number(searchParams.get("limit")) || LIMIT;

  /**
   * TODO: request to get new pokemons
   */
  const handleFetchPokemons = useCallback(
    () => {
      const fetchPokemons = async () => {
        try {
          setIsError(false);
          setIsPending(true);
          const { pokemons } = await fetchLimitedPokemons(
            pageNumber,
            LimitNumber,
            setIsError
          );
          setPokemonsList(pokemons);
        } catch (err) {
          console.error(err);
        } finally {
          setIsPending(false);
        }
      };

      fetchPokemons();
    },
    [pageNumber, LimitNumber, setIsError, setIsPending]
  );

  // if something is changed with handleFetchPokemons
  // call it again
  useEffect(() => {
    handleFetchPokemons();
  }, [handleFetchPokemons])

  // filter if it has not trailing spaces
  // and match with searchedKey
  const handleFilter = (pokemon: IPokemonLocal) => {
    return (
      searchedKey === searchedKey.trim() &&
      pokemon.pokemonName
        .toLowerCase()
        .includes(searchedKey.toLowerCase())
    );
  };

  // Filtered Cards
  const Cards = pokemonsList
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

  return (
    <main className="main">
      <section className="card-container">
        {isError ? (
          // If there is error
          <div className="status-info error">Error Happened ☹️</div>
        ) : isPending ? (
          // If it's pending
          <div className="status-info fetching">
            <FontAwesomeIcon icon={faSpinner} spin size='3x' />
          </div>
        ) : Cards.length === 0 ? (
          // If Cards is empty
          <div style={{ marginTop: '50px' }}>🤷🏻‍♂️ Nothing found for now...</div>
        ) : (
          Cards
        )}
      </section>
    </main>
  );
}

export default Main;