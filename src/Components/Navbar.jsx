import "../CSS/Navbar.css"
import profile from "../Assets/Icons/cust4.png"
import stack from "../Assets/Icons/stack2.png"
import { NavLink } from "react-router-dom"
import { HomePage } from "../Pages/HomePage"
import { PostPropertyPage } from "../Pages/PostPropertyPage"
import logo from "../Assets/Icons/logo.png"
import { useEffect,useState } from "react"
import {jwtDecode} from 'jwt-decode'

export function Navbar(){

    const [ token, setToken ] = useState();
    const [ username, setUserName ] = useState("");

    useEffect(()=>{
        const token = sessionStorage.getItem("token");
        if(token != null){
            setToken(token);
            // const auth_btn = document.getElementById("auth-btn");
            // auth_btn.style.display = "none";
            const decodedToken = jwtDecode(token);
            const username = decodedToken.name;
            setUserName(username);
        }
    },[]);

    function Logout(){
        sessionStorage.clear();     //it'll clear all data stored in session storage.
        window.location = "/";
    }

    return(
        <div>
            <nav>
                <div id="logo">
                    <img src={logo} id="logo-icon"/>
                    <p>Dwellio</p>
                </div>
                <div id="menu">
                    <NavLink to={"/"} id="home"><p>Home</p></NavLink>
                    <NavLink to={"/PostPropertyPage"} id="post-prop"><p>Post Property (Free)</p></NavLink>
                    <NavLink to={"/About"} id="latest-prop"><p>About</p></NavLink>
                </div>
                {
                    token ? (
                        <div id="profile">
                            <div id="profile-name-cont">
                                <p id="username-1">Welcome, {username}</p>
                                <img src={profile} id="profile-img"/>
                            </div>
                            <img src={stack} id="stack-icon"/>
                            <div className="popup">
                                <div className="popup-content">
                                    <ul>
                                        <li id="username-2">Welcome, {username}</li>
                                        <hr id="username-2"></hr>
                                        <NavLink to="/PostedPropertyPage" id="nav-menu-prop"><li>Posted Property</li></NavLink>
                                        <hr></hr>
                                        <NavLink to="/RequestedPropertyPage" id="nav-menu-prop"><li>Requested Property</li></NavLink>
                                        <hr></hr>
                                        <li onClick={Logout}>Logout</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ):(
                        <div id="nav-btn-cont">
                            <NavLink to="/Login"><button id="btn-login">Login</button></NavLink>
                            <NavLink to="/Signup"><button>Signup</button></NavLink>
                        </div>
                    )
                }
            </nav>
        </div>
    )
}