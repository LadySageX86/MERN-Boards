import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import { Posts, Post } from "./components/post";
import Edit from "./components/edit";
import Create from "./components/create";
import { Login, Logout, Signup } from "./components/accmgmt";
import { LoginProvider } from "./context/loginContext";

export default function App() {
    const [loginCtx, setLoginCtx] = useState(false);
    const [usernameCtx, setUsernameCtx] = useState("");
    return (
        <LoginProvider value={[loginCtx, setLoginCtx, usernameCtx, setUsernameCtx]}>
        <div>
                <Navbar />
            <Routes>
                <Route exact path="/" element={<Posts />} />
                <Route exact path="/thread/:id" element={<Post />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/create" element={<Create />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </div>
        </LoginProvider>
    );
};
