import { useCallback, useEffect, useMemo, useState } from 'react';
import Header from "../../pages/Header"
import Main from "../../pages/Main"
import { Outlet, useSearchParams } from 'react-router-dom';
import "./style.scss";

const HomePageLayout = () => {
    // States
    const [searchedKey, setSearchedKey] = useState<string>('');
    const [isPending, setIsPending] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    // Search Parameters
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        setSearchParams((param) => {
            param.set("page", localStorage.getItem("pageNumber") || "0");
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


    useMemo(() => {
        // Map page number
        handlePageNumber();
        // Map searched name
        handleSearchedKey(localStorage.getItem("searchedKey") || "");
    }, [handlePageNumber, handleSearchedKey])

    return (
        <section className='home-page-layout'>
            <Header
                setSearchedKey={handleSearchedKey}
                searchedKey={searchedKey}
                setIsPending={setIsPending}
                setIsError={setIsError}
            />
            <section className='main-container'>
                <Main
                    searchedKey={searchedKey}
                    isPending={isPending}
                    setIsPending={setIsPending}
                    isError={isError}
                    setIsError={setIsError}
                />
                <Outlet />
            </section>
        </section>
    );
}

export default HomePageLayout;