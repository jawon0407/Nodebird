import React , {useState , useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector , useDispatch } from 'react-redux';
import { Card , Popover , Button , Avatar , List , Comment } from 'antd';
import { EllipsisOutlined , MessageOutlined , RetweetOutlined , HeartOutlined , HeartTwoTone } from '@ant-design/icons';

import CommentList from './CommentList';
import Elaspe from './Elaspe';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import FollowButton from './FollowButton';
import PostCardContent from './PostCardContent';
import LikeUserModal from './LikeUserModal';
import LikeUser from './LikeUser';
import { 
    likePost , unLikePost , removePost , retweetPost , editPost 
} from '../actions/post';

const userSelector = (state) => state.user;
const postSelector = (state) => state.post;

const PostCard = ({ post }) => {
    const dispatch = useDispatch();
    const { me } = useSelector(userSelector);
    const { mainPosts } = useSelector(postSelector);
    const nickname = me?.nickname;
    const id = me?.id;
    const [commentFormOpened , setCommentFormOpened] = useState(false);
    const [modalOpened , setModalOpened] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const liked = post.Likers.find((v) => v.id === id);

    const LoginConfirm = useCallback(() => {
        if(!id){
            alert('로그인이 필요합니다.');
            return;
        }
    },[]);

    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
    },[]);

    // -- Post --

    const onLikePost = useCallback(() => {
        LoginConfirm();
        dispatch(likePost(post.id));
    },[me, mainPosts]);
    
    const onUnLikePost = useCallback(() => {
        LoginConfirm();
        dispatch(unLikePost(post.id));
    },[me, mainPosts]);
    
    const onRemovePost = useCallback(() => {
        LoginConfirm();
        dispatch(removePost(post.id));
    },[me, mainPosts]);
    
    const onRetweetPost = useCallback(() => {
        LoginConfirm();
        dispatch(retweetPost(post.id));
    },[me, mainPosts]);

    const onRetweetCancel = useCallback(() => {
        LoginConfirm();
        const retweetedPost = me.Posts.find((v) => v?.Retweet?.id === post.id);
        if(retweetedPost){
            dispatch(removePost(retweetedPost.id));
        }
    },[me, mainPosts]);

    const onOpenLikeUserModal = useCallback(() => {
        setModalOpened((prev) => !prev);
    },[]);

    const onCloseLikeUserModal = useCallback(() => {
        setModalOpened((prev) => !prev);
    },[]);

    const onEditPost = useCallback(() => {
        setEditMode(true);
    },[]);

    const onChangePost = useCallback((editText) => () => {
        dispatch(editPost({postId: post.id, content: editText}))
    }, [post])

    const onCancelEdit = useCallback(() => {
        setEditMode(false);
    },[]);
    
    return(
        <>
            <div className="my-5 w-full">
                <Card 
                    cover={post.Images[0] && <PostImages images={post.Images} />}
                    actions = {[
                        me?.Posts.find((v) => v?.Retweet?.id === post.id)
                        ? <RetweetOutlined key="retweet" onClick={onRetweetCancel} className="!text-blue-500" />
                        : <RetweetOutlined key="retweet" onClick={onRetweetPost} />,
                        liked 
                        ? <HeartTwoTone twoToneColor='#eb2f96' key='heart' onClick={onUnLikePost}/> 
                        : <HeartOutlined key="heart" onClick={onLikePost}/>,
                        <MessageOutlined key="comment" onClick={onToggleComment}/>,
                        <Popover key="more" content={(
                            <Button.Group>
                                { nickname && post.User.nickname === nickname ? (
                                    <>
                                        {!post.RetweetId && <Button onClick={onEditPost}>수정</Button>}
                                        <Button type="danger" onClick={onRemovePost}>삭제</Button>
                                    </>
                                ) : <Button>신고</Button> }
                            </Button.Group>
                        )}>
                            <EllipsisOutlined />
                        </Popover>
                    ]}
                    title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
                    extra={ nickname === post.User.nickname ? null : <FollowButton post={post} /> }
                    >
                    {
                    post.RetweetId && post.Retweet
                        ? (
                            <Card cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}>
                                    <Card.Meta 
                                        avatar = {
                                            <Link href={`/user/${post.Retweet.User.id}`}>
                                                <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                                            </Link>
                                        }
                                        title = {post.Retweet.User.nickname}
                                        description = {
                                                <PostCardContent post={post} onCancelEdit={onCancelEdit} onChangePost={onChangePost} postData={post.Retweet.content}/>                                                
                                        }
                                    />
                            </Card>
                        )
                        : (
                            <Card.Meta 
                                avatar = {
                                        <Link href={`/user/${post.User.id}`}>
                                            <Avatar>
                                                {post.User.nickname[0]}
                                            </Avatar>
                                        </Link>
                                }
                                title = {post.User.nickname}
                                description = {<PostCardContent editMode={editMode} postData={post.content} post={post} onCancelEdit={onCancelEdit} onChangePost={onChangePost} />}
                            />
                        )
                    }
                    {
                        <LikeUser onOpenModal={onOpenLikeUserModal} post={post} />
                    }{
                        <Elaspe post={post}/>
                    }
                </Card>
                {commentFormOpened && (
                    <div>
                        <CommentForm post={post} />
                        <List 
                            header = {`${post.Comments.length}개의 댓글`}
                            itemLayout = "horizontal"
                            dataSource = {post.Comments}
                            renderItem = {(item) => (
                                // item 은 dataSource의 각각의 요소 item = post.Comments[]
                                <li>
                                    <CommentList item={item} post={post} LoginConfirm={LoginConfirm} />
                                </li>
                            )}
                        />
                    </div>
                )}
            </div>
            {modalOpened && (
                    <LikeUserModal onCloseModal={onCloseLikeUserModal} post={post}/>
                )
            }
        </>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
      id: PropTypes.any,
      User: PropTypes.object,
      content: PropTypes.string,
      createdAt: PropTypes.string,
      Comments: PropTypes.arrayOf(PropTypes.object),
      Likers: PropTypes.arrayOf(PropTypes.object),
      Images: PropTypes.arrayOf(PropTypes.object),
      RetweetId: PropTypes.any,
      Retweet: PropTypes.objectOf(PropTypes.any),
    }).isRequired,
};

export default PostCard;