import { NavLink } from "react-router-dom";
import "../CSS/Signup.css"
import axios from "axios";


export function Signup(){

    async function Signup(event){
        event.preventDefault();
        const Fname = document.getElementById("firstname").value;
        const Lname = document.getElementById("lastname").value;
        const Email = document.getElementById("email").value;
        const Mobile = document.getElementById("mobile").value;
        const Password = document.getElementById("password").value;
        
        try {
            // await axios.post("http://localhost:8082/Signup",{
                await axios.post("https://realestate-fullstack-backend-app.onrender.com/Signup",{
                first_name : Fname,
                last_name : Lname,
                email : Email,
                mobile_number : Mobile,
                password : Password
            });
            window.location = "/Login";
        } 
        catch (error) {
            console.log(error);
        }
    }

    return(
        <div>
            <div className="signup-container">
                <h2>Sign Up</h2>
                {/* <form action="/signup" method="POST"> */}
                <form method="POST" onSubmit={Signup}>
                    <div id="name-cont">
                        <input type="text" name="firstname" id="firstname" placeholder="First Name" required/>
                        <input type="text" name="lastname" id="lastname" placeholder="Last Name" required/>
                    </div>
                    <input type="text" name="mobile" id="mobile" placeholder="Mobile Number" required/>
                    <input type="text" name="email" id="email" placeholder="Email" required/>
                    <input type="password" name="password" id="password" placeholder="Password" required/>
                    <button type="submit">Signup</button>
                    <br></br><br></br>
                    <p id="dont-have-acc">Already have an account ?</p>
                    <NavLink to="/Login"><p id="btn-signup">Login</p></NavLink>
                    <NavLink to="/"><p id="btn-home">&laquo;Home Page</p></NavLink>
                    <br></br>
                </form>
            </div>
        </div>
    )
}