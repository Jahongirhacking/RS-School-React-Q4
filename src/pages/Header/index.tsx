// Components
import Input from '../../components/Input';
import Button from '../../components/Button';
// Types
import HeaderProps from './interface';
// API
import { LIMIT, fetchData } from '../../services/api';
// Styles
import './style.scss';
// Routing
import { useSearchParams } from 'react-router-dom';
// FontAwesome Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faArrowRight, faArrowLeft, faSearch, faCheck } from '@fortawesome/free-solid-svg-icons';

const Header = (props: HeaderProps) => {
  const {
    searchedKey,
    setSearchedKey,
    setIsPending,
    setIsError
  } = props;

  const [searchParams, setSearchParams] = useSearchParams();

  const pageNumber = Number(searchParams.get("page")) || 0;
  const limitNumber = Number(searchParams.get("limit")) || LIMIT;

  const handlePagination = (callbackFunc: (value: number) => number) => {
    setSearchParams((param) => {
      const page = callbackFunc(Number(param.get("page")) || 0);
      localStorage.setItem("pageNumber", `${page}`);
      param.set("page", `${page}`);
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

  const handleLimitChange = (value: string) => {
    localStorage.setItem('limitNumber', `${value}`)
    setSearchParams((params) => {
      params.set("limit", `${value}`);
      return params;
    })
  }

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
          className='input-name'
          searchedKey={searchedKey}
          setSearchedKey={setSearchedKey}
          placeholder={'Pokemon Name...'}
          type={'text'}
          btnContent={<FontAwesomeIcon icon={faSearch} />}
        />
        <Input
          className='input-limit'
          searchedKey={searchParams.get('limit') || `${LIMIT}`}
          setSearchedKey={handleLimitChange}
          placeholder={'Limit'}
          type={'number'}
          btnContent={<FontAwesomeIcon icon={faCheck} />}
        />
        <section className="btn-container">
          {(pageNumber) > 0 && (
            <Button handleClick={handlePrevPagination}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </Button>
          )}
          {(pageNumber * limitNumber) < 1000 && (
            <Button handleClick={handleNextPagination}>
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          )}
          <Button handleClick={fetchFakeData} btnName="danger-bg">

            <FontAwesomeIcon icon={faTriangleExclamation} />
          </Button>
        </section>
      </nav>
    </header>
  );
}

export default Header;
