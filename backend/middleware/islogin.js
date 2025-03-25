import jwt from "jsonwebtoken";
import userModel from "../schema/userSchema.js"

export const islogin=async (req,res,next)=>{
try {
    const token = req.cookies.token;
    console.log(token);
    // console.log(req.cookies)
    if(!token){
        return res.json({message:"token not found"});
    }
    const decodedUser=jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedUser)
    const user= await userModel.findOne({_id:decodedUser.userId});
    console.log(user);
    req.user=user;
    next()
} catch (error) {
    if(error){
        console.log(error);
        res.send(error)
    }
}
}