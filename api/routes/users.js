import  Express  from "express";
import { getProfile , } from "../controllers/user.js" 

const router = Express.Router()

//routes
router.get("/" , getProfile)

export default router;