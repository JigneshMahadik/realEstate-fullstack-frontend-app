import { Navbar } from "../Components/Navbar";
import img3 from "../Assets/Images/img4.jpg"
import "../CSS/PropertyDetails.css" 
import location from "../Assets/Icons/location.png"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
import {jwtDecode} from 'jwt-decode';
import { toast } from "react-toastify";


export function PropertyDetails(){

    const { propId } = useParams();
    const [propertyDetails, setPropertyDetails] = useState();
    const [ propertyImage, setPropertyImage ] = useState();

    useEffect(()=>{
        getPropertyById(propId);
        // console.log("id:",propId);
    },[propId]);

    async function getPropertyById(id){
        // const response = await axios.post(`http://localhost:8082/getPropertyById?propId=${id}`);
        const response = await axios.post(`https://realestate-fullstack-backend-app-1.onrender.com/getPropertyById?propId=${id}`);
        // "C:\Geekster_Assignment\NodeJS\MCT_(15-6-24)\backend\filesUploaded\img4.jpg"
        // console.log("jack",response);
        const imgPath =  response.data.records.files;
        // console.log("total images are :", imgPath[0]);

        // console.log("path is", imgPath);
        // const temp2 = imgPath.split("\\");
        // const last = temp2[temp2.length-1];
        // const newURL = `http://localhost:8082/filesUploaded/${last}`
        // console.log("new url: ", newUR);
        
        // const data = imgPath.map(file => {
            const temp2 = imgPath[0].split("\/");
            const last = temp2[temp2.length-1];
            // console.log("last",`http://localhost:8082/filesUploaded/${last}`);
            // setPropertyImage(`http://localhost:8082/filesUploaded/${last}`);
            setPropertyImage(`https://realestate-fullstack-backend-app-1.onrender.com/filesUploaded/${last}`);
            // return;
        // });

        setPropertyDetails(response.data.records);
    }
    // console.log("detail",propertyDetails);

    async function sendMessage(propId){
        const token = sessionStorage.getItem('token'); // or wherever you store your token
        const decodedToken = jwtDecode(token);
        const id = decodedToken.user;
        const email = decodedToken.email;
        const msg = document.getElementById("msg").value;
        const res = await axios.post(`https://realestate-fullstack-backend-app-1.onrender.com/addRequests?propId=${propId}`,
            {
                userId : id,
                message : msg
            },
            {
                headers : {
                    "authorization": token,
                }
            }
        );
        if(res.status == 200){
            sendEmail(propId,email,token,msg);
            toast.success("Request has been sent to owner");
        }
    }

    async function sendEmail(propId,email,token,msg){
        const response = await axios.post("https://realestate-fullstack-backend-app-1.onrender.com/sendMail",
            {
                emailId : email,
                propertyId : propId,
                messages : msg
            },
            {
                headers : {
                    "authorization": token,
                }
            }
        );
    }

    return(
        <div>
            <Navbar/>
            {/* <div id="prop-det-cont">
                <div id="property-details-images">
                    <img src={img3} />
                </div>
                <div id="prop-det">
                    <div id="prop-sub-cont">
                        <h2>Modern Penthouse in the city with your confort of living</h2>
                    </div>
                </div>
            </div> */}
            
            {/* <div id="property-details-images">
                <img src={img3} />
            </div> */}
            {
                propertyDetails ?(
                    <div class="property-container">
                        <img src={propertyImage} />
                        {/* <img src={img3} /> */}
                        <div id="details-title-cont">
                            <h1 id="prop-det-title">{ propertyDetails.property_name}</h1>
                            {
                                propertyDetails.sold == "sold" ?(
                                    <label id="details-trans-type">Sold</label>        
                                ):(
                                    <label id="details-trans-type">{propertyDetails.transaction_type}</label>
                                )
                            }
                        </div>
                        <div id="prop-det-location">
                            <img src={location} />
                            <p class="address">{propertyDetails.address}, <label id="details-pincode">{propertyDetails.pincode}</label></p>
                        </div>
                        
                        <div class="property-section">
                            <h2 id="prop-det-title">Description</h2>
                            <p>{propertyDetails.other_details}</p>
                        </div>
                        {
                            propertyDetails.property_type == "Residential" ?(
                                <div class="property-section">
                                    <h2>Amenities</h2>
                                    <ul class="amenities-list">
                                        <li>{propertyDetails.furnishing}</li>
                                        <li>{propertyDetails.beds} Beds</li>
                                        <li>{propertyDetails.bathrooms} Bathrooms</li>
                                    </ul>
                                </div>
                            ):(
                                <div class="property-section">
                                    <h2 id="prop-det-title">Area(Sqft)</h2>
                                    <ul class="amenities-list">
                                        <li>{propertyDetails.area} Sqft</li>
                                    </ul>
                                </div>
                            )
                        }
                        <textarea type="text" id="msg" placeholder="Enter your message here..."/>
                        <button class="message-button" onClick={ ()=> sendMessage(propertyDetails._id) }>Send a Message</button>
                    </div>       
                ):(<p>Data not found</p>)
            }
        </div>
    )
}