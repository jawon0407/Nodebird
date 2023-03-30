import React from  'react';
import { HeartTwoTone } from '@ant-design/icons';

const LikeUser = ({ post , onOpenModal }) => {
    return(
        <>
            {
                post.Likers.length > 0
                    && <div className="my-4 flex align-center" role="presentation">
                            <HeartTwoTone twoToneColor='#eb2f96' key='heart' className="mt-[4px]"/> 
                            <span className="ml-1 text-gray-500" onClick={onOpenModal}>
                                {post.Likers.length}개
                            </span>
                        </div>
            }
        </>        
    )
}

export default LikeUser;