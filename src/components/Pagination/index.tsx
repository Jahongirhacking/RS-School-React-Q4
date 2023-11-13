import { useContext } from 'react';
// Components
import Input from '../Input';
import Button from '../Button';
// FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {
  faArrowLeft,
  faArrowRight,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
// Routing
import { useSearchParams } from 'react-router-dom';
// API
import { fetchData } from '../../services/api';
// Context API
import { SearchContext } from '../../contexts/SearchContext';
// Types
import { ISearchContext } from '../../@types/app';
import { LIMIT } from '../../services/api';

const Pagination = () => {
  const { handleSearchedKey, setIsPending, setIsError } = useContext(
    SearchContext
  ) as ISearchContext;
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = Number(searchParams.get('page')) || 0;
  const limitNumber = Number(searchParams.get('limit')) || LIMIT;

  const handlePagination = (callbackFunc: (value: number) => number) => {
    setSearchParams((param) => {
      const page = callbackFunc(Number(param.get('page')) || 0);
      localStorage.setItem('pageNumber', `${page}`);
      param.set('page', `${page}`);
      handleSearchedKey('');
      return param;
    });
  };

  const handlePrevPagination = () => {
    handlePagination((value: number) => value - 1);
  };

  const handleNextPagination = () => {
    handlePagination((value: number) => value + 1);
  };

  const handleLimitChange = (value: string) => {
    localStorage.setItem('limitNumber', `${value}`);
    setSearchParams((params) => {
      params.set('limit', `${value}`);
      return params;
    });
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
    <>
      <Input
        className="input-limit"
        searchedKey={searchParams.get('limit') || `${LIMIT}`}
        setSearchedKey={handleLimitChange}
        placeholder={'Limit'}
        type={'number'}
        btnContent={<FontAwesomeIcon icon={faCheck} />}
      />
      <section className="btn-container">
        {pageNumber > 0 && (
          <Button handleClick={handlePrevPagination}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
        )}
        {pageNumber * limitNumber < 1000 && (
          <Button handleClick={handleNextPagination}>
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        )}
        <Button handleClick={fetchFakeData} btnName="danger-bg">
          <FontAwesomeIcon icon={faTriangleExclamation} />
        </Button>
      </section>
    </>
  );
};

export default Pagination;
