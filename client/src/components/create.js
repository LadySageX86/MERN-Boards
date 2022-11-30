import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import LoginContext from "../context/loginContext";

export default function Create() {
    const [form, setForm] = useState({
        name: "",
        subject: "",
        post: "",
        image: "",
    });

    const [loginCtx, setLoginCtx, usernameCtx, setUsernameCtx] = useContext(LoginContext);

    const navigate = useNavigate();

    // function updateForm(value) {
    //     return setForm((prev) => {
    //         return { ...prev, ...value };
    //     });
    // }

    const handlePost = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleImage = (e) => {
        setForm({...form, photo: e.target.files[0]});
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const fd = new FormData(document.getElementById("post-form"));
        // fd.append('name', form.name);
        // fd.append('subject', form.subject);
        // fd.append('post', form.post);
        // fd.append('image', form.image);

        axios.post("http://localhost:5000/post/add", fd)
            .then(res => { console.log(res); })
            .catch(error => { window.alert(error); return; });

        navigate("/");
    }

    return (
   <div>
     <h3>Create New Post</h3>
     <form id="post-form" onSubmit={onSubmit} encType="multipart/form-data" method="post">
       <div className="form-group">
         <label htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control"
           name="name"
           value={ usernameCtx }
           onChange={handlePost}
         />
       </div>
       <div className="form-group">
         <label htmlFor="subject">Subject</label>
         <input
           type="text"
           className="form-control"
           name="subject"
           value={form.subject}
           onChange={handlePost}
         />
       </div>
       <div className="form-group">
           <label htmlFor="post">Post</label>
           <textarea
             className="form-control"
             name="post"
             value={form.post}
             onChange={handlePost}>
            </textarea>
       </div>
        <div className="form-group">
            <input
                className="form-control"
                type="file"
                accept=".png, .jpg, .jpeg"
                name="image"
                onChange={handleImage}
            />
        </div>
       <div className="form-group">
         <input
           type="submit"
           value="Submit Post"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
