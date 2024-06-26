import "../CSS/PropertyList.css"
import img1 from "../Assets/Images/img3.jpg"
import img2 from "../Assets/Images/img4.jpg"
import img3 from "../Assets/Images/img5.jpeg"
import location from "../Assets/Icons/location.png"
import { useEffect, useState } from "react"
import axios from "axios"
import { NavLink } from "react-router-dom"

export function PropertyList(){

    const [ records, setRecords ] = useState([]);
    
    useEffect(()=>{
        getAllPosts();
    },[]);

    async function getAllPosts(){
        // const token = sessionStorage.getItem('token'); // or wherever you store your token

        // const data = await axios.get("http://localhost:8082/getAllProperties");
        const data = await axios.get("https://realestate-fullstack-backend-app.onrender.com/getAllProperties");

       // Process the records to fix the file URLs
       const processedRecords = data.data.records.map(record => {
            const fixedFiles = record.files.map(file => {
                // Convert the file path to a URL that can be accessed by the browser
                // const fixedFilePath = file.replace(/\\/g, "/");
                const temp2 = file.split("\/");
                const last = temp2[temp2.length-1];
                const folder = temp2[temp2.length-2];
                // console.log("last",folder);
                return `http://localhost:8082/filesUploaded/${last}`;
                // http://localhost:8082/filesUploaded/img4.jpg
            });
            return {
                ...record,
                files: fixedFiles
            };
        });

        // console.log("data is",data.data.records);
        // setRecords(data.data.records);
        setRecords(processedRecords);
    }
    console.log("file is",records);
    // records.map((item,id)=>{
    //     console.log("Map data is",item.files[0]);
    // })
    // const temp = "C:/Geekster_Assignment/NodeJS/MCT_(15-6-24)/backend/filesUploaded/img4.jpg";
    // const temp2 = temp.split("/");
    // const last = temp2[temp2.length-1];
    // const folder = temp2[temp2.length-2];
    // console.log(folder);


    // async function getPropertyById(propId){
    //     // console.log(propId);
    //     const data = await axios.post(`http://localhost:8082/getPropertyById/?propId=${propId}`);
    //     console.log(data.data.records);
    // }



    return(
        <div>
            <div id="property-list-cont">
                <div id="list-header">
                    <h2>Property List</h2>
                    <select>
                        <option>Filter</option>
                        <option>Low - High</option>
                        <option>High - Low</option>
                    </select>
                </div>

                <div id="property-list">
                    {
                        records.length > 0 ?(
                            records.map((item,id)=>{
                                return(
                                    // {/* Property Card */}
                                    <NavLink to={`/PropertyDetails/${item._id}`} id="prop-list-link" key={id}>
                                        <div id="property-card">
                                            <div id="image-cont">
                                                {/* {
                                                    console.log("Console image: ",item.files[0])
                                                } */}
                                                <img src={item.files[0]} id="property-img" alt="image"/>
                                            </div>
                                            <div id="detail-cont">
                                                <h2>{item.property_name}</h2>
                                                <p id="address">
                                                    <img src={location} id="location"/>
                                                    {item.address}
                                                </p>
                                                <p>{item.other_details}</p>
                                                <div id="prop-price">
                                                    {/* <p>{item.price} / Month</p> */}
                                                    <p>₹.{item.price}</p>
                                                </div>
                                                <div id="list-rooms">
                                                    <div id="rooms-left">
                                                        <p>{item.beds} Beds</p>
                                                        <p>{item.bathrooms} Bathrooms</p>
                                                    </div>
                                                    {
                                                        item.sold == "sold" ? (
                                                            <p id="type-right">Sold</p>
                                                        ):(
                                                            <p id="type-right">{item.transaction_type}</p>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </NavLink>
                                )
                            })
                        ):(<p>Records not found !</p>)
                    }
                </div>

            </div>
        </div>
    )
}