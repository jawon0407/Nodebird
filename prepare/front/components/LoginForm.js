import React , { useState , useCallback } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { logIn } from '../actions/user';
import { Form , Input , Button } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import useInput from './hooks/useInput';

const LoginForm = ({ setIsLoggedIn }) => {
    const { me , loginLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');

    const onSubmitForm = useCallback((e) => {
        console.log(email, password);
        dispatch(logIn({
            email, 
            password,
            Posts:[],
            Followings:[],
            Followers:[],
        }));
    },[email, password])

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
                    <Button type="primary" htmlType="submit" loading={loginLoading}>로그인</Button>
                    <Link href="/signup"><button>회원가입</button></Link>
                </div>
            </Form>
        </>
    )
}

// LoginForm.propTypes = {
//     onSubmitForm : PropTypes.func.isRequired,
// }

export default LoginForm;