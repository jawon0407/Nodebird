import React , { useCallback , useState , useEffect } from 'react';
//nextJS 에서는 안써도 되는데, 일단 써놓자.
import { Form , Input , Checkbox , Button } from 'antd';
import Head from 'next/head';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import useInput from '../components/hooks/useInput';
import { useSelector, useDispatch } from 'react-redux';
import { signUp } from '../actions/user';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { loadMyInfo } from '../actions/user';
import { loadPosts } from '../actions/post';

const SignUp = () => {
    const dispatch = useDispatch();
    const { me , signUpAction , signUpLoading , signUpDone , signUpError } = useSelector((state) => state.user);

    const [email, onChangeEmail] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    
    const [password, onChangePassword] = useInput('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    },[password]);

    const [term, setTerm] = useState(false);
    const [termError, setTermError] = useState(false);
    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked);
        setTermError(false);
    },[]);

    const onSubmit = useCallback(() => {
        if(password !== passwordCheck){
            return setPasswordError(true);
        }
        if(!term){
            return setTermError(true);
        }
        console.log(email, nickname, password);
        dispatch(signUp({
            email, nickname, password
        }))
    },[email, password, passwordCheck, term])

    
    useEffect(()=>{
        if(me && me.id){
            Router.replace('/');
            //push -> 이전 페이지가 남아있음
            //replace -> 이전 페이지가 사라짐
        }
    },[me && me.id]);

    useEffect(() => {
        if(signUpDone){
            if(!signUpLoading){
                alert(`회원가입이 정상적으로 처리되었습니다.`);
                Router.replace('/');
            }
        }
    },[signUpAction, signUpDone]);

    useEffect(() => {
        if(signUpError){
            console.log(signUpError);
            alert(signUpError);
        }
    },[signUpError]);

    return(
        <>
            <AppLayout>
                <Head>
                    <title>회원가입 | NodeBird</title>
                </Head>  
                <Form onFinish={onSubmit}>
                    <div>
                        <label htmlFor="user-email">이메일</label>
                        <br />
                        <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required />
                    </div>
                    <div>
                        <label htmlFor="user-nickname">닉네임</label>
                        <br />
                        <Input name="user-nickname" value={nickname} onChange={onChangeNickname} required />
                    </div>
                    <div>
                        <label htmlFor="user-password">패스워드</label>
                        <br />
                        <Input name="user-password" type="password" value={password} onChange={onChangePassword} required />
                    </div>
                    <div>
                        <label htmlFor="user-password-check">비밀번호확인</label>
                        <br />
                        <Input name="user-password-check" type="password" value={passwordCheck} onChange={onChangePasswordCheck} required />
                        {passwordError && <div className="text-red-500">비밀번호가 일치하지 않습니다.</div>}
                    </div>
                    <div>
                        <Checkbox name ="user-term" checked={term} onChange={onChangeTerm}>
                            말을 잘 들을 것을 동의합니다.
                            {termError && <div className="text-red-500">약관에 동의하셔야 합니다.</div>}
                        </Checkbox>
                    </div>
                    <div className="mt-8 text-right space-x-2">
                        {console.log(signUpLoading)}
                        <Button type="primary" htmlType="submit" loading={signUpLoading}>가입하기</Button>
                    </div>
                </Form>
            </AppLayout>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req}) => {
    //SSR은 프론트 서버에서 실행되기 때문에, 쿠키를 직접 넣어줘야 한다.
    const cookie = req ? req.headers.cookie : '';
    //쿠키를 사용하지 않는다면 쿠키를 비워준다 -> 쿠키가 남아있으면 다른 사용자의 정보를 가져올 수 있다.
    axios.defaults.headers.Cookie = '';
    //쿠키가 있다면 쿠키를 넣어준다.
    if(req && cookie){
        axios.defaults.headers.Cookie = cookie;
    }
    await store.dispatch(loadMyInfo());
    await store.dispatch(loadPosts());
})

export default SignUp;