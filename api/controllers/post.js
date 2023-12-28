import {db} from "../connect.js"
import jwt from "jsonwebtoken";
import moment from "moment";
//fetching
export const getPosts = (req,res) =>{

    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token , "secretkey" , (err , userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const q = userId ? `Select p.pid as postId , p.pdesc as pdesc , p.pimg as pimg , u.id as userId, u.name as name , u.profilePic as profilePic , p.postdate as postdate from posts as p join users as u on (u.id = p.userId)
        where p.userId = ?`
        : `Select p.pid as postId , p.pdesc as pdesc , p.pimg as pimg , u.id as userId, u.name as name , u.profilePic as profilePic , p.postdate as postdate from posts as p join users as u on (u.id = p.userId)
        left join relationships as r on(p.userId=r.followeduserId) where r.followeruserId = ? or p.userId = ? order by p.postdate desc`;
        
        const values = userId ? [userId] : [userInfo.id , userInfo.id];
        db.query(q ,values, (err,data) => {
            if(err) return res.status(500).json(err);
    
            return res.status(200).json(data)
        })
    })
}

//posting 
export const addPost = (req,res) =>{

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token , "secretkey" , (err , userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const q = "insert into posts(`pdesc` , `pimg` , `postdate` , `userId` ) values (?)";

        const values = [
            req.body.desc,
            req.body.img,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id
        ]


        db.query(q ,[values], (err,data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("Post has been created")
        })
    })
}
