import React from 'react';
import { Book } from './Book';

export const BooksGrid = props => {
    const { books} = props;

    return(
        <div className="bookshelf-books">
            <ol className="books-grid">
                {books.map(book => <Book key={book.title} book={book} />)}
            </ol>
        </div>
    );
};