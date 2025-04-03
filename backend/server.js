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
const corsOptions = {
    origin: 'https://chatapp-frontend-6h5u.onrender.com',  // Replace with your frontend's URL (React dev server)
    credentials: true,
   // Allow credentials (cookies)
 };
 // app.use(cors(corsOptions))


app.get("/",(req,res)=>{
    return res.json({message:"this is main route"})
})
app.use("/user",userRoute)
app.use("/message",messageRoute)


httpServer.listen(3000,()=>{
    console.log(`http://localhost:3000`);
})
