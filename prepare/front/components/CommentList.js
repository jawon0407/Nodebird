import React, {useCallback} from 'react';
import Link from 'next/link';
import { useSelector , useDispatch} from 'react-redux';
import { Popover , Avatar , Comment , Button  } from 'antd';
import { RetweetOutlined , HeartOutlined , HeartTwoTone , EllipsisOutlined } from '@ant-design/icons';
import { likeComment , unLikeComment , removeComment , retweetComment } from '../actions/post';

const userSelector = (state) => state.user;
const postSelector = (state) => state.post;

const CommentList = ({ item , post , LoginConfirm }) => {
    const dispatch = useDispatch();
    const { me } = useSelector(userSelector);
    const { mainPosts } = useSelector(postSelector);
    const id = me?.id;
    const comment = post.Comments.find((v) => v.id === item.id);
    const liked = comment.CommentLikers.find((v) => v.id === id);

    console.log(comment);

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
    
    const onRetweetComment = useCallback(() => {
        LoginConfirm();
        dispatch(retweetComment({commentId : item.id , postId : post.id}));
    },[me, mainPosts]);

    return(
        <>
            <Comment
                author = {item.User.nickname}
                avatar = {
                    <Link href={`/user/${item.User.id}`}>
                        <Avatar>{item.User.nickname[0]}</Avatar>
                    </Link>
                }
                content = {item.content}
                actions = {[
                    <RetweetOutlined key="retweet" onClick={onRetweetComment}/>,
                    liked 
                    ? <HeartTwoTone twoToneColor='#eb2f96' key='heart' onClick={onUnLikeComment}/> 
                    : <HeartOutlined key="heart" onClick={onLikeComment}/>,
                    <Popover key="more" content={(
                        <Button.Group>
                            { id === comment.User.id ? (
                                <>
                                    <Button>수정</Button>
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
        </>
    );
};

export default CommentList;