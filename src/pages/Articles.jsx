import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_ARTICLES } from "../queries/article";
import FilterForm from "../components/FilterForm";
import { filterSearchParams } from "../utils";
import Article from "../components/Article";
import Sources from "../components/Sources";
import Categories from "../components/Categories";
import Me from "../components/Me";

const Articles = () => {
    const [searchParams, setSearchParams] = useState({
        search: "",
        category_id: "",
        source_id: "",
        page: 1,
        first: 10,
    });
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [getArticles, { loading, called }] = useLazyQuery(GET_ARTICLES, {
        onCompleted: (data) => {
            setArticles(data.articles.data);
            setTotalPages(data.articles.paginatorInfo.lastPage);
            setCurrentPage(data.articles.paginatorInfo.currentPage);
        },
    });

    useEffect(() => {
        const filteredSearchParams = filterSearchParams(searchParams);
        getArticles({ variables: filteredSearchParams });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = () => {
        const filteredSearchParams = filterSearchParams(searchParams);
        getArticles({ variables: filteredSearchParams });
    };

    const handleInputChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value,
        });
    };

    const handlePageChange = (page) => {
        setSearchParams({ ...searchParams, page: page });
        const filteredSearchParams = filterSearchParams(searchParams);
        getArticles({ variables: filteredSearchParams });
    };

    const handelClickCategory = (category) => {
        setSearchParams({ ...searchParams, category_id: category });
        const filteredSearchParams = filterSearchParams(searchParams);
        getArticles({ variables: filteredSearchParams });
    };

    const handelClickSource = (source) => {
        setSearchParams({ ...searchParams, source_id: source });
        const filteredSearchParams = filterSearchParams(searchParams);
        getArticles({ variables: filteredSearchParams });
    };

    return (
        <>
            <div className="p-5 bg-dark text-white text-center">
                <div className="card p-3 py-4 container">
                    <h5>An Easier Way To Find News</h5>
                    <FilterForm
                        searchParams={searchParams}
                        loading={loading}
                        handleInputChange={handleInputChange}
                        handleSearch={handleSearch}
                    />

                    <div className="mt-5">
                    </div>

                </div> 
            </div>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-4">
                        <Me />
                        <Categories handelClickCategory={handelClickCategory} />
                        <Sources handelClickSource={handelClickSource} />
                        <hr className="d-sm-none" />
                    </div>
                    <div className="col-sm-8">
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <div>
                            {articles.map((article) => (
                                <Article key={article.id} article={article} />
                            ))}
                            {called && articles.length === 0 ? <div>No results found.</div> :
                                <ul className="pagination justify-content-end">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <li key={page} onClick={() => handlePageChange(page)} className={currentPage === page ? "page-item active" : "page-item"}><a className="page-link">{page}</a></li>
                                ))}
                                </ul>
                            }
                                
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Articles;
