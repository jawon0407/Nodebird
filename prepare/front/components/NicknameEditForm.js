import React , { useCallback } from 'react';
import { Form, Input } from 'antd';
import { changeNickname } from '../actions/user'; 
import { useSelector , useDispatch } from 'react-redux';
import useInput from './hooks/useInput';

const NicknameEditForm = () => {
    const { me } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [nickname , onChangeNickname] = useInput(me?.nickname || '');
    const onSubmit = useCallback(() => {
        dispatch(changeNickname({nickname : nickname}));
    },[nickname]);
    
    return(
        <>
            <Form className="!mb-5 border !p-5" onFinish={onSubmit}>
                <Input.Search
                    value={nickname}
                    onChange={onChangeNickname} 
                    addonBefore="닉네임"
                    enterButton="수정" 
                    onSearch={onSubmit}
                />
            </Form>
        </>
    )
}

export default NicknameEditForm;