import { useEffect } from "react";
import BannerImg from "../Assets/Images/HomeBanner.jpeg"
import "../CSS/HomeBanner.css"

export function HomeBanner(){

    useEffect(()=>{
        alert("Due to Global Server Down-Time property data may gets delay to load, please wait few seconds !");
    },[]);
    return(
        <div>
            <div className="banner">
                <div className="caption">
                    <h1>"Connecting You with Your Ideal Home"</h1>
                    <p>Discover Your Perfect Place...</p>
                    <button className="banner-button">Get Started</button>
                </div>
            </div>
        </div>
    )
}