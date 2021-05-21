import React, { useState, useEffect } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PageHeader } from './Components/Header';
import { BookShelf } from './Components/BookShelf';
import { OpenSearch } from './Components/OpenSearch';
import { Search } from './Components/Search';
import { MetaData } from './Components/MetaData';

const bookShelves = {
  currentlyReading: 'Currently reading',
  wantToRead: 'Wants to read',
  read: 'Read'
};

const metaData = {
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

  const getAllBooks = () => {
    BooksAPI.getAll()
      .then(allBooks => {
        updateBooks(allBooks);
      });
  }

  const getBook = ({book}) => {
    return BooksAPI.get(book.id)
  }

  const updateBook = async({book, shelf}) => {
    let response = await BooksAPI.update(book, shelf);
    return response;
  }

  const getBookShelfFromBooksArray = async({booksArray}) => {
    if(!booksArray) {
      updateBookSearchResults([]);
      return;
    }
    const updatedArr = await Promise.all(booksArray.map(async(book) => {
      try {
        return await getBook({book})
      } catch(err) {
        return book
      }
    }));
    updateBookSearchResults(updatedArr);
  }

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
          updateBooks([]); // no results on error searching
          setSearchingForBooks(false);
      });
  }

  /*
    if we have selected a book we want to update the book's shelf
  */
  const updateBookWithShelf = ({book, shelf, search = false}) => {
    updateBook({book, shelf})
      .then(response => {
        if(response.error) return;
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
                <MetaData metaData={metaData.homepage} />
                <PageHeader />
                {Object.keys(bookShelves).map((key) => (
                  books && <BookShelf
                    key={bookShelves[key]}
                    title={bookShelves[key]} // title is 'Currently reading' etc.
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
                <MetaData metaData={metaData.search} />
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