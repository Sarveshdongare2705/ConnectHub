import React, { useState } from "react";
import "./register.scss";
import Login from "../login/Login";
import { Await, Link, Navigate } from "react-router-dom";
import axios, { Axios } from "axios";

const Register =() =>{


    //for inputs
    const [inputs,setInputs] = useState({
        username:"",
        name:"",
        password:"",
        email:"",
    })

    const [Err,setErr] = useState(null);

    const handleChange = e => {
        setInputs(prev=>({...prev , [e.target.name]:e.target.value}));
    }
    //console.log(inputs);

    //api part
    const handleSubmit = async(e) =>{
        e.preventDefault()

        try{
            const res = await  axios.post("http://localhost:8800/api/auth/register" , inputs)
            setErr(res.data)
        }
        catch(err){
            setErr(err.response.data)
        }
    };


    return(
        <div className="register">
            <div className="card">
                <div className="left">
                    <h1>Connect<br></br>Hub</h1>
                    <p>Your social journey continues here! Register Now  to ConnectHub to dive into a world of networks.</p>
                    <span>Already have an account?</span>
                    <Link to="/login"><button>Login</button></Link>
                </div>
                <div className="right">
                    <h1>Register</h1>
                    <form action="">
                        <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
                        <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
                        <input type="text" placeholder="Name" name="name" onChange={handleChange}/>
                        <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                        {Err && Err}
                        <button onClick={handleSubmit}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register