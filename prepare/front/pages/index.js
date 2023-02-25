import React , {useEffect} from 'react';
import { useSelector , useDispatch } from 'react-redux';
import axios from 'axios';
import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { loadMyInfo } from "../actions/user";
import { loadPosts } from "../actions/post";
import wrapper from '../store/configureStore';

const userSelector = (state) => state.user;
const postSelector = (state) => state.post;

const Home = () => {
    const { me } = useSelector(userSelector);
    const { 
        removePostLoading , removePostDone , mainPosts , hasMorePosts , 
        loadPostsLoading , retweetDone , retweetError , likePostError
    } = useSelector(postSelector);
    const dispatch = useDispatch();

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
        if(removePostDone && !removePostLoading){
            dispatch(loadMyInfo());
            dispatch(loadPosts());
        }
    },[removePostLoading, removePostDone]);

    useEffect(() => {
        if(retweetDone){
            dispatch(loadMyInfo());
            dispatch(loadPosts());
        }
    },[retweetDone]);


    useEffect(() => {
        function onScroll(){
            const lastId = mainPosts[mainPosts.length - 1]?.id;
            if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
                console.log(window.scrollY + document.documentElement.clientHeight);
                if(hasMorePosts && !loadPostsLoading){
                    dispatch(loadPosts(lastId));
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMorePosts , loadPostsLoading]);

    return(
        <AppLayout>
            {me && <PostForm />}
            {mainPosts.map((post, i) => <PostCard key={post.id} post={post}/>)}
        </AppLayout>
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

/* 
    getServerSideProps vs getStaticProps
    getServerSideProps : 매 요청마다 실행 -> 매번 새로운 데이터를 가져옴 -> 데이터의 변화를 실시간으로 반영할 수 있음 -> 데이터가 자주 바뀌는 경우에 사용
    getStaticProps : 빌드 시점에 실행 -> 빌드 시점에 데이터를 가져옴 -> 미리 html파일을 만들기 때문에 빠름 but 데이터가 바뀐것들을 적용하려면 빌드를 다시 해야하기(html파일을 다시 만들어야함) 때문에 데이터가 자주 바뀌는 경우에는 사용하지 않는 것이 좋음
*/

export default Home;