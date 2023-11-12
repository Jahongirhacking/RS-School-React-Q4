export interface Searchable {
  searchedKey: string;
  setIsError: (value: boolean) => void;
  setIsPending: (value: boolean) => void;
}

export interface ISearchContext extends Searchable {
  isPending: boolean;
  isError: boolean;
  handleSearchedKey: (value: string) => void;
  setIsError: (value: boolean) => void;
}
