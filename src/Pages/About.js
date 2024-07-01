import React from "react";
import "../CSS/About.css";
import img1 from "../Assets/Icons/logo.png"
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";

export function About() {
    return (
        <div>
            <Navbar/>
            <div className="about-container">
                <div className="about-header">
                    <img src={img1} size="2x" className="about-icon" />
                    <h1>About Us</h1>
                </div>
                <div className="about-content">
                    <p>
                        Welcome to our real estate company! Our mission is to provide exceptional service to our clients,
                        ensuring a smooth and stress-free experience whether you are buying, selling, or renting a property.
                        With a dedicated team of professionals, we are committed to helping you find the perfect home or
                        investment property.
                    </p>
                    <p>
                        We pride ourselves on our deep knowledge of the real estate market, our use of cutting-edge technology,
                        and our unwavering dedication to client satisfaction. Our team is here to guide you through every step
                        of the process, offering personalized advice and expert insights to help you make informed decisions.
                    </p>
                    <p>
                        Thank you for choosing our company for your real estate needs. We look forward to working with you and
                        helping you achieve your real estate goals. Feel free to contact us with any questions or to schedule
                        a consultation. Let's find your dream property together!
                    </p>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
