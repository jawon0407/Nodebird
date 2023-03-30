import React, { useEffect , useCallback , useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useSelector , useDispatch } from 'react-redux';
import axios from 'axios';
import useSWR from 'swr';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import wrapper from '../store/configureStore';
import { loadPosts } from '../actions/post';
import { loadMyInfo } from '../actions/user';

const fetcher = (url) => axios.get(url , { withCrendentials : true }).then((result) => result.data);
const userSelector = (state) => state.user;

const Profile = () => {
    const { me } = useSelector(userSelector);
    const [followingsLimit , setFollowingsLimit] = useState(3);
    const [followersLimit , setFollowersLimit] = useState(3);

    //data , error 가 없으면 로딩중이다
    const { data : followingsData , error : followingError } = useSWR(`http://localhost:7777/user/followings?limit=${followingsLimit}`, fetcher);
    const { data : followersData , error : followerError } = useSWR(`http://localhost:7777/user/followers?limit=${followersLimit}`, fetcher);
    
    useEffect(() => {
        if(!(me && me.id)){
            alert('로그인이 필요합니다.');
            Router.push('/');
        }
    },[me && me.id]);
    
    const loadMoreFollowings = useCallback(() => {
        setFollowingsLimit((prev) => prev + 3);
    },[]);

    const loadMoreFollowers = useCallback(() => {
        setFollowersLimit((prev) => prev + 3);
    },[]);

    if(!me){
        return '내 정보 로딩 중...';
    }
    
    if(followerError || followingError){
        console.error(followerError || followingError);
        return '팔로잉/팔로워 로딩 중 에러가 발생했습니다.';
    }

    return(
        <>
            <Head>
                <title>내 프로필 | NodeBird</title>
            </Head>  
            <AppLayout>
                <NicknameEditForm className="w-full"/>
                <FollowList header="팔로잉 목록" data={followingsData} onClickMore={loadMoreFollowings} loading={!followingsData && !followingError} className="w-full"/>
                <FollowList header="팔로워 목록" data={followersData} onClickMore={loadMoreFollowers} loading={!followersData && !followerError} className="w-full"/>
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