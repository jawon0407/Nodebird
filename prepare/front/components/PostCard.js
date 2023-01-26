import React , {useState , useCallback} from 'react';
import PropTypes from 'prop-types';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import FollowButton from './FollowButton';
import PostCardContent from './PostCardContent';
import { removePost } from '../actions/post';

import { useSelector , useDispatch } from 'react-redux';
import { Card , Popover , Button , Avatar , List , Comment } from 'antd';
import { EllipsisOutlined, MessageOutlined, RetweetOutlined , HeartOutlined , HeartTwoTone } from '@ant-design/icons';

const userSelector = (state) => state.user;

const PostCard = ({ post }) => {
    const dispatch = useDispatch();
    const [liked , setLiked] = useState(false);
    const [commentFormOpened , setCommentFormOpened] = useState(false);
    const onToggleLike = useCallback(() => {
        setLiked((prev) => !prev);
        //항상 반대로 바꿔주는 함수
    },[]);
    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
    },[]);

    const { me } = useSelector(userSelector);
    const email = me?.email;

    const onRemovePost = useCallback(() => {
        console.log(`삭제 : ${post.id}`);
        dispatch(removePost(post.id));
    },[]);

    return(
        <>
            <div style={{marginBottom : 20}}>
                <Card 
                    cover={post.Images[0] && <PostImages images={post.Images} />}
                    actions = {[
                        <RetweetOutlined key="retweet" />,
                        liked 
                            ? <HeartTwoTone twoToneColor='#eb2f96' key='heart' onClick={onToggleLike}/> 
                            : <HeartOutlined key="heart" onClick={onToggleLike}/>,
                        <MessageOutlined key="comment" onClick={onToggleComment}/>,
                        <Popover key="more" content={(
                            <Button.Group>
                                { email && post.User.nickname === email.split("@")[0] ? (
                                    <>
                                        <Button>수정</Button>
                                        <Button type="danger" onClick={onRemovePost}>삭제</Button>
                                    </>
                                ) : null }
                                <Button>신고</Button>
                            </Button.Group>
                        )}>
                            <EllipsisOutlined />
                        </Popover>
                    ]}
                    extra={ email && <FollowButton post={post}/>}
                    >
                    <Card.Meta 
                        avatar = {<Avatar>{post.User.nickname[0]}</Avatar>}
                        title = {post.User.nickname}
                        description = {<PostCardContent postData={post.content} />}
                    />
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
                                        content = {item.comment}
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
      Images: PropTypes.arrayOf(PropTypes.object),
      Likers: PropTypes.arrayOf(PropTypes.object),
      RetweetId: PropTypes.any,
      Retweet: PropTypes.objectOf(PropTypes.any),
    }).isRequired,
  };

export default PostCard;