import  express  from "express";
import { getRelationships ,getRelationshipsfollowing, addRelationship , deleteRelationship } from "../controllers/relationship.js";

const router = express.Router()

router.get("/followers" , getRelationships)
router.get("/following" , getRelationshipsfollowing)
router.post("/" , addRelationship)
router.delete("/" , deleteRelationship)

//routes

export default router;