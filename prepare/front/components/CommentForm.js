import React , {useCallback} from "react";
import PropTypes from "prop-types";
import { Form, Input, Button } from "antd";
import useInput from "./hooks/useInput";
import { useSelector } from "react-redux";

const CommentForm = ({ post }) => {
    const id = useSelector((state) => state.user.me?.id);
    const [ commentText , onChangeCommentText ] = useInput("");
    const onSubmitComment = useCallback(() => {
        console.log(post.id , commentText);
    },[commentText])
    return(
        <>
            <Form onFinish={onSubmitComment}>
                <Form.Item className="relative m-0">
                    <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
                    <Button type="primary" htmlType="submit" loading={false}>댓글 달기</Button>
                </Form.Item>
            </Form>
        </>
    )
}

CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
}

export default CommentForm;