import React, { useState, useEffect } from 'react';
import { Comment, Avatar, Button, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { useSelector } from 'react-redux';
import Axios from 'axios';



const { TextArea } = Input;

function SingleComment(props) {



    // console.log(props)
    const user = useSelector(state => state.user)

    const [CommentValue, setCommentValue] = useState("");
    const [OpenReply, setOpenReply] = useState(false);

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    };

    const openReply = () => {
        setOpenReply(!OpenReply);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(user)
        console.log(props.comment)
        const commentVariable = {
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._Id,
            content: CommentValue
        }


        Axios.post('/api/comments/saveComment', commentVariable)
            .then(response => {
                if (response.data.success) {
                    setCommentValue("");
                    setOpenReply(!OpenReply)
                    props.refreshFunction(response.data.result)
                    // console.log(response);
                } else {
                    alert("Falied to save comment")
                }
            })
    }

    const action = [
        <span onClick={openReply} key="comment-basic-reply-to">Reply to</span>
    ];

    return (
        <div>
            <Comment
                actions={action}
                author={props.comment.writer.firstName}
                avatar={
                    <Avatar
                        // src={props.comment.writer.image ? props.comment.writer.image : <UserOutlined />}
                        // src={UserOutlined}
                        icon={<UserOutlined />}
                        alt="image"
                    />
                }
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
            > </Comment>
            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea style={{ width: '85%', borderRadius: '5px' }}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="write some comments" />
                    <br />
                    <Button style={{ width: '20%', height: "52px" }} onClick={onSubmit}>Submit</Button>
                </form>
            }


        </div>
    )
}

export default SingleComment
