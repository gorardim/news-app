import React from "react";
import { useQuery } from "@apollo/client";
import { CATEGORIES_AND_SOURCES } from "../queries/category_source"

const FilterForm = ({ searchParams, loading, handleInputChange, handleSearch }) => {
    const {loading: queryLoading, error, data} = useQuery(CATEGORIES_AND_SOURCES);
    if (queryLoading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    const {categories, sources} = data;

    return (
        <div className="row g-3 mt-2">

                    <div className="col-md-6">
                        <input type="text" name="search" className="form-control" value={searchParams.search} onChange={handleInputChange} placeholder="News, Author, Date dd/mm/yyyy" />
                        
                    </div>

                    <div className="col-md-2">
                        <select className="form-select form-select" name="category_id" onChange={handleInputChange}>
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2">
                        <select className="form-select form-select" name="source_id" onChange={handleInputChange}>
                            <option value="">All Sources</option>
                            {sources.map((source) => (
                                <option key={source.id} value={source.id}>
                                {source.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-2">

                        <button onClick={handleSearch} disabled={loading} className="btn btn-outline-secondary btn-block" style={{width: "100%"}}>
                            
                            {loading ? 
                                <>
                                    <span className="spinner-border spinner-border-sm"></span>
                                    <span>Loading.. </span>
                                </>
                                :
                                <span>Search</span>
                            }
                            
                            
                        </button>
                        
                    </div>
                    
                </div>
    );
};

export default FilterForm;