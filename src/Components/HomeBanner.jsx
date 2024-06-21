import BannerImg from "../Assets/Images/HomeBanner.jpeg"
import "../CSS/HomeBanner.css"

export function HomeBanner(){
    return(
        <div>
            <div id="home-banner">
                <img src={BannerImg} />
                <div id="banner-detail">
                    <h1 id="banner-title">"Connecting You with Your Ideal Home"</h1>
                    <p id="caption">Discover Your Perfect Place...</p>
                    <button id="btn-explore">Explore</button>
                </div>
            </div>
        </div>
    )
}