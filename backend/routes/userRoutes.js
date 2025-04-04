import express from "express";
const router=express.Router();

//importing files
import { loginUser,signupUser,logoutUser,fetchUser } from "../controller/userController.js";
import { islogin } from "../middleware/islogin.js";

router.get("/",(req,res)=>{
    return res.send("this is user router")
})

router.post("/signup",signupUser)
router.post("/login",loginUser)
router.post("/logout",islogin,logoutUser)
router.get("/getuser",islogin,fetchUser)

export default router;