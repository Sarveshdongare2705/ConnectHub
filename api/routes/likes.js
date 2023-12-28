import  Express  from "express";
import { getLikes , addLike , deleteLike } from "../controllers/like.js" 

const router = Express.Router()

router.get("/" , getLikes)
router.post("/" , addLike)
router.delete("/" , deleteLike)

//routes

export default router;