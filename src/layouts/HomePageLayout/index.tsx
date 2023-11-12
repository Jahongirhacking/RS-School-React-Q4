import { useCallback, useEffect, useState } from 'react';
// Routing
import { Outlet, useSearchParams } from 'react-router-dom';
// Styles
import "./style.scss";
// Pages
import Header from "../../pages/Header"
import Main from "../../pages/Main"
import Footer from '../../pages/Footer';
// API
import { LIMIT } from '../../services/api';
// Context API
import { SearchContext } from '../../contexts/SearchContext';

const HomePageLayout = () => {
    // States
    const [searchedKey, setSearchedKey] = useState<string>('');
    const [isPending, setIsPending] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    // Search Parameters
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        setSearchParams((param) => {
            param.get("page") || param.set("page", localStorage.getItem("pageNumber") || "0");
            param.get("limit") || param.set("limit", localStorage.getItem("limitNumber") || `${LIMIT}`)
            return param;
        });
        setSearchedKey(localStorage.getItem("searchedKey") || "");
    }, [setSearchParams])


    const handleSearchedKey = useCallback((value: string): void => {
        setSearchedKey(value);
        localStorage.setItem('searchedKey', value);
    }, []);

    const handlePageNumber = useCallback((): void => {
        setSearchedKey("");
        localStorage.setItem('pageNumber', searchParams.get("page") || "0");
    }, [searchParams]);

    const handleLimitNumber = useCallback((): void => {
        setSearchedKey("");
        localStorage.setItem('limitNumber', searchParams.get("limit") || `${LIMIT}`);
    }, [searchParams]);


    useEffect(() => {
        // Map page number
        handlePageNumber();
        // Map limit number
        handleLimitNumber();
        // Map searched name
        handleSearchedKey(localStorage.getItem("searchedKey") || "");
    }, [handlePageNumber, handleLimitNumber, handleSearchedKey])

    return (
        <section className='home-page-layout'>
            <SearchContext.Provider value={{
                searchedKey,
                isPending,
                isError,
                setIsPending,
                handleSearchedKey,
                setIsError
            }}>
                <Header />
                <section className='main-container'>
                    <Main />
                    <Outlet />
                </section>
            </SearchContext.Provider>
            <Footer />
        </section>
    );
}

export default HomePageLayout;