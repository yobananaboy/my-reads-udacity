import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import qs from 'qs';
import { BooksGrid } from './BooksGrid';
import PropTypes from 'prop-types';
import { useDebounce } from '../Helpers/useDebounce';
import { Input } from 'semantic-ui-react';

export const Search = props => {

    const { updateBook, books, searchForBooks, searching } = props;

    // React Router's useHistory hook
    let history = useHistory();

    // use qs to parse search query string
    let parsedSearch = qs.parse(history.location.search, { ignoreQueryPrefix: true })

    // if 'query' in query string then set this as the search state, otherwise leave blank
    const [search, setSearch] = useState('query' in parsedSearch ? parsedSearch.query : "");
    /*
        useEffect will search for book on search state change
        so either when user searches for a book using input or 'query' is in url query string
    */
    const debouncedSearch = useDebounce(search, 300);

    useEffect(() => {
        searchForBooks(debouncedSearch);
    }, [
        debouncedSearch,
        searchForBooks
    ]);

    /**
    * @description Handles change in search text input and updates search state with new value and 'query' in history
    * @constructor
    * @param {Object} e - the native event
    */
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
                    <Input
                        type="text"
                        placeholder="Search by title or author"
                        value={search}
                        onChange={handleChange}
                        loading={searching}
                    />

                </div>
            </div>
            <div className="search-books-results">
                {/*
                    if there are books in the array then display these,
                    otherwise if books is an empty array show no books found message
                */}
                {books.length >= 1 ?
                    <BooksGrid
                        books={books}
                        updateBook={updateBook}
                        search={true}
                    />
                    :
                    <p>No results found. Please try a different search term!</p>
                }
            </div>
        </div>
    )
}

Search.propTypes = {
    updateBook: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired,
    updateBooks: PropTypes.func.isRequired,
    searchForBooks: PropTypes.func.isRequired,
    searching: PropTypes.bool.isRequired
};