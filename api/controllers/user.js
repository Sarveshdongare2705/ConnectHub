import {db} from "../connect.js";
export const getProfile = (req,res) =>{

    const query = "select u.* from users as u where `id` = ?";

    db.query(query , [req.query.userId] , (err,data)=>{
        if(err) return res.status(500).jsno(err);

        return res.status(200).json(data[0]);
    })
}