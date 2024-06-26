import { Navbar } from "../Components/Navbar";
import img1 from "../Assets/Images/img5.jpeg"
import img2 from "../Assets/Images/img3.jpg"
import img3 from "../Assets/Images/img4.jpg"
import location from "../Assets/Icons/location.png"
import "../CSS/RequestedPropertyPage.css"
import { Footer } from "../Components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';
import { NavLink } from "react-router-dom";


export function RequestedPropertyPage(){

    const [ requests, setRequests ] = useState([{}]);

    useEffect(()=>{
        getRequestedProperties();
    },[]);

    async function getRequestedProperties(){
        try{
            const token = sessionStorage.getItem('token'); // or wherever you store your token
            const decodedToken = jwtDecode(token);
            const id = decodedToken.user;
            // const res = await axios.post(`http://localhost:8082/getRequestedProperties?userid=${id}`,null,
            const res = await axios.post(`https://realestate-fullstack-backend-app.onrender.com/getRequestedProperties?userid=${id}`,null,
                {
                    headers : {
                        "authorization": token,
                    }
                }
            );
            // console.log("data is",res.data.data);
            setRequests(res.data.data);
        }
        catch(error){
            console.log(error);
        }
    }

    async function deleteProperty(propid){
        try{
            const token = sessionStorage.getItem('token'); // or wherever you store your token
            const decodedToken = jwtDecode(token);
            const userid = decodedToken.user;
            // const res = await axios.delete(`http://localhost:8082/deleteProperty?propId=${propid}&userId=${userid}`,
            const res = await axios.delete(`https://realestate-fullstack-backend-app.onrender.com/deleteProperty?propId=${propid}&userId=${userid}`,
                {
                    headers : {
                        "authorization": token,
                    }
                }
            );
            console.log("Requested Property has removed successfully")
            window.location = "/RequestedPropertyPage";
        }
        catch(error){
            console.log(error);
        }
    }

    // Formate the image URL .
    function formatImageUrl(url) {
        return url.replace('/opt/render/project/src', '');
    }

    return(
        <div>
            <Navbar/>
            <h2 id="req-property-title">Properties Requested :</h2>
            {
                requests.length>0 ? (
                    requests.map((item,id)=>{
                        return(
                            <div id="req-prop-cont" key={id}>
                                <div id="req-property-card">
                                    <div id="req-prop-image-box">
                                    {
                                        item.files && item.files.length > 0 ? (
                                            <img src={`https://realestate-fullstack-backend-app.onrender.com${formatImageUrl(item.files[0])}`} alt="Property image" />
                                        ):(
                                            <img src={img1} alt="Property image" /> // Provide a default image
                                        )
                                    }
                                    </div>
                                    <div id="req-prop-details">
                                        <div id="left-details">
                                            <NavLink to={`/PropertyDetails/${item._id}`}><h3>{item.property_name}</h3></NavLink>
                                            <div id="req-prop-location">
                                                <img src={location} id="location"/>
                                                <p>{item.address}</p>
                                            </div>
                                            <p id="req-prop-des">{item.other_details}</p>
                                            <p id="price">₹{item.price} / Month</p>
                                            {
                                                item.property_type == "Residential"?(
                                                    <div id="req-prop-bed">
                                                        <p>{item.beds} Beds</p>
                                                        <p>{item.bathrooms} Bathrooms</p>
                                                    </div>
                                                ):(
                                                    <div id="req-prop-bed">
                                                        <p>{item.area} Sqft</p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div id="req-right-details">
                                            <button onClick={ ()=>{deleteProperty(item._id)} }>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ):(
                    <p>You haven't requested any property yet !</p>
                )
            }
            <Footer/>
        </div>
    )
}