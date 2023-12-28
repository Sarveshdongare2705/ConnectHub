import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({children}) =>{

    const [darkMode , setdarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);

    const toggle = ()=>{
        setdarkMode(!darkMode)
    }

    useEffect(() =>{
        localStorage.setItem("darkMode" , darkMode)
    } , [darkMode])

    return (
        <DarkModeContext.Provider value={{darkMode , toggle}}>
            {children}
        </DarkModeContext.Provider>
    );
}