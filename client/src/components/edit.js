import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
    const [form, setForm] = useState({
        name: "",
        subject: "",
        post: "",
        posts: [],
    });

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5000/post/${id}`);

            if (!response.ok) {
                const message = `ERROR: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const post = await response.json();
            if (!post) {
                window.alert(`POST ${id} NOT FOUND`);
                navigate("/");
                return;
            }
            setForm(post);
        }
        fetchData();
        return;
    }, [params.id, navigate]);

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedPost = {
            name: form.name,
            subject: form.subject,
            post: form.post,
        };

        await fetch(`http://localhost:5000/update/${params.id}`, {
            method: "POST",
            body: JSON.stringify(editedPost),
            headers: { "Content-Type": "application/json" },
        });
        navigate("/");
    }

    return (
   <div>
     <h3>Edit Post</h3>
     <form id="post-form" onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name: </label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="subject">Subject: </label>
         <input
           type="text"
           className="form-control"
           id="subject"
           value={form.subject}
           onChange={(e) => updateForm({ subject: e.target.value })}
         />
       </div>
       <div className="form-group">
        <label htmlFor="post">Post: </label>
        <textarea 
            className="form-control"
            id="post" 
            value={form.post}
            onChange={(e) => updateForm({ post: e.target.value })}
        >
        </textarea>
       </div>
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Edit Post"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
