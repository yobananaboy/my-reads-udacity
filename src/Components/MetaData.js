import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

export const MetaData = props => {
    const { title, description } = props.metaData;

    return(
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Helmet>
    )
}

MetaData.propTypes = {
    metaData: PropTypes.object.isRequired,
}