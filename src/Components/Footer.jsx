import "../CSS/Footer.css"
import linkedin from "../Assets/Icons/linkedin.png"
import insta from "../Assets/Icons/insta.svg"
import twitter from "../Assets/Icons/twitter.svg"
import fb from "../Assets/Icons/fb.svg"
import { NavLink } from "react-router-dom"
// import Chatbot from "./Chatbot"

export function Footer(){
    return(
        <div>
            <div id="footer">
                <div id="footer-cont-1">
                    <h1 id="footer-title">Contact us</h1>
                    <div id="footer-detail">
                        <p>Contact-Number : +91-8934820321</p>
                        <p>Email-Address : xyz@gmail.com</p>
                    </div>
                </div>
                <div id="footer-cont-2">
                    <h1 id="footer-title">Follow us</h1>
                    <div id="footer-detail-follow-us">
                        <img src={linkedin} className="follow-us-icon"/>
                        <img src={insta} className="follow-us-icon"/>
                        <img src={twitter} className="follow-us-icon"/>
                        <img src={fb} className="follow-us-icon"/>
                    </div>
                </div>
                <div id="footer-cont-3">
                    <NavLink to="/About" id="footer-menu"><h1 id="footer-title">About us</h1></NavLink>
                </div>
            </div>
            <div id="copyright-footer">
                <p>©2024 xyz India Pvt. Ltd</p>
            </div>
            {/* <Chatbot/> */}
        </div>
    )
}