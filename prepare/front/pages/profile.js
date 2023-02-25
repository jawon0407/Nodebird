import React, { useEffect , useCallback , useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import wrapper from '../store/configureStore';
import { loadMyInfo } from '../actions/user';
import { loadPosts } from '../actions/post';

const userSelector = (state) => state.user;

const Profile = () => {
    const { me } = useSelector(userSelector);

    useEffect(() => {
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
                <NicknameEditForm className="w-full"/>
                <FollowList header="팔로잉 목록" data={me?.Followings} className="w-full"/>
                <FollowList header="팔로워 목록" data={me?.Followers} className="w-full"/>
            </AppLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req}) => {
    // SSR은 프론트 서버에서 실행되기 때문에, 쿠키를 직접 넣어줘야 한다.
    const cookie = req ? req.headers.cookie : '';
    // 쿠키를 사용하지 않는다면 쿠키를 비워준다 -> 쿠키가 남아있으면 다른 사용자의 정보를 가져올 수 있다.
    axios.defaults.headers.Cookie = '';
    // 쿠키가 있다면 쿠키를 넣어준다.
    if(req && cookie){
        axios.defaults.headers.Cookie = cookie;
    }
    await store.dispatch(loadMyInfo());
    await store.dispatch(loadPosts());
});

export default Profile;