import React , { useRef , useState , useCallback , useEffect } from 'react';
import { Form , Input , Button } from 'antd';

import { useSelector , useDispatch } from 'react-redux';
import { addPost } from '../actions/post';
import useInput from './hooks/useInput';
import userSlice from '../reducers/userSlice';

import shortid from 'shortid';  

const postSelector = (state) => state.post

const PostForm = () => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const email = me?.email;
    const { imagePaths , addPostDone } = useSelector(postSelector);
    const [text, onChangeText , setText] = useInput('');
    const onSubmit = useCallback(() => {
        dispatch(addPost({
            id: shortid.generate(),
            content: text,
            User: {
                id: 1,
                nickname: email.split("@")[0]
            },
            Images : [],
            Comments : [],
            Like : [],
            Retweet : [],
        }))
    },[text , imagePaths, email])

    useEffect(() => {
        if(addPostDone){
            setText('');
        }
    }, [addPostDone])

    const imageInput = useRef();
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    },[imageInput.current])

    return(
        <>
            <Form style={{margin : '10px 0 20px'}} encType="multipart/form-data" onFinish={onSubmit}>
                <Input.TextArea
                    value={text}
                    onChange={onChangeText}
                    maxLength={140}
                    placeholder="어떤 신기한 일이 있었나요?"
                />
                <div>
                    <input type="file" multiple hidden ref={imageInput} />
                    <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                    <Button type="primary" style={{float : 'right'}} htmlType="submit" loading={false}>짹짹</Button>
                </div>
                <div>
                    {
                        imagePaths.map((v) => {
                            <div key={v} className="inline-block">
                                <img src={v} className="w-48" alt={v} />
                                <div>
                                    <Button>제거</Button>
                                </div>
                            </div>
                        })
                    }
                </div>
            </Form>
        </>
    )
}

export default PostForm;