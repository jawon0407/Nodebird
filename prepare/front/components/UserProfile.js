import React, { useCallback } from 'react';
import Link from 'next/link';
import { Card , Avatar , Button } from 'antd';
import { useSelector , useDispatch } from 'react-redux';
import { logOut } from '../actions/user' ;

const UserProfile = () => {
    const dispatch = useDispatch();
    const { logoutLoading , me } = useSelector((state) => state.user);

    const onLogOut = useCallback(() => {
        const { me } = useSelector((state) => state.user);
        dispatch(logOut());
    },[])

    return(
        <>
            <Card
                actions={[
                    <div key="twit">짹짹<br />0</div>,
                    <div key="followings">팔로잉<br />0</div>,
                    <div key="followers">팔로워<br />0</div>,
                ]}
            >
                <Card.Meta 
                    avatar = {<Avatar>JW</Avatar>}
                    title = {me.id}             
                />
                <Button className="mt-4" onClick={onLogOut}>로그아웃</Button>
            </Card>
        </>
    )
}

export default UserProfile;