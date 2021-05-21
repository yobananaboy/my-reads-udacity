import React from 'react';
import PropTypes from 'prop-types'

export const BookSelect = props => {
    const { book } = props;
    return(
        <div className="book-shelf-changer">
            <select>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    )
}

BookSelect.propTypes = {
    book: PropTypes.object.isRequired
};