import BannerImg from "../Assets/Images/HomeBanner.jpeg"
import "../CSS/HomeBanner.css"

export function HomeBanner(){
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