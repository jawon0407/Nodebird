import React , { useRef , useState , useCallback , useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { Form , Input , Button } from 'antd';
import postSlice from '../reducers/postSlice';
import { addPost , uploadImages } from '../actions/post';
import useInput from './hooks/useInput'; 


const postSelector = (state) => state.post;

const PostForm = () => {
    const dispatch = useDispatch();
    const { imagePaths , addPostDone } = useSelector(postSelector);
    const [text, onChangeText , setText] = useInput('');
    const onSubmit = useCallback(() => {
        if(!text || !text.trim()){
            alert('게시글을 작성하세요.');
            return;
        }
        const formData = new FormData();
        imagePaths.forEach((p) => {
            formData.append('image', p);
        });
        formData.append('content', text);
        console.log(formData);
        dispatch(addPost(formData));
    },[text , imagePaths]);


    useEffect(() => {
        if(addPostDone){
            setText('');
        }
    }, [addPostDone]);

    const imageInput = useRef();

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    },[imageInput.current]);

    const onChangeImages = useCallback((e) => {
        console.log(e.target.files);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f);
            //  append(키, 값) -> upload.array()의 인자와 같아야 인식함. 
        });
        dispatch(uploadImages(imageFormData));    
    },[]);

    const onRemoveImage = useCallback((index) => () => {
        dispatch(
            postSlice.actions.removeImage(index)
        );
    },[]);


    return(
        <>
            <Form style={{margin : '10px 0 20px' , width: '100%'}} encType="multipart/form-data" onFinish={onSubmit}>
                <Input.TextArea
                    value={text}
                    onChange={onChangeText}
                    maxLength={140}
                    placeholder="어떤 신기한 일이 있었나요?"
                />
                <div>
                    <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
                    <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                    <Button type="primary" style={{float : 'right'}} htmlType="submit">짹짹</Button>
                </div>
                <div>
                    {imagePaths.map((v , i) => { return (
                            <div key={v} style={{display: 'inline-block'}}>
                                <img src={`http://localhost:7777/${v}`} style={{width:'288px'}} alt={v} />
                                <div>
                                    <Button onClick={onRemoveImage(i)}>제거</Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Form>
        </>
    );
};

export default PostForm;