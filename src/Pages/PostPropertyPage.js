import { Footer } from "../Components/Footer";
import { Navbar } from "../Components/Navbar";
import { PostProperty } from "../Components/PostProperty";


export function PostPropertyPage(){
    return(
        <div>
            <Navbar/>
            <PostProperty/>
            <Footer/>
        </div>
    )
}