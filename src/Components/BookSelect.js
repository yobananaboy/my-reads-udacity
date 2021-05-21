import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'semantic-ui-react';

const shelfOptions = [
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
    const { book } = props;

    const handleChange = e => {
        const { value } = e.target;
        console.log(value);
    }

    return(
        <Select
            placeholder="Move to..."
            options={shelfOptions}
            value={'shelf' in book ? book.shelf : null}
            onChange={handleChange}
        />
    )
}

BookSelect.propTypes = {
    book: PropTypes.object.isRequired
};