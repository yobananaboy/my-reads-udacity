import React, { useState, useEffect } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Header } from './Components/Header';
import { BookShelf } from './Components/BookShelf';
import { OpenSearch } from './Components/OpenSearch';
import { Search } from './Components/Search';

const bookShelves = {
  currentlyReading: 'Currently reading',
  wantToRead: 'Wants to read',
  read: 'Read'
};

function App() {

  const [books, updateBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll()
      .then(allBooks => {
        updateBooks(allBooks);
      });
  },[]);

  return(
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <>
                <Header />
                {Object.keys(bookShelves).map((key) => (
                  <BookShelf
                    key={bookShelves[key]}
                    title={bookShelves[key]} // title is 'Currently reading' etc.
                    books={books.filter(book => book.shelf === key)} // filter books so that only books with a status that matches the current shelf are added
                  />
                ))}
                <OpenSearch />
              </>
            )}
          />
          <Route
            path='/search'
            render={() => (
              <Search
                books={books}
              />
            )}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;