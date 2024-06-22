import { Navbar } from "../Components/Navbar";
import "../CSS/PostedPropertyPage.css"
import img1 from "../Assets/Images/img5.jpeg"
import img2 from "../Assets/Images/img3.jpg"
import img3 from "../Assets/Images/img4.jpg"
import location from "../Assets/Icons/location.png"
import { Footer } from "../Components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';
import { NavLink } from "react-router-dom";

export function PostedPropertyPage(){

    const token = sessionStorage.getItem('token'); // or wherever you store your token

    const  [ postedProperties, setPostedProperties ] = useState([]);

    useEffect(()=>{
        getPropertyDetailsByUserId();
    },[]);

    async function getPropertyDetailsByUserId(){
        // const id = "667570fbcb61e30137e6543d";
        const decodedToken = jwtDecode(token);
        const id = decodedToken.user;
        const res = await axios.post(`https://realestate-fullstack-backend-app.onrender.com/getPropertiesByUserID?propId=${id}`,null,{
            headers : {
                "authorization": token,
            }
        });
        // console.log("Posted Properties are: ",res.data.records);
        console.log(res.data.records);
        // const imgPath =  res.data.records.files;
        // const temp2 = imgPath[0].split("\\");
        // const last = temp2[temp2.length-1];
        // console.log("jack",last);

        const processedRecords = res.data.records.map(record => {
            const fixedFiles = record.files.map(file => {
                const temp2 = file.split("\\");
                const last = temp2[temp2.length - 1];
                return `https://realestate-fullstack-backend-app.onrender.com/filesUploaded/${last}`;
            });
            return {
                ...record,
                fixedFiles
            };
        });


        setPostedProperties(processedRecords);
    }

    async function removeProperty(propId){
        const res = await axios.delete(`https://realestate-fullstack-backend-app.onrender.com/deletePropertyByPropertyID?propId=${propId}`,{
            headers : {
                "authorization": token,
            }
        });
        console.log(res);
        window.location = "/PostedPropertyPage";
    }

    async function soldOrNot(soldOrNot,propId){
        const res = await axios.put("https://realestate-fullstack-backend-app.onrender.com/updateSold",
            {
                sold : soldOrNot,
                _id : propId
            },
            {
                headers : {
                    "authorization": token,
                }
            });
        // console.log(res);
        window.location = "/PostedPropertyPage";
    }


    return(
        <div>
            <Navbar/>
            <h2 id="posted-property-title">Properties Posted :</h2>
            {
                postedProperties && postedProperties.length>0 ? (
                    postedProperties.map((property,id)=>(
                        <div id="posted-prop-cont" key={id}>
                            <div id="posted-property-card">
                                <div id="posted-prop-image-box">
                                    {
                                        console.log("posted prop image : ",property.fixedFiles[0])
                                    }
                                    <img src={property.fixedFiles[0]} alt="image"/>
                                </div>
                                <div id="posted-prop-details">
                                    <div id="left-details">
                                        <NavLink to={`/PropertyDetails/${property._id}`}><h3>{property.property_name}</h3></NavLink>
                                        <div id="posted-prop-location">
                                            <img src={location} id="location"/>
                                            <p>{property.address}</p>
                                        </div>
                                        <p id="posted-prop-des">{property.other_details}</p>
                                        {/* <p id="price">$3,200 / Month</p> */}
                                        <p id="price">₹.{ property.price }</p>
                                        <div id="posted-prop-bed">
                                            <p>{ property.beds } Beds</p>
                                            <p>{ property.bathrooms } Bathrooms</p>
                                        </div>
                                    </div>
                                    <div id="right-details">
                                        <button>Edit</button>
                                        <button onClick={()=>{ removeProperty(property._id) }}>Remove</button>
                                        <button>View Unread Messsages</button>
                                        {
                                            property.sold == "sold" ?(
                                                <button id="btn-sold" onClick={()=>{ soldOrNot("open", property._id) }}>Sold Out</button>
                                            ):(
                                                <button onClick={()=>{ soldOrNot("sold", property._id) }}>Sold Out</button>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ):(<p>No Property has been posted yet !</p>)
            }
            <Footer/>
        </div>
    )
}