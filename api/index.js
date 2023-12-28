import  express  from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import userRoutes from "./routes/users.js"
import relationshipsRoutes from "./routes/relationships.js"
import postRoutes from "./routes/posts.js"
import likeRoutes from "./routes/likes.js"
import commentRoutes from "./routes/comments.js"
import authRoutes from "./routes/auth.js"
const app = express()
app.use(cors({
    origin:"http://localhost:3000",
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

//multer to upload image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      
      cb(null, Date.now() + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
  app.post("/api/upload" , upload.single("file") , (req,res)=>{
    const file = req.file;
    res.status(200).json(file.filename)
  })

app.use("/api/auth" , authRoutes);
app.use("/api/users" , userRoutes);
app.use("/api/relationships" , relationshipsRoutes);
app.use("/api/posts" , postRoutes);
app.use("/api/likes" , likeRoutes);
app.use("/api/comments" , commentRoutes);


app.listen(8800 , ()=>{
    console.log("api working");
})