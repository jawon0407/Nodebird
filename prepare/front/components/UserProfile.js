import React, { useCallback } from 'react';
import Link from 'next/link';
import { Card , Avatar , Button } from 'antd';
import { useSelector , useDispatch } from 'react-redux';
import { logOut } from '../actions/user' ;

const UserProfile = () => {
    const dispatch = useDispatch();
    const { logoutLoading , me } = useSelector((state) => state.user);
    const email = me?.email;
    const avatarText = email?.split("@")[0].slice(0,1).toUpperCase();
    const onLogOut = useCallback(() => {
        dispatch(logOut());
    },[])

    return(
        <>
            <Card
                actions={[
                    <div key="twit">짹짹<br />{me?.Posts?.length}</div>,
                    <div key="followings">팔로잉<br />{me?.Followings?.length}</div>,
                    <div key="followers">팔로워<br />{me?.Followers?.length}</div>
                ]}
            >
                <Card.Meta 
                    avatar = {<Avatar>{avatarText}</Avatar>}
                    title = {email?.split("@")[0]}             
                />
                <Button className="mt-4" onClick={onLogOut} loading={logoutLoading}>로그아웃</Button>
            </Card>
        </>
    )
}

export default UserProfile;