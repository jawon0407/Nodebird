import React, { useState , useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux'; 
import { Input , Button } from 'antd';
import PropTypes from 'prop-types';

// 첫 번째 게시글 #해시태그 #익스프레스#안녕
// regexr.com
/*
/#[^\s#]+/g
1. // 사이에 정규표현식을 넣는다
2. 맨 뒤에 g를 붙이면 여러개 전부 선택한다.
3. # 을 선택한다
4. . 한글자
5. + 뒤로 전부 선택
6. [] 안에 들어간것을 선택
7. [^] 안에 ^이 들어가면 들어간것 제외
8. \s 는 공백을 표현
9 #은 #을 연달아 쓰는경우 나누기 위해
*/

const { TextArea } = Input;
const PostCardContent = ({ postData , editMode , onCancelEdit , onChangePost }) => {
    const [editText, setEditText] = useState(postData);
    const { editPostLoading , editPostDone } = useSelector((state) => state.post);
    
    useEffect(() => {
        if(editPostDone){
            onCancelEdit();
        }
    },[editPostDone])

    const onChangePostText = useCallback((e) => {
        setEditText(e.target.value);
    });

    return(
        <>
            {editMode 
                ? (
                    <>
                        <TextArea value={editText} onChange={onChangePostText}/>
                        <Button.Group>
                            <Button type="primary" loading={editPostLoading} onClick={onChangePost(editText)}>수정</Button>
                            <Button type="danger" onClick={onCancelEdit}>취소</Button>
                        </Button.Group>
                    </>
                )
                : postData.split(/(#[^\s#]+)/g).map((v, i) => {
                    if(v.match(/(#[^\s#]+)/)) {
                        return (
                            <Link href={`/hashtag/${v.slice(1)}`} key={i}>
                                {v}
                            </Link>
                        );
                    }
                return v;
                })
            }
        </>
    );
};

PostCardContent.propTypes = {
    postData : PropTypes.string.isRequired,
    onCancelEdit : PropTypes.func.isRequired,
    onChangePost : PropTypes.func.isRequired,
    editMode : PropTypes.bool,
};

PostCardContent.defaultProps = {
    editMode : false,
}

export default PostCardContent;