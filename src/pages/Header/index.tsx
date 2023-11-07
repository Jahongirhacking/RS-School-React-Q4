import Input from '../../components/Input';
import Button from '../../components/Button';
// Types
import HeaderProps from './interface';
// API
import { fetchData } from '../../services/api';
// Styles
import './style.scss';
// Routing
import { useSearchParams } from 'react-router-dom';
// FontAwesome Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Header = (props: HeaderProps) => {
  const {
    searchedKey,
    setSearchedKey,
    setIsPending,
    setIsError
  } = props;

  const [searchParams, setSearchParams] = useSearchParams();

  const pageNumber = Number(searchParams.get("page"));

  const handlePagination = (callbackFunc: (value: number) => number) => {
    setSearchParams((param) => {
      const page = Number(param.get("page")) || 0;
      param.set("page", `${callbackFunc(page)}`);
      setSearchedKey("");
      return param;
    });
  }

  const handlePrevPagination = () => {
    handlePagination((value: number) => value - 1);
  };


  const handleNextPagination = () => {
    handlePagination((value: number) => value + 1);
  };

  const fetchFakeData = async () => {
    try {
      setIsError(false);
      setIsPending(true);
      // Pending Begins
      fetchData('somefakedata.hack/api', setIsError);
    } catch (err) {
      setIsError(true);
      console.error(err);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <header className="header">
      <nav className="nav header__search">
        <Input
          searchedKey={searchedKey}
          setSearchedKey={setSearchedKey}
          placeholder={'Pokemon Name...'}
        />
        <section className="btn-container">
          {(pageNumber || 0) > 0 && (
            <Button handleClick={handlePrevPagination}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </Button>
          )}
          {(pageNumber || 0) < 10 && (
            <Button handleClick={handleNextPagination}>
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          )}
          <Button handleClick={fetchFakeData} btnName="danger-bg">

            <FontAwesomeIcon icon={faXmark} />
          </Button>
        </section>
      </nav>
    </header>
  );
}

export default Header;
