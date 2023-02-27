import React, { useCallback } from 'react';
import Link from 'next/link';
import { Card , Avatar , Button } from 'antd';
import { useSelector , useDispatch } from 'react-redux';
import { logOut } from '../actions/user' ;

const UserProfile = () => {
    const dispatch = useDispatch();
    const { logoutLoading , me } = useSelector((state) => state.user);
    const nickname = me?.nickname;
    const avatarText = nickname?.split("")[0];
    const onLogOut = useCallback(() => {
        dispatch(logOut());
    },[]);

    return(
        <>
            <Card
                actions={[
                    <div key="twit">
                        <Link href={`/user/${me.id}`}>
                            짹짹<br />{me?.Posts?.length}
                        </Link>                    
                    </div>,
                    <div key="followings">
                        <Link href={`/profile`}>
                            팔로잉<br />{me?.Followings?.length}
                        </Link>                    
                    </div>,
                    <div key="followers">
                        <Link href={`/profile`}>
                            팔로워<br />{me?.Followers?.length}
                        </Link>               
                    </div>
                ]}
            >
                <Card.Meta
                    avatar = {
                        <Link href={`/user/${me.id}`} prefetch={false}>
                            <Avatar>{avatarText}</Avatar>
                        </Link>
                    }
                    title = {nickname}             
                />
                <Button className="mt-4" onClick={onLogOut} loading={logoutLoading}>로그아웃</Button>
            </Card>
        </>
    );
};

export default UserProfile;