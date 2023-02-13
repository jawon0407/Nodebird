// post/[id].js
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import wrapper from '../../store/configureStore';
import Head from 'next/head';

import { useSelector, useDispatch } from 'react-redux';
import { loadMyInfo } from '../../actions/user';
import { loadPost } from '../../actions/post';

import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';

const Post = () => {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch();
    const { singlePost } = useSelector((state) => state.post);

    useEffect(() => {
        if(id){
            dispatch(loadPost(id));
        }
    }, [])

    return ( 
        <AppLayout>
            <Head>
                <title>{singlePost.User.nickname}님의 글</title>
                <meta name="description" content={singlePost.content} />
                {/* og : 미리보기 시 나오는 화면 설정 */}
                <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
                <meta property="og:description" content={singlePost.content} />
                <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : 'https://nodebird.com/favicon.ico'}/>
                <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
            </Head>
            <PostCard post={singlePost} />
        </AppLayout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async({ req , params }) => {
    const cookie = req ? req.headers.cookie : '';
    console.log(req);
    axios.defaults.headers.Cookie = '';
    if(req && cookie){
        axios.defaults.headers.Cookie = cookie;
    }
    console.log('getServerSideProps start');
    await store.dispatch(loadMyInfo());
    await store.dispatch(loadPost(params.id));
})

export default Post;