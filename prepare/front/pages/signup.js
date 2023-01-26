import React , { useCallback , useState , useEffect } from 'react';
//nextJS 에서는 안써도 되는데, 일단 써놓자.
import { Form , Input , Checkbox , Button } from 'antd';
import Head from 'next/head';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import useInput from '../components/hooks/useInput';
import { useSelector, useDispatch } from 'react-redux';
import { signUp } from '../actions/user';

const SignUp = () => {
    const dispatch = useDispatch();
    const { signUpAction , signUpLoading , signUpDone , signUpError } = useSelector((state) => state.user);

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

    useEffect(() => {
        if(signUpAction){
            if(signUpDone){
                Router.push('/');
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

export default SignUp;