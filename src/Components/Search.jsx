import "../CSS/Search.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setProperty } from "../slices/propertySlice";
import { toast } from "react-toastify";


export function Search() {
    const dispatch = useDispatch();

    async function searchKeyword() {
        const keywords = document.getElementById("search-keyword").value;
        let type = document.getElementById("type").value;
        if (type === "Buy") {
            type = "Sell";
        }

        try{
            const data = await axios.post("https://realestate-fullstack-backend-app-1.onrender.com/searchKeyword", {
                keyword: keywords,
                transactionType: type
            });

            const processedRecords = data.data.data.map(record => {
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
        catch(error){
            if (error.response) {
                // Server responded with a status other than 2xx
                toast.warn("Result not found !");
                console.log(error.response.data.message || "Something went wrong while searching the property!");
            } else if (error.request) {
                // Request was made but no response was received
                alert("No response received from the server!");
            } else {
                // Something happened in setting up the request
                alert("An error occurred: " + error.message);
            }
        }
    }

    return (
        <div id="main-cont">
            <div id="search-container">
                <div id="search-box">
                    <div id="keyword">
                        <input type="text" placeholder="City / Location / Project..." id="search-keyword" />
                    </div>
                    <select id="type">
                        <option value="Buy">Buy</option>
                        <option value="rent">Rent</option>
                    </select>
                    <button id="btn-search" onClick={searchKeyword}>
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
}
