import { createContext } from 'react';
import { LimitedPokemons } from '../@types/card';

export const PokemonsContext = createContext<LimitedPokemons | null>(null);
