import React from 'react';
import { Book } from './Book';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

export const BooksGrid = props => {
    const { books, updateBook, search } = props;

    return(
        <div className="bookshelf-books">
            <Grid
                stackable
                columns={4}
                doubling
            >
                <Grid.Row stretched centered>
                    {/*
                        title-i for key to avoid duplicate key for something like 'robotics'
                        - becomes 'robotics-1', 'robotics-2' etc.
                    */}
                    {books.map((book, i) => (
                        <Grid.Column key={`column-${book.title}-${i}`}>
                            <Book
                                key={`${book.title}-${i}`}
                                book={book}
                                updateBook={updateBook}
                                search={search}
                            />
                        </Grid.Column>
                    ))}
                </Grid.Row>
            </Grid>
        </div>
    );
};

BooksGrid.propTypes = {
    books: PropTypes.array,
    updateBook: PropTypes.func.isRequired,
    search: PropTypes.bool
};