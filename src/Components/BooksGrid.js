import React from 'react';
import { Book } from './Book';
import PropTypes from 'prop-types';

export const BooksGrid = props => {
    const { books} = props;

    return(
        <div className="bookshelf-books">
            <ol className="books-grid">
                {/*
                    title-i for key to avoid duplicate key for something like 'robotics'
                    - becomes 'robotics-1', 'robotics-2' etc.
                */}
                {books.map((book, i) => <Book key={`book.title-${i}`} book={book} />)}
            </ol>
        </div>
    );
};

BooksGrid.propTypes = {
    books: PropTypes.array
};