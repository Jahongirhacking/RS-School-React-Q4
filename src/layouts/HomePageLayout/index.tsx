import { useCallback, useEffect, useState } from 'react';
// Routing
import { Outlet, useSearchParams } from 'react-router-dom';
// Styles
import './style.scss';
// Pages
import Header from '../../pages/Header';
import Main from '../../pages/Main';
import Footer from '../../pages/Footer';
// API
import { LIMIT } from '../../services/api';
import { fetchLimitedPokemons } from '../../services/api';
// Types
import { IPokemonLocal } from '../../@types/card';
// Context API
import { SearchContext } from '../../contexts/SearchContext';
import { PokemonsContext } from '../../contexts/PokemonsContext';

const HomePageLayout = () => {
  // Search Parameters
  const [searchParams, setSearchParams] = useSearchParams();
  // States
  const [searchedKey, setSearchedKey] = useState<string>('');
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [pokemonsList, setPokemonsList] = useState<IPokemonLocal[]>([]);

  const pageNumber = Number(searchParams.get('page')) || 0;
  const limitNumber = Number(searchParams.get('limit')) || LIMIT;

  /**
   * TODO: request to get new pokemons
   */
  const handleFetchPokemons = useCallback(() => {
    const fetchPokemons = async () => {
      try {
        setIsError(false);
        setIsPending(true);
        const { pokemonsList } = await fetchLimitedPokemons(
          pageNumber,
          limitNumber,
          setIsError
        );
        setPokemonsList(pokemonsList);
      } catch (err) {
        console.error(err);
      } finally {
        setIsPending(false);
      }
    };

    fetchPokemons();
  }, [pageNumber, limitNumber, setIsError, setIsPending]);

  // if something is changed with handleFetchPokemons
  // call it again
  useEffect(() => {
    handleFetchPokemons();
  }, [handleFetchPokemons]);

  useEffect(() => {
    setSearchParams((param) => {
      param.get('page') ||
        param.set('page', localStorage.getItem('pageNumber') || '0');
      param.get('limit') ||
        param.set('limit', localStorage.getItem('limitNumber') || `${LIMIT}`);
      return param;
    });
    setSearchedKey(localStorage.getItem('searchedKey') || '');
  }, [setSearchParams]);

  const handleSearchedKey = useCallback((value: string): void => {
    setSearchedKey(value);
    localStorage.setItem('searchedKey', value);
  }, []);

  const handlePageNumber = useCallback((): void => {
    setSearchedKey('');
    localStorage.setItem('pageNumber', searchParams.get('page') || '0');
  }, [searchParams]);

  const handleLimitNumber = useCallback((): void => {
    setSearchedKey('');
    localStorage.setItem(
      'limitNumber',
      searchParams.get('limit') || `${LIMIT}`
    );
  }, [searchParams]);

  useEffect(() => {
    // Map page number
    handlePageNumber();
    // Map limit number
    handleLimitNumber();
    // Map searched name
    handleSearchedKey(localStorage.getItem('searchedKey') || '');
  }, [handlePageNumber, handleLimitNumber, handleSearchedKey]);

  return (
    <section className="home-page-layout" data-testid="homepage">
      <SearchContext.Provider
        value={{
          searchedKey,
          isPending,
          isError,
          setIsPending,
          handleSearchedKey,
          setIsError,
        }}
      >
        <Header />
        <section className="main-container">
          <PokemonsContext.Provider value={{ pokemonsList }}>
            <Main />
          </PokemonsContext.Provider>
          <Outlet />
        </section>
      </SearchContext.Provider>
      <Footer />
    </section>
  );
};

export default HomePageLayout;
