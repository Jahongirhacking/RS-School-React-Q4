import { Searchable } from '../../interface';

interface HeaderProps extends Searchable {
  setSearchedKey: (value: string) => void;
}

export default HeaderProps;
