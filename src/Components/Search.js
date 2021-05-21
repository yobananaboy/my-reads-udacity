import React, { useEffect, useState, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import qs from 'qs';
import * as BooksAPI from '../BooksAPI';
import { BooksGrid } from './BooksGrid';

export const Search = () => {
    // React Router's useHistory hook
    let history = useHistory();

    // use qs to parse search query string
    let parsedSearch = qs.parse(history.location.search, { ignoreQueryPrefix: true })

    // if 'query' in query string then set this as the search state, otherwise leave blank
    const [search, setSearch] = useState('query' in parsedSearch ? parsedSearch.query : "");
    const [searching, setSearching] = useState(false); // this state lets us know to only search when we're not searching
    const searchRef = useRef(search); // use ref to keep track of search value - this is used in useEffect to check if new value entered

    // book search results - this is an empty arr by default
    const [bookSearchResults, updateBookSearchResults] = useState([]);

    /*
        useEffect will search for book on search state change
        so either when user searches for a book using input or 'query' is in url query string
    */
    useEffect(() => {
        // don't bother making API call if there is no search term in state
        if(!search) {
            console.log('no search result');
            updateBookSearchResults([]);
            return;
        };
        // don't bother making API call if search term hasn't changed or we are already searching
        if(searchRef.current === search || searching) return;
        searchRef.current = search; // update ref to current search term
        setSearching(true);
        BooksAPI.search(search)
            .then(result => {
                console.log('search result', search,result);
                /*
                    Check for an error (meaning no books found)
                    If errored - update book results to empty err
                    Otherwise update with books received from API
                */
                !result || 'error' in result ? updateBookSearchResults([]) : updateBookSearchResults(result);
                setSearching(false);
            })
            .catch(err => {
                console.log(err);
                updateBookSearchResults([]); // no results on error searching
                setSearching(false);
            });
    }, [
        search,
        searching,
        updateBookSearchResults
    ]);

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
                <input
                    type="text"
                    placeholder="Search by title or author"
                    value={search}
                    onChange={handleChange}
                />

            </div>
            </div>
            <div className="search-books-results">
                {bookSearchResults.length >= 1 && <BooksGrid
                    books={bookSearchResults}
                />}
            </div>
        </div>
    )
}