import React from 'react';
import { BooksGrid } from './BooksGrid';

export const BookShelf = props => {
    
    const { books, status } = props;

    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">{status}</h2>
            <BooksGrid
                books={books}
            />
        </div>
    );
};
