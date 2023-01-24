import {useEffect} from 'react';

import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { loadPost } from "../actions/post";

import { useSelector , useDispatch } from 'react-redux';

const userSelector = (state) => state.user;
const postSelector = (state) => state.post;

const Home = () => {
    const { me } = useSelector(userSelector);
    const { mainPosts , hasMorePosts , loadPostsLoading } = useSelector(postSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        function onScroll(){
            console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
            if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
                if(hasMorePosts && !loadPostsLoading){
                    dispatch(loadPost(10));
                    console.log(loadPostsLoading);
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [hasMorePosts , loadPostsLoading])

    return(
        <AppLayout>
            {/* AppLayout으로 감싼 부분 = children -> components에 children*/}
            {console.log(mainPosts.map((post, i) => post ))}
            {me && <PostForm />}
            {mainPosts.map((post, i) => <PostCard key={post.id} post={post}/>)}
        </AppLayout>
    )
}

export default Home;