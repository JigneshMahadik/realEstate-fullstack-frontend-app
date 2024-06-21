import "../CSS/Login.css"
import { NavLink } from "react-router-dom"
import axios from "axios";

export function Login(){

    async function Login(event){
        event.preventDefault();

        const emailId = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try{
            const res = await axios.post("https://realestate-fullstack-backend-app.onrender.com/Login",
            {
                email : emailId,
                password : password
            });
            sessionStorage.setItem("token",res.data.token);
            window.location = "/";
        }
        catch(e){
            console.log(e);
        }
    }

    return(
        <div>
            {/* <div className="login-container">
                <h2>Login</h2>
                <form method="POST">
                    <input type="text" name="username" placeholder="Email or phone number" required/>
                    <input type="password" name="password" placeholder="Password" required/>
                    <button type="submit">Login</button>
                    <br></br><br></br>
                    <p id="dont-have-acc">Don't have an account ?</p>
                    <NavLink to="/Signup"><p id="btn-signup">Sign Up</p></NavLink>
                    <NavLink to="/"><p id="btn-home">&laquo;Home Page</p></NavLink>
                    <br></br>
                </form>
            </div> */}

            <div class="login-container">
                <h2>Login</h2>
                <form class="login-form" onSubmit={Login}>
                    <input type="text" id="email" name="email" placeholder="Enter your email or name"/>
                    <input type="password" id="password" name="password" placeholder="Enter your password"/>
                    <button type="submit">Login</button>
                    <br></br><br></br>
                    <p id="dont-have-acc">Don't have an account ?</p>
                    <NavLink to="/Signup"><p id="btn-signup">Sign Up</p></NavLink>
                    <NavLink to="/"><p id="btn-home">&laquo;Home Page</p></NavLink>
                    <br></br>
                </form>
            </div>
        </div>
    )
}