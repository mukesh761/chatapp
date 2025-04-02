import mongoose from "mongoose";
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    about:{
        type:String,
        default:"Hey! nice to meet you buddy."
    },
    profilepicture:{
        type:String,
        default:"https://avatar.iran.liara.run/public/boy"
    },
    friends:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    blockedcontact:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    
},{timestamps:true})
const user=mongoose.model("user",userSchema);
export default user;