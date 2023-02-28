import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

moment.locale('ko');

const Elaspe = ({ post , item }) => {
    return(
        post 
            ?   post.createdAt === post.updatedAt 
                ?   <>
                        <div className="text-gray-300 mt-4">
                            {moment(post.createdAt).fromNow()}
                        </div>
                    </>
                :   <>
                        <div className="text-gray-300 mt-4">
                            {moment(post.updatedAt).fromNow()} (수정됨)
                        </div>
                    </>
        :   item.createdAt === item.updatedAt
                ?   <>
                        <div className="text-gray-300 mt-4">
                            {moment(item.createdAt).fromNow()}
                        </div>
                    </>
                :   <>
                        <div className="text-gray-300 mt-4">
                            {moment(item.updatedAt).fromNow()} (수정됨)
                        </div>
                    </>
    );
};

PropTypes.propTypes = {
    post : PropTypes.object,
    item : PropTypes.object,
}

export default Elaspe;