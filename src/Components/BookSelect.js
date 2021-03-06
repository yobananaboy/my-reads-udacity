import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select } from 'semantic-ui-react';

const SHELF_OPTIONS = [
    {
      key: 'currentlyReading',
      text: 'Currently Reading',
      value: 'currentlyReading',
    },
    {
      key: 'wantToRead',
      text: 'Want to Read',
      value: 'wantToRead',
    },
    {
      key: 'read',
      text: 'Read',
      value: 'read',
    },
    {
      key: 'none',
      text: 'None',
      value: 'none',
    },
  ]

export const BookSelect = props => {
    const { book, updateBook, search } = props;

    /**
    * @description Handles change in book shelf selection - calls updateBook() prop
    * @constructor
    * @param {Object} e - the native event
    * @param {Object} data - the object of the option selected
    */
    const handleChange = (e, data) => {
        const { value } = data;
        updateBook({
            book,
            shelf: value,
            search // let handler know we're updating a book we searched for 
        });
    };

    return(
        <Form.Field>
            <label>Current bookshelf:</label>
            <Select
                placeholder="Move to..."
                options={SHELF_OPTIONS}
                value={'shelf' in book? book.shelf : 'none'}
                onChange={handleChange}
            />
        </Form.Field>
    )
}

BookSelect.propTypes = {
    book: PropTypes.object.isRequired,
    search: PropTypes.bool
};