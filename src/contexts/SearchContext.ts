import { createContext } from 'react';
import { ISearchContext } from '../@types/app';

export const SearchContext = createContext<ISearchContext | null>(null);
