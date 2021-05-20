import React from 'react';
import { BookSelect } from './BookSelect';

export const Book = props => {

    const { book } = props;

    return(
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.backgroundImage}")` }}></div>
                    <BookSelect />
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.author}</div>
            </div>
        </li>
    )
};