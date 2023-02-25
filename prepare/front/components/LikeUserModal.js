import React from 'react';
import Link from 'next/link';
import { Avatar } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import LikeUserFollowButton from './LikeUserFollowButton';


const LikeList = ({onCloseModal , post}) => {
    const { Likers } = post;
    return(
        <>
            <div className="absolute w-[50vw] h-[50vh] z-50 flex justify-center items-center">
                <div className="fixed bg-white w-2/5 rounded-md shadow-lg">
                    <div className="w-full">
                        <div className="text-center py-2 border-b text-lg font-bold flex justify-center items-center relative">
                            <span>좋아요한 사람</span>
                            <CloseOutlined onClick={onCloseModal} className="absolute right-3"/>
                        </div>
                        {
                            Likers.map((v, i) => {
                                return (
                                    <div key={i} className="flex justify-between items-center border-b border-gray-200 py-3 px-2">
                                            <Link href={`/user/${v.nickname}`}>
                                                <div className="flex justify-start items-center">
                                                        <Avatar>{v.nickname.split("")[0]}</Avatar>
                                                    <div className="ml-2">
                                                        {v.nickname}
                                                    </div>
                                                </div>
                                            </Link>
                                            <LikeUserFollowButton userId={post.Likers[i]} userInfo={post} />
                                        </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>        
        </>
    );
};

export default LikeList;