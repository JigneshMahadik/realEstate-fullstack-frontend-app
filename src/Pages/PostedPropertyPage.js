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
import { toast } from "react-toastify";


export function PostedPropertyPage(){

    const token = sessionStorage.getItem('token'); // or wherever you store your token

    const  [ postedProperties, setPostedProperties ] = useState([]);
    const [ messages, setMessages ] = useState([]);
    const [editProperty, setEditProperty] = useState(null);


    useEffect(()=>{
        getPropertyDetailsByUserId();
    },[]);

        async function getPropertyDetailsByUserId(){
        // const id = "667570fbcb61e30137e6543d";
        const decodedToken = jwtDecode(token);
        const id = decodedToken.user;
        // const res = await axios.post(`http://localhost:8082/getPropertiesByUserID?propId=${id}`,null,{
            const res = await axios.post(`https://realestate-fullstack-backend-app.onrender.com/getPropertiesByUserID?propId=${id}`,null,{
            headers : {
                "authorization": token,
            }
        });
        // console.log("Posted Properties are: ",res.data.records);
        // console.log(res.data.records);
        // const imgPath =  res.data.records.files;
        // const temp2 = imgPath[0].split("\\");
        // const last = temp2[temp2.length-1];
        // console.log("jack",last);

        const processedRecords = res.data.records.map(record => {
            const fixedFiles = record.files.map(file => {
                const temp2 = file.split("\/");
                const last = temp2[temp2.length - 1];
                // return `http://localhost:8082/filesUploaded/${last}`;
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
        // const res = await axios.delete(`http://localhost:8082/deletePropertyByPropertyID?propId=${propId}`,{
            const res = await axios.delete(`https://realestate-fullstack-backend-app.onrender.com/deletePropertyByPropertyID?propId=${propId}`,{
            headers : {
                "authorization": token,
            }
        });
        // console.log(res);
        window.location = "/PostedPropertyPage";
    }

    async function soldOrNot(soldOrNot,propId){
        // const res = await axios.put("http://localhost:8082/updateSold",
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

    // const popupBtn = document.getElementById('popupBtn');
    // const popup = document.getElementById('popup');
    // const closeBtn = document.getElementById('closeBtn');

    // popupBtn.addEventListener('click', function() {
    //     popup.style.display = 'block';
    // });

    // closeBtn.addEventListener('click', function() {
    //     popup.style.display = 'none';
    // });

    async function openPopup(propId){
        const token = sessionStorage.getItem('token'); // or wherever you store your token
        const decodedToken = jwtDecode(token);
        const id = decodedToken.user;
        // const res = await axios.post(`http://localhost:8082/fetchRequests?propId=${propId}`,null,
        const res = await axios.post(`https://realestate-fullstack-backend-app.onrender.com/fetchRequests?propId=${propId}`,null,
            {
                headers : {
                    "authorization": token,
                }
            }
        );
        const data = res.data.data.requests;
        setMessages(data);
        // console.log("messages are : ",messages);
        // console.log(res.data.data.requests);
        document.getElementById("msg-popup").style.display = 'block';

    }

    function closePopup(){
        document.getElementById("msg-popup").style.display = 'none';
    }

    // console.log("messages are : ",messages);

    // Open Edit property Popup Start.
    function openEditPopup(property){
        setEditProperty(property);
        document.getElementById("edit-popup").style.display = "block";
    }
    // console.log("jack is :",editProperty);

    async function handleEditProperty(e){
        e.preventDefault();
        try{
            const propid = e.target.property_id.value;
            // const res = await axios.put(`http://localhost:8082/editPropertyDetails?propId=${propid}`,{
                const res = await axios.put(`https://realestate-fullstack-backend-app.onrender.com/editPropertyDetails?propId=${propid}`,{
                'property_type' : e.target.property_type.value,
                'transaction_type' : e.target.transaction_type.value,
                'property_name' : e.target.property_name.value,
                'pincode' : e.target.pincode.value,
                'address' :e.target.address.value,
                'propertySubtype' : e.target.propertySubtype.value,
                'price' : e.target.price.value,
                'beds' : e.target.beds.value,
                'bathrooms' : e.target.bathrooms.value,
                'furnishing' : e.target.furnishing.value,
                'other_details' : e.target.other_details.value,
                'area' : e.target.area.value
            }, {
                headers: {
                    "authorization": token,
                }
            });
            // console.log("new is asdsd",propid);
            toast.success("Property details updated Successfully");
        } 
        catch (error) {
            console.log(error);    
        }
    }

    function closeEditPopup() {
        setEditProperty(null);
        document.getElementById("edit-popup").style.display = 'none';
    }
    // Open Edit property Popup End.

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
                                    {/* {
                                        console.log("posted prop image : ",property.fixedFiles[0])
                                    } */}
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
                                        {
                                                property.property_type == "Residential" ?(
                                                    <div id="posted-prop-bed">
                                                        <p>{ property.beds } Beds</p>
                                                        <p>{ property.bathrooms } Bathrooms</p>
                                                    </div>       
                                                ):(
                                                    <div id="posted-prop-bed">
                                                        <p>{ property.area } Sqft</p>
                                                    </div>
                                                )
                                            }
                                    </div>
                                    <div id="right-details">
                                        <button onClick={()=>{ openEditPopup(property) }}>Edit</button>
                                        <button onClick={()=>{ removeProperty(property._id) }}>Remove</button>
                                        <button id="popupBtn" onClick={()=> openPopup(property._id) }>View Unread Messsages</button>
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
                ):(<p id="no-posted-prop">No Property has been posted yet !</p>)
            }

            {/* Popup start */}
            <div className="msg-popup" id="msg-popup">
                <div className="msg-popup-content">
                    <span className="msg-close-btn" id="msg-closeBtn" onClick={()=> closePopup() }>&times;</span>
                    <h2>Unread Messages</h2>
                    {
                        messages.length > 0 ? (
                            messages.map((item,id)=>{
                                return(
                                    <div className="msg-message-item" key={id}>
                                        <p id="msg-title"><strong>Message : </strong>{item.message}</p>
                                        <p id="msg-data"><strong></strong>{item.userId.first_name}</p>
                                        <p id="msg-data"><strong></strong>{item.userId.email}</p>
                                        <p id="msg-data"><strong></strong>{item.userId.mobile_number}</p>
                                    </div>
                                )
                            })
                        ):(<p>No requests for this property is available !</p>)
                    }
                </div>
            </div>
            {/* Popup End */}

            <div className="edit-popup" id="edit-popup">
                <div className="edit-popup-content">
                    <span className="edit-close-btn" id="edit-closeBtn" onClick={closeEditPopup}>&times;</span>
                    <h2>Edit Property</h2>
                    <form id="edit-form" onSubmit={handleEditProperty}>
                        {
                            editProperty ?(
                                        <div>
                                             <input type="hidden" name="property_id" value={editProperty._id} />
                                            <div className="form-row">
                                                <select id="drop-down" name="property_type" value={editProperty.property_type}>
                                                    <option value="Property Type">Property Type</option>
                                                    <option value="Residential">Residential</option>
                                                    <option value="Commercial">Commercial</option>
                                                </select>                            
                                                <select id="drop-down" name="transaction_type" value={editProperty.sell_or_rent}>
                                                    <option value="Sell">Sell</option>
                                                    <option value="Rent">Rent</option>
                                                </select>
                                            </div>
                                            <input type="text" name="property_name" placeholder="Property Name" defaultValue={editProperty.property_name} required />
                                            <input type="text" name="address" defaultValue={editProperty.address} placeholder="Address" required />
                                            <div className="form-row">
                                                <input type="text" name="pincode" defaultValue={editProperty.pincode} placeholder="Pincode" required />
                                                <input type="text" name="propertySubtype" defaultValue={editProperty.propertySubtype} placeholder="Flat / Villa / House / PG / Farmhouse" required />
                                            </div>
                                            <div className="form-row">
                                                <input type="text" name="price" placeholder="Price" defaultValue={editProperty.price}  required />
                                                <input type="number" name="beds" placeholder="Beds" defaultValue={editProperty.beds}  />
                                                <input type="number" name="bathrooms" placeholder="Bathrooms" defaultValue={editProperty.bathrooms}  />
                                            </div>
                                            <div className="form-row">
                                                <input type="text" name="furnishing" placeholder="Furnishing" defaultValue={editProperty.furnishing}  />
                                                <input type="text" name="area" placeholder="Area(Sqft)" defaultValue={editProperty.area} />
                                            </div>
                                            <textarea name="other_details" placeholder="Other Details" defaultValue={editProperty.other_details} ></textarea>
                                            
                                            {/* <div id="edit-posted-img-cont">
                                                <input type="file" id="edit-img-upload"/>
                                                <div id="uploaded-images">
                                                    <div id="uploaded">
                                                        <div id="upload-img-box">
                                                            <img src={img3} alt="NA" />
                                                        </div>
                                                        <div id="btn-remove">Remove</div>
                                                    </div>
                                                    <div id="uploaded">
                                                        <div id="upload-img-box">
                                                            <img src={img3} alt="NA" />
                                                        </div>
                                                        <div id="btn-remove">Remove</div>
                                                    </div>
                                                    <div id="uploaded">
                                                        <div id="upload-img-box">
                                                            <img src={img3} alt="NA" />
                                                        </div>
                                                        <div id="btn-remove">Remove</div>
                                                    </div>
                                                </div>
                                            </div> */}
                                            <button type="submit">Update Property</button>
                                        </div>
                            ):(
                                <p></p>
                            )
                        }
                    </form>
                </div>
            </div>


          
            <Footer/>
        </div>
    )
}