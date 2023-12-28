import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//register
export const register = (req,res) =>{
    //check if user already exist
    const query1 = "Select * from users where username = ?";
    db.query(query1 , [req.body.username] ,  (err,data)=>{
        if(err) return res.status(500).json(err);

        if(data.length) return res.status(409).json("User already exists");


        //create new user
        //hash password
        const salt = bcrypt.genSaltSync(10);
        const hashpassword = bcrypt.hashSync(req.body.password , salt);

        //now create user
        const query2 = "Insert into users (`username`,`email`,`password`,`name`) values (?)";
        //double [[]] as array of values
        db.query(query2 , [[req.body.username , req.body.email , hashpassword , req.body.name]] , (err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("User has been created")
    })
    })

}

//login
export const login = (req,res) =>{
    //no user present
    const query1 = "Select * from users where username = ?";
    db.query(query1 , [req.body.username] , (err,data)=>{
        if(err) return res.status(500).json(err);

        //no error
        if(data.length==0) return res.status(404).json("User Not Found");


        //correct credentials [0] as only one and first user
        const checkpassword = bcrypt.compareSync(req.body.password , data[0].password)
        if(!checkpassword) return res.status(400).json("Incorrect password and username");//400 means wrong inputs
        
        //jwt cookie token
        //hash token contains userId using that we can do various operations on different pages
        const token = jwt.sign({id:data[0].id }, "secretkey") //want to keep id of user
        const {password , ...others} = data[0];
        res.cookie("accessToken", token , {
            httpOnly:true,
        }).status(200).json(others)//give all info of user instead of password
    
    })
}

//logout
export const logout = (req,res) =>{
    res.clearCookie("accessToken",{
        secure:true,
        sameSite:"none",
    }).status(200).json("User logged out");
}