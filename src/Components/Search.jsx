import "../CSS/Search.css"

export function Search(){
    return(
        <div id="main-cont">
            <div id="search-container">
                <div id="search-box">
                    <div id="keyword">
                        <input type="text" placeholder="City / Location / Project..." id="keyword"/>
                    </div>
                    <select id="type">
                        {/* <option>Select Type</option> */}
                        <option>Buy</option>
                        <option>Rent</option>
                    </select>
                    <button id="btn-search">
                        Search
                    </button>
                </div>
            </div>
        </div>
    )
}