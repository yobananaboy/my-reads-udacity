import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import qs from 'qs';

export const Search = props => {
    // React Router's useHistory hook
    let history = useHistory();

    // use qs to parse search query string
    let parsedSearch = qs.parse(history.location.search, { ignoreQueryPrefix: true })

    // if 'query' in query string then set this as the search state, otherwise leave blank
    const [search, setSearch] = useState('query' in parsedSearch ? parsedSearch.query : "");
    console.log(history);
    const handleChange = (e) => {
        // on search input change get value
        const { value } = e.target;
        // update search state
        setSearch(value);
        // add/update 'query' in history
        history.push({
            pathname: history.location.pathname,
            search: `?query=${value}`
        });
        // TODO: search for book(s) using BooksAPI
    }

    return(
        <div className="search-books">
            <div className="search-books-bar">
            <Link to="/">
                <button className="close-search">Close</button>
            </Link>
            <div className="search-books-input-wrapper">
                {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input
                    type="text"
                    placeholder="Search by title or author"
                    value={search}
                    onChange={handleChange}
                />

            </div>
            </div>
            <div className="search-books-results">
            <ol className="books-grid"></ol>
            </div>
        </div>
    )
}