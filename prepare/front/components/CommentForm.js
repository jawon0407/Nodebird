import React , { useCallback , useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button } from "antd";
import useInput from "./hooks/useInput";
import { useSelector , useDispatch } from "react-redux";
import { addComment } from "../actions/post";
import shortid from "shortid";

const CommentForm = ({ post }) => {
    const dispatch = useDispatch();
    const id = useSelector((state) => state.user.me?.id);
    const { addCommentLoading , addCommentDone } = useSelector((state) => state.post);
    const [ commentText , onChangeCommentText , setCommentText ] = useInput('');
    
    const onSubmitComment = useCallback(() => {
        dispatch(addComment({
            postId : post.id,
            id : shortid.generate(),
            comment : commentText,
            User : {
                id,
                nickname : "조재원",
            },
            Images : [],
            Comments : [],
        }));
    },[commentText])

    useEffect(() => {
        if(addCommentDone){
            setCommentText('');
        }
        // = componentDidMount, [값] = componentDidUpdate;
    },[addCommentDone]);
    
    return(
        <>
            <Form onFinish={onSubmitComment}>
                <Form.Item className="relative m-0">
                    <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
                    <Button type="primary" htmlType="submit" loading={addCommentLoading}>댓글 달기</Button>
                </Form.Item>
            </Form>
        </>
    )
}

CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
}

export default CommentForm;