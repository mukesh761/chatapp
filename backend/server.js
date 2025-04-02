import express from "express";
import cookieParser from "cookie-parser";

import cors from "cors"
import dotenv from "dotenv"
import { httpServer,app } from "./socket/socket.io.js";

//database connection
import databse from "./database/db.js"

//importing files
import userRoute from "./routes/userRoutes.js"
import messageRoute from "./routes/messageRoute.js"
import { islogin } from "./middleware/islogin.js";

//using env file
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:"https://chatapp-frontend-6h5u.onrender.com",
methods:["GET","POST","PUT","DELETE"],
allowedHeaders:["Content-Type","Authorization"],
    credentials:true}))

app.get("/",(req,res)=>{
    return res.json({message:"this is main route"})
})
app.use("/user",userRoute)
app.use("/message",messageRoute)


httpServer.listen(3000,()=>{
    console.log(`http://localhost:3000`);
})
