import {db} from "../connect.js"
import jwt from "jsonwebtoken";
import moment from "moment";
export const getComments = (req,res) =>{
    //no need to check cookie 
    const q = `select c.* ,  u.name as name , u.profilePic as profilePic from comments as c
    join users as u on (u.id = c.cuserId) where c.postId = ? order by c.cdate desc`;

    db.query(q , [req.query.postId] , (err,data)=>{
        if(err) return res.status(500).json(err);

        return res.status(200).json(data);
    })
}

//posting 
export const addComment = (req,res) =>{

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token , "secretkey" , (err , userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const q = "insert into comments(`cdesc`, `cdate` , `cuserId` , `postId` ) values (?)";

        const values = [
            req.body.cdesc,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
            req.query.postId,
        ]


        db.query(q ,[values], (err,data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("Comment has been created")
        })
    })
}

//total comments
export const totalComments = (req,res) =>{
    //no need to check cookie 
    const q = `select count(*) as totalComments from comments where postId = ?`;

    db.query(q , [req.query.postId] , (err,data)=>{
        if(err) return res.status(500).json(err);

        return res.status(200).json(data);
    })
}