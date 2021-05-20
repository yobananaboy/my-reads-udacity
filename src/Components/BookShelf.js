import React from 'react';
import { BooksGrid } from './BooksGrid';

export const BookShelf = props => {
    
    const { books, title } = props;

    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <BooksGrid
                books={books}
            />
        </div>
    );
};
