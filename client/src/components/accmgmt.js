import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../context/loginContext";

export function Login() {
    let [loginCtx, setLoginCtx, usernameCtx, setUsernameCtx] = useContext(LoginContext);

    const [login, setLogin] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleLogin = (e) => {
        setLogin({...login, [e.target.name]: e.target.value});
    };

    async function onSubmit(e) {
        e.preventDefault();

        const res = await fetch(`http://localhost:5000/account`);

        if (!res.ok) {
            window.alert(`ERROR: ${res.statusText}`);
            return;
        }

        const _user = await res.json();
        const check = _user.filter((user) => (user.username === login.username && user.password === login.password));

        if (check.length === 0) {
            window.alert("USER NOT FOUND")
            navigate("/login");
        } else {
            setLoginCtx(true);
            setUsernameCtx(login.username);
            navigate("/");
        }
    }

    return(
       <div>
         <h3>Sign Up</h3>
         <form id="login-form" onSubmit={onSubmit} method="post">
           <div className="form-group">
             <label htmlFor="name">Username</label>
             <input
               type="text"
               className="form-control"
               name="username"
               value={login.username}
               onChange={handleLogin}
             />
           </div>
           <div className="form-group">
             <label htmlFor="password">Password</label>
             <input
               type="password"
               className="form-control"
               name="password"
               value={login.password}
               onChange={handleLogin}
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

export function Logout() {
    return(<></>);
}

export function Signup() {
    const [signup, setSignup] = useState({
        username: "",
        password: "",
        email: "",
    });

    const navigate = useNavigate();

    const handleSignup = (e) => {
        setSignup({...signup, [e.target.name]: e.target.value});
    };

    async function onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: signup.username,
            password: signup.password,
            email: signup.email,
        };

        await fetch(`http://localhost:5000/account/add`, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: { "Content-Type": "application/json" },
        });

        navigate("/");
    }

    return(
       <div>
         <h3>Sign Up</h3>
         <form id="signup-form" onSubmit={onSubmit} method="post">
           <div className="form-group">
             <label htmlFor="name">Username</label>
             <input
               type="text"
               className="form-control"
               name="username"
               value={signup.username}
               onChange={handleSignup}
             />
           </div>
           <div className="form-group">
             <label htmlFor="password">Password</label>
             <input
               type="password"
               className="form-control"
               name="password"
               value={signup.password}
               onChange={handleSignup}
             />
           </div>
           <div className="form-group">
               <label htmlFor="email">Email</label>
               <input
                 className="form-control"
                 type="email"
                 name="email"
                 value={signup.email}
                 onChange={handleSignup}
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

export function Profile() {
    return (<></>);
}
