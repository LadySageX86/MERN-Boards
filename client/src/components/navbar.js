import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import LoginContext from "../context/loginContext"

export default function Navbar() {
    const [loginCtx, setLoginCtx, usernameCtx, setUsernameCtx] = useContext(LoginContext);

    function CheckLogin() {
        if (loginCtx === true) {
            return(
             <ul className="navbar-nav ml-auto">
             <h3>{`Hello, ${usernameCtx}!`}</h3>
               <li className="nav-item">
                 <NavLink className="nav-link" to="/create">
                   Create New Post
                 </NavLink>
               </li>
               <li className="nav-item">
                 <NavLink className="nav-link" to="/logout">
                    Log Out 
                 </NavLink>
               </li> 
            </ul>
            );
        } else {
           return( 
             <ul className="navbar-nav ml-auto">
               <li className="nav-item">
                 <NavLink className="nav-link" to="/login">
                   Log In
                 </NavLink>
               </li>
               <li className="nav-item">
                 <NavLink className="nav-link" to="/signup">
                    Sign Up 
                 </NavLink>
               </li> 
            </ul>
            );
        }
    }

    return (
        <div>
     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
       <NavLink className="navbar-brand" to="/">
        <h1>MERN-Boards</h1>
       </NavLink>
       <button
         className="navbar-toggler"
         type="button"
         data-toggle="collapse"
         data-target="#navbarSupportedContent"
         aria-controls="navbarSupportedContent"
         aria-expanded="false"
         aria-label="Toggle navigation"
       >
         <span className="navbar-toggler-icon"></span>
       </button>
 
       <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{"text-align": "right"}}>
        <CheckLogin/>
       </div>
     </nav>
   </div>
    );
}
