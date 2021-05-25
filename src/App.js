import React, { useState, useEffect } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PageHeader } from './Components/Header';
import { BookShelf } from './Components/BookShelf';
import { OpenSearch } from './Components/OpenSearch';
import { Search } from './Components/Search';
import { MetaData } from './Components/MetaData';

const BOOK_SHELVES = {
  currentlyReading: 'Currently reading',
  wantToRead: 'Wants to read',
  read: 'Read'
};

const META_DATA = {
  homepage: {
    title: 'MyReads | Home',
    description: 'MyReads app created for the Udacity React nanodegree'
  },
  search: {
    title: 'MyReads | Search',
    description: 'Enter a genre, title or author to search for books to add to your library'
  }
}

function App() {

  const [books, updateBooks] = useState([]);
  // book search results - this is an empty arr by default
  const [bookSearchResults, updateBookSearchResults] = useState([]);
  const [searchingForBooks, setSearchingForBooks] = useState(false); // this state lets us know to only search when we're not searching

  /**
  * @description Gets all books using BooksAPI and updates state
  * @constructor
  */
  const getAllBooks = () => {
    BooksAPI.getAll()
      .then(allBooks => {
        updateBooks(allBooks);
      });
  }

  /**
  * @description Gets an individual book using the BooksAPI
  * @constructor
  * @param {Object} book - represents a book
  */
  const getBook = ({book}) => {
    return BooksAPI.get(book.id)
  }

  /**
  * @description Updates a book with details of updated shelf
  * @constructor
  * @param {Object} book - represents a book
  * @param {string} shelf - the book's updated shelf
  * @returns {Promise} Promise object represents the response from calling BooksAPI.update()
  */
  const updateBook = async({book, shelf}) => {
    let response = await BooksAPI.update(book, shelf);
    return response;
  }

  /**
  * @description Uses the BooksAPI to get data on each book in an array of books
  * @constructor
  * @param {Array} booksArray - an array of books
  */
  const getBookShelfFromBooksArray = async({booksArray}) => {
    // if no array then bookSearchResults should be an empty array
    if(!booksArray) {
      updateBookSearchResults([]);
      return;
    }
    /*
      otherwise we try and get details for each book in the array
      we do this by mapping over our books array and calling getBook for each book
      we use Promise.all() so that updatedArr resolves to an array of the results of the input promises
    */
    const updatedArr = await Promise.all(booksArray.map(async(book) => {
      try {
        return await getBook({book})
      } catch(err) {
        return book
      }
    }));
    updateBookSearchResults(updatedArr);
  }

  /**
  * @description Uses the BooksAPI to get search for book based on query
  * @constructor
  * @param {string} search - search term used to find books
  */
  const searchForBooks = ({search}) => {
    if(searchingForBooks) return;
    setSearchingForBooks(true);
    BooksAPI.search(search)
      .then(result => {
          /*
              Check for an error (meaning no books found)
              If errored - update book results to empty err
              Otherwise update with books received from API
          */
          !result || 'error' in result ? updateBooks([]) : getBookShelfFromBooksArray({booksArray: result});
          setSearchingForBooks(false);
      })
      .catch(err => {
          console.log(err);
          updateBooks([]); // there could be no results from the API on error searching so updateBooks with empty array
          setSearchingForBooks(false);
      });
  }

  /**
  * @description Updates a book's shelf
  * @constructor
  * @param {Object} book - represents a book
  * @param {string} shelf - the book's updated shelf
  * @param {boolean} search - true if we are updating a book in search results
  */
  const updateBookWithShelf = ({book, shelf, search = false}) => {
    updateBook({book, shelf})
      .then(response => {
        if(response.error) return;
        /*
          if it's a book we have searched for we need to get book shelf from array of search results
          this is so we can get each book's shelf using the API.
          Otherwise we call getAllBooks() because this will include the updated book's shelf
        */
        search ? getBookShelfFromBooksArray({booksArray: bookSearchResults}) : getAllBooks();
      })
      .catch(err => console.log(err));
  }

  // get all books on mount
  useEffect(() => {
    getAllBooks()
  }, [books])

  return(
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <>
                <MetaData metaData={META_DATA.homepage} />
                <PageHeader />
                {Object.keys(BOOK_SHELVES).map((key) => (
                  books && <BookShelf
                    key={BOOK_SHELVES[key]}
                    title={BOOK_SHELVES[key]} // title is 'Currently reading' etc.
                    books={books.filter(book => book.shelf === key)} // filter books so that only books with a status that matches the current shelf are added
                    updateBook={updateBookWithShelf}
                  />
                ))}
                <OpenSearch />
              </>
            )}
          />
          <Route
            path='/search'
            render={() => (
              <>
                <MetaData metaData={META_DATA.search} />
                <Search
                  updateBook={updateBookWithShelf}
                  books={bookSearchResults}
                  updateBooks={updateBookSearchResults}
                  searchForBooks={searchForBooks}
                />
              </>
            )}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;