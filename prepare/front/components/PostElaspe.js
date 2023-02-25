import React from 'react';
import moment from 'moment';

moment.locale('ko');

const PostElaspe = ({ post }) => {
    return(
        <>
            <div className="text-gray-300 mt-4">
                {moment(post.createdAt).fromNow()}
            </div>
        </>
    );
};

export default PostElaspe;