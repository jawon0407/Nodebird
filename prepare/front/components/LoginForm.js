import React , { useState , useCallback , useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector , useDispatch } from 'react-redux';
import { Form , Input , Button } from 'antd';
import Link from 'next/link';
import Router from 'next/router';
import useInput from './hooks/useInput';
import { logIn } from '../actions/user';

const LoginForm = ({ setIsLoggedIn }) => {
    const { me , logInLoading , logInError } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');

    const onSubmitForm = useCallback((e) => {
        console.log(email, password);
        dispatch(logIn({
            email, 
            password
        }));
    },[email, password]);
    
    useEffect(() => {
        if(logInError){
            alert(logInError);
        }
    },[logInError]);

    return(
        <>
            <Form className="!p-3" onFinish={onSubmitForm}>
                <div>
                    <label htmlFor="user-email">이메일</label>
                    <br />
                    <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br />
                    <Input name="user-password" type="password" value={password} onChange={onChangePassword} required />
                </div>
                <div className="mt-8 text-right space-x-2">
                    <Button type="primary" htmlType="submit" loading={logInLoading}>로그인</Button>
                    <Link href="/signup"><button>회원가입</button></Link>
                </div>
            </Form>
        </>
    );
};

// LoginForm.propTypes = {
//     onSubmitForm : PropTypes.func.isRequired,
// }

export default LoginForm;