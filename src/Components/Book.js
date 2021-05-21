import React from 'react';
import { BookSelect } from './BookSelect';

export const Book = props => {

    const { book } = props;

    return(
        <li>
            <div className="book">
                <div className="book-top">
                    {'imageLinks' in book &&
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
                    }
                    <BookSelect />
                </div>
                <div className="book-title">{book.title}</div>
                <Author authors={book.authors} />
            </div>
        </li>
    )
};

const Author = props => {
    const { authors } = props;

    return(
        <div className="book-authors">
            {authors && authors.join(", ")}
        </div>
    )
};