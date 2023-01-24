import React, { useEffect } from 'react';
//nextJS 에서는 안써도 되는데, 일단 써놓자.
import Head from 'next/head';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { useSelector } from 'react-redux';

const userSelector = (state) => state.user;

const Profile = () => {
    const { me } = useSelector(userSelector);
    
    useEffect(()=>{
        if(!(me && me.id)){
            alert('로그인이 필요합니다.');
            Router.push('/');
        }
    },[me && me.id]);

    if(!me){
        return null;
    }

    return(
        <>
            <AppLayout>
                <Head>
                    <title>내 프로필 | NodeBird</title>
                </Head>  
                <NicknameEditForm />
                <FollowList header="팔로잉 목록" data={me?.Followings}/>
                <FollowList header="팔로워 목록" data={me?.Followers}/>
            </AppLayout>
        </>
    )
}

export default Profile;