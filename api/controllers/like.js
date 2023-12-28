import {db} from "../connect.js"
import jwt from "jsonwebtoken";
import moment from "moment";
export const getLikes =(req,res)=>{
        const q = "select l.luserId as userId from likes as l where l.lpostId = ? ";
        db.query(q ,[req.query.postId], (err,data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json(data.map(like=>like.userId))
        })
}

//add a like
export const addLike =(req,res) =>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token , "secretkey" , (err , userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const q = "insert into likes(`luserId`, `lpostId` , `ldate`) values (?)";

        const values = [
            userInfo.id,
            req.query.postId,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ]


        db.query(q ,[values], (err,data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("Post has been liked")
        })
    })
}

export const deleteLike =(req,res) =>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token , "secretkey" , (err , userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const q = "delete from likes where `luserId` = ? and `lpostId` = ?";

        db.query(q ,[userInfo.id , req.query.postId], (err,data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("Post has been not liked")
        })
    })
}