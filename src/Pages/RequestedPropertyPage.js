import { Navbar } from "../Components/Navbar";
import img1 from "../Assets/Images/img5.jpeg"
import img2 from "../Assets/Images/img3.jpg"
import img3 from "../Assets/Images/img4.jpg"
import location from "../Assets/Icons/location.png"
import "../CSS/RequestedPropertyPage.css"
import { Footer } from "../Components/Footer";


export function RequestedPropertyPage(){
    return(
        <div>
            <Navbar/>
            <h2 id="req-property-title">Properties Requested :</h2>
            <div id="req-prop-cont">
                <div id="req-property-card">
                    <div id="req-prop-image-box">
                        <img src={img3} />
                    </div>
                    <div id="req-prop-details">
                        <div id="left-details">
                            <h3>Modern Penthouse in the city with your confort of living</h3>
                            <div id="req-prop-location">
                                <img src={location} id="location"/>
                                <p>284,Mullberry street, Hadapsar</p>
                            </div>
                            <p id="req-prop-des">Elevate your living experience in this state-of-the-art penthouse with futuristic design</p>
                            <p id="price">$3,200 / Month</p>
                            <div id="req-prop-bed">
                                <p>3 Beds</p>
                                <p>4 Bathrooms</p>
                            </div>
                        </div>
                        <div id="req-right-details">
                            <button>Remove</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}