import React , { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Card , Avatar } from 'antd';
import { useSelector , useDispatch } from 'react-redux';

import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/PostCard";
import wrapper from '../../store/configureStore';

import { loadMyInfo , loadUser } from "../../actions/user";
import { loadUserPosts } from "../../actions/post";

const userSelector = (state) => state.user;
const postSelector = (state) => state.post;

const userProfile = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { me , userInfo } = useSelector(userSelector);
    const { mainPosts , hasMorePosts , loadPostsLoading , retweetError , likePostError } = useSelector(postSelector);
    const { id } = router.query;

    useEffect(() => {
        if(likePostError){
            alert(likePostError);
        }
    }, [likePostError]);

    useEffect(() => {
        if(retweetError){
            alert(retweetError);
        }
    },[retweetError]);

    useEffect(() => {
        function onScroll(){
            if(hasMorePosts && !loadPostsLoading){
                if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
                    const lastId = mainPosts[mainPosts.length - 1]?.id;
                    if(hasMorePosts && !loadPostsLoading){
                        dispatch(loadUserPosts({lastId, userId : id}));
                    }
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [mainPosts.length , hasMorePosts , id , loadPostsLoading]);
    return(
        <AppLayout>
            {userInfo && (
                <Head>
                    <title>
                        {userInfo.nickname} 님의 글
                    </title>
                    <meta property="og:url" content={`https://localhost:3000/post/${id}`} />
                    <meta name="description" content={`${userInfo.nickname}님의 게시글`} />
                    <meta property="og:title" content={`${userInfo.nickname}님의 게시글`} />
                    <meta property="og:description" content={`${userInfo.nickname}님의 게시글`} />
                    <meta property="og:image" content="https://localhost:3000/favicon.ico" />
                    <meta property="og:url" content={`https://localhost:3000/user/${id}/posts`} />
                </Head>
            )}
            {userInfo && (userInfo.id !== me?.id)
                ? (
                <div style={{marginBottom: 20 , width: "100%"}}>
                    <Card
                    actions={[
                        <div key="twit">
                        짹짹
                        <br />
                        {userInfo.Posts.length}
                        </div>,
                        <div key="following">
                        팔로잉
                        <br />
                        {userInfo.Followings.length}
                        </div>,
                        <div key="follower">
                        팔로워
                        <br />
                        {userInfo.Followers.length}
                        </div>,
                    ]}
                    >
                    <Card.Meta
                        avatar={(
                        <Link href={`/user/${userInfo.id}`}>
                            <Avatar>{userInfo.nickname[0]}</Avatar>
                        </Link>
                        )}
                        title={userInfo.nickname}
                    />
                    </Card>
                </div>
                )
                : null}
            {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
        </AppLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req , params}) => {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';    
    if(req && cookie){
        axios.defaults.headers.Cookie = cookie;
    }
    await store.dispatch(loadUser({userId : params.id}));
    await store.dispatch(loadUserPosts({userId : params.id}));
    await store.dispatch(loadMyInfo());
});

export default userProfile;