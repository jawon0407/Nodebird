import React, { useCallback , useState , useEffect, use } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useSelector , useDispatch} from 'react-redux';
import { Popover , Avatar , Comment , Button , Input  } from 'antd';
import { HeartOutlined , HeartTwoTone , EllipsisOutlined } from '@ant-design/icons';
import { likeComment , unLikeComment , removeComment , editComment } from '../actions/post';
import Elaspe from './Elaspe';

const userSelector = (state) => state.user;
const postSelector = (state) => state.post;

const { TextArea } = Input;

const CommentList = ({ item , post , LoginConfirm }) => {
    const dispatch = useDispatch();
    const { me } = useSelector(userSelector);
    const { mainPosts , editCommentLoading , editCommentDone , editCommentError } = useSelector(postSelector);
    const id = me?.id;
    const comment = post.Comments.find((v) => v.id === item.id);
    const liked = comment.CommentLikers.find((v) => v.id === id);
    const [ editCommentMode , setEditCommentMode ] = useState(false);
    const [ editCommentText, setEditCommentText ] = useState(item.content);
    
    const onLikeComment = useCallback(() => {
        LoginConfirm();
        // 해당 댓글의 id를 찾아서 likeComment에 넘겨준다.
        dispatch(likeComment({commentId : item.id , postId : post.id}));
    },[me, mainPosts]);
    
    const onUnLikeComment = useCallback(() => {
        LoginConfirm();
        dispatch(unLikeComment({commentId : item.id , postId : post.id}));
    },[me, mainPosts]);
    
    const onRemoveComment = useCallback(() => {
        LoginConfirm();
        dispatch(removeComment({commentId : item.id , postId : post.id}));
    },[me, mainPosts]);

    const onEditComment = useCallback(() => {
        LoginConfirm();
        setEditCommentMode(true);
    });

    const onChangeComment = useCallback((editCommentText) => () => {
        dispatch(editComment({commentId : item.id , postId : post.id , content : editCommentText}));
    });

    const onChangeCommentText = useCallback((e) => {
        setEditCommentText(e.target.value);
    },[editCommentText]);

    const onCancelEditComment = useCallback(() => {
        setEditCommentMode(false);
    },[]);

    useEffect(() => {
        if(editCommentDone){
            onCancelEditComment();
            alert('댓글이 정상적으로 수정되었습니다.');
            Router.replace('/');
            return;
        }
        if(editCommentError){
            alert('댓글 수정에 실패했습니다.');
        }
    },[editCommentDone, editCommentError]);

    return(
        <>
            <Comment
                author = {item.User.nickname}
                avatar = {
                    <Link href={`/user/${item.User.id}`}>
                        <Avatar>{item.User.nickname[0]}</Avatar>
                    </Link>
                }
                content = {
                    editCommentMode
                        ?   <>
                                <TextArea value={editCommentText} onChange={onChangeCommentText} />
                                <Button type="primary" onClick={onChangeComment(editCommentText)} loading={editCommentLoading}>수정</Button>
                                <Button type="danger" onClick={onCancelEditComment}>취소</Button>
                            </>
                        :   item.content
                }
                actions = {[
                    liked 
                    ? <HeartTwoTone twoToneColor='#eb2f96' key='heart' onClick={onUnLikeComment}/> 
                    : <HeartOutlined key="heart" onClick={onLikeComment}/>,
                    <Popover key="more" content={(
                        <Button.Group>
                            { id === comment.User.id ? (
                                <>
                                    <Button onClick={onEditComment}>수정</Button>
                                    <Button type="danger" onClick={onRemoveComment}>삭제</Button>
                                    <Button>신고</Button>
                                </>
                            ) : <Button>신고</Button> }
                        </Button.Group>
                    )}>
                        <EllipsisOutlined />
                    </Popover>
                ]}
                />
                < Elaspe item={item} />
        </>
    );
};



export default CommentList;