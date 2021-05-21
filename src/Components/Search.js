import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import qs from 'qs';
import { BooksGrid } from './BooksGrid';
import PropTypes from 'prop-types';

export const Search = props => {

    const { updateBook, books, updateBooks, searchForBooks } = props;

    // React Router's useHistory hook
    let history = useHistory();

    // use qs to parse search query string
    let parsedSearch = qs.parse(history.location.search, { ignoreQueryPrefix: true })

    // if 'query' in query string then set this as the search state, otherwise leave blank
    const [search, setSearch] = useState('query' in parsedSearch ? parsedSearch.query : "");
    const [newInput, setNewInput] = useState(true); // this state lets us know when there has been a new input (so we need to search)
    /*
        useEffect will search for book on search state change
        so either when user searches for a book using input or 'query' is in url query string
    */
    useEffect(() => {
        // don't bother making API call if there is no search term in state
        if(!search) {
            if(books.length >= 1) updateBooks([]);
            return;
        };
        // if a new input hasn't been entered or we are already searching don't make API call
        if(!newInput) return;
        setNewInput(false);
        searchForBooks({search});
    }, [
        books.length,
        search,
        newInput,
        updateBooks,
        searchForBooks
    ]);

    const handleChange = (e) => {
        // on search input change get value
        const { value } = e.target;
        setNewInput(true);
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
                <input
                    type="text"
                    placeholder="Search by title or author"
                    value={search}
                    onChange={handleChange}
                />

            </div>
            </div>
            <div className="search-books-results">
                {books.length >= 1 && <BooksGrid
                    books={books}
                    updateBook={updateBook}
                    search={true}
                />}
            </div>
        </div>
    )
}

Search.propTypes = {
    updateBook: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired,
    updateBooks: PropTypes.func.isRequired,
    searchForBooks: PropTypes.func.isRequired
};