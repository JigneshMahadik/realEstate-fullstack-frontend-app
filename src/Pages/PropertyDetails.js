import { Navbar } from "../Components/Navbar";
import img3 from "../Assets/Images/img4.jpg"
import "../CSS/PropertyDetails.css" 
import location from "../Assets/Icons/location.png"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"

export function PropertyDetails(){

    const { propId } = useParams();
    const [propertyDetails, setPropertyDetails] = useState();
    const [ propertyImage, setPropertyImage ] = useState();

    useEffect(()=>{
        getPropertyById(propId);
        // console.log("id:",propId);
    },[propId]);

    async function getPropertyById(id){
        const response = await axios.post(`https://realestate-fullstack-backend-app.onrender.com/getPropertyById?propId=${id}`);
        // "C:\Geekster_Assignment\NodeJS\MCT_(15-6-24)\backend\filesUploaded\img4.jpg"
        const imgPath =  response.data.records.files;
        console.log("total images are :", imgPath[0]);

        console.log("path is", imgPath);
        // const temp2 = imgPath.split("\\");
        // const last = temp2[temp2.length-1];
        // const newURL = `http://localhost:8082/filesUploaded/${last}`
        // console.log("new url: ", newUR);
        
        // const data = imgPath.map(file => {
            const temp2 = imgPath[0].split("\/");
            const last = temp2[temp2.length-1];
            // console.log("last",`http://localhost:8082/filesUploaded/${last}`);
            setPropertyImage(`https://realestate-fullstack-backend-app.onrender.com/filesUploaded/${last}`);
            // return;
        // });

        setPropertyDetails(response.data.records);
    }
    console.log("detail",propertyDetails);

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
                            <h2>Description</h2>
                            <p>{propertyDetails.other_details}</p>
                        </div>
                        
                        <div class="property-section">
                            <h2>Amenities</h2>
                            <ul class="amenities-list">
                                <li>{propertyDetails.furnishing}</li>
                                <li>{propertyDetails.beds} Beds</li>
                                <li>{propertyDetails.bathrooms} Bathrooms</li>
                            </ul>
                        </div>

                        <button class="message-button">Send a Message</button>
                    </div>       
                ):(<p>Data not found</p>)
            }
        </div>
    )
}