import React from 'react';
import { BookSelect } from './BookSelect';
import PropTypes from 'prop-types';
import { Container, Segment } from 'semantic-ui-react';

export const Book = props => {

    const { book } = props;

    return(
        <Segment>
            {'imageLinks' in book &&
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
            }
            <Container>
                <BookSelect book={book} />
                <div className="book-title">{book.title}</div>
                <Author authors={book.authors} />
            </Container>
        </Segment>
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

Book.propTypes = {
    book: PropTypes.object.isRequired
};

Author.propTypes = {
    auhors: PropTypes.object
};