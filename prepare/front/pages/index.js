import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

import { useSelector , useDispatch } from 'react-redux';

const userSelector = (state) => state.user;
const postSelector = (state) => state.post;

const Home = () => {
    const { me } = useSelector(userSelector);
    const { mainPosts } = useSelector(postSelector);
    const dispatch = useDispatch();

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