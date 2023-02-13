import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector , useDispatch } from 'react-redux';
import 'antd/dist/antd.css';
// import wrapper from '../store/configureStore';
import AppLayout from '../../components/AppLayout'
// import { loadUserInfo } from '../../actions/user';

const User = ({ Component }) => {
    const router = useRouter();
    const { nickname } = router.query
    const { userInfo } = useSelector((state) => state.user);

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                {/* <title>{singleUser.User.nickname}님의 프로필</title> */}
                {/* og : 미리보기 시 나오는 화면 설정 */}
                {/* <meta property="og:title" content={`${singleUser.User.nickname}님의 게시글`} />
                <meta property="og:description" content={singleUser.content} />
                <meta property="og:image" content={singleUser.Images[0] ? singleUser.Images[0].src : 'https://nodebird.com/favicon.ico'}/>
                <meta property="og:url" content={`https://nodebird.com/post/${id}`} /> */}
            </Head>
            <AppLayout>
                {nickname}
            </AppLayout>
        </>
    )
}

// export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req , params }) => {
//     const cookie = req ? req.headers.cookie : '';
//     if(req && cookie){
//         axios.defaults.headers.Cookie = cookie;
//     }
//     await store.dispatch(loadUserInfo(params.nickname));
// })

export default User