import React , { useCallback } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import {useSelector , useDispatch} from "react-redux";
import { followUser , unFollowUser } from "../actions/user";

const FollowButton = ({ post }) => {
    const { me , followLoading , unFollowLoading} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
    const onFollow = useCallback(() => {
        if(isFollowing){
            dispatch(unFollowUser(post.User.id)); 
            // post.User.id = data
        } else{
            dispatch(followUser(post.User.id));
        }
    }, [isFollowing]);

    return(
        <>
            <Button loading={followLoading || unFollowLoading} onClick={onFollow}>
                {isFollowing ? '언팔로우' : '팔로우'}
            </Button>
        </>
    );
};

FollowButton.propTypes = {
    post : PropTypes.object.isRequired,
};

export default FollowButton;