import React , { useState , useCallback } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { logIn } from '../actions/user';
import { Form , Input , Button } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import useInput from './hooks/useInput';

const LoginForm = ({ setIsLoggedIn }) => {
    const { me } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');

    const onSubmitForm = useCallback((e) => {
        console.log(id, password);
        dispatch(logIn({id, password}));
    },[id, password])

    return(
        <>
            <Form className="!p-3" onFinish={onSubmitForm}>
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <br />
                    <Input name="user-id" value={id} onChange={onChangeId} required />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br />
                    <Input name="user-password" type="password" value={password} onChange={onChangePassword} required />
                </div>
                <div className="mt-8 text-right space-x-2">
                    <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
                    <Link href="/signup"><button>회원가입</button></Link>
                </div>
            </Form>
        </>
    )
}

LoginForm.propTypes = {
    setIsLoggedIn : PropTypes.func.isRequired,
}

export default LoginForm;