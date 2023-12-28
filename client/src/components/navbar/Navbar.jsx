import React, { useContext, useState } from "react";
import "./navbar.scss";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";


const Navbar =() =>{

    const [othericons , setOtherIcons] = useState(false);

    const {toggle} = useContext(DarkModeContext)
    const {darkMode} = useContext(DarkModeContext);

    const {currentUser} = useContext(AuthContext)
    return(
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{textDecoration:"none"}}><span>ConnectHub</span></Link>
                <HomeOutlinedIcon className="homeicon" />
                {darkMode ?<WbSunnyOutlinedIcon  onClick={toggle}/> :<DarkModeOutlinedIcon  onClick={toggle}/>}
                <div className="search">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search" />
                </div>
            </div>
            <div className="right">
            <PersonOutlineOutlinedIcon className="righticon" />
            <EmailOutlinedIcon className="righticon" />
            <NotificationsOutlinedIcon className="righticon" />
            {
                othericons?
            <div className="othericons">
            <PersonOutlineOutlinedIcon className="righticon1" /><span>Account</span>
            <EmailOutlinedIcon className="righticon1" /><span>Email</span>
            <NotificationsOutlinedIcon className="righticon1" /><span>Messages</span>
            </div>
            :
            <></>
            }
            <GridViewOutlinedIcon onClick={()=>{setOtherIcons(!othericons)}} className="presser"/>
                <div className="user">
                    <img src={currentUser.profilePic} alt="" />
                    <span>{currentUser.name}</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar