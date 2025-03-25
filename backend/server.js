import express from "express";
import cookieParser from "cookie-parser";
const app=express();
import cors from "cors"
import dotenv from "dotenv"

//database connection
import databse from "./database/db.js"

//importing files
import userRoute from "./routes/userRoutes.js"
import { islogin } from "./middleware/islogin.js";

//using env file
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:"http://localhost:5173",credentials:true}))

app.get("/",(req,res)=>{
    return res.json({message:"this is main route"})
})
app.use("/user",userRoute)
app.get("/protectedroute",islogin,(req,res)=>{
    res.json(req.user)
})

app.listen(3000,()=>{
    console.log(`http://localhost:3000`);
})