import { ReactElement } from 'react';

export default interface InputProps {
  setSearchedKey: (val: string) => void;
  searchedKey: string;
  type: string;
  btnContent: string | ReactElement;
  placeholder?: string;
  className?: string;
}
