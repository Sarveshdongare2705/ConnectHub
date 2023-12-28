import {db} from "../connect.js"
import jwt from "jsonwebtoken";
import moment from "moment";
export const getRelationships =(req,res)=>{
        const q = "select followeruserId from relationships as r where r.followeduserId = ? ";
        db.query(q ,[req.query.followeduserId], (err,data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json(data.map(relationship=>relationship.followeruserId))
        })
}
export const getRelationshipsfollowing =(req,res)=>{
    const q = "select followeduserId from relationships as r where r.followeruserId = ? ";
    db.query(q ,[req.query.followeduserId], (err,data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data.map(relationship=>relationship.followeduserId))
    })
}








//add a like
export const addRelationship =(req,res) =>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token , "secretkey" , (err , userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const q = "insert into relationships(`followeruserId`, `followeduserId`) values (?)";

        const values = [
            userInfo.id,
            req.query.userId,
        ]


        db.query(q ,[values], (err,data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("User has been folowed")
        })
    })
}

export const deleteRelationship =(req,res) =>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token , "secretkey" , (err , userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const q = "delete from relationships where `followeruserId` = ? and `followeduserId` = ?";

        db.query(q ,[userInfo.id , req.query.userId], (err,data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("User has been unfollowed")
        })
    })
}