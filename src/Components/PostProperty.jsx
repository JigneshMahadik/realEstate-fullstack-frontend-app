import "../CSS/PostProperty.css"
// import uploadImg from "../Assets/Images/img3.jpg"
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";



export function PostProperty() {

    const [files, setFiles] = useState([]);
    // const fileData = files;
    // console.log(files.map(file => file.name));
    // console.log("starting",files);

    useEffect(()=>{

    },[]);

    function handleFileChange(event){
        const newFiles = Array.from(event.target.files);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
    // function removeImage(id){
    //     console.log("id is",id);
    // }

    async function postSubmit(event){
        const token = sessionStorage.getItem('token'); // or wherever you store your token
        if(!token){
            alert("Warning : Please login !")
            return;
        }
        else{
            event.preventDefault();
            const formData = new FormData();
            const propType = document.getElementById("propertyType").value;
            const transactionType = document.getElementById("transactionType").value;
            const name = document.getElementById("name").value;
            const pincode = document.getElementById("pincode").value;
            const address = document.getElementById("address").value;
            const propertySubtype = document.getElementById("propertySubtype").value;
            const price = document.getElementById("price").value;
            var beds = document.getElementById("beds").value;
            var area = document.getElementById("area-sqft").value;
            // if(beds == ""){
            //     beds = 0
            // }
            var bathrooms = document.getElementById("bathrooms").value;
            // if(bathrooms == ""){
            //     bathrooms = 0
            // }
            var furnishing = document.getElementById("furnishing").value;
            // if(furnishing == ""){
            //     furnishing = "null"
            // }
            const otherDetails = document.getElementById("otherDetails").value;
            // const picsUrl = document.getElementById("images").value;
            // console.log("val is",document.getElementById("images").files[0]);

            // if(propType)

            formData.append('property_type', propType)
            formData.append('transaction_type', transactionType)
            formData.append('property_name', name)
            formData.append('pincode', pincode)
            formData.append('address', address)
            formData.append('propertySubtype', propertySubtype)
            formData.append('price', price)
            formData.append('beds', beds)
            formData.append('bathrooms', bathrooms)
            formData.append('furnishing', furnishing)
            formData.append('other_details', otherDetails)
            formData.append('area', area);
            // formData.append('files', picsUrl);

            files.forEach((file) => {
                formData.append('files', file);
            });
            // for (let [key, value] of formData.entries()) {
            //     console.log(`${key}: ${value instanceof File ? value.name : value}`);
            // }
            try{
                const res = await axios.post("http://localhost:8082/postProperty",formData, {
                    // const res = await axios.post("https://realestate-fullstack-backend-app.onrender.com/postProperty",formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "authorization": token,
                    }
                });
                // console.log(res);
                toast.success("Property Posted Successfully");
            } 
            catch (error) {
                console.log(error);    
            }
        }
    }
    
    function propType(event){
        event.preventDefault();
        const type = event.target.value
        
        // Hide input fields based on property type
        if(type == "Commercial"){
            document.getElementById("furnished").style.display = "none";
            document.getElementById("beds").style.display = "none";
            document.getElementById("bathrooms").style.display = "none";
        }
        if(type == "Residential"){
            document.getElementById("furnished").style.display = "block";
            document.getElementById("beds").style.display = "block";
            document.getElementById("bathrooms").style.display = "block";
        }
    }

    const notify = ()=>{
        // toast.success("Property Posted Successfully");
    }

    return (
        <div>
            <h2 id="title">Post a Property</h2>
            <form id="post-main-cont">
                {/* Left Part */}
                <div id="left-part">
                    <div id="drop-down">
                        <label>
                            {/* Type: */}
                            <select name="propertyType" onChange={propType} id="propertyType">
                                <option value="NULL">Property Type</option>
                                <option value="Residential">Residential</option>
                                <option value="Commercial">Commercial</option>
                            </select>
                        </label>
                        <label>
                            {/* Purpose: */}
                            <select name="transactionType" id="transactionType">
                                <option value="sell">Sell</option>
                                <option value="rent">Rent</option>
                            </select>
                        </label>
                    </div>
                    <div id="name-cont">
                        <label>
                            {/* Name: */}
                            <input type="text" name="name" placeholder="Name" id="name"/>
                        </label>
                        <label>
                            {/* Pincode: */}
                            <input type="text" name="pincode" placeholder="Pincode" id="pincode"/>
                        </label>
                    </div>
                    <label>
                        {/* Address: */}
                        <input type="text" name="address" placeholder="Address" id="address"/>
                    </label>
                    <label>
                        {/* Property Type: */}
                        <input type="text" name="propertySubtype" placeholder="Flat / Villa / Plot / House / Farmhouse / PG" id="propertySubtype"/>
                    </label>
                    <div id="price-cont">
                        <label>
                            {/* Price: */}
                            {/* <input type="text" name="price" placeholder="Price: 450/sqft" id="price"/> */}
                            <input type="text" name="price" placeholder="Price" id="price"/>
                        </label>
                        <label>
                            {/* Beds: */}
                            <input type="text" name="beds" placeholder="Beds" id="beds"/>
                        </label>
                        <label>
                            {/* Bathrooms: */}
                            <input type="text" name="bathrooms" placeholder="Bathrooms" id="bathrooms"/>
                        </label>
                    </div>
                    <label id="furnished">
                        {/* Furnishing: */}
                        <input type="text" name="furnishing" placeholder="Furnished / Unfurnished" id="furnishing"/>
                    </label>
                    <label>
                        <input type="text" name="area-sqft" placeholder="Area (Ex : 2000 sq ft)" id="area-sqft"/>
                    </label>
                    <label>
                        {/* Other Details: */}
                        <input type="text" name="otherDetails" placeholder="Other Details you want to add!" id="otherDetails"/>
                    </label>
                </div>
                {/* Right Part */}
                <div id="right-part">
                    <label>
                        <h3>Upload Images:</h3>
                        {/* <input type="file" name="images" multiple onChange={(e)=> setFiles(e.target.files) }/> */}
                        <input type="file" name="images" id="images" onChange={ handleFileChange }/>
                    </label>
                    <div id="uploaded-images">
                        {
                            // console.log("jack",files)
                            files.length > 0 ?(
                                files.map((file,id)=>{
                                    return(
                                        <div id="uploaded" key={id}>
                                            <div id="upload-img-box">
                                                <img src={URL.createObjectURL(file)} alt="NA" />
                                            </div>
                                            <div id="btn-remove" onClick={()=> setFiles(files.filter((_, index) => index !== id)) }>Remove</div>
                                        </div>
                                    )
                                })
                            ):(
                                <p>No images are uploaded !</p>
                            )
                        }
                    </div>
                </div>
                <button type="submit" onClick={postSubmit}>Post a Property</button>
            </form>
        </div>
    );
}
