import { useState, useCallback, useEffect } from 'react';
import Card from '../../components/Card';
// API
import { fetchLimitedPokemons } from '../../services/api';
// FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// Types
import { IPokemonLocal } from '../../components/Card/interface';
import { MainProp } from './interface';
// Styles
import './style.scss';
// Routing
import { useSearchParams } from 'react-router-dom';

const Main = ({ setIsError, setIsPending, searchedKey, isError, isPending }: MainProp) => {

  const [pokemonsList, setPokemonsList] = useState<IPokemonLocal[]>([]);

  const [searchParams] = useSearchParams();
  const pageNumber = Number(searchParams.get("page")) || 0;

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
    [pageNumber, setIsError, setIsPending]
  );

  useEffect(() => {
    handleFetchPokemons();
  }, [handleFetchPokemons])

  const handleFilter = (pokemon: IPokemonLocal) => {
    return (
      searchedKey === searchedKey.trim() &&
      pokemon.pokemonName
        .toLowerCase()
        .includes(searchedKey.toLowerCase())
    );
  };

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
          <div style={{ marginTop: '50px' }}>Nothing found for now...</div>
        ) : (
          Cards
        )}
      </section>
    </main>
  );
}

export default Main;