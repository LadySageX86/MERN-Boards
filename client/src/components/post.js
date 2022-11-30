import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import LoginContext from "../context/loginContext";
import axios from "axios";

const LPost = (props) => {
    const [loginCtx, setLoginCtx, usernameCtx, setUsernameCtx] = useContext(LoginContext); 
    if (loginCtx === true && props.post.name === usernameCtx) {
    return(
    <tr>
        <td>{props.post.name}</td>
        <td>{props.post.subject}</td>
        <td>{props.post.post}</td>
        <td>
            <Link className="btn btn-link" to={`/thread/${props.post._id}`}>View Thread</Link> |
            <Link className="btn btn-link" to={`/edit/${props.post._id}`}>Edit</Link> |
            <button className="btn btn-link"
                    onClick={() => {
                        props.deletePost(props.post._id);
                    }}>
                Delete
            </button>
        </td>
    </tr>
    );
    }
    if (loginCtx === true && props.post.name !== usernameCtx) {
    return(
    <tr>
        <td>{props.post.name}</td>
        <td>{props.post.subject}</td>
        <td>{props.post.post}</td>
        <td>
            <Link className="btn btn-link" to={`/thread/${props.post._id}`}>View Thread</Link>
        </td>
    </tr>
    );
    }
    else return(<h2>{"You must be signed in to view this content"}</h2>);
};

const LComment = (props) => (
    <div className="comment">
        <h4>Comment by {props.comment.name}</h4>
        <p>{props.comment.comment}</p>
    </div>
);

function GetID() {
    return window.location.pathname.split('/')[2];
}

function GetPost() {
    const [post, setPost] = useState([]);

    const id = GetID();
    console.log(id);
    
    useEffect(() => {
        async function getPost() {
            const response = await fetch(`http://localhost:5000/post/${id}`);
            if (!response.ok) {
                const message = `ERROR: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const _post = await response.json();
            setPost(_post);
        }
        getPost();
        return;
    }, [id, post.length]);

    return post;
}

function GetComments() {
    const [comments, setComments] = useState([]);

    const id = GetID();

    useEffect(() => {
        async function getComments() {
            const response = await fetch(`http://localhost:5000/post/${id}/comments`);
            if (!response.ok) {
                const message = `ERROR: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const _comments = await response.json();
            setComments(_comments);
        }
        getComments();
        return;
    }, [id, comments.length]);

    return comments;
}


export function Post() {
    const post = GetPost();
    const comments = GetComments();
    const id = GetID();

    const [form, setForm] = useState({
        name: "",
        comment: "",
    });

    const [loginCtx, setLoginCtx, usernameCtx, setUsernameCtx] = useContext(LoginContext);

    function commentList() {
        return comments.filter((comment) => (comment.post_id === id)).map((comment) => {
            return (
                <LComment
                    comment={comment}
                    key={comment._id}
                />
            );
        });
     }

    const handleComment = (e) => { setForm({ ...form, [e.target.name]: e.target.value}); }

    async function onSubmit(e) {
        e.preventDefault();

        const fd = new FormData(document.getElementById("comment-form"));
        //const newComment = { ...form };

        // await fetch(`http://localhost:5000/post/${id}/new_comment`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(newComment),
        // }).catch(err => { window.alert(err); return; });

        axios.post(`http://localhost:5000/post/${id}/new_comment`, fd)
            .then(res => { console.log(res); })
            .catch(error => { window.alert(error); return; });

        if (window.confirm("Comment successfully posted!"))
            window.location.reload();
    }

    return(
        <div>
            <h1>Subject: {post.subject}</h1>
            <h2>Posted by {post.name}</h2>
            <img src={`http://localhost:5000/${post.image}`} alt={`Submitted by ${post.name}`} />
            <p>{post.post}</p>
            <form id="comment-form" onSubmit={onSubmit} encType="multipart/form-data" method="post">
                <div className="form-group">
                <label htmlFor="new_comment">Post a comment!</label>
                <input
                    className="form-control"
                    name="name"
                    value={usernameCtx}
                    onChange={handleComment}
                />
                <textarea
                    className="form-control"
                    name="comment"
                    value={form.comment}
                    onChange={handleComment}></textarea>
                </div>
                <div className="form-group">
                <input 
                    type="submit" 
                    value="Submit Comment"
                    className="btn btn-primary"
                />
                </div>
            </form>
            <div className="comment">
                {commentList()}
            </div>
        </div>
    );
}

export function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
            const response = await fetch(`http://localhost:5000/post/`);
            if (!response.ok) {
                const message = `ERROR: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const _posts = await response.json();
            setPosts(_posts);
        }
        getPosts();
        return;
    }, [posts.length]);

    async function deletePost(id) {
        await fetch(`http://localhost:5000/${id}`, { method: "DELETE" });
        const newPosts = posts.filter((el) => el._id !== id);
        setPosts(newPosts);
    }

    function postList() {
        return posts.map((post) => {
            return (
                <LPost
                    post={post}
                    deletePost={() => deletePost(post._id)}
                    key={post._id}
                />
            );
        });
    }

    return (

   <div>
     <h3>Posts</h3>
     <table className="table" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Subject</th>
           <th>Post</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{postList()}</tbody>
     </table>
   </div>
 );
}
