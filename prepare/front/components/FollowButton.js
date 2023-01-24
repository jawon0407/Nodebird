import React , { useCallback } from "react"
import PropTypes from "prop-types"
import { Button } from "antd"
import { followUser , unFollowUser } from "../actions/user"
import {useSelector , useDispatch} from "react-redux"

const FollowButton = ({ post }) => {
    const { me , followLoading , unFollowLoading} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
    const onFollow = useCallback(() => {
        if(isFollowing){
            dispatch(unFollowUser({ UserId : post.User.id })) 
        } else{
            dispatch(followUser({ UserId : post.User.id }));
        }
    }, [isFollowing]);

    return(
        <>
            <Button loading={followLoading || unFollowLoading} onClick={onFollow}>
                {isFollowing ? '언팔로우' : '팔로우'}
            </Button>
        </>
    )
}

FollowButton.propTypes = {
    post : PropTypes.shape({
        User : PropTypes.object,
        id : PropTypes.number,
        content : PropTypes.string,
        createdAt : PropTypes.string,
        Comments : PropTypes.arrayOf(PropTypes.object),
        Images : PropTypes.arrayOf(PropTypes.object),
        Likers : PropTypes.arrayOf(PropTypes.object),
        RetweetId : PropTypes.number,
        Retweet : PropTypes.objectOf(PropTypes.any),
    }).Required
}

export default FollowButton