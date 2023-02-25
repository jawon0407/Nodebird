import React , { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector , useDispatch } from 'react-redux';
import { Button } from 'antd';
import { followUser , unFollowUser } from '../actions/user';

const LikeUserFollowButton = ({ userId , post }) => { 
    const { me , followLoading , unFollowLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const isFollowing = me?.Followings.find((v) => v.id === userId.id);
    const onLikeUserFollow = useCallback(() => {
        if(isFollowing){
            dispatch(unFollowUser(userId.id));
        }else{
            dispatch(followUser(userId.id));
        }
    }, [isFollowing]);

    if(!me){
        alert('로그인이 필요합니다.');
        return;
    }

    return (
        <>
            { me.id === userId.id 
                ?   null 
                :   <Button loading={followLoading || unFollowLoading} onClick={onLikeUserFollow}>
                        {isFollowing ? '언팔로우' : '팔로우'}
                    </Button>            
            }
        </>
    );
};

LikeUserFollowButton.propTypes = {
    userId : PropTypes.number.isRequired,
};

export default LikeUserFollowButton;