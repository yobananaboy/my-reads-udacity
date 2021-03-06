import React from 'react';
import { BooksGrid } from './BooksGrid';
import PropTypes from 'prop-types';
import { Header, Container, Divider } from 'semantic-ui-react';

export const BookShelf = props => {
    
    const { books, title, updateBook } = props;

    return(
        <Container className="bookshelf">
            <Header as="h2" className="bookshelf-title">{title}</Header>
            <Divider />
            <BooksGrid
                books={books}
                updateBook={updateBook}
            />
        </Container>
    );
};

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    updateBook: PropTypes.func.isRequired
};