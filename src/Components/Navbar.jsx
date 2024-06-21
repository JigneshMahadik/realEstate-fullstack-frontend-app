import "../CSS/Navbar.css"
import profile from "../Assets/Icons/cust4.png"
import stack from "../Assets/Icons/stack2.png"
import { NavLink } from "react-router-dom"
import { HomePage } from "../Pages/HomePage"
import { PostPropertyPage } from "../Pages/PostPropertyPage"
import logo from "../Assets/Icons/logo.png"
import { useEffect,useState } from "react"

export function Navbar(){

    const [ token, setToken ] = useState();

    useEffect(()=>{
        const token = sessionStorage.getItem("token");
        if(token != null){
            setToken(token);
            // const auth_btn = document.getElementById("auth-btn");
            // auth_btn.style.display = "none";
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
                    <NavLink to={"/"} id="latest-prop"><p>Latest Properties</p></NavLink>
                    <NavLink to={"/PostPropertyPage"} id="post-prop"><p>Post Property (Free)</p></NavLink>
                </div>
                {
                    token ? (
                        <div id="profile">
                            <img src={profile} id="profile-img"/>
                            <img src={stack} id="stack-icon"/>
                            <div className="popup">
                                <div className="popup-content">
                                    <ul>
                                        <li>Profile</li>
                                        <hr></hr>
                                        <NavLink to="/PostedPropertyPage"><li>Posted Property</li></NavLink>
                                        <hr></hr>
                                        <NavLink to="/RequestedPropertyPage"><li>Requested Property</li></NavLink>
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