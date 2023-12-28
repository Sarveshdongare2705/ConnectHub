import  Express  from "express";
import { login , register , logout } from "../controllers/auth.js" 

const router = Express.Router()

//routes
router.post("/register" , register)
router.post("/login" , login)
router.post("/logout" , logout)

export default router;