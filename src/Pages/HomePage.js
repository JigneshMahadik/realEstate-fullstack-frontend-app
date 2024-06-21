import { Footer } from "../Components/Footer";
import { HomeBanner } from "../Components/HomeBanner";
import { Navbar } from "../Components/Navbar";
import { PropertyList } from "../Components/PropertyList";
import { Search } from "../Components/Search";


export function HomePage(){
    return(
        <div>
            <Navbar/>
            <HomeBanner/>
            <Search/>
            <PropertyList/>
            <Footer/>
        </div>
    )
}