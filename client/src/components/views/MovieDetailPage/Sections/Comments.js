import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import Axios from 'axios';

import { useSelector } from 'react-redux';
import SingleComment from'./SingleComment';
import ReplyComment from './ReplyComment';

const { TextArea } = Input;
function Comments(props) {
    const user = useSelector(state => state.user)

    const [Comment, setComment] = useState("");

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }


    // console.log(props.postId);
    const onSubmit = (e) => {
        e.preventDefault();


        const variables = {
            content: Comment,
            writer: user.userData._id,
            postId: props.postId.id
        };

        Axios.post('/api/comments/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setComment("");
                    props.refreshFunction(response.data.result);
                } else {
                    alert('Faliled to save Comment')
                }
            })

    }

    return (
        <div>

            <br />
            <p> {props.CommentLists.length} replies</p>
            <hr />

            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea style={{ width: '85%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="write some comments" />
                <br />
                <Button style={{ width: '20%', height: "52px" }} onClick={onSubmit}>Submit</Button>

            </form>




            {/* comment list */} 
            {console.log(props.CommentLists)}
            {props.CommentLists && props.CommentLists.map((comment, index) => (

                (!comment.responseTo &&
                    <React.Fragment key={index} >
                        <SingleComment  comment={comment} postId={props.postId} refreshFunction={props.refreshFunction}/>
                        <ReplyComment CommentLists ={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction}/>
                    </React.Fragment>    
                )    
                )
            )}


            {/* root comment form */}

          
        </div>
    )
}

export default Comments;
