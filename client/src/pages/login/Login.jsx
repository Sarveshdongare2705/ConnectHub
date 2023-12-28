import React, { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Login =() =>{
    //use login function from authcontext
    const {login} = useContext(AuthContext)
    const navigate = useNavigate()
        //for inputs
        const [inputs,setInputs] = useState({
            username:"",
            password:"",
        })
        const [Err,setErr] = useState(null);

        const handleChange = e => {
            setInputs(prev=>({...prev , [e.target.name]:e.target.value}));
        }

        const handleLogin = async  (e) =>{
            e.preventDefault();
            try{
                await login(inputs);
                navigate("/")
            }catch(err){
                setErr(err.response.data)
            }};
    return(
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Connect<br></br>Hub</h1>
                    <p>Your social journey continues here! Log in to ConnectHub to dive into a world of networks.</p>
                    <span>Don't have an account?</span>
                    <Link to="/register"><button>Register</button></Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form action="">
                        <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
                        <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                        {Err && Err}
                        <button onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login