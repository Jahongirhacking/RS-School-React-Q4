import { Routes as RoutePaths } from '../routes';

interface ISearchParams {
  get: (key: string) => string | null;
  set: (key: string, value: string) => void;
}

export const getDetailsParam = (id: number, searchParams: ISearchParams) => {
  return `${RoutePaths.DETAILS}/${id}/?page=${searchParams.get(
    'page'
  )}&limit=${searchParams.get('limit')}`;
};

export const getCardsParam = (searchParams: ISearchParams) => {
  return `${RoutePaths.HOME}?page=${searchParams.get(
    'page'
  )}&limit=${searchParams.get('limit')}`;
};
