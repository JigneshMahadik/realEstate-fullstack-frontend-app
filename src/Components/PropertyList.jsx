import "../CSS/PropertyList.css";
import left from "../Assets/Icons/left.png";
import right from "../Assets/Icons/right.png";
import location from "../Assets/Icons/location.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProperty } from "../slices/propertySlice";
import img3 from "../Assets/Images/img4.jpg"

export function PropertyList() {
    const dispatch = useDispatch();
    const [ pageNo, setPageNo ] = useState(0);
    
    useEffect(() => {
        getAllPosts();
    }, [pageNo]);

    async function getAllPosts() {
        const data = await axios.get(`https://realestate-fullstack-backend-app-1.onrender.com/getAllProperties?pageNo=${pageNo}`);

        if(data.data.total_records >= 3){
            const processedRecords = data.data.records.map(record => {
                const fixedFiles = record.files.map(file => {
                    const temp2 = file.split("/");
                    const last = temp2[temp2.length - 1];
                    return `https://realestate-fullstack-backend-app-1.onrender.com/filesUploaded/${last}`;
                });
                return {
                    ...record,
                    files: fixedFiles
                };
            });
    
            dispatch(setProperty(processedRecords));
        }
    }
    const storedData = useSelector((state) => state.property.properties);

    
    // Filter based on price.
    function handleFilter(e){
        const filterOpt = e.target.value;
        if(filterOpt == "lh"){
            dispatch(setProperty([...storedData].sort((a, b) => a.price - b.price)));
        }
        else if(filterOpt == "hl"){
            dispatch(setProperty([...storedData].sort((a, b) => b.price - a.price)));
        }
    }

    return (
        <div>
            <div id="property-list-cont">
                <div id="list-header">
                    <h2>Property List</h2>
                    <select onChange={handleFilter}>
                        <option value="null">Filter</option>
                        <option value="lh">Low - High</option>
                        <option value="hl">High - Low</option>
                    </select>
                </div>

                <div id="property-list">
                    {storedData.length > 0 ? (
                        storedData.map((item, id) => (
                            <NavLink to={`/PropertyDetails/${item._id}`} id="prop-list-link" key={id}>
                                <div id="property-card">
                                    <div id="image-cont">
                                        {/* <img src={item.files[0]} id="property-img" alt="image" /> */}
                                        <img src={img3} id="property-img" alt="image" />
                                    </div>
                                    <div id="detail-cont">
                                        <h2>{item.property_name}</h2>
                                        <p id="address">
                                            <img src={location} id="location" />
                                            {item.address}
                                        </p>
                                        <p>{item.other_details}</p>
                                        <div id="prop-price">
                                            <p>₹.{item.price}</p>
                                        </div>
                                        <div id="list-rooms">
                                            {
                                                item.property_type == "Residential" ?(
                                                    <div id="rooms-left">
                                                        <p>{item.beds} Beds</p>
                                                        <p>{item.bathrooms} Bathrooms</p>
                                                    </div>
                                                ):(
                                                    <div id="rooms-left">
                                                        <p>{item.area} Sqft</p>
                                                    </div>
                                                )
                                            }
                                            {item.sold === "sold" ? (
                                                <p id="type-right">Sold</p>
                                            ) : (
                                                <p id="type-right">{item.transaction_type}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        ))
                    ) : (
                        <p>Records not found!</p>
                    )}
                </div>
                <img src={left} id="left-arrow" alt="left-arrow" onClick={() => {
                        if (pageNo > 0) {
                            setPageNo(pageNo - 1);
                        } else {
                            setPageNo(0);
                        }
                    }}/>
                <img src={right} id="right-arrow" alt="right-arrow" onClick={() => setPageNo(pageNo + 1)} />
            </div>
        </div>
    );
}
