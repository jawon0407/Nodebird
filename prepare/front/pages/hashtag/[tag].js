import React , { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSelector , useDispatch } from 'react-redux';

import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/PostCard";
import wrapper from '../../store/configureStore';

import { loadMyInfo } from "../../actions/user";
import { loadHashtagPosts } from "../../actions/post";

const userSelector = (state) => state.user;
const postSelector = (state) => state.post;

const Hashtag = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { me , userInfo } = useSelector(userSelector);
    const { mainPosts , hasMorePosts , loadPostsLoading , retweetError , likePostError } = useSelector(postSelector);
    const { tag } = router.query;

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
            const lastId = mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1]?.id;
            if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
                if(hasMorePosts && !loadPostsLoading){
                    dispatch(loadHashtagPosts({lastId, hashtag : tag}));
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [mainPosts.length, hasMorePosts , tag , loadPostsLoading]);

    return(
        <AppLayout>
             <head>
                <title>{tag}에 대한 게시물</title>
                <meta property="og:title" content={`${tag}`} />
                <meta property="og:description" content={`${tag}에 대한 게시물`} />
                <meta property="og:image" content="https://localhost:3000/favicon.ico" />
                <meta property="og:url" content={`https://localhost:3000/hashtag/${tag}`} />
             </head>
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
    console.log(params);
    await store.dispatch(loadMyInfo());
    await store.dispatch(loadHashtagPosts({hashtag : params.tag}));
});

export default Hashtag;