import React, { useContext } from "react";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Home from "./pages/home/Home.jsx";
import Profile from "./pages/profile/Profile.jsx";
import {createBrowserRouter , Navigate, Outlet , RouterProvider, Routes} from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import Leftbar from "./components/leftbar/Leftbar.jsx";
import Rightbar from "./components/rightbar/Rightbar.jsx";
import "./style.scss";
import { DarkModeContext } from "./context/darkModeContext.js";
import { AuthContext } from "./context/authContext.js";

import {QueryClient , QueryClientProvider} from '@tanstack/react-query';

function App() {

  const {currentUser} = useContext(AuthContext) 
  const {darkMode} = useContext(DarkModeContext)

  const queryClient = new QueryClient()

  function Layout(){
    return(
      <QueryClientProvider client={queryClient}>
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <Navbar />
      <div style={{display:"flex"}}>
        <Leftbar />
        <div style={{flex : 6}}>
          <Outlet />
        </div>
        <Rightbar />
      </div>
      </div>
      </QueryClientProvider>
    )
  };

  const ProtectedRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate  to="/login"/>
    }
    return children;
  }


  const routes = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><Layout /></ProtectedRoute>,
      children:[
        {
          path:"/",
          element:<Home />
        },
        {
          path:"/profile/:id",
          element:<Profile />
        }
      ]
    },
    {
      path : "/login",
      element : <Login />
    },
    {
      path: "/register",
      element: <Register />
    }
  ])
  return (
    <div className="App">
     <RouterProvider router={routes} />
    </div>
  );
}

export default App;
