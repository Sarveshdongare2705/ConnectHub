import  express  from "express";
import { getComments , addComment , totalComments } from "../controllers/comment.js" 

const router = express.Router()
router.get("/" , getComments)
router.post("/" , addComment)
router.get("/total" , totalComments)
//routes

export default router;