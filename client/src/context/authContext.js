import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{

    //because we are going to use the data after login

    const [currentUser , setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = async (inputs)=>{
        const res = await axios.post("http://localhost:8800/api/auth/login" , inputs , {
            withCredentials:true, //if we not write this we may encounter problems related to cookies
        });
        setCurrentUser(res.data) //backend sends user data remembaer

    }

    useEffect(() =>{
        localStorage.setItem("user" , JSON.stringify(currentUser))
    } , [currentUser])

    return (
        <AuthContext.Provider value={{currentUser , login}}>
            {children}
        </AuthContext.Provider>
    );
}