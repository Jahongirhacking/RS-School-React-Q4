export interface Searchable {
  searchedKey: string;
  setIsError: (value: boolean) => void;
  setIsPending: (value: boolean) => void;
}
