import  Express  from "express";
import { getPosts , addPost} from "../controllers/post.js" 

const router = Express.Router()

router.get("/" , getPosts)
router.post("/",addPost)

//routes

export default router;