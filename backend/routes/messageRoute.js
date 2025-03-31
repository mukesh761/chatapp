import express from "express";
const router=express.Router();

//importing files

import { islogin } from "../middleware/islogin.js";
import { sendMessage } from "../controller/messageController.js";

router.get("/",(req,res)=>{
    return res.send("this is message router")
})

router.post("/send/:senderId",islogin,sendMessage)
export default router;