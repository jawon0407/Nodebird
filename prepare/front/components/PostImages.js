import React from 'react' ;
import PropTypes from 'prop-types';

const PostImages = ({ images }) => {
    return (
        <div>
            <img src={images[0].src} alt={images[0].src} />
        </div>
    )
}

PostImages.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default PostImages;