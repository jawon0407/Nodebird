import React , {useState , useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import FollowButton from './FollowButton';
import PostCardContent from './PostCardContent';
import { likePost , unLikePost , removePost , retweetPost } from '../actions/post';

import { useSelector , useDispatch } from 'react-redux';
import { Card , Popover , Button , Avatar , List , Comment } from 'antd';
import { EllipsisOutlined, MessageOutlined, RetweetOutlined , HeartOutlined , HeartTwoTone } from '@ant-design/icons';

const userSelector = (state) => state.user;

const PostCard = ({ post }) => {
    const dispatch = useDispatch();
    const { me } = useSelector(userSelector);
    const nickname = me?.nickname;
    const id = me?.id;
    const [commentFormOpened , setCommentFormOpened] = useState(false);
    const liked = post.Likers.find((v) => v.id === id);
    
    const onLike = useCallback(() => {
        dispatch(likePost(post.id));
    },[]);
    
    const onUnLike = useCallback(() => {
        if(!id){
            return alert('로그인이 필요합니다.');
        }
        dispatch(unLikePost(post.id));
    },[]);
    
    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
    },[]);


    const onRemovePost = useCallback(() => {
        dispatch(removePost(post.id));
    },[]);

    const onRetweet = useCallback(() => {
        if(!id){
            return alert('로그인이 필요합니다.');
        }
        dispatch(retweetPost(post.id));
    },[]);

    return(
        <>
            <div style={{marginBottom : 20}}>
                    <Card 
                        cover={post.Images[0] && <PostImages images={post.Images} />}
                        actions = {[
                            <RetweetOutlined key="retweet" onClick={onRetweet}/>,
                            liked 
                            ? <HeartTwoTone twoToneColor='#eb2f96' key='heart' onClick={onUnLike}/> 
                            : <HeartOutlined key="heart" onClick={onLike}/>,
                            <MessageOutlined key="comment" onClick={onToggleComment}/>,
                            <Popover key="more" content={(
                                <Button.Group>
                                    { nickname && post.User.nickname === nickname ? (
                                        <>
                                            <Button>수정</Button>
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
                                            avatar = {<Avatar>{post.Retweet.User.nickname[0]}</Avatar>}
                                            title = {post.Retweet.User.nickname}
                                            description = {<PostCardContent postData={post.Retweet.content}/>}
                                        />
                                    </Card>
                            )
                            :  (
                                <Card.Meta 
                                    avatar = {
                                            <Avatar>{post.User.nickname[0]}</Avatar>
                                    }
                                    title = {post.User.nickname}
                                    description = {<PostCardContent postData={post.content} />}
                                />   
                            )
                        }
                        {
                            post.Likers.length > 0 && 
                                <div className="my-4 flex align-center">
                                    <HeartTwoTone twoToneColor='#eb2f96' key='heart' className="mt-[4px]"/> 
                                    <span className="ml-1 text-gray-500">
                                        {post.Likers.length}개
                                    </span>
                                </div>
                        }
                        {
                            post.createdAt && 
                                <div className="text-gray-300 mt-4">
                                    {`${post.createdAt.split('-')[0]}년 ${post.createdAt.split('-')[1]}월 ${post.createdAt.split('-')[2].split('T')[0]}일 ${post.createdAt.split('-')[2].split('T')[1].split('.')[0]}`}
                                </div>
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
                                //item 은 dataSource의 각각의 요소 item = post.Comments[]
                                <li>
                                    <Comment
                                        author = {item.User.nickname}
                                        avatar = {<Avatar>{item.User.nickname[0]}</Avatar>}
                                        content = {item.content}
                                    />
                                </li>
                            )}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

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