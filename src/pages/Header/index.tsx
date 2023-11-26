import { useContext, useState } from 'react';
// Components
import Input from '../../components/Input';
import LogoImage from '../../assets/logo.png';
// Types
import { ISearchContext } from '../../@types/app';
// Styles
import './style.scss';
// FontAwesome Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faAngleUp,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
// Context API
import { SearchContext } from '../../contexts/SearchContext';
import Pagination from '../../components/Pagination';

const Header = () => {
  const { searchedKey, handleSearchedKey } = useContext(
    SearchContext
  ) as ISearchContext;
  const [showPagination, setShowPagination] = useState(false);

  const togglePagination = () => {
    setShowPagination((showPagination) => !showPagination);
  };

  return (
    <header className="header">
      <nav className="nav">
        <img className="header__logo" src={LogoImage} alt="logo-image" />
        <form
          className="header__search"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Input
            className="input-name"
            searchedKey={searchedKey}
            setSearchedKey={handleSearchedKey}
            placeholder={'Pokemon Name...'}
            type={'text'}
            btnContent={<FontAwesomeIcon icon={faSearch} />}
          />
          <button className="toggle-btn btn" onClick={togglePagination}>
            <FontAwesomeIcon icon={showPagination ? faAngleUp : faAngleDown} />
          </button>
          {showPagination && <Pagination />}
        </form>
      </nav>
    </header>
  );
};

export default Header;
